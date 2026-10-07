import type { LucideIcon } from 'lucide-react';

interface SectionTitleProps {
  title: string;
  icon?: LucideIcon;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, icon: Icon }) => (
  <h2 className="mb-5 flex min-w-0 items-start gap-3 border-b border-slate-800 pb-2 text-xl font-bold text-slate-100 sm:mb-6 sm:text-2xl">
    {Icon && <Icon className="mt-0.5 h-5 w-5 shrink-0 text-amber-500 sm:h-6 sm:w-6" />}
    <span className="min-w-0 break-words">{title}</span>
  </h2>
);
