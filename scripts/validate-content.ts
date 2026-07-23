/**
 * Valida schemaVersion e estrutura mínima dos patches data-driven.
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(__dirname, '..');
const pastaPatches = resolve(raiz, 'src/content/patches');
const SCHEMA = 1;

let erros = 0;

function falhar(msg: string) {
  console.error(`[validate] ERRO: ${msg}`);
  erros += 1;
}

function validarLocale(caminho: string, patchId: string) {
  const dados = JSON.parse(readFileSync(caminho, 'utf8')) as {
    schemaVersion?: number;
    locale?: string;
    tabs?: Record<string, { label?: string; blocks?: unknown[] }>;
  };

  if (dados.schemaVersion !== SCHEMA) {
    falhar(`${patchId}: schemaVersion inválido em ${caminho}`);
  }
  if (!dados.tabs || Object.keys(dados.tabs).length === 0) {
    falhar(`${patchId}: tabs vazio em ${caminho}`);
  }
  for (const [tabId, aba] of Object.entries(dados.tabs ?? {})) {
    if (!aba.label) falhar(`${patchId}: tab ${tabId} sem label`);
    if (!Array.isArray(aba.blocks)) falhar(`${patchId}: tab ${tabId} sem blocks`);
  }
}

function main() {
  const indicePath = join(pastaPatches, 'index.json');
  if (!existsSync(indicePath)) {
    falhar('index.json ausente');
    process.exit(1);
  }

  const indice = JSON.parse(readFileSync(indicePath, 'utf8')) as {
    schemaVersion: number;
    order: string[];
    dataDrivenIds: string[];
  };

  if (indice.schemaVersion !== SCHEMA) {
    falhar('index.json schemaVersion inválido');
  }

  for (const patchId of indice.dataDrivenIds) {
    const pasta = join(pastaPatches, patchId);
    if (!existsSync(pasta)) {
      falhar(`pasta ausente para dataDrivenId=${patchId}`);
      continue;
    }

    const metaPath = join(pasta, 'meta.json');
    if (!existsSync(metaPath)) {
      falhar(`${patchId}: meta.json ausente`);
      continue;
    }

    const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as {
      schemaVersion?: number;
      id?: string;
      tabs?: Array<{ id: string }>;
    };

    if (meta.schemaVersion !== SCHEMA) falhar(`${patchId}: meta schemaVersion inválido`);
    if (meta.id !== patchId) falhar(`${patchId}: meta.id diverge do nome da pasta`);
    if (!meta.tabs?.length) falhar(`${patchId}: meta.tabs vazio`);

    for (const locale of ['pt-BR', 'en-US', 'es-ES']) {
      const localePath = join(pasta, `${locale}.json`);
      if (!existsSync(localePath)) {
        falhar(`${patchId}: ${locale}.json ausente`);
      } else {
        validarLocale(localePath, patchId);
      }
    }
  }

  // pastas órfãs (info)
  for (const entrada of readdirSync(pastaPatches, { withFileTypes: true })) {
    if (!entrada.isDirectory()) continue;
    if (!indice.dataDrivenIds.includes(entrada.name) && !indice.order.includes(entrada.name)) {
      console.warn(`[validate] aviso: pasta ${entrada.name} fora do index`);
    }
  }

  if (erros > 0) {
    console.error(`[validate] falhou com ${erros} erro(s)`);
    process.exit(1);
  }

  console.log('[validate] OK');
}

main();
