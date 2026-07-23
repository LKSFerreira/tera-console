/**
 * Localiza um patch data-driven a partir do en-US.json
 *
 * Uso:
 *   npx tsx scripts/content-localize.ts --path src/content/patches/b130.03
 *   npx tsx scripts/content-localize.ts --path src/content/sources/archive/b133.02
 *   npx tsx scripts/content-localize.ts --path src/content/sources/raw-drafts/b133.02 --force
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ConteudoPatchLocalizado, MetadadosPatch } from '../src/types/patchContent.ts';
import {
  detectarProvedorTraducao,
  localizarConteudoPatch,
  type LocaleAlvo,
  type ProvedorTraducao,
} from './lib/localize-content.ts';
import { carregarEnv } from './lib/load-env.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(__dirname, '..');
carregarEnv(raiz);

function lerArg(nome: string): string | undefined {
  const i = process.argv.indexOf(nome);
  if (i === -1) return undefined;
  return process.argv[i + 1];
}

async function main() {
  const pathRel = lerArg('--path');
  if (!pathRel) {
    console.error('Informe --path <pasta do patch com en-US.json>');
    process.exit(1);
  }

  const pasta = resolve(raiz, pathRel);
  const enPath = join(pasta, 'en-US.json');
  if (!existsSync(enPath)) {
    console.error(`Não encontrado: ${enPath}`);
    process.exit(1);
  }

  const force = process.argv.includes('--force');
  const allowMyMemory = process.argv.includes('--translate') || process.argv.includes('--mymemory');
  const provedor: ProvedorTraducao = detectarProvedorTraducao({ allowMyMemory });
  console.log(`[localize] provedor=${provedor}`);
  if (provedor === 'none') {
    console.log(
      '[localize] sem API key - só labels. Use DEEPL_AUTH_KEY / OPENAI_API_KEY / XAI_API_KEY ou --translate (MyMemory).',
    );
  }

  const conteudoEn = JSON.parse(readFileSync(enPath, 'utf8')) as ConteudoPatchLocalizado;

  for (const locale of ['pt-BR', 'es-ES'] as LocaleAlvo[]) {
    const outPath = join(pasta, `${locale}.json`);
    if (existsSync(outPath) && !force) {
      const existente = JSON.parse(readFileSync(outPath, 'utf8')) as ConteudoPatchLocalizado;
      // Heurística: se já parece traduzido (amostra), pular salvo --force
      const amostra = JSON.stringify(existente.tabs).slice(0, 800);
      const pareceEn =
        /\b(the|and|with|from|have|been|fixed|issue|update|dungeon|class)\b/i.test(amostra) &&
        !/\b(foi|será|corrigido|atualização|recompensa|dungeons)\b/i.test(amostra);
      if (!pareceEn) {
        console.log(`[localize] ${locale}: já parece localizado (use --force para refazer)`);
        continue;
      }
    }

    console.log(`[localize] ${locale}...`);
    const resultado = await localizarConteudoPatch(conteudoEn, locale, raiz, provedor);
    writeFileSync(outPath, `${JSON.stringify(resultado.conteudo, null, 2)}\n`, 'utf8');
    console.log(
      `[localize] ${locale}: ok via ${resultado.provedor} (${resultado.stringsTraduzidas} strings)`,
    );
    for (const aviso of resultado.warnings.slice(0, 5)) {
      console.log(`[localize] warning: ${aviso}`);
    }
  }

  // Atualiza display do meta se existir (só datas já localizadas costumam estar ok)
  const metaPath = join(pasta, 'meta.json');
  if (existsSync(metaPath)) {
    const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as MetadadosPatch;
    if (meta.parse) {
      meta.parse.warnings = [
        ...(meta.parse.warnings ?? []).filter((aviso) => !aviso.startsWith('Tradução via')),
        `Localizado em ${new Date().toISOString()} via content:localize`,
      ];
      writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
    }
  }

  console.log('[localize] concluído - revise antes de status published');
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
