/**
 * Radar: UPDATES oficiais que ainda NÃO estão no portal (index.order).
 *
 * NÃO usa seen-news-ids como filtro principal (lab de ingest não pode “esconder”
 * updates que nunca foram publicados no site).
 *
 * Flags:
 *   --json            imprime payload em uma linha
 *   --github-output   grava count/ids/payload no $GITHUB_OUTPUT
 */
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { itemEhUpdate, listarNewsOficiais, type ItemNewsResumo } from './lib/api-oficial.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(__dirname, '..');

function temFlag(nome: string): boolean {
  return process.argv.includes(nome);
}

/** Ex.: "B133.02 Update - July 23" → "b133.02" */
export function derivarPatchIdDoTitulo(titulo: string): string | null {
  const match = titulo.match(/B(\d+)(?:\.(\d+))?/i);
  if (!match) return null;
  const major = match[1];
  const minor = (match[2] ?? '01').padStart(2, '0');
  return `b${major}.${minor}`.toLowerCase();
}

function carregarIdsPublicadosNoPortal(): Set<string> {
  const caminho = resolve(raiz, 'src/content/patches/index.json');
  if (!existsSync(caminho)) return new Set();
  const indice = JSON.parse(readFileSync(caminho, 'utf8')) as { order?: string[] };
  return new Set((indice.order ?? []).map((id) => id.toLowerCase()));
}

function mapearItem(item: ItemNewsResumo, portalIds: Set<string>) {
  const patchId = derivarPatchIdDoTitulo(item.title ?? '') ?? `news-${item.id}`;
  const noPortal = portalIds.has(patchId.toLowerCase());
  return {
    id: item.id,
    title: item.title,
    url: `https://tera-console.com/news/${item.id}`,
    patchId,
    noPortal,
    statusPortal: noPortal ? 'published' : 'missing',
  };
}

async function main() {
  const portalIds = carregarIdsPublicadosNoPortal();
  const lista = await listarNewsOficiais(1, 30);
  const updates = (lista.content ?? []).filter(itemEhUpdate);
  const mapeados = updates.map((item) => mapearItem(item, portalIds));

  // Pendentes = oficiais recentes que o portal ainda NÃO publica
  const pendentes = mapeados.filter((item) => !item.noPortal);
  const jaNoPortal = mapeados.filter((item) => item.noPortal);

  const payload = {
    count: pendentes.length,
    ids: pendentes.map((item) => item.id),
    items: pendentes,
    // contexto extra para a Issue (transparência)
    noPortalCount: pendentes.length,
    onPortalCount: jaNoPortal.length,
    onPortalIds: jaNoPortal.map((item) => item.id),
    onPortalItems: jaNoPortal,
    page1UpdateCount: updates.length,
    portalOrder: [...portalIds],
  };

  if (temFlag('--json')) {
    process.stdout.write(`${JSON.stringify(payload)}\n`);
  } else {
    console.log(`[detect] UPDATES na página 1 da API: ${updates.length}`);
    console.log(`[detect] no portal (order): ${[...portalIds].join(', ') || '(vazio)'}`);
    console.log(`[detect] oficiais JÁ cobertos pelo portal: ${jaNoPortal.length}`);
    for (const item of jaNoPortal) {
      console.log(`  ✓ ${item.id} | ${item.patchId} | ${item.title}`);
    }
    console.log(`[detect] oficiais FALTANDO no portal: ${pendentes.length}`);
    for (const item of payload.items) {
      console.log(`  ✗ ${item.id} | ${item.patchId} | ${item.title} | ${item.url}`);
    }
  }

  if (temFlag('--github-output')) {
    const outputFile = process.env.GITHUB_OUTPUT;
    if (!outputFile) {
      throw new Error('--github-output exige variável GITHUB_OUTPUT (Actions)');
    }
    appendFileSync(outputFile, `count=${payload.count}\n`, 'utf8');
    appendFileSync(outputFile, `ids=${payload.ids.join(',')}\n`, 'utf8');
    appendFileSync(outputFile, `payload<<EOF\n${JSON.stringify(payload)}\nEOF\n`, 'utf8');
  }
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
