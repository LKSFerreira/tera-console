/**
 * Localização EN → pt-BR / es-ES com glossário e provedores:
 * 1) GEMINI_API_KEY (default gemini-3.6-flash; alias legado GEMINI)
 * 2) DEEPL_AUTH_KEY
 * 3) OPENAI_API_KEY / XAI_API_KEY
 * 4) MyMemory só com --translate
 * 5) none (labels only)
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { BlocoConteudo, ConteudoPatchLocalizado } from '../../src/types/patchContent.ts';
import { obterChaveGemini } from './load-env.ts';
import { ICONES_POR_ABA, LABELS_ABA_ES, LABELS_ABA_PT } from './section-map.ts';

export type LocaleAlvo = 'pt-BR' | 'es-ES';

interface Glossario {
  schemaVersion: number;
  doNotTranslate: string[];
  fixedPhrases?: Record<LocaleAlvo, Record<string, string>>;
}

export type ProvedorTraducao = 'gemini' | 'deepl' | 'openai' | 'mymemory' | 'none';

export interface ResultadoLocalizacao {
  conteudo: ConteudoPatchLocalizado;
  provedor: ProvedorTraducao;
  warnings: string[];
  stringsTraduzidas: number;
}

const cacheTraducao = new Map<string, string>();

function sleep(ms: number): Promise<void> {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

export function carregarGlossario(raizProjeto: string): Glossario {
  const caminho = resolve(raizProjeto, 'src/content/glossary.json');
  return JSON.parse(readFileSync(caminho, 'utf8')) as Glossario;
}

/**
 * Sem chave configurada → `none` (rápido: não chama API).
 * MyMemory só com allowMyMemory / LOCALIZE_PROVIDER=mymemory / --translate no CLI.
 */
export function detectarProvedorTraducao(opcoes?: { allowMyMemory?: boolean }): ProvedorTraducao {
  const forcado = (process.env.LOCALIZE_PROVIDER || '').trim().toLowerCase();
  if (
    forcado === 'gemini' ||
    forcado === 'deepl' ||
    forcado === 'openai' ||
    forcado === 'mymemory' ||
    forcado === 'none'
  ) {
    if (forcado === 'gemini' && !obterChaveGemini()) {
      console.warn('[localize] LOCALIZE_PROVIDER=gemini mas GEMINI_API_KEY ausente');
    }
    if (forcado === 'deepl' && !process.env.DEEPL_AUTH_KEY?.trim()) {
      console.warn('[localize] LOCALIZE_PROVIDER=deepl mas DEEPL_AUTH_KEY ausente');
    }
    if (forcado === 'openai' && !process.env.OPENAI_API_KEY?.trim() && !process.env.XAI_API_KEY?.trim()) {
      console.warn('[localize] LOCALIZE_PROVIDER=openai mas OPENAI_API_KEY/XAI_API_KEY ausente');
    }
    return forcado as ProvedorTraducao;
  }

  if (obterChaveGemini()) return 'gemini';
  if (process.env.DEEPL_AUTH_KEY?.trim()) return 'deepl';
  if (process.env.OPENAI_API_KEY?.trim() || process.env.XAI_API_KEY?.trim()) return 'openai';
  if (opcoes?.allowMyMemory) return 'mymemory';
  return 'none';
}

function codigoIdiomaProvedor(locale: LocaleAlvo, provedor: ProvedorTraducao): string {
  if (provedor === 'deepl') {
    return locale === 'pt-BR' ? 'PT-BR' : 'ES';
  }
  if (provedor === 'mymemory') {
    return locale === 'pt-BR' ? 'pt' : 'es';
  }
  return locale === 'pt-BR' ? 'Portuguese (Brazil)' : 'Spanish';
}

function modeloGemini(): string {
  return (process.env.GEMINI_MODEL || 'gemini-3.6-flash').trim();
}

async function traduzirGemini(texto: string, locale: LocaleAlvo): Promise<string> {
  const apiKey = obterChaveGemini();
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY ausente');
  }

  const model = modeloGemini();
  const idiomaAlvo = codigoIdiomaProvedor(locale, 'gemini');
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

  const prompt =
    'You are a professional game localization translator for TERA Console patch notes.\n' +
    'Translate from English to the target language.\n' +
    'Keep placeholders like ⟦0⟧ exactly unchanged.\n' +
    'Do not invent or remove numbers/stats.\n' +
    'Keep tone clear and natural for players.\n' +
    'Return only the translation, no quotes or commentary.\n\n' +
    `Target language: ${idiomaAlvo}\n\n` +
    `Text:\n${texto}`;

  const resposta = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
      },
    }),
  });

  if (!resposta.ok) {
    const corpo = await resposta.text();
    throw new Error(`Gemini HTTP ${resposta.status}: ${corpo.slice(0, 400)}`);
  }

  const json = (await resposta.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    error?: { message?: string };
  };

  if (json.error?.message) {
    throw new Error(`Gemini: ${json.error.message}`);
  }

  const textoSaida = json.candidates?.[0]?.content?.parts?.map((parte) => parte.text ?? '').join('').trim();
  if (!textoSaida) {
    throw new Error('Gemini retornou resposta vazia');
  }

  return textoSaida;
}

