/**
 * Lista UPDATES oficiais ainda não vistos em seen-news-ids.json
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { itemEhUpdate, listarNewsOficiais } from './lib/api-oficial.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(__dirname, '..');

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

  console.log(`[detect] updates na página 1: ${updates.length}`);
  console.log(`[detect] novos: ${novos.length}`);
  for (const item of novos) {
    console.log(`- ${item.id} | ${item.title} | https://tera-console.com/news/${item.id}`);
  }

  if (novos.length === 0) {
    process.exit(0);
  }
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
