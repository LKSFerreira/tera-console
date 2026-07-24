/**
 * Localização EN → pt-BR / es-ES (glossário + Strategy de MT).
 * Provedores e fallback: scripts/lib/traducao/ (cadeia escalável).
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { BlocoConteudo, ConteudoPatchLocalizado } from '../../src/types/patchContent.ts';
import { ICONES_POR_ABA, LABELS_ABA_ES, LABELS_ABA_PT } from './section-map.ts';
import {
  criarCadeiaTraducao,
  detectarProvedorTraducao,
  type CadeiaTraducao,
  type IdProvedorTraducao,
  type LocaleAlvo,
  type OpcoesCadeiaTraducao,
} from './traducao/index.ts';

export type { LocaleAlvo, IdProvedorTraducao as ProvedorTraducao };
export { detectarProvedorTraducao, criarCadeiaTraducao };

interface Glossario {
  schemaVersion: number;
  doNotTranslate: string[];
  fixedPhrases?: Record<LocaleAlvo, Record<string, string>>;
}

export interface ResultadoLocalizacao {
  conteudo: ConteudoPatchLocalizado;
  provedor: IdProvedorTraducao;
  warnings: string[];
  stringsTraduzidas: number;
}

const cacheTraducao = new Map<string, string>();

/** Uma cadeia por processo de localizar — preserva circuit breakers entre strings. */
let cadeiaAtiva: CadeiaTraducao | null = null;
let opcoesCadeiaAtiva: OpcoesCadeiaTraducao | undefined;

export function obterCadeiaTraducao(opcoes?: OpcoesCadeiaTraducao): CadeiaTraducao {
  const chaveOpcoes = JSON.stringify(opcoes ?? {});
  if (!cadeiaAtiva || JSON.stringify(opcoesCadeiaAtiva ?? {}) !== chaveOpcoes) {
    cadeiaAtiva = criarCadeiaTraducao(opcoes);
    opcoesCadeiaAtiva = opcoes;
  }
  return cadeiaAtiva;
}

/** Reset entre runs / testes. */
export function resetarEstadoFallbackGemini(): void {
  cadeiaAtiva?.resetarCircuitBreakers();
  cadeiaAtiva = null;
  opcoesCadeiaAtiva = undefined;
  cacheTraducao.clear();
}

export function carregarGlossario(raizProjeto: string): Glossario {
  const caminho = resolve(raizProjeto, 'src/content/glossary.json');
  return JSON.parse(readFileSync(caminho, 'utf8')) as Glossario;
}

/** @deprecated use mensagem da cadeia; mantido para imports legados */
export function erroPermiteFallbackOpenRouter(mensagem: string): boolean {
  const texto = mensagem.toLowerCase();
  return /429|403|401|500|502|503|504|resource.?exhausted|quota|rate.?limit/i.test(texto);
}

