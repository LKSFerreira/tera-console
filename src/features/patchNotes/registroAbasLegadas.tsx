import { AlertTriangle, Award, BookOpen, CalendarDays, Hammer, Settings, Shield, Swords, UserCog, type LucideIcon } from 'lucide-react';
import type { ComponentType } from 'react';
import {
  B130_01_BattlePassTab,
  B130_01_ClassesTab,
  B130_01_CraftingItemsTab,
  B130_01_DungeonsTab,
  B130_01_SystemTab,
  B130_02_ClassesTab,
  B130_02_RewardsTab,
  B130_02_SystemTab,
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
 * Abas ainda montadas em TSX legado.
 * Patches data-driven NÃO entram aqui — usam DynamicPatchRenderer + meta.tabs.
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
  'b130.02': {
    rewards: { icon: Award, component: B130_02_RewardsTab },
    classes: { icon: UserCog, component: B130_02_ClassesTab },
    system: { icon: AlertTriangle, component: B130_02_SystemTab },
  },
  'b130.01': {
    battlepass: { icon: Award, component: B130_01_BattlePassTab },
    dungeons: { icon: Swords, component: B130_01_DungeonsTab },
    crafting: { icon: Hammer, component: B130_01_CraftingItemsTab },
    classes: { icon: UserCog, component: B130_01_ClassesTab },
    system: { icon: Settings, component: B130_01_SystemTab },
  },
};
