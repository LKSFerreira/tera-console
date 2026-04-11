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
import { patchNotesB131PorIdioma } from '../../../data/patchNotesB131';
import { useIdioma } from '../../../i18n/useIdioma';
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

export const B131_BattlePassTab = () => {
  const { idioma } = useIdioma();
  const data = patchNotesB131PorIdioma[idioma];
  const { labels, battlePassPlus, battlePassRewards } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={labels.battlePass.sectionTitle} icon={Award} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-t-4 border-t-amber-500">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-400">
            <CalendarDays className="h-5 w-5" />
            {labels.battlePass.periodTitle}
          </h3>
          <ul className="space-y-3 text-slate-300">
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">{labels.battlePass.availableLabel}</span>
              <span>09/04/2026 a 06/08/2026</span>
            </li>
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">{labels.battlePass.salesLabel}</span>
              <span>09/04/2026 a 30/07/2026</span>
            </li>
          </ul>
          <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100/90">
            {labels.battlePass.notice}
          </div>
        </Card>

        <Card>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-100">
            <Sparkles className="h-5 w-5 text-amber-500" />
            {labels.battlePass.plusTitle}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-xs uppercase text-slate-400">
                <tr>
                  <th className="rounded-tl-lg px-4 py-3">{labels.battlePass.itemLabel}</th>
                  <th className="rounded-tr-lg px-4 py-3 text-right">{labels.battlePass.qtyLabel}</th>
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
          <h3 className="text-lg font-semibold text-slate-100">{labels.battlePass.rewardsTitle}</h3>
          <span className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs text-slate-400">
            {labels.battlePass.officialBadge}
          </span>
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-xs uppercase text-slate-300">
              <tr>
                <th className="w-16 border-r border-slate-700 px-4 py-4 text-center">{labels.battlePass.levelLabel}</th>
                <th className="border-r border-slate-700 px-4 py-4">{labels.battlePass.freeRewardLabel}</th>
                <th className="w-24 border-r border-slate-700 px-4 py-4 text-center">{labels.battlePass.qtyLabel}</th>
                <th className="border-r border-slate-700 px-4 py-4 text-amber-400">{labels.battlePass.premiumRewardLabel}</th>
                <th className="w-24 px-4 py-4 text-center text-amber-400">{labels.battlePass.qtyLabel}</th>
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
};

