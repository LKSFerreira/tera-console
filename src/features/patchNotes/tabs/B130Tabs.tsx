import { Award, CalendarDays, Hammer, MessageSquare, Shield, Sparkles, Swords, AlertTriangle, UserCog, Settings, Star } from 'lucide-react';
import { Card, SectionTitle } from '../../../components/ui';

// ==========================================
// --- PATCH B130.03 TABS ---
// ==========================================

export const B130_03_BugFixesTab = () => (
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

export const B130_02_RewardsTab = () => (
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

export const B130_02_ClassesTab = () => (
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

export const B130_02_SystemTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Bug Fixes & System" icon={AlertTriangle} />

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

export const B130_01_BattlePassTab = () => (
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

export const B130_01_DungeonsTab = () => (
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

export const B130_01_CraftingItemsTab = () => (
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

export const B130_01_ClassesTab = () => (
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

export const B130_01_SystemTab = () => (
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
