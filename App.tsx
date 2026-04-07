import React, { useState, useEffect } from 'react';
import {
  Swords,
  CalendarDays,
  Hammer,
  Award,
  MessageSquare,
  ChevronRight,
  ShieldAlert,
  Sparkles,
  BookOpen,
  Shield,
  Settings,
  AlertTriangle,
  Zap,
  History,
  RotateCcw,
  UserCog,
  Star
} from 'lucide-react';

// ==========================================
// --- DATA: B131.01 ---
// ==========================================

const battlePassPlus = [
  { item: "Battle Pass Premium: SEASON 21", qty: "1" },
  { item: "[Style] Face Engraving Scroll - Wings of Dawn VIII", qty: "4" },
  { item: "Training book for promotion: 20%.", qty: "5" },
  { item: "God's Power Stone", qty: "3" },
  { item: "Card EXP 5000", qty: "1" },
  { item: "Battle Pass Level +30", qty: "1" },
  { item: "Season 2 Enchanting Powder", qty: "50,000" },
  { item: "Battle Pass Season 21 Exchange Coin", qty: "500" },
];

const battlePassRewards = [
  { level: 1, freeItem: "[Style] Face Engraving Scroll - Wings of Dawn VII", freeQty: 1, premiumItem: "Dungeon Reset Scroll Fragment", premiumQty: 30 },
  { level: 2, freeItem: "Season 2 Enchanting Powder", freeQty: "1,000", premiumItem: "Season 2 Enchanting Powder", premiumQty: "10,000" },
  { level: 3, freeItem: "Fluorite Niveot Stone", freeQty: 1, premiumItem: "Fluorite Niveot Stone", premiumQty: 5 },
  { level: 4, freeItem: "Fluorite Niveot Stone", freeQty: 1, premiumItem: "Fluorite Niveot Stone", premiumQty: 5 },
  { level: 5, freeItem: "Fluorite Niveot Stone", freeQty: 1, premiumItem: "Fluorite Niveot Stone", premiumQty: 5 },
  { level: 6, freeItem: "Season 2 Enchanting Powder", freeQty: "1,000", premiumItem: "Season 2 Enchanting Powder", premiumQty: "10,000" },
  { level: 7, freeItem: "Stigma Shard", freeQty: 200, premiumItem: "Stigma Shard", premiumQty: "2000" },
  { level: 8, freeItem: "Stigma Shard", freeQty: 200, premiumItem: "Stigma Shard", premiumQty: "2000" },
  { level: 9, freeItem: "Season 2 Enchanting Powder", freeQty: "1,000", premiumItem: "Season 2 Enchanting Powder", premiumQty: "10,000" },
  { level: 10, freeItem: "[Style] Face Engraving Scroll - Wings of Dawn VII", freeQty: 1, premiumItem: "Item XP Buff 500% (3 days)", premiumQty: 1 },
  { level: 11, freeItem: "High Training Book", freeQty: 1, premiumItem: "Training book for promotion: 20%.", premiumQty: 1 },
  { level: 12, freeItem: "High Training Book", freeQty: 1, premiumItem: "Training book for promotion: 20%.", premiumQty: 1 },
  { level: 13, freeItem: "High Training Book", freeQty: 1, premiumItem: "Training book for promotion: 20%.", premiumQty: 1 },
  { level: 14, freeItem: "High Training Book", freeQty: 1, premiumItem: "Item XP Buff 500% (3 days)", premiumQty: 1 },
  { level: 15, freeItem: "High Training Book", freeQty: 1, premiumItem: "Battle Pass Season 20 Exchange Coin", premiumQty: 200 },
  { level: 16, freeItem: "Season 2 Enchanting Powder", freeQty: "1,000", premiumItem: "Season 2 Enchanting Powder", premiumQty: "10,000" },
  { level: 18, freeItem: "Lein-style Dark Root Beer", freeQty: 10, premiumItem: "Lein’s Refreshing Dark Root Beer", premiumQty: 20 },
  { level: 19, freeItem: "Lein-style Dark Root Beer", freeQty: 10, premiumItem: "Lein’s Refreshing Dark Root Beer", premiumQty: 20 },
  { level: 20, freeItem: "[Style] Face Engraving Scroll - Wings of Dawn VII", freeQty: 1, premiumItem: "Battle Pass Season 20 Exchange Coin", premiumQty: 200 },
  { level: 21, freeItem: "Season 2 Enchanting Powder", freeQty: "1,000", premiumItem: "Season 2 Enchanting Powder", premiumQty: "10,000" },
  { level: 22, freeItem: "Fluorite Niveot Stone", freeQty: 1, premiumItem: "Fluorite Niveot Stone", premiumQty: 5 },
  { level: 23, freeItem: "Fluorite Niveot Stone", freeQty: 1, premiumItem: "Fluorite Niveot Stone", premiumQty: 5 },
  { level: 24, freeItem: "[Style] Face Engraving Scroll - Wings of Dawn VII", freeQty: 1, premiumItem: "Item XP Buff 500% (3 days)", premiumQty: 1 },
  { level: 25, freeItem: "Fluorite Niveot Stone", freeQty: 1, premiumItem: "Battle Pass Season 20 Exchange Coin", premiumQty: 200 },
  { level: 26, freeItem: "(Random) Normal ~ Legendary Card Box", freeQty: 10, premiumItem: "Rare ~ Legendary Card Box", premiumQty: 10 },
  { level: 27, freeItem: "(Random) Normal ~ Legendary Card Box", freeQty: 10, premiumItem: "Rare ~ Legendary Card Box", premiumQty: 10 },
  { level: 28, freeItem: "(Random) Normal ~ Legendary Card Box", freeQty: 10, premiumItem: "Rare ~ Legendary Card Box", premiumQty: 10 },
  { level: 29, freeItem: "(Random) Normal ~ Legendary Card Box", freeQty: 10, premiumItem: "Rare ~ Legendary Card Box", premiumQty: 10 },
  { level: 30, freeItem: "(Random) Normal ~ Legendary Card Box", freeQty: 10, premiumItem: "Dungeon Reset Scroll Fragment", premiumQty: 30 },
  { level: 31, freeItem: "Season 2 Enchanting Powder", freeQty: "1,000", premiumItem: "Season 2 Enchanting Powder", premiumQty: "10,000" },
  { level: 32, freeItem: "Healing Potion", freeQty: 30, premiumItem: "Battle Pass Special Potion", premiumQty: 30 },
  { level: 33, freeItem: "Healing Potion", freeQty: 30, premiumItem: "Battle Pass Special Potion", premiumQty: 30 },
  { level: 34, freeItem: "[Style] Face Engraving Scroll - Wings of Dawn VII", freeQty: 30, premiumItem: "Item XP Buff 500% (3 days)", premiumQty: 1 },
  { level: 35, freeItem: "Battle Pass Season 20 Exchange Coin", freeQty: 50, premiumItem: "Battle Pass Season 20 Exchange Coin", premiumQty: 200 },
  { level: 36, freeItem: "Season 2 Enchanting Powder", freeQty: "1,000", premiumItem: "Season 2 Enchanting Powder", premiumQty: "10,000" },
  { level: 37, freeItem: "Lein-style Dark Root Beer", freeQty: 30, premiumItem: "Lein’s Refreshing Dark Root Beer", premiumQty: 30 },
  { level: 38, freeItem: "Lein-style Dark Root Beer", freeQty: 30, premiumItem: "Lein’s Refreshing Dark Root Beer", premiumQty: 30 },
  { level: 39, freeItem: "Lein-style Dark Root Beer", freeQty: 30, premiumItem: "Lein’s Refreshing Dark Root Beer", premiumQty: 30 },
  { level: 40, freeItem: "Lein-style Dark Root Beer", freeQty: 30, premiumItem: "Dungeon Reset Scroll Fragment", premiumQty: 30 },
  { level: 41, freeItem: "Season 2 Enchanting Powder", freeQty: "1,000", premiumItem: "Season 2 Enchanting Powder", premiumQty: "10,000" },
  { level: 42, freeItem: "Season 2 Enchanting Powder", freeQty: "1,000", premiumItem: "Season 2 Enchanting Powder", premiumQty: "10,000" },
  { level: 43, freeItem: "Season 2 Enchanting Powder", freeQty: "1,000", premiumItem: "Season 2 Enchanting Powder", premiumQty: "10,000" },
  { level: 44, freeItem: "[Style] Face Engraving Scroll - Wings of Dawn VII", freeQty: 1, premiumItem: "Item XP Buff 500% (3 days)", premiumQty: 1 },
  { level: 45, freeItem: "Battle Pass Season 20 Exchange Coin", freeQty: 50, premiumItem: "Battle Pass Season 20 Exchange Coin", premiumQty: 200 },
  { level: 46, freeItem: "Battle Pass Rune: Exchange Ticket", freeQty: 10, premiumItem: "Battle Pass Rune: Exchange Ticket", premiumQty: 100 },
  { level: 47, freeItem: "Battle Pass Rune: Exchange Ticket", freeQty: 10, premiumItem: "Battle Pass Rune: Exchange Ticket", premiumQty: 100 },
  { level: 48, freeItem: "Battle Pass Rune: Exchange Ticket", freeQty: 10, premiumItem: "Battle Pass Rune: Exchange Ticket", premiumQty: 100 },
  { level: 49, freeItem: "Battle Pass Rune: Exchange Ticket", freeQty: 10, premiumItem: "Battle Pass Rune: Exchange Ticket", premiumQty: 100 },
  { level: 50, freeItem: "Battle Pass Season 20 Exchange Coin", freeQty: 100, premiumItem: "Legendary Card Exchange Token", premiumQty: 1 },
];

