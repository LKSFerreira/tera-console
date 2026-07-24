import indiceBruto from '../content/patches/index.json';
import { conteudoSitePorIdioma } from './siteContent';
import type {
  ConteudoPatchLocalizado,
  IndicePatches,
  MetadadosPatch,
  PatchDataDriven,
} from '../types/patchContent';
import { VERSAO_SCHEMA_PATCH } from '../types/patchContent';
import type { IdiomaSuportado, MetadadosPatchLocalizados } from '../types/idioma';

const indicePatches = indiceBruto as IndicePatches;

/**
 * Descobre automaticamente pastas em src/content/patches (meta.json por pasta).
 * Novo patch data-driven = pasta + entrada em index.json (sem editar App.tsx).
 */
const metasGlob = import.meta.glob('../content/patches/*/meta.json', {
  eager: true,
  import: 'default',
}) as Record<string, MetadadosPatch>;

const localesGlob = import.meta.glob('../content/patches/*/*.json', {
  eager: true,
  import: 'default',
}) as Record<string, ConteudoPatchLocalizado>;

function extrairIdPatchDoCaminhoMeta(caminho: string): string | null {
  const correspondencia = caminho.match(/content\/patches\/([^/]+)\/meta\.json$/);
  return correspondencia?.[1] ?? null;
}

function montarRegistroPatchesDataDriven(): Record<string, PatchDataDriven> {
  const registro: Record<string, PatchDataDriven> = {};

  for (const [caminho, meta] of Object.entries(metasGlob)) {
    const patchId = extrairIdPatchDoCaminhoMeta(caminho);

    if (!patchId) {
      continue;
    }

    if (!indicePatches.dataDrivenIds.includes(patchId)) {
      continue;
    }

    const prefixo = `../content/patches/${patchId}/`;
    const locales: Record<string, ConteudoPatchLocalizado> = {};

    for (const idioma of ['pt-BR', 'en-US', 'es-ES'] as const) {
      const conteudoLocale = localesGlob[`${prefixo}${idioma}.json`];
      if (conteudoLocale) {
        locales[idioma] = conteudoLocale;
      }
    }

    registro[patchId] = {
      meta,
      locales,
    };
  }

  return registro;
}

const registroPatchesDataDriven = montarRegistroPatchesDataDriven();

export function obterIndicePatches(): IndicePatches {
  return indicePatches;
}

/**
 * Ordem da sidebar - fonte: `content/patches/index.json`.
 * Patches data-driven só entram se `meta.status === 'published'`
 * (rascunhos de ingest automática NÃO poluem o portal).
 */
export function listarOrdemPatches(): string[] {
  return indicePatches.order.filter((patchId) => {
    if (!indicePatches.dataDrivenIds.includes(patchId)) {
      // legado (ex.: b131.01 via siteContent)
      return true;
    }

    const patch = registroPatchesDataDriven[patchId];
    if (!patch) {
      return false;
    }

    return patch.meta.status === 'published';
  });
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

/**
 * Metadados da sidebar/abas: data-driven via meta+locale, legado via siteContent.
 */
export function obterMetadadosPatchLocalizados(
  patchId: string,
  idioma: IdiomaSuportado,
): MetadadosPatchLocalizados | null {
  if (patchEhDataDriven(patchId)) {
    const patch = obterPatchDataDriven(patchId);
    const conteudo = obterConteudoLocalizadoPatch(patchId, idioma);

    if (!patch) {
      return null;
    }

    const exibicao = patch.meta.display[idioma] ?? patch.meta.display['en-US'] ?? {
      name: patch.meta.buildLabel,
      date: patch.meta.publishedAt ?? '',
      parts: '',
    };

    return {
      buildLabel: patch.meta.buildLabel,
      name: exibicao.name,
      date: exibicao.date,
      parts: exibicao.parts,
      tabs: patch.meta.tabs.map((aba) => ({
        id: aba.id,
        label: conteudo?.tabs[aba.id]?.label ?? aba.id,
      })),
    };
  }

  const legado = conteudoSitePorIdioma[idioma].patches[patchId];
  if (!legado) {
    return null;
  }

  return {
    ...legado,
    buildLabel: legado.buildLabel ?? patchId.toUpperCase(),
  };
}

export function listarIdsPatchesDataDriven(): string[] {
  return [...indicePatches.dataDrivenIds];
}
