import * as cheerio from 'cheerio';
import type { BlocoConteudo } from '../../src/types/patchContent.ts';
import {
  ICONES_POR_ABA,
  LABELS_ABA_EN,
  type SectionMapConfig,
  mapearHeadingParaAba,
} from './section-map.ts';

export interface SecaoExtraida {
  heading: string;
  tab: string;
  matched: boolean;
  blocks: BlocoConteudo[];
  imageUrls: string[];
}

export interface ResultadoParseHtml {
  quality: 'ok' | 'partial' | 'fallback' | 'failed';
  warnings: string[];
  unmappedHeadings: string[];
  fallbackTabs: string[];
  tabs: Record<
    string,
    {
      label: string;
      blocks: BlocoConteudo[];
    }
  >;
  imageUrls: string[];
  buildLabel?: string;
  highlights: string[];
}

function textoLimpo(valor: string): string {
  return valor.replace(/\s+/g, ' ').replace(/\u00a0/g, ' ').trim();
}

function resolverUrlImagem(src: string): string {
  if (src.startsWith('//')) {
    return `https:${src}`;
  }
  if (src.startsWith('http')) {
    return src;
  }
  return src;
}

function extrairBlocosDeNo(
  $: cheerio.CheerioAPI,
  raiz: cheerio.Cheerio<cheerio.Element>,
): { blocks: BlocoConteudo[]; imageUrls: string[] } {
  const blocks: BlocoConteudo[] = [];
  const imageUrls: string[] = [];

  // Imagens oficiais (CDN) - URL absoluta https, sem download obrigatório
  raiz.find('img').each((_, elemento) => {
    const srcBruto = $(elemento).attr('src') || $(elemento).attr('data-src');
    if (!srcBruto) return;

    const url = resolverUrlImagem(srcBruto);
    if (!url || url.startsWith('data:')) return;

    imageUrls.push(url);
    const altBruto = textoLimpo($(elemento).attr('alt') || '');
    const alt =
      altBruto && !/^img$/i.test(altBruto) ? altBruto : 'Imagem do patch oficial (TERA Console)';

    blocks.push({
      type: 'figure',
      src: url,
      alt,
      caption: alt,
    });
  });

  // Tabelas
  raiz.find('table').each((_, tabela) => {
    const columns: string[] = [];
    $(tabela)
      .find('thead th')
      .each((__, th) => {
        columns.push(textoLimpo($(th).text()));
      });

    if (columns.length === 0) {
      $(tabela)
        .find('tr')
        .first()
        .find('th, td')
        .each((__, celula) => {
          columns.push(textoLimpo($(celula).text()));
        });
    }

    const rows: string[][] = [];
    $(tabela)
      .find('tbody tr')
      .each((__, tr) => {
        const linha: string[] = [];
        $(tr)
          .find('td')
          .each((___, td) => {
            linha.push(textoLimpo($(td).text()));
          });
        if (linha.length > 0) {
          rows.push(linha);
        }
      });

    if (columns.length > 0 && rows.length > 0) {
      blocks.push({ type: 'table', columns, rows });
    }
  });

  // Listas
  raiz.find('ul, ol').each((_, lista) => {
    const items: string[] = [];
    $(lista)
      .children('li')
      .each((__, li) => {
        const texto = textoLimpo($(li).text());
        if (texto) {
          items.push(texto);
        }
      });
    if (items.length > 0) {
      blocks.push({ type: 'bulletList', items });
    }
  });

  // Parágrafos diretos (quando não há lista)
  if (blocks.length === 0) {
    const paragrafos: string[] = [];
    raiz.find('p, div').each((_, no) => {
      // evita capturar containers gigantes com filhos estruturados
      if ($(no).children('ul, ol, table, h1, h2, h3').length > 0) {
        return;
      }
      const texto = textoLimpo($(no).text());
      if (texto.length > 20) {
        paragrafos.push(texto);
      }
    });

    const unicos = [...new Set(paragrafos)].slice(0, 40);
    if (unicos.length > 0) {
      blocks.push({ type: 'paragraphs', items: unicos });
    }
  }

  return { blocks, imageUrls: [...new Set(imageUrls)] };
}

function extrairHighlights($: cheerio.CheerioAPI): string[] {
  const highlights: string[] = [];

  $('*').each((_, el) => {
    const texto = textoLimpo($(el).text());
    if (/update highlights/i.test(texto) && texto.length < 40) {
      const container = $(el).parent();
      container.children().each((__, filho) => {
        const item = textoLimpo($(filho).text());
        if (item && !/update highlights/i.test(item) && item.length < 220) {
          highlights.push(item);
        }
      });
    }
  });

  return [...new Set(highlights)].slice(0, 20);
}

function extrairBuildLabel(titulo: string, html: string): string | undefined {
  const doTitulo = titulo.match(/B\d+(?:\.\d+)?/i);
  if (doTitulo) {
    return doTitulo[0].toUpperCase();
  }

  const doHtml = html.match(/B\d+(?:\.\d+)?/i);
  return doHtml?.[0]?.toUpperCase();
}