/** Protege termos do glossário com placeholders curtos (MT costuma quebrar `__GLS__`). */
export function protegerTermos(texto: string, termos: string[]): { texto: string; mapa: Map<string, string> } {
  const mapa = new Map<string, string>();
  const ordenados = [...termos].sort((a, b) => b.length - a.length);
  let resultado = texto;
  let indice = 0;

  for (const termo of ordenados) {
    if (!termo) continue;
    const escaped = termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'gi');
    resultado = resultado.replace(regex, (match) => {
      const chave = `⟦${indice}⟧`;
      mapa.set(chave, match);
      // variantes que o MT às vezes inventa
      mapa.set(`[${indice}]`, match);
      mapa.set(`[[${indice}]]`, match);
      indice += 1;
      return chave;
    });
  }

  return { texto: resultado, mapa };
}

export function restaurarTermos(texto: string, mapa: Map<string, string>): string {
  let resultado = texto;
  for (const [chave, valor] of mapa.entries()) {
    resultado = resultado.split(chave).join(valor);
  }
  // limpa placeholders órfãos tipo ⟦0⟧ se sobrarem sem mapa (não deve)
  resultado = resultado.replace(/⟦\s*(\d+)\s*⟧/g, (_, num: string) => mapa.get(`⟦${num}⟧`) ?? mapa.get(`[${num}]`) ?? _);
  return resultado;
}

function aplicarFrasesFixas(texto: string, locale: LocaleAlvo, glossario: Glossario): string {
  const frases = glossario.fixedPhrases?.[locale] ?? {};
  let resultado = texto;
  const chaves = Object.keys(frases).sort((a, b) => b.length - a.length);
  for (const origem of chaves) {
    const destino = frases[origem];
    if (!destino) continue;
    const escaped = origem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    resultado = resultado.replace(new RegExp(escaped, 'gi'), destino);
  }
  return resultado;
}

async function traduzirDeepL(texto: string, locale: LocaleAlvo): Promise<string> {
  const chave = process.env.DEEPL_AUTH_KEY!;
  const free = chave.endsWith(':fx') || process.env.DEEPL_API_URL?.includes('api-free');
  const base = process.env.DEEPL_API_URL ?? (free ? 'https://api-free.deepl.com' : 'https://api.deepl.com');
  const resposta = await fetch(`${base}/v2/translate`, {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${chave}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      text: texto,
      source_lang: 'EN',
      target_lang: codigoIdiomaProvedor(locale, 'deepl'),
      preserve_formatting: '1',
    }),
  });

  if (!resposta.ok) {
    throw new Error(`DeepL HTTP ${resposta.status}: ${await resposta.text()}`);
  }

  const json = (await resposta.json()) as { translations?: Array<{ text: string }> };
  return json.translations?.[0]?.text ?? texto;
}

async function traduzirOpenAICompativel(texto: string, locale: LocaleAlvo): Promise<string> {
  const usaXai = Boolean(process.env.XAI_API_KEY?.trim());
  const apiKey = (usaXai ? process.env.XAI_API_KEY : process.env.OPENAI_API_KEY)!;
  const baseUrl = usaXai
    ? (process.env.XAI_BASE_URL ?? 'https://api.x.ai/v1')
    : (process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1');
  const model = usaXai
    ? (process.env.XAI_MODEL ?? 'grok-4-1-fast-non-reasoning')
    : (process.env.OPENAI_MODEL ?? 'gpt-4o-mini');

  const idiomaAlvo = codigoIdiomaProvedor(locale, 'openai');
  const resposta = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.2,
      messages: [
        {
          role: 'system',
          content:
            'You are a professional game localization translator for TERA Console patch notes. ' +
            'Translate from English to the target language. Keep placeholders like ⟦0⟧ exactly unchanged. ' +
            'Do not translate game proper names. Keep tone clear and natural for players. ' +
            'Return only the translation, no quotes or commentary.',
        },
        {
          role: 'user',
          content: `Target language: ${idiomaAlvo}\n\nText:\n${texto}`,
        },
      ],
    }),
  });

  if (!resposta.ok) {
    throw new Error(`OpenAI-compatible HTTP ${resposta.status}: ${await resposta.text()}`);
  }

  const json = (await resposta.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return json.choices?.[0]?.message?.content?.trim() ?? texto;
}