export const B131_SeasonTab = () => {
  const { idioma } = useIdioma();
  const data = patchNotesB131PorIdioma[idioma];
  const { labels, seasonRewardBreakdown, seasonAdditionalChanges, seasonRewardSections } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={labels.season.sectionTitle} icon={BookOpen} />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-l-4 border-l-sky-500 bg-slate-800/30">
          <h3 className="mb-4 text-lg font-semibold text-sky-400">{labels.season.processingTitle}</h3>
          <div className="space-y-3 text-sm text-slate-300">
            {labels.season.processingParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-5 overflow-x-auto rounded-lg border border-slate-700/60">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800 text-xs uppercase text-slate-300">
                <tr>
                  <th className="border-r border-slate-700 px-4 py-3">{labels.season.rangeLabel}</th>
                  <th className="border-r border-slate-700 px-4 py-3">{labels.season.weaponLabel}</th>
                  <th className="border-r border-slate-700 px-4 py-3">{labels.season.armorLabel}</th>
                  <th className="px-4 py-3">{labels.season.glovesLabel}</th>
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
          <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.season.additionalTitle}</h3>
          <FiguraPatch
            src={rewardsDungeonsImage}
            alt={labels.season.rewardsImageAlt}
            caption={labels.season.rewardsImageCaption}
            className="mb-5"
          />
          <ListaSetas itens={seasonAdditionalChanges} />
        </Card>
      </div>

      <Card className="border border-slate-700/60 bg-slate-800/30">
        <h3 className="mb-3 text-lg font-semibold text-slate-100">{labels.season.planTitle}</h3>
        <p className="text-sm text-slate-300">{labels.season.planIntro}</p>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        {seasonRewardSections.map((secao) => (
          <Card key={secao.title}>
            <h3 className="mb-4 text-lg font-semibold text-slate-100">{secao.title}</h3>
            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-800 text-xs uppercase text-slate-300">
                  <tr>
                    <th className="border-r border-slate-700 px-4 py-3">{labels.battlePass.itemLabel}</th>
                    <th className="border-r border-slate-700 px-4 py-3 text-center">{labels.season.priceLabel}</th>
                    <th className="border-r border-slate-700 px-4 py-3 text-center">{labels.season.limitLabel}</th>
                    <th className="px-4 py-3 text-center">{labels.battlePass.qtyLabel}</th>
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
};

export const B131_DungeonsTab = () => {
  const { idioma } = useIdioma();
  const data = patchNotesB131PorIdioma[idioma];
  const {
    labels,
    dungeonOverviewHighlights,
    dungeonsList,
    serghettoHighlights,
    dungeonScalingChanges,
    dungeonOtherChanges,
    achievementChanges,
    worldEventChanges,
    dungeonDevNote,
  } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={labels.dungeons.sectionTitle} icon={Swords} />

    <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
      <Card className="border-l-4 border-l-sky-500 bg-slate-800/30">
        <h3 className="mb-4 text-lg font-semibold text-sky-400">{labels.dungeons.rotationTitle}</h3>
        <div className="mb-5 rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
          <ListaSetas itens={dungeonOverviewHighlights} />
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-xs uppercase text-slate-300">
              <tr>
                <th className="border-r border-slate-700 px-4 py-3">{labels.dungeons.dungeonLabel}</th>
                <th className="w-28 border-r border-slate-700 px-4 py-3 text-center">{labels.dungeons.requiredLabel}</th>
                <th className="px-4 py-3">{labels.dungeons.notesLabel}</th>
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
          <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.dungeons.secretMerchantTitle}</h3>
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <FiguraPatch
              src={serghettoImage}
              alt={labels.dungeons.serghettoAlt}
              caption={labels.dungeons.serghettoCaption}
            />
            <FiguraPatch
              src={shopSerghettoImage}
              alt={labels.dungeons.serghettoShopAlt}
              caption={labels.dungeons.serghettoShopCaption}
            />
          </div>
          <ListaSetas itens={serghettoHighlights} />
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-100">{labels.dungeons.scalingTitle}</h3>
          <div className="mb-5">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{labels.dungeons.itemLevelTitle}</h4>
            <ListaSetas itens={dungeonScalingChanges} />
          </div>
          <div className="border-t border-slate-800/60 pt-5">
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{labels.dungeons.otherChangesTitle}</h4>
            <ListaSetas itens={dungeonOtherChanges} />
          </div>
        </Card>
      </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-100">
          <Award className="h-5 w-5 text-amber-500" />
          {labels.dungeons.achievementsTitle}
        </h3>
        <ListaSetas itens={achievementChanges} />
      </Card>

      <Card>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-100">
          <CalendarDays className="h-5 w-5 text-sky-400" />
          {labels.dungeons.worldEventsTitle}
        </h3>
        <ListaSetas itens={worldEventChanges} />
      </Card>
    </div>

    <NotaDesenvolvedor titulo={labels.dungeons.devNoteTitle} paragrafos={dungeonDevNote} />
  </div>
  );
};

export const B131_GearTab = () => {
  const { idioma } = useIdioma();
  const data = patchNotesB131PorIdioma[idioma];
  const {
    labels,
    accessoryConsolidationHighlights,
    accessoryPromotionChanges,
    additionalAccessoryUpgradeHighlights,
    maskHighlights,
    maskOfAnnihilation,
    annihilationEnhancementHighlights,
    annihilationBonusBreakdown,
  } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={labels.gear.sectionTitle} icon={Shield} />

    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card className="border-t-4 border-t-amber-500">
        <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.gear.consolidationTitle}</h3>
        <FiguraPatch
          src={accessoryConsolidationImage}
          alt={labels.gear.consolidationImageAlt}
          caption={labels.gear.consolidationImageCaption}
          className="mb-5"
        />
        <ListaSetas itens={accessoryConsolidationHighlights} />
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-slate-100">{labels.gear.promotionTitle}</h3>
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
        <h3 className="mb-4 text-lg font-semibold text-slate-100">{labels.gear.upgradeTitle}</h3>
        <FiguraPatch
          src={additionalAccessoryUpgradesImage}
          alt={labels.gear.upgradeImageAlt}
          caption={labels.gear.upgradeImageCaption}
          className="mb-5"
        />
        <ListaSetas itens={additionalAccessoryUpgradeHighlights} />
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.gear.maskTitle}</h3>
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <FiguraPatch
            src={dropMaskOfAnnihilationImage}
            alt={labels.gear.maskDropImageAlt}
            caption={labels.gear.maskDropImageCaption}
          />
          <FiguraPatch
            src={typeOfMaskOfAnnihilationImage}
            alt={labels.gear.maskTypesImageAlt}
            caption={labels.gear.maskTypesImageCaption}
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
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{labels.gear.fixedEffectLabel}</h4>
              <p className="whitespace-pre-line">{mascara.fixed}</p>
            </div>
            <div className="border-t border-slate-800/60 pt-4">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{labels.gear.randomEffectLabel}</h4>
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
          alt={labels.gear.annihilationImageAlt}
          caption={labels.gear.annihilationImageCaption}
        />
        <FiguraPatch
          src={weaponAnnihilation15Image}
          alt={labels.gear.annihilationBonusImageAlt}
          caption={labels.gear.annihilationBonusImageCaption}
        />
      </div>
      <h3 className="mb-4 text-lg font-semibold text-sky-400">{labels.gear.annihilationTitle}</h3>
      <ListaSetas itens={annihilationEnhancementHighlights} />

      <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-300">
          <AlertTriangle className="h-4 w-4" />
          {labels.gear.breakpointsTitle}
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
};

