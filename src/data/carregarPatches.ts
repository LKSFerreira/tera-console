import indiceBruto from '../content/patches/index.json';
import metaB13003 from '../content/patches/b130.03/meta.json';
import conteudoB13003En from '../content/patches/b130.03/en-US.json';
import conteudoB13003Es from '../content/patches/b130.03/es-ES.json';
import conteudoB13003Pt from '../content/patches/b130.03/pt-BR.json';
import type {
  ConteudoPatchLocalizado,
  IndicePatches,
  MetadadosPatch,
  PatchDataDriven,
} from '../types/patchContent';
import { VERSAO_SCHEMA_PATCH } from '../types/patchContent';
import type { IdiomaSuportado } from '../types/idioma';

const indicePatches = indiceBruto as IndicePatches;

const registroPatchesDataDriven: Record<string, PatchDataDriven> = {
  'b130.03': {
    meta: metaB13003 as MetadadosPatch,
    locales: {
      'pt-BR': conteudoB13003Pt as ConteudoPatchLocalizado,
      'en-US': conteudoB13003En as ConteudoPatchLocalizado,
      'es-ES': conteudoB13003Es as ConteudoPatchLocalizado,
    },
  },
};

export function obterIndicePatches(): IndicePatches {
  return indicePatches;
}

export function patchEhDataDriven(patchId: string): boolean {
  return indicePatches.dataDrivenIds.includes(patchId) && patchId in registroPatchesDataDriven;
}

export function obterPatchDataDriven(patchId: string): PatchDataDriven | null {
  if (!patchEhDataDriven(patchId)) {
    return null;
  }

  return registroPatchesDataDriven[patchId] ?? null;
}

export function obterConteudoLocalizadoPatch(
  patchId: string,
  idioma: IdiomaSuportado,
): ConteudoPatchLocalizado | null {
  const patch = obterPatchDataDriven(patchId);

  if (!patch) {
    return null;
  }

  const conteudoIdioma = patch.locales[idioma] ?? patch.locales['en-US'] ?? null;

  if (!conteudoIdioma) {
    return null;
  }

  if (conteudoIdioma.schemaVersion > VERSAO_SCHEMA_PATCH || patch.meta.schemaVersion > VERSAO_SCHEMA_PATCH) {
    console.error(
      `Schema do patch ${patchId} (v${conteudoIdioma.schemaVersion}) é maior que o suportado (v${VERSAO_SCHEMA_PATCH}).`,
    );
    return null;
  }

  return conteudoIdioma;
}

export function listarIdsPatchesDataDriven(): string[] {
  return [...indicePatches.dataDrivenIds];
}
