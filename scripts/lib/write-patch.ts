import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import type { ConteudoPatchLocalizado, MetadadosPatch, QualidadeParse } from '../../src/types/patchContent.ts';
import { ICONES_POR_ABA, LABELS_ABA_ES, LABELS_ABA_PT } from './section-map.ts';

export interface PayloadIngestao {
  patchId: string;
  meta: MetadadosPatch;
  locales: {
    'en-US': ConteudoPatchLocalizado;
    'pt-BR': ConteudoPatchLocalizado;
    'es-ES': ConteudoPatchLocalizado;
  };
}

export function derivarPatchId(buildLabel: string | undefined, newsId: number, titulo: string): string {
  const match = (buildLabel ?? titulo).match(/B(\d+)(?:\.(\d+))?/i);
  if (match) {
    const major = match[1];
    const minor = match[2] ?? '01';
    return `b${major}.${minor.padStart(2, '0')}`.toLowerCase();
  }
  return `news-${newsId}`;
}

/**
 * Por padrão grava em sources/raw-drafts (fora do glob do portal).
 * Só use pasta patches/ após curadoria humana no padrão B131.
 */
export function escreverPatchNoDisco(
  raizProjeto: string,
  payload: PayloadIngestao,
  options?: { destino?: 'raw-drafts' | 'patches' },
): string {
  const destino = options?.destino ?? 'raw-drafts';
  const pasta =
    destino === 'patches'
      ? resolve(raizProjeto, 'src/content/patches', payload.patchId)
      : resolve(raizProjeto, 'src/content/sources/raw-drafts', payload.patchId);

  mkdirSync(join(pasta, 'images'), { recursive: true });

  writeFileSync(join(pasta, 'meta.json'), JSON.stringify(payload.meta, null, 2) + '\n', 'utf8');
  writeFileSync(join(pasta, 'en-US.json'), JSON.stringify(payload.locales['en-US'], null, 2) + '\n', 'utf8');
  writeFileSync(join(pasta, 'pt-BR.json'), JSON.stringify(payload.locales['pt-BR'], null, 2) + '\n', 'utf8');
  writeFileSync(join(pasta, 'es-ES.json'), JSON.stringify(payload.locales['es-ES'], null, 2) + '\n', 'utf8');

  return pasta;
}

/**
 * Ingest bruta NÃO toca order/dataDrivenIds (portal).
 * Apenas anota em draftIds como lembrete opcional de rascunho em raw-drafts.
 */
export function atualizarIndicePatches(raizProjeto: string, patchId: string): void {
  const caminho = resolve(raizProjeto, 'src/content/patches/index.json');
  const indice = JSON.parse(readFileSync(caminho, 'utf8')) as {
    schemaVersion: number;
    order: string[];
    dataDrivenIds: string[];
    draftIds?: string[];
  };

  if (!indice.draftIds) {
    indice.draftIds = [];
  }

  // Garantia: nunca publicar via ingest
  indice.order = indice.order.filter((id) => id !== patchId);
  indice.dataDrivenIds = indice.dataDrivenIds.filter((id) => id !== patchId);

  if (!indice.draftIds.includes(patchId)) {
    indice.draftIds.unshift(patchId);
  }

  writeFileSync(caminho, JSON.stringify(indice, null, 2) + '\n', 'utf8');
}

export function registrarSeenNewsId(raizProjeto: string, newsId: number, quality: QualidadeParse): void {
  if (quality === 'failed') {
    return;
  }

  const caminho = resolve(raizProjeto, 'src/content/sources/seen-news-ids.json');
  mkdirSync(dirname(caminho), { recursive: true });

  let dados: { schemaVersion: number; ids: number[] } = { schemaVersion: 1, ids: [] };
  if (existsSync(caminho)) {
    dados = JSON.parse(readFileSync(caminho, 'utf8')) as typeof dados;
  }

  if (!dados.ids.includes(newsId)) {
    dados.ids.push(newsId);
    dados.ids.sort((a, b) => b - a);
  }

  writeFileSync(caminho, JSON.stringify(dados, null, 2) + '\n', 'utf8');
}

export function aplicarLabelsLocalizados(
  conteudoEn: ConteudoPatchLocalizado,
  locale: 'pt-BR' | 'es-ES',
): ConteudoPatchLocalizado {
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
    schemaVersion: 1,
    locale,
    tabs,
  };
}
