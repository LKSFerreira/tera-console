import {
  AlertTriangle,
  Award,
  BookOpen,
  CalendarDays,
  Hammer,
  MessageSquare,
  Settings,
  Shield,
  Sparkles,
  Swords,
  UserCog,
  type LucideIcon,
} from 'lucide-react';

const mapaIcones: Record<string, LucideIcon> = {
  'alert-triangle': AlertTriangle,
  award: Award,
  book: BookOpen,
  calendar: CalendarDays,
  hammer: Hammer,
  'message-square': MessageSquare,
  settings: Settings,
  shield: Shield,
  sparkles: Sparkles,
  swords: Swords,
  'user-cog': UserCog,
};

export function obterIconePorChave(chave?: string): LucideIcon | undefined {
  if (!chave) {
    return undefined;
  }

  return mapaIcones[chave];
}