async function traduzirMyMemory(texto: string, locale: LocaleAlvo): Promise<string> {
  const langpair = `en|${codigoIdiomaProvedor(locale, 'mymemory')}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${langpair}`;
  const resposta = await fetch(url, {
    headers: { 'User-Agent': 'tera-console-portal-localize/1.0' },
  });

  if (!resposta.ok) {
    throw new Error(`MyMemory HTTP ${resposta.status}`);
  }

  const json = (await resposta.json()) as {
    responseData?: { translatedText?: string };
    responseStatus?: number;
  };

  if (json.responseStatus && json.responseStatus !== 200) {
    throw new Error(`MyMemory status ${json.responseStatus}`);
  }

  const traduzido = json.responseData?.translatedText?.trim();
  if (!traduzido || /MYMEMORY WARNING/i.test(traduzido)) {
    throw new Error(`MyMemory sem tradução útil: ${traduzido ?? 'vazio'}`);
  }

  return traduzido;
}

function particionarTexto(texto: string, maxLen = 420): string[] {
  if (texto.length <= maxLen) return [texto];

  const partes: string[] = [];
  let restante = texto;
  while (restante.length > maxLen) {
    let corte = restante.lastIndexOf('. ', maxLen);
    if (corte < maxLen * 0.4) corte = restante.lastIndexOf(' ', maxLen);
    if (corte < maxLen * 0.4) corte = maxLen;
    partes.push(restante.slice(0, corte + 1).trim());
    restante = restante.slice(corte + 1).trim();
  }
  if (restante) partes.push(restante);
  return partes;
}

export async function traduzirTexto(
  texto: string,
  locale: LocaleAlvo,
  glossario: Glossario,
  provedor: ProvedorTraducao,
): Promise<{ texto: string; warning?: string }> {
  const original = texto.trim();
  if (!original) return { texto: '' };

  // Só números / símbolos
  if (/^[\d\s\-- - +×x%.,:;()/]+$/i.test(original)) {
    return { texto: original };
  }

  const cacheKey = `${provedor}|${locale}|${original}`;
  if (cacheTraducao.has(cacheKey)) {
    return { texto: cacheTraducao.get(cacheKey)! };
  }

  const comFrases = aplicarFrasesFixas(original, locale, glossario);
  const { texto: protegido, mapa } = protegerTermos(comFrases, glossario.doNotTranslate);
  const pedacos = particionarTexto(protegido);
  const traduzidos: string[] = [];
  let warning: string | undefined;

  for (const pedaco of pedacos) {
    try {
      let parte: string;
      if (provedor === 'gemini') {
        parte = await traduzirGemini(pedaco, locale);
        await sleep(80);
      } else if (provedor === 'deepl') {
        parte = await traduzirDeepL(pedaco, locale);
      } else if (provedor === 'openai') {
        parte = await traduzirOpenAICompativel(pedaco, locale);
      } else if (provedor === 'mymemory') {
        // rate limit agressivo no free tier
        await sleep(600);
        try {
          parte = await traduzirMyMemory(pedaco, locale);
        } catch (erro) {
          // retry único em 429
          const msg = erro instanceof Error ? erro.message : String(erro);
          if (msg.includes('429')) {
            await sleep(2000);
            parte = await traduzirMyMemory(pedaco, locale);
          } else {
            throw erro;
          }
        }
      } else {
        parte = pedaco;
        warning = 'Nenhum provedor de tradução configurado';
      }
      traduzidos.push(restaurarTermos(parte, mapa));
    } catch (erro) {
      warning = erro instanceof Error ? erro.message : String(erro);
      traduzidos.push(restaurarTermos(pedaco, mapa));
    }
  }

  const final = aplicarFrasesFixas(traduzidos.join(' ').replace(/\s+/g, ' ').trim(), locale, glossario);
  cacheTraducao.set(cacheKey, final);
  return { texto: final, warning };
}

async function traduzirLista(
  itens: string[],
  locale: LocaleAlvo,
  glossario: Glossario,
  provedor: ProvedorTraducao,
  warnings: string[],
): Promise<string[]> {
  const saida: string[] = [];
  for (const item of itens) {
    const r = await traduzirTexto(item, locale, glossario, provedor);
    if (r.warning) warnings.push(r.warning);
    saida.push(r.texto);
  }
  return saida;
}

