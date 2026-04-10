import {
  AlertTriangle,
  Award,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Hammer,
  MessageSquare,
  Settings,
  Shield,
  ShieldAlert,
  Sparkles,
  Swords,
  Zap,
} from 'lucide-react';
import { Card, SectionTitle } from '../../../components/ui';
import {
  accessoryConsolidationHighlights,
  accessoryPromotionChanges,
  additionalAccessoryUpgradeHighlights,
  annihilationBonusBreakdown,
  annihilationEnhancementHighlights,
  achievementChanges,
  battlePassPlus,
  battlePassRewards,
  bugFixes,
  craftingCleanupChanges,
  craftingRecipes,
  dungeonDevNote,
  dungeonOtherChanges,
  dungeonOverviewHighlights,
  dungeonScalingChanges,
  dungeonsList,
  easterEggHuntSteps,
  easterEventInfo,
  easterJackpotRewards,
  easterShopItems,
  itemRewardChanges,
  maskHighlights,
  maskOfAnnihilation,
  newItemSources,
  rapidGrowthChanges,
  rapidGrowthInfo,
  seasonAdditionalChanges,
  seasonRewardBreakdown,
  seasonRewardSections,
  serghettoHighlights,
  systemChanges,
  systemDevNote,
  upcomingItemChanges,
  worldEventChanges,
} from '../../../data/patchNotesB131';
import accessoryConsolidationImage from '../../../assets/imagens/B131_01/accessory_consolidation.webp';
import additionalAccessoryUpgradesImage from '../../../assets/imagens/B131_01/additional_accessory_upgrades.webp';
import annihilationEnhancementImage from '../../../assets/imagens/B131_01/annihilation_enhancement.webp';
import dropMaskOfAnnihilationImage from '../../../assets/imagens/B131_01/drop_mask_of_annihilation.webp';
import event10Image from '../../../assets/imagens/B131_01/evento_10.webp';
import event11Image from '../../../assets/imagens/B131_01/evento_11.webp';
import event2Image from '../../../assets/imagens/B131_01/evento_2.webp';
import event3Image from '../../../assets/imagens/B131_01/evento_3.webp';
import event4Image from '../../../assets/imagens/B131_01/evento_4.webp';
import event5Image from '../../../assets/imagens/B131_01/evento_5.webp';
import event6Image from '../../../assets/imagens/B131_01/evento_6.webp';
import event7Image from '../../../assets/imagens/B131_01/evento_7.webp';
import event8Image from '../../../assets/imagens/B131_01/evento_8.webp';
import event9Image from '../../../assets/imagens/B131_01/evento_9.webp';
import rewardsDungeonsImage from '../../../assets/imagens/B131_01/rewards_dungeons.webp';
import serghettoImage from '../../../assets/imagens/B131_01/serghetto.webp';
import shopSerghettoImage from '../../../assets/imagens/B131_01/shop_serghetto.webp';
import typeOfMaskOfAnnihilationImage from '../../../assets/imagens/B131_01/type_of_mask_of_annihilation.webp';
import weaponAnnihilation15Image from '../../../assets/imagens/B131_01/weapon_annihilation_+15.webp';

interface FiguraPatchProps {
  alt: string;
  caption: string;
  src: string;
  className?: string;
}

interface ListaSetasProps {
  itens: string[];
}

const FiguraPatch = ({ alt, caption, src, className = '' }: FiguraPatchProps) => (
  <figure className={`overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/60 shadow-xl ${className}`}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
    />
    <figcaption className="border-t border-slate-800/70 px-4 py-3 text-xs text-slate-400">{caption}</figcaption>
  </figure>
);

