import { Award, CalendarDays, ChevronRight, Hammer, MessageSquare, Shield, ShieldAlert, Sparkles, Swords, Zap, AlertTriangle, Settings } from 'lucide-react';
import { Card, SectionTitle } from '../../../components/ui';
import { battlePassPlus, battlePassRewards, dungeonsList, maskOfAnnihilation } from '../../../data/patchNotesB131';

export const B131_BattlePassTab = () => (
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

export const B131_DungeonsTab = () => (
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

export const B131_GearTab = () => (
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

export const B131_CraftingTab = () => (
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

export const B131_EventsTab = () => (
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

export const B131_SystemTab = () => (
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