export function parsearHtmlOficial(
  html: string,
  titulo: string,
  sectionMap: SectionMapConfig,
): ResultadoParseHtml {
  const warnings: string[] = [];
  const unmappedHeadings: string[] = [];
  const imageUrls: string[] = [];

  if (!html || html.trim().length < 50) {
    return {
      quality: 'failed',
      warnings: ['HTML vazio ou insuficiente'],
      unmappedHeadings: [],
      fallbackTabs: [],
      tabs: {},
      imageUrls: [],
      highlights: [],
    };
  }

  const $ = cheerio.load(html);
  const highlights = extrairHighlights($);
  const buildLabel = extrairBuildLabel(titulo, html);

  const secoesPorAba: Record<string, BlocoConteudo[]> = {};
  const h2s = $('h2').toArray();

  if (h2s.length === 0) {
    // Fallback: dump de bullets/parágrafos
    const corpo = $('body').length ? $('body') : $.root();
    const { blocks, imageUrls: imgs } = extrairBlocosDeNo($, corpo as cheerio.Cheerio<cheerio.Element>);
    imageUrls.push(...imgs);

    const bullets: string[] = [];
    $('li').each((_, li) => {
      const t = textoLimpo($(li).text());
      if (t) bullets.push(t);
    });

    const blocosFallback: BlocoConteudo[] = [
      { type: 'sectionTitle', title: titulo, icon: 'settings' },
    ];

    if (bullets.length > 0) {
      blocosFallback.push({ type: 'bulletList', items: [...new Set(bullets)].slice(0, 80) });
    } else if (blocks.length > 0) {
      blocosFallback.push(...blocks);
    } else {
      const texto = textoLimpo($.root().text()).slice(0, 4000);
      if (texto) {
        blocosFallback.push({ type: 'paragraphs', items: [texto] });
      }
    }

    if (blocosFallback.length <= 1) {
      return {
        quality: 'failed',
        warnings: ['Não foi possível extrair seções nem bullets do HTML'],
        unmappedHeadings: [],
        fallbackTabs: ['system'],
        tabs: {},
        imageUrls,
        buildLabel,
        highlights,
      };
    }

    return {
      quality: 'fallback',
      warnings: ['Nenhum h2 encontrado; conteúdo colocado em system'],
      unmappedHeadings: [],
      fallbackTabs: ['system'],
      tabs: {
        system: {
          label: LABELS_ABA_EN.system,
          blocks: blocosFallback,
        },
      },
      imageUrls: [...new Set(imageUrls)],
      buildLabel,
      highlights,
    };
  }

  for (let indice = 0; indice < h2s.length; indice += 1) {
    const h2 = h2s[indice];
    const heading = textoLimpo($(h2).text());
    if (!heading) continue;

    const { tab, matched } = mapearHeadingParaAba(heading, sectionMap);
    if (!matched) {
      unmappedHeadings.push(heading);
    }

    // Coleta nós até o próximo h2
    const pedacos: cheerio.Element[] = [];
    let cursor = $(h2).next();
    while (cursor.length && !cursor.is('h2')) {
      pedacos.push(cursor[0] as cheerio.Element);
      cursor = cursor.next();
    }

    const wrapper = $('<div></div>');
    for (const pedaco of pedacos) {
      wrapper.append($(pedaco).clone());
    }

    const { blocks, imageUrls: imgs } = extrairBlocosDeNo($, wrapper);
    imageUrls.push(...imgs);

    const blocosSecao: BlocoConteudo[] = [
      {
        type: 'subsection',
        title: heading,
        blocks: blocks.length > 0 ? blocks.filter((bloco) => bloco.type !== 'figure').concat(
          // figures no fim da subsection via map posterior de URLs locais
          blocks.filter((bloco) => bloco.type === 'figure'),
        ) : [{ type: 'paragraphs', items: ['(Sem detalhe estruturado nesta seção.)'] }],
      },
    ];

    if (!secoesPorAba[tab]) {
      secoesPorAba[tab] = [];
    }
    secoesPorAba[tab].push(...blocosSecao);
  }

  if (highlights.length > 0) {
    secoesPorAba.highlights = [
      { type: 'sectionTitle', title: 'Update Highlights', icon: 'sparkles' },
      { type: 'bulletList', items: highlights },
    ];
  }

  const tabs: ResultadoParseHtml['tabs'] = {};
  for (const [tabId, blocks] of Object.entries(secoesPorAba)) {
    tabs[tabId] = {
      label: LABELS_ABA_EN[tabId] ?? tabId,
      blocks: [
        { type: 'sectionTitle', title: LABELS_ABA_EN[tabId] ?? tabId, icon: ICONES_POR_ABA[tabId] ?? 'settings' },
        ...blocks,
      ],
    };
  }

  let quality: ResultadoParseHtml['quality'] = 'ok';
  if (unmappedHeadings.length > 0) {
    quality = 'partial';
    warnings.push(`Headings sem match no section-map: ${unmappedHeadings.join(' | ')}`);
  }
  if (Object.keys(tabs).length === 0) {
    quality = 'failed';
    warnings.push('Nenhuma aba gerada após o parse');
  }

  return {
    quality,
    warnings,
    unmappedHeadings,
    fallbackTabs: [],
    tabs,
    imageUrls: [...new Set(imageUrls)],
    buildLabel,
    highlights,
  };
}
