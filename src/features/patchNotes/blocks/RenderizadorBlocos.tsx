import { createElement } from 'react';
import { AlertTriangle, type LucideIcon } from 'lucide-react';
import { Card, SectionTitle } from '../../../components/ui';
import type { BlocoConteudo, TomBordaCard } from '../../../types/patchContent';
import { obterIconePorChave } from '../mapaIcones';
import { FiguraPatch } from './FiguraPatch';
import { ListaSetas } from './ListaSetas';
import { NotaDesenvolvedor } from './NotaDesenvolvedor';

interface RenderizadorBlocosProps {
  blocos: BlocoConteudo[];
}

function renderizarIcone(
  chave: string | undefined,
  className = 'h-5 w-5',
  fallback?: LucideIcon,
) {
  const Icone = obterIconePorChave(chave) ?? fallback;

  if (!Icone) {
    return null;
  }

  return createElement(Icone, { className });
}

function classeBordaCard(borda?: TomBordaCard): string {
  switch (borda) {
    case 'amber':
      return 'border-amber-500/30';
    case 'sky':
      return 'border-sky-500/30';
    case 'red':
      return 'border-red-900/30 bg-red-950/10';
    case 'amber-top':
      return 'border-t-4 border-t-amber-500';
    case 'sky-left':
      return 'border-l-4 border-l-sky-500 bg-slate-800/30';
    case 'amber-left':
      return 'border-l-4 border-l-amber-500 bg-slate-800/30';
    case 'red-soft':
      return 'border-red-900/30 bg-red-950/10';
    default:
      return '';
  }
}

function classeTomTitulo(tom?: 'amber' | 'sky' | 'red' | 'slate'): string {
  switch (tom) {
    case 'amber':
      return 'text-amber-400';
    case 'sky':
      return 'text-sky-400';
    case 'red':
      return 'text-red-400';
    default:
      return 'text-slate-100';
  }
}

function classeCallout(tom?: string): string {
  switch (tom) {
    case 'danger':
      return 'border-red-500/20 bg-red-500/10 text-red-100/90';
    case 'warning':
      return 'border-amber-500/20 bg-amber-500/10 text-amber-100/90';
    case 'info':
      return 'border-sky-500/20 bg-sky-500/10 text-sky-100/90';
    case 'success':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100/90';
    default:
      return 'border-amber-500/20 bg-amber-500/10 text-amber-100/90';
  }
}

function RenderizarBloco({ bloco, indice }: { bloco: BlocoConteudo; indice: number }) {
  switch (bloco.type) {
    case 'sectionTitle': {
      const Icone = obterIconePorChave(bloco.icon);
      return <SectionTitle key={`section-${indice}`} title={bloco.title} icon={Icone} />;
    }

    case 'paragraphs':
      return (
        <div key={`paragraphs-${indice}`} className="space-y-3 text-sm text-slate-300">
          {bloco.items.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      );

    case 'bulletList':
      return <ListaSetas key={`bullets-${indice}`} itens={bloco.items} />;

    case 'callout':
      return (
        <div
          key={`callout-${indice}`}
          className={`rounded-lg border p-4 text-sm ${classeCallout(bloco.tone)}`}
        >
          {bloco.text}
        </div>
      );

    case 'keyValueList':
      return (
        <ul key={`kv-${indice}`} className="space-y-3 text-slate-300">
          {bloco.rows.map((linha) => (
            <li key={`${linha.label}-${linha.value}`} className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">{linha.label}</span>
              <span>{linha.value}</span>
            </li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <div key={`table-${indice}`} className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead
              className={
                bloco.headerTone === 'amber'
                  ? 'bg-slate-800 text-xs uppercase text-slate-300'
                  : 'bg-slate-800/50 text-xs uppercase text-slate-400'
              }
            >
              <tr>
                {bloco.columns.map((coluna, indiceColuna) => (
                  <th
                    key={coluna}
                    className={`px-4 py-3 ${indiceColuna < bloco.columns.length - 1 ? 'border-r border-slate-700' : ''}`}
                  >
                    {coluna}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {bloco.rows.map((linha) => (
                <tr key={linha.join('|')} className="transition-colors hover:bg-slate-800/40">
                  {linha.map((celula, indiceCelula) => (
                    <td
                      key={`${celula}-${indiceCelula}`}
                      className={`px-4 py-3 text-slate-300 ${indiceCelula < linha.length - 1 ? 'border-r border-slate-800/60' : ''}`}
                    >
                      {celula}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'figure':
      return (
        <FiguraPatch
          key={`figure-${indice}-${bloco.src}`}
          src={bloco.src}
          alt={bloco.alt}
          caption={bloco.caption}
          className={bloco.className}
        />
      );

    case 'devNote':
      return (
        <NotaDesenvolvedor
          key={`devnote-${indice}`}
          titulo={bloco.title}
          paragrafos={bloco.paragraphs}
          tone={bloco.tone}
        />
      );

    case 'card':
      return (
        <Card key={`card-${indice}`} className={classeBordaCard(bloco.border)}>
          {bloco.title ? (
            <h3 className={`mb-4 flex items-center gap-2 text-lg font-semibold ${classeTomTitulo(bloco.titleTone)}`}>
              {renderizarIcone(bloco.icon)}
              {bloco.title}
            </h3>
          ) : null}
          <RenderizadorBlocos blocos={bloco.blocks} />
        </Card>
      );

    case 'cardGrid':
      return (
        <div
          key={`grid-${indice}`}
          className={`grid gap-6 ${bloco.columns === 1 ? 'grid-cols-1' : 'md:grid-cols-2'}`}
        >
          {bloco.cards.map((cartao, indiceCartao) => (
            <Card key={`grid-card-${indice}-${indiceCartao}`}>
              {cartao.title ? (
                <h3 className={`mb-4 text-lg font-semibold ${classeTomTitulo(cartao.titleTone)}`}>{cartao.title}</h3>
              ) : null}
              <RenderizadorBlocos blocos={cartao.blocks} />
            </Card>
          ))}
        </div>
      );

    case 'subsection':
      return (
        <div key={`sub-${indice}`} className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-100">{bloco.title}</h3>
            {bloco.badge ? (
              <span className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400">
                {bloco.badge}
              </span>
            ) : null}
          </div>
          <RenderizadorBlocos blocos={bloco.blocks} />
        </div>
      );

    case 'issueList':
      return (
        <Card key={`issues-${indice}`} className="border-red-900/30 bg-red-950/10">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
            {renderizarIcone(bloco.icon, 'h-5 w-5', AlertTriangle)} {bloco.title}
          </h3>
          <ul className="space-y-4 text-sm text-slate-300">
            {bloco.items.map((issue) => (
              <li key={issue.main} className="border-b border-slate-800/60 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                  <span>{issue.main}</span>
                </div>
                {issue.notes ? (
                  <div className="pl-6 pt-2 text-slate-400 italic">
                    {issue.notes.map((nota) => (
                      <p key={nota}>• {nota}</p>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </Card>
      );

    default:
      return null;
  }
}

export const RenderizadorBlocos = ({ blocos }: RenderizadorBlocosProps) => (
  <>
    {blocos.map((bloco, indice) => (
      <RenderizarBloco key={`${bloco.type}-${indice}`} bloco={bloco} indice={indice} />
    ))}
  </>
);