export const B131_EventsTab = () => {
  const { idioma } = useIdioma();
  const data = patchNotesB131PorIdioma[idioma];
  const {
    labels,
    easterEventInfo,
    rapidGrowthInfo,
    rapidGrowthChanges,
    easterShopItems,
    easterJackpotRewards,
    easterEggHuntSteps,
  } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={labels.events.sectionTitle} icon={CalendarDays} />

    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card className="border-l-4 border-l-amber-500 bg-slate-800/30">
        <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.events.easterTitle}</h3>
        <p className="mb-4 text-sm text-slate-300">{labels.events.easterOverview}</p>
        <div className="mb-4 rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-300">
            <CalendarDays className="h-4 w-4" />
            {labels.events.periodLabel}
          </div>
          <p className="text-sm text-slate-200">{labels.events.easterPeriod}</p>
          <p className="mt-2 text-xs italic text-slate-400">{labels.events.easterNote}</p>
        </div>
        <ListaSetas itens={easterEventInfo.unlockRules} />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <FiguraPatch
            src={event2Image}
            alt={labels.events.easterNpcImageAlt}
            caption={labels.events.easterNpcImageCaption}
          />
          <FiguraPatch
            src={event3Image}
            alt={labels.events.easterSceneImageAlt}
            caption={labels.events.easterSceneImageCaption}
          />
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-100">
          <Zap className="h-5 w-5 text-amber-500" />
          {labels.events.rapidGrowthTitle}
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
        <h3 className="mb-4 text-lg font-semibold text-slate-100">{labels.events.shopTitle}</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-xs uppercase text-slate-300">
              <tr>
                <th className="border-r border-slate-700 px-4 py-3">{labels.battlePass.itemLabel}</th>
                <th className="px-4 py-3 text-center">{labels.events.exchangeRateLabel}</th>
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
        <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.events.lillyTitle}</h3>
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <FiguraPatch
            src={event4Image}
            alt={labels.events.lillyImageAlt}
            caption={labels.events.lillyImageCaption}
          />
          <FiguraPatch
            src={event5Image}
            alt={labels.events.jackpotEggImageAlt}
            caption={labels.events.jackpotEggImageCaption}
          />
        </div>
        <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">{labels.events.rewardsTitle}</h4>
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
        <h3 className="mb-4 text-lg font-semibold text-slate-100">{labels.events.eggThiefTitle}</h3>
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <FiguraPatch
            src={event6Image}
            alt={labels.events.eggThiefWorldImageAlt}
            caption={labels.events.eggThiefWorldImageCaption}
          />
          <FiguraPatch
            src={event7Image}
            alt={labels.events.eggThiefCombatImageAlt}
            caption={labels.events.eggThiefCombatImageCaption}
          />
          <FiguraPatch
            src={event8Image}
            alt={labels.events.eggDyeImageAlt}
            caption={labels.events.eggDyeImageCaption}
          />
          <FiguraPatch
            src={event9Image}
            alt={labels.events.redEggImageAlt}
            caption={labels.events.redEggImageCaption}
          />
        </div>
        <ListaSetas itens={easterEggHuntSteps} />
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.events.hiddenEggsTitle}</h3>
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <FiguraPatch
            src={event10Image}
            alt={labels.events.hiddenEggsImageAlt}
            caption={labels.events.hiddenEggsImageCaption}
          />
          <FiguraPatch
            src={event11Image}
            alt={labels.events.achievementsImageAlt}
            caption={labels.events.achievementsImageCaption}
          />
        </div>
        <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4 text-sm text-sky-100/90">
          {labels.events.hiddenEggsNotice}
        </div>
      </Card>
    </div>
  </div>
  );
};

