import { MessageSquare } from 'lucide-react';
import { Card } from '../../../components/ui';

interface NotaDesenvolvedorProps {
  titulo: string;
  paragrafos: string[];
  tone?: 'amber' | 'sky';
}

export const NotaDesenvolvedor = ({ titulo, paragrafos, tone = 'amber' }: NotaDesenvolvedorProps) => {
  const classeBorda = tone === 'sky' ? 'border-l-sky-500' : 'border-l-amber-500';
  const classeTitulo = tone === 'sky' ? 'text-sky-400' : 'text-amber-400';

  return (
    <Card className={`border-l-4 ${classeBorda} bg-slate-800/30`}>
      <h3 className={`mb-4 flex min-w-0 items-start gap-2 break-words text-lg font-semibold ${classeTitulo}`}>
        <MessageSquare className="mt-0.5 h-5 w-5 shrink-0" />
        <span className="min-w-0">{titulo}</span>
      </h3>
      <div className="space-y-4 text-sm italic leading-relaxed text-slate-300">
        {paragrafos.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
      </div>
    </Card>
  );
};
