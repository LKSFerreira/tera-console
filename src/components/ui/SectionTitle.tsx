import type { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  icon?: LucideIcon;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon: Icon }) => (
  <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-6 pb-2 border-b border-slate-800">
    {Icon && <Icon className="text-amber-500 w-6 h-6" />}
    {title}
  </h2>
);
