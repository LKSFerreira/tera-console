import { useState } from 'react';
import { AlertTriangle, Award, BookOpen, CalendarDays, Hammer, History, RotateCcw, Settings, Shield, Swords, UserCog } from 'lucide-react';

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

const historicoPatches = [
  {
    id: 'b131.01',
    version: 'B131.01',
    name: 'Atualização de Abril',
    date: '9 de Abril de 2026',
    parts: '(Partes 1 & 2)',
    tabs: [
      { id: 'battlepass', label: 'Battle Pass', icon: Award, component: B131_BattlePassTab },
      { id: 'season', label: 'Temporada', icon: BookOpen, component: B131_SeasonTab },
      { id: 'dungeons', label: 'Dungeons', icon: Swords, component: B131_DungeonsTab },
      { id: 'gear', label: 'Equipamentos', icon: Shield, component: B131_GearTab },
      { id: 'events', label: 'Eventos', icon: CalendarDays, component: B131_EventsTab },
      { id: 'crafting', label: 'Itens & Craft', icon: Hammer, component: B131_CraftingTab },
      { id: 'system', label: 'Sistema', icon: Settings, component: B131_SystemTab },
    ],
  },
  {
    id: 'b130.03',
    version: 'B130.03',
    name: 'Hotfix de Março',
    date: '26 de Março de 2026',
    parts: '',
    tabs: [{ id: 'bugs', label: 'Bug Fixes', icon: AlertTriangle, component: B130_03_BugFixesTab }],
  },
  {
    id: 'b130.02',
    version: 'B130.02',
    name: 'Build Update',
    date: '12 de Março de 2026',
    parts: '',
    tabs: [
      { id: 'rewards', label: 'Rewards & Dungeons', icon: Award, component: B130_02_RewardsTab },
      { id: 'classes', label: 'Classes & Balance', icon: UserCog, component: B130_02_ClassesTab },
      { id: 'system', label: 'Bug Fixes', icon: AlertTriangle, component: B130_02_SystemTab },
    ],
  },
  {
    id: 'b130.01',
    version: 'B130.01',
    name: 'Last Stand Update',
    date: '26 de Fevereiro de 2026',
    parts: '',
    tabs: [
      { id: 'battlepass', label: 'Battle Pass Event', icon: Award, component: B130_01_BattlePassTab },
      { id: 'dungeons', label: 'Dungeons', icon: Swords, component: B130_01_DungeonsTab },
      { id: 'crafting', label: 'Crafting & Itens', icon: Hammer, component: B130_01_CraftingItemsTab },
      { id: 'classes', label: 'Classes', icon: UserCog, component: B130_01_ClassesTab },
      { id: 'system', label: 'Bug Fixes', icon: Settings, component: B130_01_SystemTab },
    ],
  },
];

