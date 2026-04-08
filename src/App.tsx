import { useState, useEffect } from 'react';
import { BookOpen, History, RotateCcw, Award, Swords, Shield, CalendarDays, Hammer, Settings, AlertTriangle, UserCog, ExternalLink } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

import {
  B131_BattlePassTab,
  B131_DungeonsTab,
  B131_GearTab,
  B131_EventsTab,
  B131_CraftingTab,
  B131_SystemTab,
  B130_03_BugFixesTab,
  B130_02_RewardsTab,
  B130_02_ClassesTab,
  B130_02_SystemTab,
  B130_01_BattlePassTab,
  B130_01_DungeonsTab,
  B130_01_CraftingItemsTab,
  B130_01_ClassesTab,
  B130_01_SystemTab
} from './features/patchNotes/tabs';

// ==========================================
// --- PATCH DIRECTORY CONFIG ---
// ==========================================

const patchHistory = [
  {
    id: 'b131.01',
    version: 'B131.01',
    name: 'Atualização de Abril',
    date: '9 de Abril de 2026',
    parts: '(Partes 1 & 2)',
    tabs: [
      { id: 'battlepass', label: 'Battle Pass', icon: Award, component: B131_BattlePassTab },
      { id: 'dungeons', label: 'Dungeons & Ajustes', icon: Swords, component: B131_DungeonsTab },
      { id: 'gear', label: 'Equipamentos', icon: Shield, component: B131_GearTab },
      { id: 'events', label: 'Eventos', icon: CalendarDays, component: B131_EventsTab },
      { id: 'crafting', label: 'Itens & Crafting', icon: Hammer, component: B131_CraftingTab },
      { id: 'system', label: 'Sistema & Bugs', icon: Settings, component: B131_SystemTab },
    ]
  },
  {
    id: 'b130.03',
    version: 'B130.03',
    name: 'Hotfix de Março',
    date: '26 de Março de 2026',
    parts: '',
    tabs: [
      { id: 'bugs', label: 'Bug Fixes', icon: AlertTriangle, component: B130_03_BugFixesTab },
    ]
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
    ]
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
    ]
  }
];

// ==========================================
// --- MAIN APP COMPONENT ---
// ==========================================

