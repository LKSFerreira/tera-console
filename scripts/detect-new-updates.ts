/**
 * Lista UPDATES oficiais ainda não vistos em seen-news-ids.json
 *
 * Flags:
 *   --json            imprime { count, ids, items } em uma linha
 *   --github-output   grava count/ids no $GITHUB_OUTPUT (Actions)
 */
import { appendFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { itemEhUpdate, listarNewsOficiais } from './lib/api-oficial.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(__dirname, '..');

function temFlag(nome: string): boolean {
  return process.argv.includes(nome);
}

async function main() {
  const caminhoSeen = resolve(raiz, 'src/content/sources/seen-news-ids.json');
  let idsVistos: number[] = [];
  if (existsSync(caminhoSeen)) {
    const dados = JSON.parse(readFileSync(caminhoSeen, 'utf8')) as { ids: number[] };
    idsVistos = dados.ids ?? [];
  }

  const lista = await listarNewsOficiais(1, 30);
  const updates = (lista.content ?? []).filter(itemEhUpdate);
  const novos = updates.filter((item) => !idsVistos.includes(item.id));

  const payload = {
    count: novos.length,
    ids: novos.map((item) => item.id),
    items: novos.map((item) => ({
      id: item.id,
      title: item.title,
      url: `https://tera-console.com/news/${item.id}`,
    })),
  };

  if (temFlag('--json')) {
    process.stdout.write(`${JSON.stringify(payload)}\n`);
  } else {
    console.log(`[detect] updates na página 1: ${updates.length}`);
    console.log(`[detect] novos: ${novos.length}`);
    for (const item of payload.items) {
      console.log(`- ${item.id} | ${item.title} | ${item.url}`);
    }
  }

  if (temFlag('--github-output')) {
    const outputFile = process.env.GITHUB_OUTPUT;
    if (!outputFile) {
      throw new Error('--github-output exige variável GITHUB_OUTPUT (Actions)');
    }
    appendFileSync(outputFile, `count=${payload.count}\n`, 'utf8');
    // ids como CSV para loop fácil no bash
    appendFileSync(outputFile, `ids=${payload.ids.join(',')}\n`, 'utf8');
    appendFileSync(outputFile, `payload<<EOF\n${JSON.stringify(payload)}\nEOF\n`, 'utf8');
  }
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