const dungeonsList = [
  { name: "Forbidden Arena (Eternal God of War)", req: 900, note: "Leaderboard - B131 apenas" },
  { name: "Akeron's Inferno (Hard)", req: 890, note: "10 jogadores" },
  { name: "Chaos Ice Throne", req: 880, note: "" },
  { name: "Timescape (Hard)", req: 850, note: "" },
  { name: "RK-9 Kennel", req: 810, note: "" },
  { name: "Forbidden Arena (Eternal Warrior)", req: 800, note: "" },
  { name: "Ice Throne", req: 790, note: "" },
  { name: "Dark Reach Citadel (Hard)", req: 780, note: "" },
  { name: "Demokron Factory (Hard)", req: 750, note: "7 jogadores" },
  { name: "Timescape", req: 700, note: "" },
  { name: "Dark Reach Citadel", req: 650, note: "" },
  { name: "Demokron Factory", req: 600, note: "" },
  { name: "Ravenous Gorge (3-Person)", req: 500, note: "3 jogadores / Apenas Matching" },
];

const maskOfAnnihilation = [
  {
    name: "Mask of Annihilation - Iron Wall",
    fixed: "Deals 12% additional damage ao monstro com maior threat contra você\nGenerates 15% additional threat ao atacar",
    random: "Reduz o dano frontal tomado em 1–5% (incrementos de 1%)"
  },
  {
    name: "Mask of Annihilation - Salvation",
    fixed: "Aumenta Attack Speed em 5%\nReduz cooldown em 2% (bug visual na cor da fonte)",
    random: "Power +2–10 (incrementos de 2)"
  },
  {
    name: "Mask of Annihilation - Destruction",
    fixed: "Deals 12% additional damage ao atacar por trás\nReduz threat generation em 15% ao atacar",
    random: "Reduz cooldown em 1–3% (incrementos de 0.5%)"
  },
];

// ==========================================
// --- REUSABLE COMPONENTS ---
// ==========================================

