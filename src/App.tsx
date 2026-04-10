import { useState, type ComponentType } from 'react';
import { AlertTriangle, Award, BookOpen, CalendarDays, Hammer, History, RotateCcw, Settings, Shield, Swords, UserCog, type LucideIcon } from 'lucide-react';

import { SeletorIdioma } from './components/ui';
import { conteudoSitePorIdioma } from './data/siteContent';
import { useIdioma } from './i18n/useIdioma';
import type { AbaPatchId, PatchId } from './types/idioma';
import {
  B130_01_BattlePassTab,
  B130_01_ClassesTab,
  B130_01_CraftingItemsTab,
  B130_01_DungeonsTab,
  B130_01_SystemTab,
  B130_02_ClassesTab,
  B130_02_RewardsTab,
  B130_02_SystemTab,
  B130_03_BugFixesTab,
  B131_BattlePassTab,
  B131_CraftingTab,
  B131_DungeonsTab,
  B131_EventsTab,
  B131_GearTab,
  B131_SeasonTab,
  B131_SystemTab,
} from './features/patchNotes/tabs';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

type RegistroAbaPatch = {
  icon: LucideIcon;
  component: ComponentType;
};

const registroComponentes: Record<PatchId, Partial<Record<AbaPatchId, RegistroAbaPatch>>> = {
  'b131.01': {
    battlepass: { icon: Award, component: B131_BattlePassTab },
    season: { icon: BookOpen, component: B131_SeasonTab },
    dungeons: { icon: Swords, component: B131_DungeonsTab },
    gear: { icon: Shield, component: B131_GearTab },
    events: { icon: CalendarDays, component: B131_EventsTab },
    crafting: { icon: Hammer, component: B131_CraftingTab },
    system: { icon: Settings, component: B131_SystemTab },
  },
  'b130.03': {
    bugs: { icon: AlertTriangle, component: B130_03_BugFixesTab },
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

const ordemPatches: PatchId[] = ['b131.01', 'b130.03', 'b130.02', 'b130.01'];

export default function App() {
  const { idioma, definirIdioma } = useIdioma();
  const conteudoSite = conteudoSitePorIdioma[idioma];
  const [patchAtivoId, setPatchAtivoId] = useState<PatchId>(ordemPatches[0]);
  const [abaAtivaId, setAbaAtivaId] = useState<AbaPatchId>(conteudoSite.patches[ordemPatches[0]].tabs[0].id);

  const patchAtivo = conteudoSite.patches[patchAtivoId];
  const registroAbasAtivas = registroComponentes[patchAtivoId];
  const abasPatchAtivo = patchAtivo.tabs.map((aba) => ({
    ...aba,
    ...(registroAbasAtivas[aba.id] as RegistroAbaPatch),
  }));
  const ComponenteAbaAtiva = abasPatchAtivo.find((aba) => aba.id === abaAtivaId)?.component || abasPatchAtivo[0].component;

  return (
    <div className="min-h-screen bg-[#090e17] font-sans text-slate-200 selection:bg-amber-500/30 flex flex-col">
      <div className="relative shrink-0 overflow-hidden border-b border-slate-800/80 bg-slate-950">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 rounded-[100%] bg-amber-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute left-1/4 top-0 h-[200px] w-[400px] rounded-[100%] bg-sky-500/10 blur-[80px]" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 pb-6 pt-12 lg:flex-row lg:items-end">
          <div className="flex flex-col items-center space-y-4 text-center lg:items-start lg:text-left">
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/80 px-4 py-1.5 text-sm font-medium tracking-wide text-slate-300 shadow-inner shadow-black/50 backdrop-blur-sm">
              <BookOpen className="h-4 w-4 text-sky-400" />
              {conteudoSite.shell.portalBadge}
            </div>
            <h1 className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-5xl font-black uppercase tracking-tight text-transparent drop-shadow-sm md:text-6xl">
              TERA Console
            </h1>
            <p className="flex flex-wrap items-center justify-center gap-3 text-2xl font-light tracking-wide text-sky-200/80 lg:justify-start">
              {patchAtivoId.toUpperCase()} - {patchAtivo.name}
              <span className="ml-1 rounded border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-base font-bold text-amber-500 shadow-sm">
                {patchAtivo.date}
              </span>
            </p>
          </div>

          <div className="flex w-full max-w-[520px] flex-col gap-4 rounded-xl border border-b-2 border-slate-700/50 border-b-amber-500 bg-slate-900/60 p-5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-slate-800/80 lg:w-auto lg:min-w-[420px]">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 p-[1px] shadow-md shadow-amber-500/20">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-[#090e17]">
                    <UserCog className="h-6 w-6 text-amber-400" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500/90">{conteudoSite.shell.maintainedBy}</span>
                  <span className="bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-xl font-black leading-tight text-transparent md:text-2xl">
                    Lucas Ferreira
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/LKSFerreira"
                  target="_blank"
                  title={conteudoSite.shell.githubTitle}
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-slate-700 bg-[#090e17] p-3 text-slate-400 transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/lucas-ferreira-developer/"
                  target="_blank"
                  title={conteudoSite.shell.linkedinTitle}
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-slate-700 bg-[#090e17] p-3 text-slate-400 transition-all duration-300 hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="border-t border-slate-700/60 pt-4">
              <SeletorIdioma idiomaAtivo={idioma} onChange={definirIdioma} rotulos={conteudoSite.seletorIdioma} />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 pb-8 pt-6 lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col lg:w-max">
          <div className="sticky top-8">
            <h3 className="mb-4 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <History className="h-4 w-4" /> {conteudoSite.shell.updatesTitle}
            </h3>

            <div className="flex snap-x gap-3 overflow-x-auto pb-4 lg:flex-col lg:overflow-visible lg:pb-0">
              {ordemPatches.map((patchId) => {
                const patchMetadados = conteudoSite.patches[patchId];
                const patchEstaAtivo = patchAtivoId === patchId;

                return (
                  <button
                    key={patchId}
                    onClick={() => {
                      setPatchAtivoId(patchId);
                      setAbaAtivaId(patchMetadados.tabs[0].id);
                    }}
                    className={`min-w-[240px] snap-start whitespace-nowrap rounded-xl border px-4 py-4 text-left transition-all lg:min-w-0 ${
                      patchEstaAtivo
                        ? 'border-amber-500/40 bg-amber-500/10 shadow-lg shadow-amber-500/5'
                        : 'border-slate-800/60 bg-slate-900/40 hover:border-slate-700/80 hover:bg-slate-800'
                    }`}
                  >
                    <div className="mb-1 flex items-start justify-between">
                      <span className={`text-lg font-black ${patchEstaAtivo ? 'text-amber-400' : 'text-slate-300'}`}>{patchId.toUpperCase()}</span>
                      {patchEstaAtivo ? <div className="mt-2 h-2 w-2 animate-pulse rounded-full bg-amber-400" /> : null}
                    </div>
                    <span className={`mb-1 text-sm font-medium ${patchEstaAtivo ? 'text-amber-200/80' : 'text-slate-400'}`}>{patchMetadados.name}</span>
                    <span className="mt-auto block border-t border-slate-800/50 pt-2 text-xs text-slate-500">
                      {patchMetadados.date} {patchMetadados.parts}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="scrollbar-none mb-8 flex gap-2 overflow-x-auto border-b border-slate-800/80 pb-4">
            {abasPatchAtivo.map((aba) => {
              const IconeTab = aba.icon!;
              const abaEstaAtiva = abaAtivaId === aba.id;

              return (
                <button
                  key={aba.id}
                  onClick={() => setAbaAtivaId(aba.id)}
                  className={`shrink-0 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    abaEstaAtiva
                      ? 'border border-sky-500/30 bg-sky-500/10 text-sky-400 shadow-md shadow-sky-500/5'
                      : 'border border-transparent bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <IconeTab className={`h-4 w-4 ${abaEstaAtiva ? 'text-sky-400' : 'text-slate-500'}`} />
                  {aba.label}
                </button>
              );
            })}
          </div>

          <div className="min-h-[500px]">
            <ComponenteAbaAtiva />
          </div>
        </div>
      </main>

      <footer className="relative mt-auto shrink-0 overflow-hidden border-t border-slate-800/80 bg-slate-950">
        <div className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row">
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-2 text-amber-500">
                <RotateCcw className="h-5 w-5" />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter text-slate-200 italic">
                TERA<span className="text-amber-500">Console</span>
              </span>
            </div>
            <p className="text-xs font-medium tracking-wide text-slate-500">{conteudoSite.shell.footerDescription}</p>
          </div>

          <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-600 md:text-right">
            © {new Date().getFullYear()} {conteudoSite.shell.copyrightLabel}
          </div>
        </div>
      </footer>
    </div>
  );
}