export async function traduzirBlocos(
  blocos: BlocoConteudo[],
  locale: LocaleAlvo,
  glossario: Glossario,
  provedor: ProvedorTraducao,
  warnings: string[],
  contador: { n: number },
): Promise<BlocoConteudo[]> {
  const resultado: BlocoConteudo[] = [];

  for (const bloco of blocos) {
    switch (bloco.type) {
      case 'sectionTitle': {
        const r = await traduzirTexto(bloco.title, locale, glossario, provedor);
        if (r.warning) warnings.push(r.warning);
        contador.n += 1;
        resultado.push({ ...bloco, title: r.texto });
        break;
      }
      case 'paragraphs': {
        const items = await traduzirLista(bloco.items, locale, glossario, provedor, warnings);
        contador.n += bloco.items.length;
        resultado.push({ ...bloco, items });
        break;
      }
      case 'bulletList': {
        const items = await traduzirLista(bloco.items, locale, glossario, provedor, warnings);
        contador.n += bloco.items.length;
        resultado.push({ ...bloco, items });
        break;
      }
      case 'callout': {
        const r = await traduzirTexto(bloco.text, locale, glossario, provedor);
        if (r.warning) warnings.push(r.warning);
        contador.n += 1;
        resultado.push({ ...bloco, text: r.texto });
        break;
      }
      case 'keyValueList': {
        const rows = [];
        for (const row of bloco.rows) {
          const label = await traduzirTexto(row.label, locale, glossario, provedor);
          const value = await traduzirTexto(row.value, locale, glossario, provedor);
          if (label.warning) warnings.push(label.warning);
          if (value.warning) warnings.push(value.warning);
          contador.n += 2;
          rows.push({ label: label.texto, value: value.texto });
        }
        resultado.push({ ...bloco, rows });
        break;
      }
      case 'table': {
        const columns = await traduzirLista(bloco.columns, locale, glossario, provedor, warnings);
        contador.n += bloco.columns.length;
        const rows = [];
        for (const linha of bloco.rows) {
          rows.push(await traduzirLista(linha, locale, glossario, provedor, warnings));
          contador.n += linha.length;
        }
        resultado.push({ ...bloco, columns, rows });
        break;
      }
      case 'figure': {
        const alt = await traduzirTexto(bloco.alt, locale, glossario, provedor);
        const caption = await traduzirTexto(bloco.caption, locale, glossario, provedor);
        if (alt.warning) warnings.push(alt.warning);
        if (caption.warning) warnings.push(caption.warning);
        contador.n += 2;
        resultado.push({ ...bloco, alt: alt.texto, caption: caption.texto });
        break;
      }
      case 'devNote': {
        const title = await traduzirTexto(bloco.title, locale, glossario, provedor);
        const paragraphs = await traduzirLista(bloco.paragraphs, locale, glossario, provedor, warnings);
        if (title.warning) warnings.push(title.warning);
        contador.n += 1 + bloco.paragraphs.length;
        resultado.push({ ...bloco, title: title.texto, paragraphs });
        break;
      }
      case 'card': {
        let title = bloco.title;
        if (title) {
          const r = await traduzirTexto(title, locale, glossario, provedor);
          if (r.warning) warnings.push(r.warning);
          title = r.texto;
          contador.n += 1;
        }
        const blocks = await traduzirBlocos(bloco.blocks, locale, glossario, provedor, warnings, contador);
        resultado.push({ ...bloco, title, blocks });
        break;
      }
      case 'cardGrid': {
        const cards = [];
        for (const card of bloco.cards) {
          let title = card.title;
          if (title) {
            const r = await traduzirTexto(title, locale, glossario, provedor);
            if (r.warning) warnings.push(r.warning);
            title = r.texto;
            contador.n += 1;
          }
          const blocks = await traduzirBlocos(card.blocks, locale, glossario, provedor, warnings, contador);
          cards.push({ ...card, title, blocks });
        }
        resultado.push({ ...bloco, cards });
        break;
      }
      case 'subsection': {
        const title = await traduzirTexto(bloco.title, locale, glossario, provedor);
        let badge = bloco.badge;
        if (badge) {
          const b = await traduzirTexto(badge, locale, glossario, provedor);
          if (b.warning) warnings.push(b.warning);
          badge = b.texto;
          contador.n += 1;
        }
        if (title.warning) warnings.push(title.warning);
        contador.n += 1;
        const blocks = await traduzirBlocos(bloco.blocks, locale, glossario, provedor, warnings, contador);
        resultado.push({ ...bloco, title: title.texto, badge, blocks });
        break;
      }
      case 'issueList': {
        const title = await traduzirTexto(bloco.title, locale, glossario, provedor);
        if (title.warning) warnings.push(title.warning);
        contador.n += 1;
        const items = [];
        for (const item of bloco.items) {
          const main = await traduzirTexto(item.main, locale, glossario, provedor);
          if (main.warning) warnings.push(main.warning);
          contador.n += 1;
          let notes = item.notes;
          if (notes?.length) {
            notes = await traduzirLista(notes, locale, glossario, provedor, warnings);
            contador.n += notes.length;
          }
          items.push({ main: main.texto, notes });
        }
        resultado.push({ ...bloco, title: title.texto, items });
        break;
      }
      default:
        resultado.push(bloco);
    }
  }

  return resultado;
}

