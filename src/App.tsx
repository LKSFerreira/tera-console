import { useState, type ComponentType } from 'react';
import { AlertTriangle, ArrowUpRight, Award, BookOpen, CalendarDays, Code, Hammer, History, RotateCcw, Settings, Shield, Swords, Terminal, UserCog, type LucideIcon } from 'lucide-react';

import teraCommunityArte from './assets/imagens/tera_community/tera_community.webp';
import lksAvatar from './assets/imagens/perfil/lks_avatar.png';
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
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.078.037c-.211.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.078-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.083.083 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.105 13.1 13.1 0 0 1-1.872-.892.078.078 0 0 1-.008-.131c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.073.073 0 0 1 .078.009c.12.1.246.198.373.292a.078.078 0 0 1-.006.131 12.3 12.3 0 0 1-1.873.891.076.076 0 0 0-.04.106c.36.696.771 1.36 1.225 1.993a.076.076 0 0 0 .084.028 19.86 19.86 0 0 0 6.002-3.03.077.077 0 0 0 .031-.055c.5-5.177-.838-9.67-3.549-13.66a.062.062 0 0 0-.031-.03ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.211 0 2.176 1.095 2.157 2.418 0 1.334-.956 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.211 0 2.176 1.095 2.157 2.418 0 1.334-.947 2.419-2.157 2.419Z" />
  </svg>
);

type RegistroAbaPatch = {
  icon: LucideIcon;
  component: ComponentType;
};

const LINK_DISCORD_COMUNIDADE = 'https://discord.com/invite/vB83wnaykm';
const CONTATO_DISCORD_PESSOAL = 'LKSFerreira';

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
  const [discordCopiado, setDiscordCopiado] = useState(false);

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

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-6 pt-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1.2fr)] lg:items-stretch">
          <div className="flex flex-col items-center justify-end space-y-4 text-center lg:items-start lg:text-left">
            <h1 className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-5xl font-black tracking-tight text-transparent drop-shadow-sm md:text-6xl" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
              TERA Console
            </h1>
          </div>

          <a
            href={LINK_DISCORD_COMUNIDADE}
            target="_blank"
            title={conteudoSite.shell.communityCtaTitle}
            rel="noopener noreferrer"
            className="group relative flex w-full overflow-hidden rounded-xl border border-b-2 border-slate-700/50 border-b-sky-500 bg-slate-900/60 pl-5 py-5 pr-[5px] shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-slate-800/80"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_38%)]" />
            <div className="pointer-events-none absolute right-[-10px] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl transition-transform duration-500 group-hover:scale-110" />

            <div className="relative z-10 grid min-h-full w-full gap-4 sm:grid-cols-[minmax(0,1fr)_160px]">
              <div className="flex min-h-full flex-col justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black tracking-tight text-slate-100 flex items-center gap-2">
                      {conteudoSite.shell.communityTitle}
                      <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-sky-400" />
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-300/85">{conteudoSite.shell.communityDescription}</p>
                  </div>
                </div>


              </div>

              <div className="hidden shrink-0 items-center justify-center sm:flex self-center">
                <img
                  src={teraCommunityArte}
                  alt="TERA Community"
                  className="h-32 w-32 object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
          </a>

          <div className="flex w-full flex-col gap-4 rounded-xl border border-b-2 border-slate-700/50 border-b-amber-500 bg-slate-900/60 p-5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-slate-800/80">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-500/50 to-amber-200/50 blur-md animate-pulse" />
                  <div className="relative h-full w-full rounded-full border-2 border-amber-500/30 bg-slate-950 p-1 shadow-2xl">
                    <img 
                      src={lksAvatar} 
                      alt="LKS Ferreira" 
                      className="h-full w-full rounded-full object-cover shadow-inner"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500/80">{conteudoSite.shell.maintainedBy}</span>
                  <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-2xl font-black leading-tight text-transparent drop-shadow-md md:text-3xl whitespace-nowrap">
                    LKS Ferreira
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-center">
                <a
                  href="https://github.com/LKSFerreira"
                  target="_blank"
                  title={conteudoSite.shell.githubTitle}
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-slate-700 bg-slate-950/40 p-2.5 text-slate-400 transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/lucas-ferreira-developer/"
                  target="_blank"
                  title={conteudoSite.shell.linkedinTitle}
                  rel="noopener noreferrer"
                  className="group rounded-lg border border-slate-700 bg-slate-950/40 p-2.5 text-slate-400 transition-all duration-300 hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>

                <button
                  type="button"
                  title={discordCopiado ? conteudoSite.shell.discordCopiedTitle : `${conteudoSite.shell.discordTitle}: ${CONTATO_DISCORD_PESSOAL}`}
                  aria-label={`${conteudoSite.shell.discordTitle}: ${CONTATO_DISCORD_PESSOAL}`}
                  onClick={() => {
                    navigator.clipboard.writeText(CONTATO_DISCORD_PESSOAL).catch(() => undefined);
                    setDiscordCopiado(true);
                    setTimeout(() => {
                      setDiscordCopiado(false);
                    }, 1800);
                  }}
                  className={`group rounded-lg border bg-slate-950/40 p-2.5 transition-all duration-300 ${
                    discordCopiado
                      ? 'border-sky-400/60 bg-sky-500/10 text-sky-300'
                      : 'border-slate-700 text-slate-400 hover:border-sky-500/50 hover:bg-sky-500/10 hover:text-sky-400'
                  }`}
                >
                  <DiscordIcon className="h-5 w-5" />
                </button>
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