export default function App() {
  const [patchAtivoId, setPatchAtivoId] = useState(historicoPatches[0].id);
  const [abaAtivaId, setAbaAtivaId] = useState(historicoPatches[0].tabs[0].id);

  const patchAtivo = historicoPatches.find((patchEntry) => patchEntry.id === patchAtivoId) || historicoPatches[0];

  const ComponenteAbaAtiva =
    patchAtivo.tabs.find((tabEntry) => tabEntry.id === abaAtivaId)?.component || patchAtivo.tabs[0].component;

  return (
    <div className="min-h-screen bg-[#090e17] font-sans text-slate-200 selection:bg-amber-500/30 flex flex-col">
      <div className="relative shrink-0 overflow-hidden border-b border-slate-800/80 bg-slate-950">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 rounded-[100%] bg-amber-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute left-1/4 top-0 h-[200px] w-[400px] rounded-[100%] bg-sky-500/10 blur-[80px]" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 pb-6 pt-12 lg:flex-row lg:items-end">
          <div className="flex flex-col items-center space-y-4 text-center lg:items-start lg:text-left">
            <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/80 px-4 py-1.5 text-sm font-medium tracking-wide text-slate-300 shadow-inner shadow-black/50 backdrop-blur-sm">
              <BookOpen className="h-4 w-4 text-sky-400" />
              Portal de Notas de Atualização
            </div>
            <h1 className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-5xl font-black uppercase tracking-tight text-transparent drop-shadow-sm md:text-6xl">
              TERA Console
            </h1>
            <p className="flex flex-wrap items-center justify-center gap-3 text-2xl font-light tracking-wide text-sky-200/80 lg:justify-start">
              {patchAtivo.version} - {patchAtivo.name}
              <span className="ml-1 rounded border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-base font-bold text-amber-500 shadow-sm">
                {patchAtivo.date}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-6 rounded-xl border border-b-2 border-slate-700/50 border-b-amber-500 bg-slate-900/60 p-5 pr-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-slate-800/80">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 p-[1px] shadow-md shadow-amber-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#090e17]">
                  <UserCog className="h-6 w-6 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500/90">Mantido por</span>
                <span className="bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-xl font-black leading-tight text-transparent md:text-2xl">
                  Lucas Ferreira
                </span>
              </div>
            </div>

            <div className="hidden h-10 w-px bg-slate-700/60 sm:block" />

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/LKSFerreira"
                target="_blank"
                title="Acessar o GitHub"
                rel="noopener noreferrer"
                className="group rounded-lg border border-slate-700 bg-[#090e17] p-3 text-slate-400 transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
              >
                <GithubIcon className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/lucas-ferreira-developer/"
                target="_blank"
                title="Acessar o LinkedIn"
                rel="noopener noreferrer"
                className="group rounded-lg border border-slate-700 bg-[#090e17] p-3 text-slate-400 transition-all duration-300 hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 pb-8 pt-6 lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col lg:w-max">
          <div className="sticky top-8">
            <h3 className="mb-4 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <History className="h-4 w-4" /> Updates
            </h3>

            <div className="flex snap-x gap-3 overflow-x-auto pb-4 lg:flex-col lg:overflow-visible lg:pb-0">
              {historicoPatches.map((patchEntry) => {
                const patchEstaAtivo = patchAtivoId === patchEntry.id;

                return (
                  <button
                    key={patchEntry.id}
                    onClick={() => {
                      setPatchAtivoId(patchEntry.id);
                      setAbaAtivaId(patchEntry.tabs[0].id);
                    }}
                    className={`min-w-[240px] snap-start whitespace-nowrap rounded-xl border px-4 py-4 text-left transition-all lg:min-w-0 ${
                      patchEstaAtivo
                        ? 'border-amber-500/40 bg-amber-500/10 shadow-lg shadow-amber-500/5'
                        : 'border-slate-800/60 bg-slate-900/40 hover:border-slate-700/80 hover:bg-slate-800'
                    }`}
                  >
                    <div className="mb-1 flex items-start justify-between">
                      <span className={`text-lg font-black ${patchEstaAtivo ? 'text-amber-400' : 'text-slate-300'}`}>
                        {patchEntry.version}
                      </span>
                      {patchEstaAtivo ? <div className="mt-2 h-2 w-2 animate-pulse rounded-full bg-amber-400" /> : null}
                    </div>
                    <span className={`mb-1 text-sm font-medium ${patchEstaAtivo ? 'text-amber-200/80' : 'text-slate-400'}`}>
                      {patchEntry.name}
                    </span>
                    <span className="mt-auto block border-t border-slate-800/50 pt-2 text-xs text-slate-500">
                      {patchEntry.date} {patchEntry.parts}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="scrollbar-none mb-8 flex gap-2 overflow-x-auto border-b border-slate-800/80 pb-4">
            {patchAtivo.tabs.map((tabEntry) => {
              const IconeTab = tabEntry.icon;
              const abaEstaAtiva = abaAtivaId === tabEntry.id;

              return (
                <button
                  key={tabEntry.id}
                  onClick={() => setAbaAtivaId(tabEntry.id)}
                  className={`shrink-0 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    abaEstaAtiva
                      ? 'border border-sky-500/30 bg-sky-500/10 text-sky-400 shadow-md shadow-sky-500/5'
                      : 'border border-transparent bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <IconeTab className={`h-4 w-4 ${abaEstaAtiva ? 'text-sky-400' : 'text-slate-500'}`} />
                  {tabEntry.label}
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
            <p className="text-xs font-medium tracking-wide text-slate-500">Documentação de Patch Notes Independente</p>
          </div>

          <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-600 md:text-right">
            © {new Date().getFullYear()} TERA CONSOLE PORTAL
          </div>
        </div>
      </footer>
    </div>
  );
}