/** Protege termos do glossário com placeholders curtos. */
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
  resultado = resultado.replace(
    /⟦\s*(\d+)\s*⟧/g,
    (_, num: string) => mapa.get(`⟦${num}⟧`) ?? mapa.get(`[${num}]`) ?? _,
  );
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
  provedor: IdProvedorTraducao,
  opcoesCadeia?: OpcoesCadeiaTraducao,
): Promise<{ texto: string; warning?: string; provedorEfetivo?: IdProvedorTraducao }> {
  const original = texto.trim();
  if (!original) return { texto: '' };

  if (/^[\d\s+\-–—×x%.,:;()/→←]+$/i.test(original)) {
    return { texto: original };
  }

  if (provedor === 'none') {
    return { texto: original, provedorEfetivo: 'none', warning: 'Nenhum provedor de tradução configurado' };
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
  let provedorEfetivo: IdProvedorTraducao = provedor;

  // LOCALIZE_PROVIDER / LOCALIZE_CHAIN resolvidos em criarCadeiaTraducao
  const cadeiaEfetiva = obterCadeiaTraducao(opcoesCadeia);

  for (const pedaco of pedacos) {
    try {
      const resultado = await cadeiaEfetiva.traduzir(pedaco, locale);
      traduzidos.push(restaurarTermos(resultado.texto, mapa));
      provedorEfetivo = resultado.provedorEfetivo;
      if (resultado.warning) warning = resultado.warning;
    } catch (erro) {
      warning = erro instanceof Error ? erro.message : String(erro);
      traduzidos.push(restaurarTermos(pedaco, mapa));
    }
  }

  const final = aplicarFrasesFixas(traduzidos.join(' ').replace(/\s+/g, ' ').trim(), locale, glossario);
  cacheTraducao.set(cacheKey, final);
  return { texto: final, warning, provedorEfetivo };
}

async function traduzirLista(
  itens: string[],
  locale: LocaleAlvo,
  glossario: Glossario,
  provedor: IdProvedorTraducao,
  warnings: string[],
  opcoesCadeia?: OpcoesCadeiaTraducao,
): Promise<string[]> {
  const saida: string[] = [];
  for (const item of itens) {
    const r = await traduzirTexto(item, locale, glossario, provedor, opcoesCadeia);
    if (r.warning) warnings.push(r.warning);
    saida.push(r.texto);
  }
  return saida;
}

export async function traduzirBlocos(
  blocos: BlocoConteudo[],
  locale: LocaleAlvo,
  glossario: Glossario,
  provedor: IdProvedorTraducao,
  warnings: string[],
  contador: { n: number },
  opcoesCadeia?: OpcoesCadeiaTraducao,
): Promise<BlocoConteudo[]> {
  const resultado: BlocoConteudo[] = [];

  for (const bloco of blocos) {
    switch (bloco.type) {
      case 'sectionTitle': {
        const r = await traduzirTexto(bloco.title, locale, glossario, provedor, opcoesCadeia);
        if (r.warning) warnings.push(r.warning);
        contador.n += 1;
        resultado.push({ ...bloco, title: r.texto });
        break;
      }
      case 'paragraphs': {
        const items = await traduzirLista(bloco.items, locale, glossario, provedor, warnings, opcoesCadeia);
        contador.n += bloco.items.length;
        resultado.push({ ...bloco, items });
        break;
      }
      case 'bulletList': {
        const items = await traduzirLista(bloco.items, locale, glossario, provedor, warnings, opcoesCadeia);
        contador.n += bloco.items.length;
        resultado.push({ ...bloco, items });
        break;
      }
      case 'callout': {
        const r = await traduzirTexto(bloco.text, locale, glossario, provedor, opcoesCadeia);
        if (r.warning) warnings.push(r.warning);
        contador.n += 1;
        resultado.push({ ...bloco, text: r.texto });
        break;
      }
      case 'keyValueList': {
        const rows = [];
        for (const row of bloco.rows) {
          const label = await traduzirTexto(row.label, locale, glossario, provedor, opcoesCadeia);
          const value = await traduzirTexto(row.value, locale, glossario, provedor, opcoesCadeia);
          if (label.warning) warnings.push(label.warning);
          if (value.warning) warnings.push(value.warning);
          contador.n += 2;
          rows.push({ label: label.texto, value: value.texto });
        }
        resultado.push({ ...bloco, rows });
        break;
      }
      case 'table': {
        const columns = await traduzirLista(bloco.columns, locale, glossario, provedor, warnings, opcoesCadeia);
        contador.n += bloco.columns.length;
        const rows = [];
        for (const linha of bloco.rows) {
          rows.push(await traduzirLista(linha, locale, glossario, provedor, warnings, opcoesCadeia));
          contador.n += linha.length;
        }
        resultado.push({ ...bloco, columns, rows });
        break;
      }
      case 'figure': {
        const alt = await traduzirTexto(bloco.alt, locale, glossario, provedor, opcoesCadeia);
        const caption = await traduzirTexto(bloco.caption, locale, glossario, provedor, opcoesCadeia);
        if (alt.warning) warnings.push(alt.warning);
        if (caption.warning) warnings.push(caption.warning);
        contador.n += 2;
        resultado.push({ ...bloco, alt: alt.texto, caption: caption.texto });
        break;
      }
      case 'devNote': {
        const title = await traduzirTexto(bloco.title, locale, glossario, provedor, opcoesCadeia);
        const paragraphs = await traduzirLista(
          bloco.paragraphs,
          locale,
          glossario,
          provedor,
          warnings,
          opcoesCadeia,
        );
        if (title.warning) warnings.push(title.warning);
        contador.n += 1 + bloco.paragraphs.length;
        resultado.push({ ...bloco, title: title.texto, paragraphs });
        break;
      }
      case 'card': {
        let title = bloco.title;
        if (title) {
          const r = await traduzirTexto(title, locale, glossario, provedor, opcoesCadeia);
          if (r.warning) warnings.push(r.warning);
          title = r.texto;
          contador.n += 1;
        }
        const blocks = await traduzirBlocos(
          bloco.blocks,
          locale,
          glossario,
          provedor,
          warnings,
          contador,
          opcoesCadeia,
        );
        resultado.push({ ...bloco, title, blocks });
        break;
      }
      case 'cardGrid': {
        const cards = [];
        for (const card of bloco.cards) {
          let title = card.title;
          if (title) {
            const r = await traduzirTexto(title, locale, glossario, provedor, opcoesCadeia);
            if (r.warning) warnings.push(r.warning);
            title = r.texto;
            contador.n += 1;
          }
          const blocks = await traduzirBlocos(
            card.blocks,
            locale,
            glossario,
            provedor,
            warnings,
            contador,
            opcoesCadeia,
          );
          cards.push({ ...card, title, blocks });
        }
        resultado.push({ ...bloco, cards });
        break;
      }
      case 'subsection': {
        const title = await traduzirTexto(bloco.title, locale, glossario, provedor, opcoesCadeia);
        let badge = bloco.badge;
        if (badge) {
          const b = await traduzirTexto(badge, locale, glossario, provedor, opcoesCadeia);
          if (b.warning) warnings.push(b.warning);
          badge = b.texto;
          contador.n += 1;
        }
        if (title.warning) warnings.push(title.warning);
        contador.n += 1;
        const blocks = await traduzirBlocos(
          bloco.blocks,
          locale,
          glossario,
          provedor,
          warnings,
          contador,
          opcoesCadeia,
        );
        resultado.push({ ...bloco, title: title.texto, badge, blocks });
        break;
      }
      case 'issueList': {
        const title = await traduzirTexto(bloco.title, locale, glossario, provedor, opcoesCadeia);
        if (title.warning) warnings.push(title.warning);
        contador.n += 1;
        const items = [];
        for (const item of bloco.items) {
          const main = await traduzirTexto(item.main, locale, glossario, provedor, opcoesCadeia);
          if (main.warning) warnings.push(main.warning);
          contador.n += 1;
          let notes = item.notes;
          if (notes?.length) {
            notes = await traduzirLista(notes, locale, glossario, provedor, warnings, opcoesCadeia);
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
      'Sem provedor de tradução configurado (cadeia vazia).',
      'Corpo do texto permanece em EN; só labels de abas foram localizados.',
      'Configure GEMINI_API_KEY, OPENROUTER_API_KEY, GROQ_API_KEY, DEEPL, OPENAI/XAI ou --translate.',
    ],
    stringsTraduzidas: 0,
  };
}

export async function localizarConteudoPatch(
  conteudoEn: ConteudoPatchLocalizado,
  locale: LocaleAlvo,
  raizProjeto: string,
  provedorForcado?: IdProvedorTraducao,
): Promise<ResultadoLocalizacao> {
  const glossario = carregarGlossario(raizProjeto);
  const allowMyMemory = process.argv.includes('--translate') || process.argv.includes('--mymemory');
  const opcoes: OpcoesCadeiaTraducao = { allowMyMemory };
  const provedor = provedorForcado ?? detectarProvedorTraducao(opcoes);
  const warnings: string[] = [];
  const contador = { n: 0 };
  const labels = locale === 'pt-BR' ? LABELS_ABA_PT : LABELS_ABA_ES;
  const tabs: ConteudoPatchLocalizado['tabs'] = {};

  // Reusa cadeia do processo (circuit breakers sobrevivem entre pt-BR e es-ES)
  const cadeia = obterCadeiaTraducao(opcoes);
  const desc = cadeia.descricaoCadeia();

  if (provedor === 'none' || !desc) {
    return localizarSomenteLabels(conteudoEn, locale);
  }

  warnings.push(`Cadeia MT (Strategy): ${desc || '(vazia)'}`);

  let ultimoProvedorEfetivo: IdProvedorTraducao = provedor;

  for (const [tabId, aba] of Object.entries(conteudoEn.tabs)) {
    const labelPadrao = labels[tabId] ?? aba.label;
    const labelTrad = await traduzirTexto(aba.label, locale, glossario, provedor, opcoes);
    if (labelTrad.warning) warnings.push(labelTrad.warning);
    if (labelTrad.provedorEfetivo) ultimoProvedorEfetivo = labelTrad.provedorEfetivo;
    contador.n += 1;

    const blocks = await traduzirBlocos(
      aba.blocks,
      locale,
      glossario,
      provedor,
      warnings,
      contador,
      opcoes,
    );

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

  const warningsUnicos = [...new Set(warnings)].slice(0, 30);

  return {
    conteudo: {
      schemaVersion: 1,
      locale,
      tabs,
    },
    provedor: ultimoProvedorEfetivo,
    warnings: warningsUnicos,
    stringsTraduzidas: contador.n,
  };
}
