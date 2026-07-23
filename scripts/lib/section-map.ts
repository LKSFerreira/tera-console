import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export interface RegraSectionMap {
  tab: string;
  priority: number;
  match: { any: string[] };
}

export interface SectionMapConfig {
  schemaVersion: number;
  defaultTab: string;
  rules: RegraSectionMap[];
  normalize?: {
    caseInsensitive?: boolean;
    stripHtml?: boolean;
  };
}

export function carregarSectionMap(raizProjeto: string): SectionMapConfig {
  const caminho = resolve(raizProjeto, 'src/content/section-map.json');
  return JSON.parse(readFileSync(caminho, 'utf8')) as SectionMapConfig;
}

export function normalizarHeading(texto: string, caseInsensitive = true): string {
  let valor = texto.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (caseInsensitive) {
    valor = valor.toLowerCase();
  }
  return valor;
}

export function mapearHeadingParaAba(
  heading: string,
  config: SectionMapConfig,
): { tab: string; matched: boolean } {
  const headingNormalizado = normalizarHeading(heading, config.normalize?.caseInsensitive !== false);
  const regras = [...config.rules].sort((a, b) => a.priority - b.priority);

  for (const regra of regras) {
    for (const termo of regra.match.any) {
      const termoNormalizado = config.normalize?.caseInsensitive !== false ? termo.toLowerCase() : termo;
      if (headingNormalizado.includes(termoNormalizado)) {
        return { tab: regra.tab, matched: true };
      }
    }
  }

  return { tab: config.defaultTab, matched: false };
}

export const ICONES_POR_ABA: Record<string, string> = {
  highlights: 'sparkles',
  battlepass: 'award',
  season: 'book',
  dungeons: 'swords',
  classes: 'user-cog',
  events: 'calendar',
  gear: 'shield',
  crafting: 'hammer',
  bugs: 'alert-triangle',
  system: 'settings',
  rewards: 'award',
};

export const LABELS_ABA_EN: Record<string, string> = {
  highlights: 'Highlights',
  battlepass: 'Battle Pass',
  season: 'Season',
  dungeons: 'Dungeons',
  classes: 'Classes',
  events: 'Events',
  gear: 'Gear',
  crafting: 'Items & Crafting',
  bugs: 'Bug Fixes',
  system: 'System',
  rewards: 'Rewards',
};

export const LABELS_ABA_PT: Record<string, string> = {
  highlights: 'Destaques',
  battlepass: 'Battle Pass',
  season: 'Temporada',
  dungeons: 'Dungeons',
  classes: 'Classes',
  events: 'Eventos',
  gear: 'Equipamentos',
  crafting: 'Itens & Craft',
  bugs: 'Correção de Bugs',
  system: 'Sistema',
  rewards: 'Recompensas',
};

export const LABELS_ABA_ES: Record<string, string> = {
  highlights: 'Destacados',
  battlepass: 'Battle Pass',
  season: 'Temporada',
  dungeons: 'Dungeons',
  classes: 'Classes',
  events: 'Eventos',
  gear: 'Equipamiento',
  crafting: 'Ítems & Craft',
  bugs: 'Corrección de Bugs',
  system: 'Sistema',
  rewards: 'Recompensas',
};