const SectionTitle = ({ title, icon: Icon }) => (
  <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 mb-6 pb-2 border-b border-slate-800">
    {Icon && <Icon className="text-amber-500 w-6 h-6" />}
    {title}
  </h2>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-900/50 border border-slate-800/60 rounded-xl p-6 backdrop-blur-sm shadow-xl ${className}`}>
    {children}
  </div>
);

// ==========================================
// --- PATCH B131.01 TABS ---
// ==========================================

const B131_BattlePassTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Battle Pass Season 21" icon={Award} />

    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-t-4 border-t-amber-500">
        <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Período do Battle Pass
        </h3>
        <ul className="space-y-3 text-slate-300">
          <li className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Período Disponível:</span>
            <span>09/04/2026 a 06/08/2026</span>
          </li>
          <li className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Período de Vendas:</span>
            <span>09/04/2026 a 30/07/2026</span>
          </li>
        </ul>
        <p className="mt-4 text-sm text-slate-400 italic">
          O Event Battle Pass atual será encerrado. A Season 21 começará.
        </p>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Conteúdos do Battle Pass PLUS
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg">Item</th>
                <th className="px-4 py-3 rounded-tr-lg text-right">Qtd</th>
              </tr>
            </thead>
            <tbody>
              {battlePassPlus.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-amber-100/90">{row.item}</td>
                  <td className="px-4 py-3 text-right text-slate-300">{row.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>

    <Card>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Recompensas do Battle Pass por Nível</h3>
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-300 uppercase bg-slate-800">
            <tr>
              <th className="px-4 py-4 text-center border-r border-slate-700 w-16">Nível</th>
              <th className="px-4 py-4 border-r border-slate-700">Recompensa Free</th>
              <th className="px-4 py-4 border-r border-slate-700 text-center w-24">Qtd</th>
              <th className="px-4 py-4 border-r border-slate-700 text-amber-400">Recompensa Premium</th>
              <th className="px-4 py-4 text-center text-amber-400 w-24">Qtd</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {battlePassRewards.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-4 py-3 text-center font-bold text-slate-400 border-r border-slate-800/60">{row.level}</td>
                <td className="px-4 py-3 text-slate-300 border-r border-slate-800/60">{row.freeItem}</td>
                <td className="px-4 py-3 text-center text-slate-400 border-r border-slate-800/60">{row.freeQty}</td>
                <td className="px-4 py-3 text-amber-100/80 border-r border-slate-800/60">{row.premiumItem}</td>
                <td className="px-4 py-3 text-center text-amber-200/80">{row.premiumQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const B131_DungeonsTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Dungeons & Ajustes" icon={Swords} />

    <Card>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Lista de Dungeons Atualizada</h3>
      <p className="text-slate-400 mb-6 text-sm">
        As Valkyon Directives serão ajustadas para corresponder às Dungeons abaixo. Achievements para Dungeons que estão OFF não poderão mais ser concluídos.
      </p>
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-300 uppercase bg-slate-800">
            <tr>
              <th className="px-4 py-3">Dungeon</th>
              <th className="px-4 py-3 text-center w-32">Lv Requirido</th>
              <th className="px-4 py-3">Notas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {dungeonsList.map((dungeon, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-4 py-3 font-medium text-sky-200">{dungeon.name}</td>
                <td className="px-4 py-3 text-center text-amber-400 font-bold">{dungeon.req}</td>
                <td className="px-4 py-3 text-slate-400">{dungeon.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-400" />
          Ajustes Base das Dungeons
        </h3>
        <ul className="space-y-4 text-slate-300">
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
            <span>A <strong>Critical Resistance</strong> aumenta significativamente.</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
            <span>O <strong>scaling de HP</strong> aumenta significativamente.</span>
          </li>
          <li className="flex items-start gap-3">
            <ChevronRight className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
            <span>O HP do boss <strong>Petre</strong> enfrentado por certas classes será ajustado.</span>
          </li>
        </ul>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-400" />
          O Mercador Serghetto
        </h3>
        <p className="text-slate-300 leading-relaxed">
          Ao dar clear em uma Dungeon, o secret merchant <strong className="text-amber-400">Serghetto</strong> pode spawnar com uma certa chance.
        </p>
        <p className="text-slate-400 mt-3 text-sm">
          Serghetto vende vários itens de gemas pelos preços mais baixos, como Sapphire, Emerald e Diamond. Os itens e quantidades variam a cada aparição.
        </p>
      </Card>
    </div>

    <Card className="border-l-4 border-l-sky-500 bg-slate-800/30">
      <h3 className="text-lg font-semibold text-sky-400 mb-3 flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        Nota dos Desenvolvedores
      </h3>
      <div className="space-y-4 text-slate-300 text-sm leading-relaxed italic">
        <p>
          As Dungeons atuais estão recebendo clear mais rápido do que pretendíamos. Isso se acelerou ainda mais desde a atualização de scaling de healer, e após esta atualização de accessory unification, com os buffs de healer, a party inteira terá uma média de critical trigger rates muito alta.
        </p>
        <p>
          Como resultado, a diferença no DPS total da party com base no estado de gear upgrade do healer tornou-se muito grande. Esta atualização é aplicada para fazer o crescimento do healer parecer mais significativo, e porque classes crit-specialized têm estado consistentemente em desvantagem relativa, aplicaremos Critical Resistance em estágios para tornar os papéis e identidades das classes mais claros.
        </p>
        <p>
          Para apoiar isso, adicionamos scrolls de engraving selecionáveis nas recompensas da season, e continuaremos monitorando e fazendo ajustes detalhados.
        </p>
        <p>
          Além disso, partys que recrutam apenas classes específicas para farmar clears de Dungeons rapidamente através de burst DPS com full-buff inicial estão aproveitando uma vantagem do sistema, mas não é o padrão de jogo que desejamos. Portanto, aumentamos o HP das Dungeons para que os clears ocorram no ponto onde o DPS se torna mais normalizado, independentemente das classes escolhidas.
        </p>
      </div>
    </Card>

    <Card>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Outras Mudanças de Dungeons</h3>
      <ul className="grid md:grid-cols-2 gap-4 text-slate-300">
        <li className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
          <ChevronRight className="w-4 h-4 text-amber-500" />
          Todas as cutscenes de vídeo das dungeons foram removidas.
        </li>
        <li className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
          <ChevronRight className="w-4 h-4 text-amber-500" />
          Mini-games forçados removidos (Ice Throne, RK-9 Kennel).
        </li>
      </ul>
    </Card>
  </div>
);

const B131_GearTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Equipamentos & Acessórios" icon={Shield} />

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold text-sky-400 mb-4">Season Gear</h3>
        <ul className="space-y-3 text-slate-300 text-sm">
          <li className="flex gap-3"><span className="text-amber-500">•</span><strong>[Season 1]</strong> Equipamentos agora podem ser <em>dismantled</em> para obter várias recompensas. Seus base effects foram removidos e não podem mais receber <em>enhancement</em>.</li>
          <li className="flex gap-3"><span className="text-amber-500">•</span><strong>[Season 2]</strong> Equipamentos adicionados para compra. O método de compra continua igual, e os itens serão entregues temporariamente em estado <em>indestructible</em>.</li>
          <li className="flex gap-3"><span className="text-amber-500">•</span><strong>[Season 2]</strong> Consumo de Diamond levemente reduzido para o range +37 ao +40.</li>
        </ul>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-amber-400 mb-4">Accessory Consolidation</h3>
        <p className="text-sm text-slate-300 mb-4">
          Acessórios <strong>Stormcry, Heroic Oath, Enhanced Heroic Oath</strong> e <strong>Kaia's Fury</strong> foram unificados em um único tipo. Efeitos de Crit/Power aplicados simultaneamente.
        </p>
        <h4 className="text-sky-300 font-medium mb-2 text-sm">Promotion Chance (c/ Mastery no máximo):</h4>
        <ul className="space-y-1.5 text-xs text-slate-400">
          <li>• <strong>Stormcry:</strong> Chance ganha por mastery de até 50%.</li>
          <li>• <strong>Heroic Oath:</strong> Base 30%. Correção em falha (pity) de 1% → 3%. Adicional de mastery de até 70% (aumento de 7x).</li>
          <li>• <strong>Enh. Heroic Oath:</strong> Base 20%. Adicional de mastery de até 40% (aumento de 4x).</li>
          <li>• <strong>Kaia's Fury:</strong> +15,000,000 EXP adicionado. Barra cheia concede +40% chance adicional.</li>
        </ul>
      </Card>
    </div>

    <Card>
      <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-400" /> Annihilation Weapons & Armor
      </h3>
      <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300">
        <div>
          <ul className="space-y-2">
            <li>• Enhancement desbloqueado até <strong>+15</strong>.</li>
            <li>• A partir do +9, são usados <em>Darkshard enhancement stones</em> e <em>Alexandrite</em>. Pedras divididas entre arma e armadura (crafting é a principal fonte).</li>
            <li>• Em caso de falha no enhancement, a correction chance (pity) é aumentada (cerca de 2x a 5x).</li>
            <li>• Acessórios de Annihilation também foram adicionados (upgrade a partir do Kaia's Fury, base rate 10%, brooches/circlets usam mais materiais e etching não é mantido).</li>
            <li className="text-red-400 italic mt-2">• Bug conhecido: Equip level anormal (agendado para correção no B132).</li>
          </ul>
        </div>
        <div className="bg-slate-800/40 p-4 rounded-lg border border-slate-700/50">
          <h4 className="text-amber-400 font-medium mb-2">Bônus Adicionais (+10/+12/+14/+15)</h4>
          <ul className="grid grid-cols-2 gap-2 text-xs">
            <li><strong>Arma:</strong> Damage amplification</li>
            <li><strong>Armadura:</strong> Toughness</li>
            <li><strong>Luvas:</strong> Critical chance</li>
            <li><strong>Botas:</strong> Critical resistance</li>
          </ul>
          <div className="mt-3 pt-3 border-t border-slate-700/50">
            <strong className="text-sky-400">Equipment Mastery:</strong> Preencher o EXP aumenta a chance de sucesso no valor da base chance (ex: 10% base chance + 10% mastery limit = 20% total).
          </div>
        </div>
      </div>
    </Card>

    <Card>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-sky-400" /> Mask of Annihilation
        </h3>
        <span className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-400">Total gear level: 800+</span>
      </div>
      <p className="text-sm text-slate-300 mb-4">
        Novo acessório que dropa em <strong>Akeron's Inferno (Hard)</strong> (2x por semana). Tradable e Bound on Equip (pode receber unbind 1 vez). Possui 3 random effects adicionais que mudam ao obter. Dismantling gera <em>Source of Destruction</em> (5x = Random Crate, 10x = Pode escolher a Mask).
      </p>

      <div className="overflow-x-auto rounded-lg border border-slate-800 mb-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-300 uppercase bg-slate-800">
            <tr>
              <th className="px-4 py-3 border-r border-slate-700 w-1/3">Item Name</th>
              <th className="px-4 py-3 border-r border-slate-700 w-1/3">Fixed Effect</th>
              <th className="px-4 py-3 w-1/3">Random Effect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {maskOfAnnihilation.map((mask, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="px-4 py-3 font-medium text-amber-200 border-r border-slate-800/60">{mask.name}</td>
                <td className="px-4 py-3 text-sky-200/90 whitespace-pre-line border-r border-slate-800/60">{mask.fixed}</td>
                <td className="px-4 py-3 text-slate-300">{mask.random}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const B131_CraftingTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Itens & Crafting" icon={Hammer} />

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold text-sky-400 mb-4">Novos Itens & Drops</h3>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <span><strong>Darkshard of Red Magic / Blue Enchanted Darkshard:</strong> Dropam em dungeons level 850+.</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <span><strong>Disenchantment Neutralizer:</strong> Dropa em dungeons 700–850 e Pet Adventures.</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <span><strong>[Season 2] Enchanting Dust:</strong> Dropa em dungeons (exceto 890/900). Drop total global reduzido.</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <span><strong>[Season 2] Broken Enchanted Steel Fragment:</strong> Dropa em RK-9 Kennel e dungeons 900.</span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <strong>Lágrimas de Elinu:</strong>
              <div className="mt-1 ml-2 text-xs text-slate-400 space-y-1">
                <p>• <em>Shining Tears of Elinu:</em> Dropa na maioria das dungeons. Restaura 10.000 Production Points (Tradable).</p>
                <p>• <em>Tears of Elinu:</em> Dropa de Pet Adventures. Restaura 500 Production Points (Not tradable, limite de 10 stacks).</p>
              </div>
            </div>
          </li>
        </ul>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-amber-400 mb-4">Mudanças Gerais (Itens)</h3>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5"></div>
            <span>Dungeon Core drop amount reduzido em 50% (Receba em dobro com ELITE GOLD).</span>
          </li>
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0 mt-1.5"></div>
            <span>Equipment EXP ganho em Dungeon Vanguard Requests será aumentado. Missões low-efficiency removidas após exceder 25 requests.</span>
          </li>
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5"></div>
            <span>Unbinding não será mais possível para: Stormcry, Heroic Oath, Kaia's Fury, Vergos.</span>
          </li>
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></div>
            <span>Desmontar Arun/Shara Stone nível 5 concede 1 Diamond (nível 7 concede 2 Diamonds).</span>
          </li>
          <li className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5"></div>
            <span>Preço de dungeon reset scrolls será ajustado (mudança no preço ocorrerá em 2 semanas).</span>
          </li>
        </ul>
      </Card>
    </div>

    <Card>
      <h3 className="text-lg font-semibold text-slate-200 mb-6">Novas Receitas de Crafting</h3>
      <p className="text-sm text-slate-400 mb-4 italic">Novas receitas dropam em dungeons acima de um certo level. Padrões de joias (Alexandrite) dropam apenas em dungeons 900+.</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-slate-800/40 p-5 rounded-lg border border-slate-700 flex flex-col">
          <h4 className="font-bold text-sky-200 mb-2">Alexandrite</h4>
          <p className="text-xs text-slate-400 mb-3 flex-grow">
            Gema de tier superior consumida ao encantar Annihilation +9 e acima.
          </p>
          <div className="bg-slate-900/80 p-3 rounded text-xs text-slate-300 border border-slate-800 mt-auto">
            <span className="text-amber-500/80 font-medium block mb-1">Custo:</span>
            10 Diamonds<br/>10k Craft Kits<br/>800 Prod. Points
          </div>
        </div>

        <div className="bg-slate-800/40 p-5 rounded-lg border border-slate-700 flex flex-col">
          <h4 className="font-bold text-sky-200 mb-2">Darkshard Weapon Stone</h4>
          <p className="text-xs text-slate-400 mb-3 flex-grow">
            Material de enchanting para armas Annihilation +9 e acima.
          </p>
          <div className="bg-slate-900/80 p-3 rounded text-xs text-slate-300 border border-slate-800 mt-auto">
            <span className="text-amber-500/80 font-medium block mb-1">Custo:</span>
            5 Disenchant Neutralizer<br/>10 Darkshard Red Magic<br/>500 Dust<br/>100 Prod. Points
          </div>
        </div>

        <div className="bg-slate-800/40 p-5 rounded-lg border border-slate-700 flex flex-col">
          <h4 className="font-bold text-sky-200 mb-2">Darkshard Armor Stone</h4>
          <p className="text-xs text-slate-400 mb-3 flex-grow">
            Material de enchanting para armaduras Annihilation +9 e acima.
          </p>
          <div className="bg-slate-900/80 p-3 rounded text-xs text-slate-300 border border-slate-800 mt-auto">
            <span className="text-amber-500/80 font-medium block mb-1">Custo:</span>
            5 Disenchant Neutralizer<br/>10 Blue Ench. Darkshard<br/>500 Dust<br/>100 Prod. Points
          </div>
        </div>

        <div className="bg-slate-800/40 p-5 rounded-lg border border-slate-700 flex flex-col">
          <h4 className="font-bold text-sky-200 mb-2">Sapphire (Bulk)</h4>
          <p className="text-xs text-slate-400 mb-3 flex-grow">
            Permite o craft de 10 unidades de uma vez.
          </p>
          <div className="bg-slate-900/80 p-3 rounded text-xs text-slate-300 border border-slate-800 mt-auto">
            <span className="text-amber-500/80 font-medium block mb-1">Custo:</span>
            20 Rubies<br/>200 Craft Kits<br/>200 Prod. Points
          </div>
        </div>
      </div>
    </Card>
  </div>
);

const B131_EventsTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Eventos e Mundo" icon={CalendarDays} />

    <div className="grid md:grid-cols-2 gap-6">
      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
        <h3 className="text-xl font-bold text-sky-400 mb-3">Easter Event</h3>
        <p className="text-slate-300 text-sm mb-4">
          Para celebrar a Páscoa, um evento será realizado. Encontre os ovos colocados em cada região e derrote o Caiman Egg Thief para obter recompensas.
        </p>
        <ul className="space-y-2 text-sm text-slate-400 mb-4">
          <li>• Troque recompensas por vários itens na loja exclusiva do evento.</li>
          <li>• O evento desbloqueia 1 estágio por dia durante 6 dias.</li>
          <li>• Todo o conteúdo estará aberto no dia 6.</li>
        </ul>
        <a href="#" className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors">
          Ver detalhes do evento <ChevronRight className="w-4 h-4" />
        </a>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
        <h3 className="text-xl font-bold text-amber-400 mb-3">Rapid Growth Event</h3>
        <p className="text-slate-300 text-sm mb-4">
          O Rapid Growth Event da Season 1 retorna. Você pode obtê-lo uma vez ao fazer login.
        </p>
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-300 px-3 py-1.5 rounded-md text-sm border border-amber-500/20">
          <CalendarDays className="w-4 h-4" />
          Período do evento: Até 11 de Junho de 2026
        </div>
      </Card>
    </div>

    <Card>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">World Events & Achievements</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sky-400 font-medium mb-3 flex items-center gap-2">
            <Swords className="w-4 h-4" /> World Events
          </h4>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex gap-3">
              <span className="text-slate-500">•</span>
              O HP do boss em Velika Defense aumenta significativamente.
            </li>
            <li className="flex gap-3">
              <span className="text-slate-500">•</span>
              Os efeitos base de buff concedidos em Guardian Missions são significativamente aumentados.
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sky-400 font-medium mb-3 flex items-center gap-2">
            <Award className="w-4 h-4" /> Achievements
          </h4>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex gap-3">
              <span className="text-slate-500">•</span>
              A season de Achievements irá mudar.
            </li>
            <li className="flex gap-3">
              <span className="text-slate-500">•</span>
              O cálculo de pontos de Achievement será resetado para as conquistas atualmente aplicadas.
            </li>
            <li className="text-slate-400 italic mt-2 ml-4">
              * Devido ao reset de pontuação, seu grade pode mudar.
            </li>
          </ul>
        </div>
      </div>
    </Card>
  </div>
);

const B131_SystemTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Sistema, Economia & Bugs" icon={Settings} />

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold text-amber-400 mb-4">Mudanças de Sistema & Economia</h3>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex justify-between border-b border-slate-800/60 pb-2">
            <span>Período de retenção de Mail</span>
            <span className="font-medium text-amber-200">180 dias → 30 dias</span>
          </li>
          <li className="flex justify-between border-b border-slate-800/60 pb-2">
            <span>Taxa ao enviar gold por Mail</span>
            <span className="font-medium text-amber-200">0.5% → 33%</span>
          </li>
          <li className="flex justify-between border-b border-slate-800/60 pb-2">
            <span>Custo base para enviar Mail</span>
            <span className="font-medium text-amber-200">10,000 gold</span>
          </li>
          <li className="flex justify-between border-b border-slate-800/60 pb-2">
            <span>Taxa do View Brokerage</span>
            <span className="font-medium text-amber-200">3% → 10% <span className="text-sky-300 text-xs ml-1">(ELITE GOLD: 2% → 0.5%)</span></span>
          </li>
          <li className="flex justify-between border-b border-slate-800/60 pb-2">
            <span>Período de listagem no Brokerage</span>
            <span className="font-medium text-amber-200">7 dias → 14 dias</span>
          </li>
          <li className="flex justify-between pb-2">
            <span>Tempo de espera para retornar a uma Guild</span>
            <span className="font-medium text-amber-200">24h → 72h</span>
          </li>
        </ul>
      </Card>

      <Card className="border-red-900/30 bg-red-950/10">
        <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Correções de Bugs
        </h3>
        <ul className="space-y-3 text-sm text-slate-300 list-disc pl-5">
          <li>Corrigido problema onde os efeitos do pet não atualizavam após terminar.</li>
          <li>Corrigido problema onde o efeito <em>corrosion</em> do pet era mantido ao realizar swap.</li>
          <li>Corrigido problema onde certos costumes não podiam receber <em>unbind</em> mesmo tendo contagens restantes.</li>
        </ul>
      </Card>
    </div>

    <Card className="border-l-4 border-l-amber-500 bg-slate-800/30">
      <h3 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        Nota dos Desenvolvedores: Estabilidade da Economia
      </h3>
      <div className="space-y-4 text-slate-300 text-sm leading-relaxed italic">
        <p>
          TERA proíbe a negociação de itens por dinheiro real (RMT). Mais precisamente, sob os termos do provedor da plataforma de console, a negociação de itens por dinheiro real não é permitida. Portanto, para continuar prestando serviços do TERA Console, temos a responsabilidade de estabilizar o ambiente in-game.
        </p>
        <p>
          Recentemente, muitos casos de golpes (scams) onde jogadores recebem gold primeiro por correio (Mail) e depois não entregam o item foram reportados, explorando a taxa baixa do Mail. Como consequência, para encorajar o uso do View Brokerage, baixamos a taxa para quem usa ELITE GOLD e dobramos o período de listagem dos itens.
        </p>
        <p>
          Se deixássemos a situação atual como está, é altamente provável que piorasse, então implementamos as medidas acima para aplicar alguma restrição. Contas envolvidas em crimes como scams já foram listadas, e todos os logs de chat e transferências de itens estão sendo gravados.
        </p>
        <p className="font-medium text-amber-200/90">
          Por favor, nunca envie gold ou itens para outros primeiro, e certifique-se de usar o View Brokerage. (Scams são considerados falha pessoal, então a restauração não é possível em nenhuma situação).
        </p>
        <p>
          Também note que não responderemos sob nenhuma circunstância a incidentes de hacking causados por exposição de senha.
        </p>
      </div>
    </Card>
  </div>
);


// ==========================================
// --- PATCH B130.03 TABS ---
// ==========================================

const B130_03_BugFixesTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Bug Fixes & Correções" icon={AlertTriangle} />

    <Card className="border-red-900/30 bg-red-950/10">
      <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" /> Resolução de Problemas
      </h3>
      <ul className="space-y-4 text-sm text-slate-300">
        <li className="flex flex-col gap-2 border-b border-slate-800/60 pb-4">
          <div className="flex gap-2 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5"></div>
            <span>Corrigido o problema onde o efeito <strong>Divine Charge</strong> do Priest desaparecia ao usar <strong>Energy Stars</strong>.</span>
          </div>
          <div className="pl-6 space-y-1 text-slate-400 italic">
            <p>• Em dungeons, os efeitos benéficos de Priest e Mystic não podem mais sobrescrever um ao outro.</p>
            <p>• Em raid dungeons, os efeitos benéficos de Priest e Mystic continuam podendo sobrescrever um ao outro.</p>
          </div>
        </li>
        <li className="flex gap-2 items-start pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5"></div>
          <span>Corrigido o problema onde os set effects de <strong>Accessory</strong> não realizavam stack.</span>
        </li>
      </ul>
    </Card>
  </div>
);


// ==========================================
// --- PATCH B130.02 TABS ---
// ==========================================

const B130_02_RewardsTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Rewards & Dungeon Drops" icon={Award} />

    <Card className="border-l-4 border-l-sky-500 bg-slate-800/30 mb-8">
      <h3 className="text-lg font-semibold text-sky-400 mb-3 flex items-center gap-2">
        <MessageSquare className="w-5 h-5" /> Notas dos Desenvolvedores
      </h3>
      <div className="space-y-3 text-slate-300 text-sm italic">
        <p>O <strong>DPS meter</strong> é uma feature temporária e não temos planos de desenvolvê-la ainda mais, já que desenvolvimento relacionado a isso é visto negativamente da perspectiva do desenvolvedor. Ele permanecerá até o B130, e qualquer implementação contínua será revisada separadamente.</p>
        <p><strong>Runes</strong> são conteúdo de progressão de tier alto, e <em>Rune Stat Change Stone</em> tem a intenção de dropar apenas de dungeons de tier superior. Para jogadores com um item level mais baixo, a progressão de rune é significativamente menos eficiente, então restringiremos intencionalmente o acesso para que você foque em progredir em outros elementos como Stigma e Card.</p>
        <p><strong>Dungeon Reset Scrolls</strong> podem apenas sofrer <em>dismantle</em> em versões composite. Não planejamos suportar <em>dismantle</em> para itens General, e pedimos que os usem quando as dungeons relevantes forem adicionadas no futuro.</p>
      </div>
    </Card>

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold text-amber-400 mb-4">Dungeon Rewards</h3>
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <h4 className="font-bold text-sky-200 mb-1">Cursed Antaroth's Abyss</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Drop de <em>Rune Stat Change Stone</em> (Shared party loot).</li>
              <li>Drop de <em>Rune Stat Change Stone Crate (Tradeable)</em> com chance ao invés da pedra base (Personal loot). Quando usado concede de 5 a 20 pedras aleatoriamente.</li>
            </ul>
          </div>
          <div className="border-t border-slate-700/50 pt-3">
            <h4 className="font-bold text-amber-200 mb-1 flex items-center gap-2"><Star className="w-4 h-4"/> Ghillieglade (ELITE GOLD)</h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Arun/Shara Stone Jewel Gacha Box (Lv. 1) → <em>Rune Stat Change Stone</em></li>
              <li>Arun/Shara Stone Jewel Gacha Box (Lv. 1~3) → <em>Diamond</em></li>
              <li>Bracelet of Absolute Equilibrium → <em>God's Power Stone</em></li>
              <li>Drop de Fluorite Shard, Rune Stat Change e materiais de rune aumentados. Drop de Runestone reduzido.</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-sky-400 mb-4">Vanguard & Dismantling</h3>
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <h4 className="font-bold text-slate-200 mb-1">Vanguard Request</h4>
            <p className="text-slate-400">A recompensa base de reputation para Abyss of the Cursed Antaroth (Last Stand) ajustada de 1000 → 1150.</p>
          </div>
          <div className="border-t border-slate-700/50 pt-3">
            <h4 className="font-bold text-slate-200 mb-1">Dismantling Adicionado</h4>
            <p className="text-slate-400 mb-2">Os itens a seguir agora podem ser <em>dismantled</em>:</p>
            <ul className="list-disc pl-5 space-y-1 text-amber-200/90 italic">
              <li>Growth Support: [Season 1] Enhancement Powder (30 days)</li>
              <li>Growth Support: [Season 1] Enhancement Powder (Entire Season)</li>
              <li>Instance Reset Scroll</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const B130_02_ClassesTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Classes & Balanceamento" icon={UserCog} />

    <Card className="border-l-4 border-l-amber-500 bg-slate-800/30 mb-8">
      <h3 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
        <MessageSquare className="w-5 h-5" /> Balanceamento de Healers
      </h3>
      <div className="space-y-3 text-slate-300 text-sm italic">
        <p>Após a recente atualização de healer coefficient, o balanço entre Priest e Mystic foi severamente quebrado. Ajustaremos o Mystic para trazer a situação o mais próximo do balanço possível.</p>
        <p>A taxa de amplificação (amplification rate) dos efeitos fornecidos por healers aumentou mais de 8x comparado a antes, fazendo com que partys com dois healers se tornassem mais efetivas que partys com um healer. Alta sobrevivência para essas partys é intencional, mas alta performance não. Portanto, tomamos medidas para evitar que os efeitos de ambos <em>stackem</em> (acumulem).</p>
      </div>
    </Card>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <h3 className="text-lg font-bold text-sky-300 mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5"/> Mystic</h3>
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <strong className="text-slate-100 block mb-1">Fortified Thrall of Vengeance</strong>
            <p className="text-amber-200/90">Power increase alterado de 23 → 28.</p>
            <p className="text-slate-400 text-xs mt-1">* Quando aplicado, remove Blessing of Shakan / Energy Stars do Priest.</p>
          </div>
          <div className="border-t border-slate-700/50 pt-3">
            <strong className="text-slate-100 block mb-1">Summon: Thrall Lord</strong>
            <p className="text-amber-200/90">Cooldown alterado de 600 → 150 segundos.</p>
            <p className="text-slate-400 text-xs mt-2 italic">Se usado após Thrall Augmentation:</p>
            <ul className="list-disc pl-4 text-xs space-y-1 mt-1 text-slate-400">
              <li>Power increase de 15 → 55.</li>
              <li>Duração de 30s → 25s.</li>
              <li>Remove Blessing of Shakan / Energy Stars.</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2"><Shield className="w-5 h-5"/> Priest</h3>
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <strong className="text-slate-100 block mb-1">Blessing of Shakan / Energy Stars</strong>
            <p className="text-slate-400 text-xs mt-1">Ao ser usado, remove forçadamente os efeitos <em>Fortified Thrall of Vengeance</em> e <em>Thrall Lord's Favor</em> do Mystic.</p>
          </div>
          <div className="border-t border-slate-700/50 pt-3">
            <strong className="text-slate-100 block mb-1">Kaia's Shield</strong>
            <p className="text-amber-200/90">Alterado de <em>lock-on → shot-type skill</em> para <strong>instant cast skill</strong>.</p>
            <p className="text-slate-400 text-xs mt-2 italic">* Feito para resolver o problema de cancelamento em ambientes de alto ping.</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2"><Swords className="w-5 h-5"/> Warrior & System</h3>
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <strong className="text-slate-100 block mb-1">Warrior: Blade Draw</strong>
            <p className="text-slate-400 text-xs">O efeito que reduz o cooldown restante de <em>Infuriate</em> foi significativamente reduzido comparado a antes.</p>
          </div>
          <div className="border-t border-slate-700/50 pt-3">
            <strong className="text-slate-100 block mb-1">System Messages</strong>
            <p className="text-slate-400 text-xs">Mensagens de sistema para <em>glyph effects</em> engatilhados por cada classe não serão mais mostrados. Pode sofrer rollback se dificultar o reconhecimento das skills.</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const B130_02_SystemTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Bug Fixes & Correções" icon={AlertTriangle} />

    <Card className="border-red-900/30 bg-red-950/10">
      <ul className="space-y-3 text-sm text-slate-300 list-disc pl-5">
        <li>Corrigido problema em <em>Abyss of the Cursed Antaroth (Last Stand)</em> onde um <em>wipe pattern</em> impossível ocorria ao fazer certas ações.</li>
        <li>Corrigido problema em <em>Refined Stigma</em> onde uma opção rara de cooldown poderia ser selecionada.</li>
        <li>Corrigido problema de pacote de idiomas onde o valor da tradução para “Will of Battle” estava incorreto.</li>
        <li>Corrigido problema onde a animação de entrada desaparecia ao aplicar <em>shaders/post-processing</em> (ex: usando skills Godsfall).</li>
        <li>Corrigido problema onde as receitas de evento não podiam sofrer crafting.</li>
      </ul>
    </Card>
  </div>
);


// ==========================================
// --- PATCH B130.01 TABS ---
// ==========================================

const B130_01_BattlePassTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Battle Pass - EVENT SEASON" icon={Award} />

    <div className="grid md:grid-cols-2 gap-6">
      <Card className="border-t-4 border-t-sky-500">
        <h3 className="text-lg font-semibold text-sky-400 mb-4 flex items-center gap-2">
          <CalendarDays className="w-5 h-5" />
          Evento Especial: 5 Semanas
        </h3>
        <p className="text-slate-300 mb-4">O evento Battle Pass terá duração de 5 semanas (26/02/2026 ~ 02/04/2026).</p>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <p className="text-sm text-amber-200">Pode ser adquirido por <strong>1,000 TERA Coins</strong>.</p>
          <p className="text-sm text-slate-300 mt-2">Um total de <strong>500 TERA Coins</strong> será retornado como <em>payback</em> no Nível 50!</p>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-sky-400" />
          Principais Recompensas
        </h3>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> <span>[Rare] Passionate Yukata Box</span></li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> <span>Perfect Stigma Crystal (Legendary)</span></li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> <span>Refined Stigma Crystal (Legendary)</span></li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div> <span>Dungeon Reset Scroll Fragment</span></li>
          <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-sky-400"></div> <strong className="text-sky-300">500 TERA Coins</strong></li>
        </ul>
      </Card>
    </div>
  </div>
);

const B130_01_DungeonsTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Novas Dungeons" icon={Swords} />

    <Card className="mb-6 border-l-4 border-l-red-500">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
          Cursed Antaroth - Last Stand
        </h3>
        <div className="text-right">
          <span className="block text-sm font-bold text-amber-500">Item Level: 900</span>
          <span className="block text-xs text-slate-400">Entry limit: 2</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 text-sm text-slate-300">
        <div>
          <h4 className="font-semibold text-slate-200 mb-2">Entrada & Leaderboard</h4>
          <ul className="list-disc pl-4 space-y-1 mb-4 text-slate-400">
            <li>Dedução de entrada compartilhada: Cursed Antaroth / Hard.</li>
            <li>Possível entrar com reset scrolls mesmo que as entradas compartilhadas estejam em 0.</li>
            <li>Não é possível usar "Battle Pass: All Dungeon Reset Scrolls".</li>
            <li>Leaderboard em tempo real adicionado (sem recompensas atreladas).</li>
          </ul>
          <h4 className="font-semibold text-slate-200 mb-2">Mecânicas</h4>
          <ul className="list-disc pl-4 space-y-1 text-slate-400">
            <li>Em certos limiares de HP, efeitos de restrição de heal ou ressurreição são aplicados aleatoriamente.</li>
            <li>Aplicação de 1 de 3 mecânicas especiais aleatórias e patterns condicionais.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-amber-300 mb-2">Recompensas e Drops</h4>
          <ul className="list-disc pl-4 space-y-1 text-slate-400">
            <li>Acquisition nas Boxes foi levemente aumentado.</li>
            <li>Item "Cursed Abyss Power" não cairá mais nas boxes.</li>
            <li>Materiais de Rune dropam com 100% de quantidade adicional.</li>
            <li><span className="text-sky-300">Drop adicional por chance:</span> Rune Essence of Inheritance, Stone Imbued with Divine Power, Random Engraving Book Box - Legendary.</li>
          </ul>
        </div>
      </div>
    </Card>

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-sky-400">Frozen Star - Lower</h3>
          <div className="text-right">
            <span className="block text-xs font-bold text-amber-500">Level: 815 | Limit: 2</span>
            <span className="block text-xs text-slate-400">Loc: Westonia</span>
          </div>
        </div>
        <ul className="list-disc pl-4 space-y-1 text-sm text-slate-300">
          <li>Recompensa do Vanguard Request igual ao tier 800.</li>
          <li>Possui parte da Drop Table da versão de tier superior.</li>
          <li>Drops: <em>Refined Stigma Synthesis Scroll, Stigma Refinement Stone, Crafting Design - Powder of Annihilation</em>.</li>
          <li>Baixa chance de dropar: <em>Random Engraving Book Box - Legendary</em>.</li>
        </ul>
      </Card>

      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-amber-400">Frozen Star - EVENT (Solo)</h3>
          <div className="text-right">
            <span className="block text-xs font-bold text-amber-500">Level: 500 | Limit: 2</span>
            <span className="block text-xs text-slate-400">Loc: Velika, Highwatch</span>
          </div>
        </div>
        <p className="text-sm text-slate-300 mb-2">Itens requeridos para participação no evento droparão aqui:</p>
        <ul className="list-disc pl-4 space-y-1 text-sm text-amber-200/90 italic">
          <li>[Event] Frozen Heart</li>
          <li>[Event] Burning Heart</li>
        </ul>
      </Card>
    </div>
  </div>
);

const B130_01_CraftingItemsTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Crafting, Stigmas & Itens" icon={Hammer} />

    <Card className="mb-6">
      <h3 className="text-lg font-bold text-sky-400 mb-4">Bulk Gem Crafting</h3>
      <p className="text-sm text-slate-300 mb-4">Novas receitas para "Bulk Gem" foram adicionadas, permitindo consumir grande quantidade de Production Points de uma só vez. Obtidas em dungeons 700+ com chance baixa.</p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
          <h4 className="font-bold text-green-400 mb-2">Bulk Emeralds</h4>
          <ul className="text-xs space-y-1 text-slate-300">
            <li><strong>PP Consumido:</strong> 600</li>
            <li><strong>Materiais:</strong> 50 Sapphires, 1k Crafting Kits</li>
            <li><strong>Sucesso:</strong> 10 Emeralds (13 no Great Success)</li>
          </ul>
        </div>
        <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
          <h4 className="font-bold text-cyan-400 mb-2">Bulk Diamonds</h4>
          <ul className="text-xs space-y-1 text-slate-300">
            <li><strong>PP Consumido:</strong> 3,500</li>
            <li><strong>Materiais:</strong> 100 Emeralds, 10k Crafting Kits</li>
            <li><strong>Sucesso:</strong> 10 Diamonds (13 no Great Success)</li>
          </ul>
        </div>
      </div>
    </Card>

    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-bold text-amber-400 mb-4">Stigma & Runes</h3>
        <div className="space-y-4 text-sm text-slate-300">
          <div>
            <h4 className="font-bold text-slate-200">Stigma Updates</h4>
            <ul className="list-disc pl-4 space-y-1 text-xs mt-1 text-slate-400">
              <li>Efeitos Common não aparecerão mais (seus stigmas atuais serão convertidos para Superior).</li>
              <li>Custos de Gold reduzidos para trocar opções no estágio Superior/Rare.</li>
              <li>Chance de Enhancement e chance de compensação de falha (pity) bastante aumentada (1% → 5%).</li>
              <li>Legendary Stigmas podem receber upgrade para <em>Refined Stigma</em> (1.5M gold, opções aleatórias não são mantidas).</li>
            </ul>
          </div>
          <div className="border-t border-slate-700/50 pt-2">
            <h4 className="font-bold text-slate-200">Runes Updates</h4>
            <ul className="list-disc pl-4 space-y-1 text-xs mt-1 text-slate-400">
              <li>Limite de troca de opções aumentado de 5 para 100 vezes.</li>
              <li>Consumo de option change stones e gold consumido para <em>Rune polishing</em> bastante aumentados.</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-bold text-sky-400 mb-4">Misc Items & Systems</h3>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="flex gap-2"><div className="text-amber-500 shrink-0">•</div> <span><strong>ELITE GOLD:</strong> O cooldown de ressurreição mudou de 24h → 2 horas.</span></li>
          <li className="flex gap-2"><div className="text-amber-500 shrink-0">•</div> <span><strong>World Event:</strong> Um merchant de troca de Reputation Point foi adicionado a Highwatch.</span></li>
          <li className="flex gap-2"><div className="text-amber-500 shrink-0">•</div> <span><strong>Pet Adventures:</strong> Arborea’s Golden/Silver Plate removidos. Fluorite Fragments e Broken Rune Pieces adicionados.</span></li>
          <li className="flex gap-2"><div className="text-amber-500 shrink-0">•</div> <span><strong>Bracelets:</strong> Podem sofrer <em>dismantle</em> em troca de 5 Fluorites. Pequena chance de dropar <em>Stone Imbued with Divine Power</em>.</span></li>
          <li className="flex gap-2"><div className="text-amber-500 shrink-0">•</div> <span><strong>Reset Scrolls:</strong> Podem ser <em>dismantled</em> por fragmentos para trocar por scrolls de outras dungeons. Cooldown dos scrolls mudou para 30 mins.</span></li>
        </ul>
      </Card>
    </div>
  </div>
);

const B130_01_ClassesTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Classes & Skills" icon={UserCog} />

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card><h3 className="font-bold text-sky-300 mb-2">Mystic</h3>
        <p className="text-sm text-slate-300 mb-1"><strong>Thrall Augmentation + Summon: Thrall Lord</strong></p>
        <ul className="text-xs text-slate-400 list-disc pl-4 space-y-1">
          <li>Se sumonado durante a skill, concede Power +15 e Attack Speed +5% para a party (30s).</li>
          <li>Animação simplificada; spawna um Thrall Lord Rosa.</li>
          <li>Não realiza <em>dismiss</em> do Thrall of Wrath/Vengeance (mas estes continuam restritos de coexistirem).</li>
        </ul>
      </Card>

      <Card><h3 className="font-bold text-amber-300 mb-2">Priest</h3>
        <p className="text-sm text-slate-300 mb-1"><strong>Kaia's Shield V</strong></p>
        <p className="text-xs text-slate-400 mb-3">Após lock-on, o casting passa a permitir movimento.</p>
        <p className="text-sm text-slate-300 mb-1"><strong>Divine Charge</strong></p>
        <p className="text-xs text-slate-400">Em carga máxima, critical power aumenta de 20% → 40%.</p>
      </Card>

      <Card><h3 className="font-bold text-red-400 mb-2">Berserker</h3>
        <p className="text-sm text-slate-300 mb-1"><strong>Unleashed</strong></p>
        <ul className="text-xs text-slate-400 list-disc pl-4 space-y-1 mb-3">
          <li>Casting speed 20% mais rápido. Evasivo até o shockwave sair.</li>
          <li>Rage restaurado imensamente no shockwave. Pode cancelar com Beastly Charge no máx Rage.</li>
        </ul>
        <p className="text-sm text-slate-300 mb-1"><strong>Frenzy</strong></p>
        <p className="text-xs text-slate-400">Cooldown reduz de 90s → 70s. Power de 20% → 16%.</p>
      </Card>

      <Card><h3 className="font-bold text-slate-300 mb-2">Warrior</h3>
        <p className="text-sm text-slate-300 mb-1"><strong>Cross Parry</strong></p>
        <p className="text-xs text-slate-400 mb-3">Em um bloqueio de sucesso, Storm Aura não desaparece mais. Perfect Block habilitado.</p>
        <p className="text-sm text-slate-300 mb-1"><strong>Blade Frenzy: Slash</strong></p>
        <p className="text-xs text-slate-400">Ao usar, o cooldown de Infuriate é reduzido.</p>
      </Card>

      <Card><h3 className="font-bold text-indigo-300 mb-2">Ninja</h3>
        <p className="text-sm text-slate-300 mb-1"><strong>Willpower Skills</strong></p>
        <p className="text-xs text-slate-400 mb-3">Recuperação de Willpower aumentada em: Shuriken Burst, Spread Shuriken, Throw Fireball, Quick Attack.</p>
        <p className="text-sm text-slate-300 mb-1"><strong>Evasion Skills</strong></p>
        <p className="text-xs text-slate-400">Tempo de Evasão aumentado levemente em Retreat, Inner Harmony e Evasive Smoke.</p>
      </Card>

      <Card className="bg-slate-800/30">
        <h3 className="font-bold text-slate-400 mb-2 flex items-center gap-2"><Settings className="w-4 h-4"/> System Messages</h3>
        <p className="text-xs text-slate-400">Mensagens de sistema engatilhados por cada classe não serão mais exibidos (passível de rollback caso afete o monitoramento).</p>
      </Card>
    </div>
  </div>
);

const B130_01_SystemTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Bug Fixes & System" icon={AlertTriangle} />

    <Card className="border-red-900/30 bg-red-950/10">
      <ul className="space-y-3 text-sm text-slate-300 list-disc pl-5">
        <li>Corrigido nome ausente do pet "Kunkun" em idiomas diferentes do Coreano.</li>
        <li>Corrigido problema onde o Reaper podia ignorar special patterns do Cursed Antaroth.</li>
        <li>Corrigido problema onde a chance não aumentava de acordo com a gear EXP para o Brooch of the Solemn Oath e Circlet of the Solemn Oath.</li>
        <li>Corrigido mensagens não aparecendo em Cursed Antaroth.</li>
        <li>Corrigido wipe attack não engatilhando mesmo cumprindo as condições no Cursed Antaroth (Hard).</li>
        <li>Corrigido quest steps da "To Stop the Ghilliedhus" na vila.</li>
      </ul>
    </Card>
  </div>
);

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
// --- MAIN APP STRUCTURE ---
// ==========================================

export default function App() {
  const [activePatchId, setActivePatchId] = useState(patchHistory[0].id);
  const [activeTabId, setActiveTabId] = useState(patchHistory[0].tabs[0].id);

  const activePatch = patchHistory.find(p => p.id === activePatchId);

  // When patch changes, default to its first tab
  useEffect(() => {
    if (activePatch) {
      setActiveTabId(activePatch.tabs[0].id);
    }
  }, [activePatchId]);

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
        <aside className="w-full lg:w-72 shrink-0 flex flex-col">
          <div className="sticky top-8">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4 px-2 flex items-center gap-2">
              <History className="w-4 h-4" /> Histórico de Versões
            </h3>

            {/* Version List */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x">
              {patchHistory.map(patch => {
                const isActive = activePatchId === patch.id;
                return (
                  <button
                    key={patch.id}
                    onClick={() => setActivePatchId(patch.id)}
                    className={`text-left px-4 py-4 rounded-xl border transition-all flex flex-col min-w-[240px] lg:min-w-0 snap-start
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
          <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800/80 pb-4">
            {activePatch.tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
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
            TERA Console Operations Team
          </p>
        </div>
      </footer>
    </div>
  );
}