const ListaSetas = ({ itens }: ListaSetasProps) => (
  <ul className="space-y-3 text-sm text-slate-300">
    {itens.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const NotaDesenvolvedor = ({ titulo, paragrafos }: { titulo: string; paragrafos: string[] }) => (
  <Card className="border-l-4 border-l-amber-500 bg-slate-800/30">
    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-400">
      <MessageSquare className="h-5 w-5" />
      {titulo}
    </h3>
    <div className="space-y-4 text-sm italic leading-relaxed text-slate-300">
      {paragrafos.map((paragrafo) => (
        <p key={paragrafo}>{paragrafo}</p>
      ))}
    </div>
  </Card>
);

export const B131_BattlePassTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Battle Pass da Temporada 21" icon={Award} />

    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-t-4 border-t-amber-500">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-400">
          <CalendarDays className="h-5 w-5" />
          Período do Battle Pass
        </h3>
        <ul className="space-y-3 text-slate-300">
          <li className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Disponível:</span>
            <span>09/04/2026 a 06/08/2026</span>
          </li>
          <li className="flex justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">Período de vendas:</span>
            <span>09/04/2026 a 30/07/2026</span>
          </li>
        </ul>
        <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100/90">
          O Event Battle Pass anterior será encerrado e a Season 21 começa após a manutenção.
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-100">
          <Sparkles className="h-5 w-5 text-amber-500" />
          Conteúdo do Battle Pass PLUS
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
              <tr>
                <th className="rounded-tl-lg px-4 py-3">Item</th>
                <th className="rounded-tr-lg px-4 py-3 text-right">Qtd.</th>
              </tr>
            </thead>
            <tbody>
              {battlePassPlus.map((itemPlus) => (
                <tr key={itemPlus.item} className="border-b border-slate-800/50 transition-colors hover:bg-slate-800/30">
                  <td className="px-4 py-3 font-medium text-amber-100/90">{itemPlus.item}</td>
                  <td className="px-4 py-3 text-right text-slate-300">{itemPlus.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>

    <Card>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-100">Recompensas do Battle Pass por nível</h3>
        <span className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400">
          Nomes oficiais dos itens preservados
        </span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-800 text-xs uppercase text-slate-300">
            <tr>
              <th className="w-16 border-r border-slate-700 px-4 py-4 text-center">Nível</th>
              <th className="border-r border-slate-700 px-4 py-4">Recompensa Free</th>
              <th className="w-24 border-r border-slate-700 px-4 py-4 text-center">Qtd.</th>
              <th className="border-r border-slate-700 px-4 py-4 text-amber-400">Recompensa Premium</th>
              <th className="w-24 px-4 py-4 text-center text-amber-400">Qtd.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {battlePassRewards.map((recompensa) => (
              <tr
                key={`${recompensa.level}-${recompensa.freeItem}-${recompensa.premiumItem}`}
                className="transition-colors hover:bg-slate-800/40"
              >
                <td className="border-r border-slate-800/60 px-4 py-3 text-center font-bold text-slate-400">{recompensa.level}</td>
                <td className="border-r border-slate-800/60 px-4 py-3 text-slate-300">{recompensa.freeItem}</td>
                <td className="border-r border-slate-800/60 px-4 py-3 text-center text-slate-400">{recompensa.freeQty}</td>
                <td className="border-r border-slate-800/60 px-4 py-3 text-amber-100/80">{recompensa.premiumItem}</td>
                <td className="px-4 py-3 text-center text-amber-200/80">{recompensa.premiumQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

export const B131_SeasonTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Temporada 2 & Recompensas" icon={BookOpen} />

    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-l-4 border-l-sky-500 bg-slate-800/30">
        <h3 className="mb-4 text-lg font-semibold text-sky-400">Processamento de fim de temporada</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <p>
            Itens de equipamento da <strong>Season 1</strong> passam a poder ser desmontados, perdem seus efeitos-base e deixam de
            receber aprimoramento.
          </p>
          <p>
            Itens da <strong>Season 2</strong> serão adicionados para compra. O método de obtenção permanece o mesmo e os itens
            recebidos serão entregues temporariamente em estado indestrutível.
          </p>
          <p>O consumo de Diamond no intervalo +37 a +40 será levemente reduzido.</p>
        </div>

        <div className="mt-5 overflow-x-auto rounded-lg border border-slate-700/60">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-xs uppercase text-slate-300">
              <tr>
                <th className="border-r border-slate-700 px-4 py-3">Faixa</th>
                <th className="border-r border-slate-700 px-4 py-3">Arma</th>
                <th className="border-r border-slate-700 px-4 py-3">Armadura</th>
                <th className="px-4 py-3">Luvas / Botas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {seasonRewardBreakdown.map((faixa) => (
                <tr key={faixa.range}>
                  <td className="border-r border-slate-800/60 px-4 py-3 font-medium text-sky-200">{faixa.range}</td>
                  <td className="border-r border-slate-800/60 px-4 py-3">{faixa.weapon}</td>
                  <td className="border-r border-slate-800/60 px-4 py-3">{faixa.armor}</td>
                  <td className="px-4 py-3">{faixa.glovesFootwear}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-amber-400">Mudanças adicionais da Temporada 2</h3>
        <FiguraPatch
          src={rewardsDungeonsImage}
          alt="Resumo visual das mudanças de drops e recompensas"
          caption="Resumo visual das mudanças relacionadas a drops, recompensas e progressão da Season 2."
          className="mb-5"
        />
        <ListaSetas itens={seasonAdditionalChanges} />
      </Card>
    </div>

    <Card className="border border-slate-700/60 bg-slate-800/30">
      <h3 className="mb-3 text-lg font-semibold text-slate-100">Season 2 Reward Plan</h3>
      <p className="text-sm text-slate-300">
        As recompensas abaixo utilizam o token sazonal <strong>Condensed Curse of the Abyss Token</strong>. A lista do NPC de
        recompensas atual será convertida para a versão da Season 1 e o token anterior de crescimento deixará de ser utilizado.
      </p>
    </Card>

    <div className="grid gap-6 xl:grid-cols-2">
      {seasonRewardSections.map((secao) => (
        <Card key={secao.title}>
          <h3 className="mb-4 text-lg font-semibold text-slate-100">{secao.title}</h3>
          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800 text-xs uppercase text-slate-300">
                <tr>
                  <th className="border-r border-slate-700 px-4 py-3">Item</th>
                  <th className="border-r border-slate-700 px-4 py-3 text-center">Preço</th>
                  <th className="border-r border-slate-700 px-4 py-3 text-center">Limite</th>
                  <th className="px-4 py-3 text-center">Qtd.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {secao.items.map((itemSecao) => (
                  <tr key={`${secao.title}-${itemSecao.item}`} className="transition-colors hover:bg-slate-800/40">
                    <td className="border-r border-slate-800/60 px-4 py-3 text-slate-200">{itemSecao.item}</td>
                    <td className="border-r border-slate-800/60 px-4 py-3 text-center text-amber-300">{itemSecao.price}</td>
                    <td className="border-r border-slate-800/60 px-4 py-3 text-center text-slate-400">{itemSecao.limitType}</td>
                    <td className="px-4 py-3 text-center text-slate-300">{itemSecao.limitQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {secao.note ? <p className="mt-4 text-xs text-slate-400">{secao.note}</p> : null}
        </Card>
      ))}
    </div>
  </div>
);

export const B131_DungeonsTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Dungeons & Ajustes de Mundo" icon={Swords} />

    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
      <Card className="border-l-4 border-l-sky-500 bg-slate-800/30">
        <h3 className="mb-4 text-lg font-semibold text-sky-400">Rotação de dungeons</h3>
        <div className="mb-5 rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
          <ListaSetas itens={dungeonOverviewHighlights} />
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-xs uppercase text-slate-300">
              <tr>
                <th className="border-r border-slate-700 px-4 py-3">Dungeon</th>
                <th className="w-28 border-r border-slate-700 px-4 py-3 text-center">Required Lv</th>
                <th className="px-4 py-3">Notas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {dungeonsList.map((dungeon) => (
                <tr key={dungeon.name} className="transition-colors hover:bg-slate-800/40">
                  <td className="border-r border-slate-800/60 px-4 py-3 text-slate-200">{dungeon.name}</td>
                  <td className="border-r border-slate-800/60 px-4 py-3 text-center text-amber-300">{dungeon.req}</td>
                  <td className="px-4 py-3 text-slate-400">{dungeon.note || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="space-y-6">
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-amber-400">Serghetto, o comerciante secreto</h3>
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <FiguraPatch
              src={serghettoImage}
              alt="Serghetto pode aparecer ao concluir uma dungeon"
              caption="Serghetto pode surgir ao concluir uma dungeon."
            />
            <FiguraPatch
              src={shopSerghettoImage}
              alt="Loja do Serghetto com ofertas de gemas"
              caption="A seleção e a quantidade de itens mudam a cada aparição."
            />
          </div>
          <ListaSetas itens={serghettoHighlights} />
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-100">Escalonamento e remoções</h3>
          <div className="mb-5">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Ajustes por item level</h4>
            <ListaSetas itens={dungeonScalingChanges} />
          </div>
          <div className="border-t border-slate-800/60 pt-5">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Outras mudanças</h4>
            <ListaSetas itens={dungeonOtherChanges} />
          </div>
        </Card>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-100">
          <Award className="h-5 w-5 text-amber-500" />
          Achievements
        </h3>
        <ListaSetas itens={achievementChanges} />
      </Card>

      <Card>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-100">
          <CalendarDays className="h-5 w-5 text-sky-400" />
          World Events
        </h3>
        <ListaSetas itens={worldEventChanges} />
      </Card>
    </div>

    <NotaDesenvolvedor titulo="Dev's Note: ritmo das dungeons" paragrafos={dungeonDevNote} />
  </div>
);

export const B131_GearTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Equipamentos & Progressão" icon={Shield} />

    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card className="border-t-4 border-t-amber-500">
        <h3 className="mb-4 text-lg font-semibold text-amber-400">Accessory Consolidation</h3>
        <FiguraPatch
          src={accessoryConsolidationImage}
          alt="Resumo visual da consolidação de acessórios"
          caption="Stormcry, Heroic Oath, Enhanced Heroic Oath e Kaia's Fury passam a convergir para o mesmo modelo."
          className="mb-5"
        />
        <ListaSetas itens={accessoryConsolidationHighlights} />
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-slate-100">Melhorias na chance de promoção</h3>
        <div className="space-y-4">
          {accessoryPromotionChanges.map((grupo) => (
            <div key={grupo.title} className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-300">{grupo.title}</h4>
              <ListaSetas itens={grupo.details} />
            </div>
          ))}
        </div>
      </Card>
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-slate-100">Additional Accessory Upgrades</h3>
        <FiguraPatch
          src={additionalAccessoryUpgradesImage}
          alt="Visão geral dos upgrades adicionais de acessórios"
          caption="Os acessórios Annihilation passam a ser o próximo passo acima de Kaia's Fury."
          className="mb-5"
        />
        <ListaSetas itens={additionalAccessoryUpgradeHighlights} />
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-amber-400">Mask of Annihilation</h3>
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <FiguraPatch
            src={dropMaskOfAnnihilationImage}
            alt="Mask of Annihilation obtida em Akeron's Inferno Hard"
            caption="A máscara cai em Akeron's Inferno (Hard)."
          />
          <FiguraPatch
            src={typeOfMaskOfAnnihilationImage}
            alt="Tipos de Mask of Annihilation"
            caption="Iron Wall, Salvation e Destruction possuem funções distintas."
          />
        </div>
        <ListaSetas itens={maskHighlights} />
      </Card>
    </div>

    <div className="grid gap-6 md:grid-cols-3">
      {maskOfAnnihilation.map((mascara) => (
        <Card key={mascara.name}>
          <h3 className="mb-3 text-lg font-semibold text-slate-100">{mascara.name}</h3>
          <div className="space-y-4 text-sm text-slate-300">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Efeito fixo</h4>
              <p className="whitespace-pre-line">{mascara.fixed}</p>
            </div>
            <div className="border-t border-slate-800/60 pt-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Efeito aleatório</h4>
              <p>{mascara.random}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>

    <Card className="border-l-4 border-l-sky-500 bg-slate-800/30">
      <div className="mb-5 grid gap-4 lg:grid-cols-2">
        <FiguraPatch
          src={annihilationEnhancementImage}
          alt="Visão geral do aprimoramento Annihilation"
          caption="O sistema de aprimoramento Annihilation passa a alcançar +15."
        />
        <FiguraPatch
          src={weaponAnnihilation15Image}
          alt="Bônus adicionais do gear Annihilation em +15"
          caption="Bônus extras são concedidos em +10, +12, +14 e +15."
        />
      </div>
      <h3 className="mb-4 text-lg font-semibold text-sky-400">Annihilation Weapons/Armor</h3>
      <ListaSetas itens={annihilationEnhancementHighlights} />

      <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-300">
          <AlertTriangle className="h-4 w-4" />
          Bônus adicionais por breakpoint
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {annihilationBonusBreakdown.map((bonus) => (
            <div key={bonus} className="rounded-lg border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
              {bonus}
            </div>
          ))}
        </div>
      </div>
    </Card>
  </div>
);

export const B131_EventsTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Eventos" icon={CalendarDays} />

    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="border-l-4 border-l-amber-500 bg-slate-800/30">
        <h3 className="mb-4 text-lg font-semibold text-amber-400">2026 Easter Event</h3>
        <p className="mb-4 text-sm text-slate-300">{easterEventInfo.overview}</p>
        <div className="mb-4 rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-300">
            <CalendarDays className="h-4 w-4" />
            Período
          </div>
          <p className="text-sm text-slate-200">{easterEventInfo.period}</p>
          <p className="mt-2 text-xs italic text-slate-400">{easterEventInfo.note}</p>
        </div>
        <ListaSetas itens={easterEventInfo.unlockRules} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <FiguraPatch
            src={event2Image}
            alt="NPC do evento de Páscoa"
            caption="Ajude Bunbunmin a recuperar os ovos escondidos."
          />
          <FiguraPatch
            src={event3Image}
            alt="Cena do evento de Páscoa"
            caption="O evento espalha ovos e objetivos por várias regiões."
          />
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-100">
          <Zap className="h-5 w-5 text-amber-500" />
          Rapid Growth Event
        </h3>
        <p className="mb-3 text-sm text-slate-300">{rapidGrowthInfo.overview}</p>
        <div className="mb-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100/90">
          <p>{rapidGrowthInfo.claim}</p>
          <p className="mt-1 font-medium">{rapidGrowthInfo.period}</p>
        </div>
        <ListaSetas itens={rapidGrowthChanges} />
      </Card>
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-slate-100">Loja do evento</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-xs uppercase text-slate-300">
              <tr>
                <th className="border-r border-slate-700 px-4 py-3">Item</th>
                <th className="px-4 py-3 text-center">Taxa de troca</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {easterShopItems.map((itemLoja) => (
                <tr key={itemLoja.item} className="transition-colors hover:bg-slate-800/40">
                  <td className="border-r border-slate-800/60 px-4 py-3 text-slate-200">{itemLoja.item}</td>
                  <td className="px-4 py-3 text-center text-amber-300">{itemLoja.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-amber-400">[Event] Lilly e jackpot egg</h3>
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <FiguraPatch
            src={event4Image}
            alt="Montaria [Event] Lilly"
            caption="[Event] Lilly é uma montaria padrão voadora, sem skill passiva nem efeito adicional."
          />
          <FiguraPatch
            src={event5Image}
            alt="Nutrient-Packed Jackpot Egg"
            caption="O jackpot egg pode conceder várias recompensas aleatórias."
          />
        </div>
        <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Possíveis recompensas</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            {easterJackpotRewards.map((recompensa) => (
              <li key={recompensa} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                <span>{recompensa}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>

    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-slate-100">Caiman Egg Thief e síntese dos ovos</h3>
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <FiguraPatch
            src={event6Image}
            alt="Caiman Egg Thief no mundo"
            caption="Derrote o Caiman Egg Thief para recuperar ovos."
          />
          <FiguraPatch
            src={event7Image}
            alt="Caiman Egg Thief em combate"
            caption="O inimigo aparece pelo mundo durante o evento."
          />
          <FiguraPatch
            src={event8Image}
            alt="Item Event Egg Dye"
            caption="[Event] Egg Dye chega como recompensa de presença diária."
          />
          <FiguraPatch
            src={event9Image}
            alt="Item Event Red Egg"
            caption="[Event] Red Egg é usado para trocas adicionais."
          />
        </div>
        <ListaSetas itens={easterEggHuntSteps} />
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-amber-400">Ovos escondidos e achievements</h3>
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <FiguraPatch
            src={event10Image}
            alt="Ovos escondidos do evento nas cidades"
            caption="Procure os ovos escondidos em cada cidade."
          />
          <FiguraPatch
            src={event11Image}
            alt="Achievements do evento de Páscoa"
            caption="Os objetivos do evento incluem exploração e coleta."
          />
        </div>
        <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4 text-sm text-sky-100/90">
          Além das trocas, o evento também recompensa a exploração: encontrar todos os ovos escondidos faz parte dos achievements
          da Páscoa 2026.
        </div>
      </Card>
    </div>
  </div>
);

export const B131_CraftingTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Itens, Recompensas & Crafting" icon={Hammer} />

    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-slate-100">Novos itens e fontes</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-xs uppercase text-slate-300">
              <tr>
                <th className="border-r border-slate-700 px-4 py-3">Item</th>
                <th className="border-r border-slate-700 px-4 py-3">Origem</th>
                <th className="px-4 py-3">Observação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {newItemSources.map((fonte) => (
                <tr key={fonte.item} className="transition-colors hover:bg-slate-800/40">
                  <td className="border-r border-slate-800/60 px-4 py-3 text-slate-200">{fonte.item}</td>
                  <td className="border-r border-slate-800/60 px-4 py-3 text-slate-300">{fonte.source}</td>
                  <td className="px-4 py-3 text-slate-400">{fonte.note ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-amber-400">Ajustes de drops e recompensas</h3>
        <ListaSetas itens={itemRewardChanges} />

        <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-300">Mudança futura</h4>
          <ListaSetas itens={upcomingItemChanges} />
        </div>

        <div className="mt-5 rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">Limpeza de crafting</h4>
          <ListaSetas itens={craftingCleanupChanges} />
        </div>
      </Card>
    </div>

    <SectionTitle title="Receitas de Crafting" icon={Hammer} />

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {craftingRecipes.map((receita) => (
        <Card key={receita.title}>
          <h3 className="mb-3 text-lg font-semibold text-slate-100">{receita.title}</h3>
          <p className="mb-4 text-sm text-slate-300">{receita.description}</p>
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Materiais</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {receita.materials.map((material) => (
                <li key={material} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>{material}</span>
                </li>
              ))}
            </ul>
          </div>
          {receita.note ? <p className="mt-4 text-xs text-slate-400">{receita.note}</p> : null}
        </Card>
      ))}
    </div>
  </div>
);

export const B131_SystemTab = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <SectionTitle title="Sistema & Correções" icon={Settings} />

    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-amber-400">Mudanças de sistema e economia</h3>
        <ListaSetas itens={systemChanges} />
      </Card>

      <Card className="border-red-900/30 bg-red-950/10">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
          <AlertTriangle className="h-5 w-5" />
          Correções de bugs
        </h3>
        <ul className="space-y-3 text-sm text-slate-300">
          {bugFixes.map((bugFix) => (
            <li key={bugFix} className="flex items-start gap-3">
              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              <span>{bugFix}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>

    <Card className="border-l-4 border-l-amber-500 bg-slate-800/30">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-400">
        <ShieldAlert className="h-5 w-5" />
        Dev's Note: estabilidade da economia
      </h3>
      <div className="space-y-4 text-sm italic leading-relaxed text-slate-300">
        {systemDevNote.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
      </div>
    </Card>
  </div>
);