export const B131_CraftingTab = () => {
  const { idioma } = useIdioma();
  const data = patchNotesB131PorIdioma[idioma];
  const { labels, newItemSources, itemRewardChanges, craftingRecipes } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={labels.crafting.sectionTitle} icon={Hammer} />

    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-slate-100">{labels.crafting.sourcesTitle}</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-800 text-xs uppercase text-slate-300">
              <tr>
                <th className="border-r border-slate-700 px-4 py-3">{labels.crafting.itemLabel}</th>
                <th className="border-r border-slate-700 px-4 py-3">{labels.crafting.sourceLabel}</th>
                <th className="px-4 py-3">{labels.crafting.noteLabel}</th>
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
        <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.crafting.dropAdjustmentsTitle}</h3>
        <ListaSetas itens={itemRewardChanges} />

        <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-300">{labels.crafting.futureChangeTitle}</h4>
          <p className="text-sm text-amber-100/90">{data.upcomingItemChanges[0]}</p>
        </div>

        <div className="mt-5 rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
          <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-400">{labels.crafting.cleanupTitle}</h4>
          <p className="text-sm text-slate-300">{data.craftingCleanupChanges.join(' ')}</p>
        </div>
      </Card>
    </div>

    <SectionTitle title={labels.crafting.recipesTitle} icon={Hammer} />

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {craftingRecipes.map((receita) => (
        <Card key={receita.title}>
          <h3 className="mb-3 text-lg font-semibold text-slate-100">{receita.title}</h3>
          <p className="mb-4 text-sm text-slate-300">{receita.description}</p>
          <div className="rounded-xl border border-slate-800/70 bg-slate-950/60 p-4">
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">{labels.crafting.materialsLabel}</h4>
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
};

export const B131_SystemTab = () => {
  const { idioma } = useIdioma();
  const data = patchNotesB131PorIdioma[idioma];
  const { labels, systemChanges, systemDevNote, bugFixes } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <SectionTitle title={labels.system.sectionTitle} icon={Settings} />

    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-amber-400">{labels.system.economyTitle}</h3>
        <ListaSetas itens={systemChanges} />
      </Card>

      <Card className="border-red-900/30 bg-red-950/10">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
          <AlertTriangle className="h-5 w-5" />
          {labels.system.bugFixTitle}
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
        {labels.system.devNoteTitle}
      </h3>
      <div className="space-y-4 text-sm italic leading-relaxed text-slate-300">
        {systemDevNote.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
      </div>
    </Card>
  </div>
  );
};
