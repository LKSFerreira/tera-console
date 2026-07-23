import { Award, BookOpen, CalendarDays, Hammer, Settings, Shield, Swords, type LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import {
  B131_BattlePassTab,
  B131_CraftingTab,
  B131_DungeonsTab,
  B131_EventsTab,
  B131_GearTab,
  B131_SeasonTab,
  B131_SystemTab,
} from './tabs';

export type RegistroAbaPatch = {
  icon: LucideIcon;
  component: ComponentType;
};

/**
 * Único patch ainda em TSX legado: B131.01.
 * Demais builds usam DynamicPatchRenderer + content/patches.
 */
export const registroAbasLegadas: Record<string, Partial<Record<string, RegistroAbaPatch>>> = {
  'b131.01': {
    battlepass: { icon: Award, component: B131_BattlePassTab },
    season: { icon: BookOpen, component: B131_SeasonTab },
    dungeons: { icon: Swords, component: B131_DungeonsTab },
    gear: { icon: Shield, component: B131_GearTab },
    events: { icon: CalendarDays, component: B131_EventsTab },
    crafting: { icon: Hammer, component: B131_CraftingTab },
    system: { icon: Settings, component: B131_SystemTab },
  },
};
