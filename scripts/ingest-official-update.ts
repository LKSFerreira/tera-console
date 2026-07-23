/**
 * Ingestão de UPDATE oficial → src/content/patches/{id}
 *
 * Uso:
 *   npx tsx scripts/ingest-official-update.ts --news-id 1018
 *   npx tsx scripts/ingest-official-update.ts --url https://tera-console.com/news/1008
 */
import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ConteudoPatchLocalizado, MetadadosPatch } from '../src/types/patchContent.ts';
import { extrairNewsIdDaUrl, itemEhUpdate, obterNewsDetalhe } from './lib/api-oficial.ts';
import { baixarImagensERemapearBlocos } from './lib/download-images.ts';
import { parsearHtmlOficial } from './lib/parse-official-html.ts';
import { ICONES_POR_ABA, carregarSectionMap } from './lib/section-map.ts';
import {
  atualizarIndicePatches,
  aplicarLabelsLocalizados,
  derivarPatchId,
  registrarSeenNewsId,
  escreverPatchNoDisco,
} from './lib/write-patch.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raizProjeto = resolve(__dirname, '..');

function lerArg(nome: string): string | undefined {
  const indice = process.argv.indexOf(nome);
  if (indice === -1) return undefined;
  return process.argv[indice + 1];
}

function formatarDataExibicao(isoOuTexto: string): { en: string; pt: string; es: string } {
  const data = new Date(isoOuTexto);
  if (Number.isNaN(data.getTime())) {
    return { en: isoOuTexto, pt: isoOuTexto, es: isoOuTexto };
  }

  return {
    en: data.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    pt: data.toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' }),
    es: data.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
  };
}

async function main() {
  const newsIdBruto = lerArg('--news-id') ?? lerArg('--url');
  if (!newsIdBruto) {
    console.error('Informe --news-id <id> ou --url <https://tera-console.com/news/ID>');
    process.exit(1);
  }

  const newsId = extrairNewsIdDaUrl(newsIdBruto);
  console.log(`[ingest] newsId=${newsId}`);

  const detalhe = await obterNewsDetalhe(newsId);
  console.log(`[ingest] title=${detalhe.title}`);
  console.log(`[ingest] category=${detalhe.categoryLabel?.key}`);

  if (!itemEhUpdate(detalhe)) {
    console.error('[ingest] Item não é UPDATE elegível (category/título). Abortado.');
    process.exit(2);
  }

  const sectionMap = carregarSectionMap(raizProjeto);
  const parse = parsearHtmlOficial(detalhe.description ?? '', detalhe.title, sectionMap);
  console.log(`[ingest] quality=${parse.quality}`);
  for (const aviso of parse.warnings) {
    console.log(`[ingest] warning: ${aviso}`);
  }
  if (parse.unmappedHeadings.length > 0) {
    console.log(`[ingest] unmapped: ${parse.unmappedHeadings.join(' | ')}`);
  }

  if (parse.quality === 'failed') {
    const falhaDir = resolve(raizProjeto, 'src/content/sources/failures');
    mkdirSync(falhaDir, { recursive: true });
    writeFileSync(
      join(falhaDir, `${newsId}.json`),
      JSON.stringify({ newsId, title: detalhe.title, parse, fetchedAt: new Date().toISOString() }, null, 2),
      'utf8',
    );
    console.error('[ingest] quality=failed — relatório em src/content/sources/failures/');
    process.exit(3);
  }

  const patchId = derivarPatchId(parse.buildLabel, newsId, detalhe.title);
  const datas = formatarDataExibicao(detalhe.startDate);
  const pastaPatch = resolve(raizProjeto, 'src/content/patches', patchId);
  const pastaImages = join(pastaPatch, 'images');

  const { warnings: avisosImagem } = await baixarImagensERemapearBlocos(
    parse.imageUrls,
    pastaImages,
    patchId,
    parse.tabs,
  );
  parse.warnings.push(...avisosImagem);
  if (avisosImagem.length > 0 && parse.quality === 'ok') {
    parse.quality = 'partial';
  }

  // Public path para Vite
  const pastaPublic = resolve(raizProjeto, 'public/patches', patchId);
  mkdirSync(pastaPublic, { recursive: true });
  try {
    cpSync(pastaImages, pastaPublic, { recursive: true });
  } catch {
    // pasta images pode estar vazia
  }

  const tabsMeta = Object.keys(parse.tabs).map((tabId) => ({
    id: tabId,
    icon: ICONES_POR_ABA[tabId] ?? 'settings',
  }));

  // Ordena tabs com highlights primeiro
  tabsMeta.sort((a, b) => {
    if (a.id === 'highlights') return -1;
    if (b.id === 'highlights') return 1;
    return a.id.localeCompare(b.id);
  });

  const conteudoEn: ConteudoPatchLocalizado = {
    schemaVersion: 1,
    locale: 'en-US',
    tabs: parse.tabs,
  };

  const conteudoPt = aplicarLabelsLocalizados(conteudoEn, 'pt-BR');
  const conteudoEs = aplicarLabelsLocalizados(conteudoEn, 'es-ES');

  // Marca que corpo ainda está em EN nos locales pt/es (sem provedor de tradução)
  parse.warnings.push('Locales pt-BR/es-ES usam labels localizados; corpo textual ainda em EN (sem API de tradução).');

  const meta: MetadadosPatch = {
    schemaVersion: 1,
    id: patchId,
    buildLabel: parse.buildLabel ?? patchId.toUpperCase(),
    kind: 'update',
    status: 'draft',
    source: {
      officialNewsId: newsId,
      officialUrl: `https://tera-console.com/news/${newsId}`,
      fetchedAt: new Date().toISOString(),
      languageType: 'EN',
    },
    publishedAt: detalhe.startDate?.slice?.(0, 10) ?? undefined,
    parse: {
      quality: parse.quality,
      warnings: parse.warnings,
      unmappedHeadings: parse.unmappedHeadings,
      fallbackTabs: parse.fallbackTabs,
    },
    display: {
      'en-US': {
        name: detalhe.title.replace(/\s*-\s*/g, ' — '),
        date: datas.en,
        parts: '',
      },
      'pt-BR': {
        name: detalhe.title.replace(/\s*-\s*/g, ' — '),
        date: datas.pt,
        parts: '',
      },
      'es-ES': {
        name: detalhe.title.replace(/\s*-\s*/g, ' — '),
        date: datas.es,
        parts: '',
      },
    },
    tabs: tabsMeta,
  };

  const destino = escreverPatchNoDisco(raizProjeto, {
    patchId,
    meta,
    locales: {
      'en-US': conteudoEn,
      'pt-BR': conteudoPt,
      'es-ES': conteudoEs,
    },
  });

  atualizarIndicePatches(raizProjeto, patchId, { prepend: true });
  registrarSeenNewsId(raizProjeto, newsId, parse.quality);

  // Fixture HTML para testes futuros
  const fixturesDir = resolve(raizProjeto, 'src/content/sources/fixtures');
  mkdirSync(fixturesDir, { recursive: true });
  writeFileSync(join(fixturesDir, `${newsId}.html`), detalhe.description ?? '', 'utf8');

  console.log(`[ingest] wrote ${destino}`);
  console.log(`[ingest] patchId=${patchId}`);
  console.log(`[ingest] tabs=${tabsMeta.map((t) => t.id).join(', ')}`);
  console.log(`[ingest] images: ${Object.keys(parse.imageUrls).length} urls processadas`);
  console.log('[ingest] OK — rode npm run content:validate e npm run build');
}

main().catch((erro) => {
  console.error('[ingest] erro fatal:', erro);
  process.exit(1);
});
