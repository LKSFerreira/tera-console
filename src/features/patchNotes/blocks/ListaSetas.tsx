import { ChevronRight } from 'lucide-react';

interface ListaSetasProps {
  itens: string[];
}

export const ListaSetas = ({ itens }: ListaSetasProps) => (
  <ul className="space-y-3 text-sm text-slate-300">
    {itens.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);
