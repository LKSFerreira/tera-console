import { useState, useEffect } from 'react';
import { BookOpen, History, RotateCcw, Award, Swords, Shield, CalendarDays, Hammer, Settings, AlertTriangle, UserCog } from 'lucide-react';

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

        <div className="max-w-7xl mx-auto px-6 py-12 relative z-10 flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400 mb-2 shadow-inner shadow-black/50">
            <BookOpen className="w-4 h-4 text-sky-400" />
            Portal de Notas de Atualização
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-sm uppercase">
            TERA Console
          </h1>
          <p className="text-xl text-sky-200/80 font-light tracking-wide flex items-center gap-2 justify-center">
            {activePatch.version} — {activePatch.name}
            <span className="text-amber-500 text-sm font-bold bg-amber-500/10 px-2 py-0.5 rounded ml-2">{activePatch.date}</span>
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8">

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
      <footer className="border-t border-slate-800/80 bg-slate-950 mt-12 shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center justify-center space-y-4">
          <RotateCcw className="w-5 h-5 text-slate-600 mb-2" />
          <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold text-center">
            Lucas Ferreira
          </p>
        </div>
      </footer>
    </div>
  );
}