export default function App() {
  const [activePatchId, setActivePatchId] = useState(patchHistory[0].id);
  const [activeTabId, setActiveTabId] = useState(patchHistory[0].tabs[0].id);

  const activePatch = patchHistory.find(p => p.id === activePatchId) || patchHistory[0];

  // When patch changes, default to its first tab
  useEffect(() => {
    setActiveTabId(activePatch.tabs[0].id);
  }, [activePatch.id]);

  const ActiveTabComponent = activePatch.tabs.find(t => t.id === activeTabId)?.component || activePatch.tabs[0].component;

  return (
    <div className="min-h-screen bg-[#090e17] text-slate-200 font-sans selection:bg-amber-500/30 flex flex-col">

      {/* Top Banner / Hero */}
      <div className="relative border-b border-slate-800/80 bg-slate-950 overflow-hidden shrink-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/10 rounded-[100%] blur-[100px] pointer-events-none"></div>
        <div className="absolute top-0 left-1/4 w-[400px] h-[200px] bg-sky-500/10 rounded-[100%] blur-[80px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 pt-12 pb-6 relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8">
          
          {/* Título & Info (Alinhado à Esquerda no Desktop) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50 text-sm text-slate-300 font-medium tracking-wide mb-1 shadow-inner shadow-black/50 backdrop-blur-sm">
              <BookOpen className="w-4 h-4 text-sky-400" />
              Portal de Notas de Atualização
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-sm uppercase">
              TERA Console
            </h1>
            <p className="text-2xl text-sky-200/80 font-light tracking-wide flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {activePatch.version} — {activePatch.name}
              <span className="text-amber-500 text-base font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded ml-1 shadow-sm">
                {activePatch.date}
              </span>
            </p>
          </div>

          {/* Dev Spotlight Section - Redesenhada como um Card Menor e Compacto (Widget) */}
          <div className="flex items-center gap-6 bg-slate-900/60 rounded-xl backdrop-blur-md shadow-2xl p-5 pr-8 border border-slate-700/50 border-b-2 border-b-amber-500 hover:bg-slate-800/80 transition-all duration-300">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-200 p-[1px] shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-[#090e17] rounded-full flex items-center justify-center">
                  <UserCog className="w-6 h-6 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-amber-500/90 uppercase tracking-[0.2em]">Mantido por</span>
                <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 leading-tight">
                  Lucas Ferreira
                </span>
              </div>
            </div>
            
            {/* Divisor Vertical */}
            <div className="w-px h-10 bg-slate-700/60 hidden sm:block"></div>
            
            {/* Ícones Menores Interativos */}
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/LKSFerreira" 
                target="_blank" 
                title="Acessar o GitHub"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-[#090e17] border border-slate-700 hover:border-amber-500/50 hover:bg-amber-500/10 text-slate-400 hover:text-amber-400 transition-all duration-300 group"
              >
                <GithubIcon className="w-5 h-5" />
              </a>

              <a 
                href="https://www.linkedin.com/in/lucas-ferreira-developer/" 
                target="_blank" 
                title="Acessar o LinkedIn"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-[#090e17] border border-slate-700 hover:border-sky-500/50 hover:bg-sky-500/10 text-slate-400 hover:text-sky-400 transition-all duration-300 group"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 pt-6 pb-8 flex flex-col lg:flex-row gap-8">

        {/* Left Sidebar (Desktop) / Horizontal Scroll (Mobile) - Patch History */}
        <aside className="w-full lg:w-max shrink-0 flex flex-col">
          <div className="sticky top-8">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 px-2 flex items-center gap-2">
              <History className="w-4 h-4" /> Updates
            </h3>

            {/* Version List */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x">
              {patchHistory.map(patch => {
                const isActive = activePatchId === patch.id;
                return (
                  <button
                    key={patch.id}
                    onClick={() => setActivePatchId(patch.id)}
                    className={`text-left px-4 py-4 rounded-xl border transition-all flex flex-col min-w-[240px] lg:min-w-0 snap-start whitespace-nowrap
                      ${isActive
                        ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5'
                        : 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-800 hover:border-slate-700/80'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`font-black text-lg ${isActive ? 'text-amber-400' : 'text-slate-300'}`}>
                        {patch.version}
                      </span>
                      {isActive && <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 animate-pulse"></div>}
                    </div>
                    <span className={`text-sm font-medium mb-1 ${isActive ? 'text-amber-200/80' : 'text-slate-400'}`}>
                      {patch.name}
                    </span>
                    <span className="text-xs text-slate-500 mt-auto pt-2 border-t border-slate-800/50">
                      {patch.date} {patch.parts}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0 flex flex-col">

          {/* Inner Navigation Tabs (For the selected patch) */}
          <div className="flex gap-2 mb-8 border-b border-slate-800/80 pb-4 overflow-x-auto scrollbar-none">
            {activePatch.tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap shrink-0
                    ${isActive
                      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30 shadow-md shadow-sky-500/5'
                      : 'bg-transparent text-slate-400 border border-transparent hover:bg-slate-800 hover:text-slate-200'
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div className="min-h-[500px]">
            <ActiveTabComponent />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 mt-auto shrink-0 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Logo / Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <RotateCcw className="w-5 h-5" />
              </div>
              <span className="text-xl font-black italic tracking-tighter text-slate-200 uppercase">
                TERA<span className="text-amber-500">Console</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs font-medium tracking-wide">
              Documentação de Patch Notes Independente
            </p>
          </div>

          {/* Copyright Section */}
          <div className="text-slate-600 text-[10px] font-bold uppercase tracking-widest text-center md:text-right">
            © {new Date().getFullYear()} TERA CONSOLE PORTAL
          </div>
        </div>
      </footer>
    </div>
  );
}