/** Só labels de aba/sectionTitle localizados; corpo permanece EN. Instantâneo. */
export function localizarSomenteLabels(
  conteudoEn: ConteudoPatchLocalizado,
  locale: LocaleAlvo,
): ResultadoLocalizacao {
  const labels = locale === 'pt-BR' ? LABELS_ABA_PT : LABELS_ABA_ES;
  const tabs: ConteudoPatchLocalizado['tabs'] = {};

  for (const [tabId, aba] of Object.entries(conteudoEn.tabs)) {
    tabs[tabId] = {
      label: labels[tabId] ?? aba.label,
      blocks: aba.blocks.map((bloco) => {
        if (bloco.type === 'sectionTitle') {
          return {
            ...bloco,
            title: labels[tabId] ?? bloco.title,
            icon: bloco.icon ?? ICONES_POR_ABA[tabId],
          };
        }
        return bloco;
      }),
    };
  }

  return {
    conteudo: { schemaVersion: 1, locale, tabs },
    provedor: 'none',
    warnings: [
      'Sem provedor de tradução configurado (GEMINI_API_KEY, DEEPL_AUTH_KEY, OPENAI_API_KEY, XAI_API_KEY).',
      'Corpo do texto permanece em EN; só labels de abas foram localizados.',
      'Para MT: defina GEMINI_API_KEY no .env (ou secret no GitHub) ou use --translate (MyMemory).',
    ],
    stringsTraduzidas: 0,
  };
}

export async function localizarConteudoPatch(
  conteudoEn: ConteudoPatchLocalizado,
  locale: LocaleAlvo,
  raizProjeto: string,
  provedorForcado?: ProvedorTraducao,
): Promise<ResultadoLocalizacao> {
  const glossario = carregarGlossario(raizProjeto);
  const provedor = provedorForcado ?? detectarProvedorTraducao();
  const warnings: string[] = [];
  const contador = { n: 0 };
  const labels = locale === 'pt-BR' ? LABELS_ABA_PT : LABELS_ABA_ES;
  const tabs: ConteudoPatchLocalizado['tabs'] = {};

  if (provedor === 'none') {
    return localizarSomenteLabels(conteudoEn, locale);
  }

  if (provedor === 'mymemory') {
    warnings.push(
      'Usando MyMemory (gratuito). Lento e com cota - revise antes de publicar. Prefira DEEPL_AUTH_KEY ou OPENAI_API_KEY/XAI_API_KEY.',
    );
  }

  for (const [tabId, aba] of Object.entries(conteudoEn.tabs)) {
    const labelPadrao = labels[tabId] ?? aba.label;
    const labelTrad = await traduzirTexto(aba.label, locale, glossario, provedor);
    if (labelTrad.warning) warnings.push(labelTrad.warning);
    contador.n += 1;

    const blocks = await traduzirBlocos(aba.blocks, locale, glossario, provedor, warnings, contador);

    // Garante sectionTitle com label amigável da aba quando for o título genérico EN
    const blocksAjustados = blocks.map((bloco) => {
      if (bloco.type === 'sectionTitle' && labels[tabId]) {
        return {
          ...bloco,
          title: labels[tabId],
          icon: bloco.icon ?? ICONES_POR_ABA[tabId],
        };
      }
      return bloco;
    });

    tabs[tabId] = {
      label: labels[tabId] ?? labelTrad.texto ?? labelPadrao,
      blocks: blocksAjustados,
    };
  }

  // Dedup warnings
  const warningsUnicos = [...new Set(warnings)].slice(0, 20);

  return {
    conteudo: {
      schemaVersion: 1,
      locale,
      tabs,
    },
    provedor,
    warnings: warningsUnicos,
    stringsTraduzidas: contador.n,
  };
}
