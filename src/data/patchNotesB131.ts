import type { IdiomaSuportado } from '../types/idioma';
import type { BattlePassPlusItem, BattlePassReward, DungeonDetail, MaskOfAnnihilationDetail } from '../types/patchNotes';

export interface ConteudoPatchB131 {
  labels: {
    battlePass: {
      sectionTitle: string;
      periodTitle: string;
      availableLabel: string;
      salesLabel: string;
      notice: string;
      plusTitle: string;
      rewardsTitle: string;
      officialBadge: string;
      itemLabel: string;
      qtyLabel: string;
      levelLabel: string;
      freeRewardLabel: string;
      premiumRewardLabel: string;
    };
    season: {
      sectionTitle: string;
      processingTitle: string;
      processingParagraphs: string[];
      additionalTitle: string;
      planTitle: string;
      planIntro: string;
      rangeLabel: string;
      weaponLabel: string;
      armorLabel: string;
      glovesLabel: string;
      priceLabel: string;
      limitLabel: string;
      rewardsImageAlt: string;
      rewardsImageCaption: string;
    };
    dungeons: {
      sectionTitle: string;
      rotationTitle: string;
      secretMerchantTitle: string;
      scalingTitle: string;
      itemLevelTitle: string;
      otherChangesTitle: string;
      achievementsTitle: string;
      worldEventsTitle: string;
      devNoteTitle: string;
      dungeonLabel: string;
      requiredLabel: string;
      notesLabel: string;
      serghettoAlt: string;
      serghettoCaption: string;
      serghettoShopAlt: string;
      serghettoShopCaption: string;
    };
    gear: {
      sectionTitle: string;
      consolidationTitle: string;
      promotionTitle: string;
      upgradeTitle: string;
      maskTitle: string;
      fixedEffectLabel: string;
      randomEffectLabel: string;
      annihilationTitle: string;
      breakpointsTitle: string;
      consolidationImageAlt: string;
      consolidationImageCaption: string;
      upgradeImageAlt: string;
      upgradeImageCaption: string;
      maskDropImageAlt: string;
      maskDropImageCaption: string;
      maskTypesImageAlt: string;
      maskTypesImageCaption: string;
      annihilationImageAlt: string;
      annihilationImageCaption: string;
      annihilationBonusImageAlt: string;
      annihilationBonusImageCaption: string;
    };
    events: {
      sectionTitle: string;
      easterTitle: string;
      periodLabel: string;
      shopTitle: string;
      exchangeRateLabel: string;
      lillyTitle: string;
      rewardsTitle: string;
      eggThiefTitle: string;
      hiddenEggsTitle: string;
      rapidGrowthTitle: string;
      easterPeriod: string;
      easterOverview: string;
      easterNote: string;
      hiddenEggsNotice: string;
      easterNpcImageAlt: string;
      easterNpcImageCaption: string;
      easterSceneImageAlt: string;
      easterSceneImageCaption: string;
      lillyImageAlt: string;
      lillyImageCaption: string;
      jackpotEggImageAlt: string;
      jackpotEggImageCaption: string;
      eggThiefWorldImageAlt: string;
      eggThiefWorldImageCaption: string;
      eggThiefCombatImageAlt: string;
      eggThiefCombatImageCaption: string;
      eggDyeImageAlt: string;
      eggDyeImageCaption: string;
      redEggImageAlt: string;
      redEggImageCaption: string;
      hiddenEggsImageAlt: string;
      hiddenEggsImageCaption: string;
      achievementsImageAlt: string;
      achievementsImageCaption: string;
    };
    crafting: {
      sectionTitle: string;
      sourcesTitle: string;
      dropAdjustmentsTitle: string;
      futureChangeTitle: string;
      cleanupTitle: string;
      recipesTitle: string;
      itemLabel: string;
      sourceLabel: string;
      noteLabel: string;
      materialsLabel: string;
    };
    system: {
      sectionTitle: string;
      economyTitle: string;
      bugFixTitle: string;
      devNoteTitle: string;
    };
  };
  battlePassPlus: BattlePassPlusItem[];
  battlePassRewards: BattlePassReward[];
  seasonRewardBreakdown: Array<{ range: string; weapon: string; armor: string; glovesFootwear: string }>;
  seasonRewardSections: Array<{
    title: string;
    note?: string;
    items: Array<{ item: string; price: string; limitType: string; limitQty: number }>;
  }>;
  seasonAdditionalChanges: string[];
  dungeonsList: DungeonDetail[];
  dungeonOverviewHighlights: string[];
  serghettoHighlights: string[];
  dungeonScalingChanges: string[];
  dungeonOtherChanges: string[];
  achievementChanges: string[];
  worldEventChanges: string[];
  dungeonDevNote: string[];
  accessoryConsolidationHighlights: string[];
  accessoryPromotionChanges: Array<{ title: string; details: string[] }>;
  additionalAccessoryUpgradeHighlights: string[];
  maskOfAnnihilation: MaskOfAnnihilationDetail[];
  maskHighlights: string[];
  annihilationEnhancementHighlights: string[];
  annihilationBonusBreakdown: string[];
  craftingCleanupChanges: string[];
  craftingRecipes: Array<{ title: string; description: string; materials: string[]; note?: string }>;
  newItemSources: Array<{ item: string; source: string; note?: string }>;
  itemRewardChanges: string[];
  upcomingItemChanges: string[];
  easterEventInfo: {
    period: string;
    overview: string;
    unlockRules: string[];
    note: string;
  };
  easterShopItems: Array<{ item: string; rate: number }>;
  easterJackpotRewards: string[];
  easterEggHuntSteps: string[];
  rapidGrowthInfo: {
    overview: string;
    claim: string;
    period: string;
  };
  rapidGrowthChanges: string[];
  systemChanges: string[];
  systemDevNote: string[];
  bugFixes: string[];
}

export const patchNotesB131PorIdioma: Record<IdiomaSuportado, ConteudoPatchB131> = {
  'pt-BR': {
    labels: {
      battlePass: {
        sectionTitle: 'Battle Pass da Temporada 21',
        periodTitle: 'Período do Battle Pass',
        availableLabel: 'Disponível:',
        salesLabel: 'Período de vendas:',
        notice: 'O Event Battle Pass anterior será encerrado e a Season 21 começa após a manutenção.',
        plusTitle: 'Conteúdo do Battle Pass PLUS',
        rewardsTitle: 'Recompensas do Battle Pass por nível',
        officialBadge: 'Nomes oficiais dos itens preservados',
        itemLabel: 'Item',
        qtyLabel: 'Qtd.',
        levelLabel: 'Nível',
        freeRewardLabel: 'Recompensa Free',
        premiumRewardLabel: 'Recompensa Premium',
      },
      season: {
        sectionTitle: 'Temporada 2 & Recompensas',
        processingTitle: 'Processamento de fim de temporada',
        processingParagraphs: [
          'Itens de equipamento da Season 1 passam a poder ser desmontados, perdem seus efeitos-base e deixam de receber aprimoramento.',
          'Itens da Season 2 serão adicionados para compra. O método de obtenção permanece o mesmo e os itens recebidos serão entregues temporariamente em estado indestrutível.',
          'O consumo de Diamond no intervalo +37 a +40 será levemente reduzido.',
        ],
        additionalTitle: 'Mudanças adicionais da Temporada 2',
        planTitle: 'Season 2 Reward Plan',
        planIntro:
          'As recompensas abaixo utilizam o token sazonal Condensed Curse of the Abyss Token. A lista do NPC de recompensas atual será convertida para a versão da Season 1 e o token anterior de crescimento deixará de ser utilizado.',
        rangeLabel: 'Faixa',
        weaponLabel: 'Arma',
        armorLabel: 'Armadura',
        glovesLabel: 'Luvas / Botas',
        priceLabel: 'Preço',
        limitLabel: 'Limite',
        rewardsImageAlt: 'Resumo visual das mudanças de drops e recompensas',
        rewardsImageCaption: 'Resumo visual das mudanças relacionadas a drops, recompensas e progressão da Season 2.',
      },
      dungeons: {
        sectionTitle: 'Dungeons & Ajustes de Mundo',
        rotationTitle: 'Rotação de dungeons',
        secretMerchantTitle: 'Serghetto, o comerciante secreto',
        scalingTitle: 'Escalonamento e remoções',
        itemLevelTitle: 'Ajustes por item level',
        otherChangesTitle: 'Outras mudanças',
        achievementsTitle: 'Achievements',
        worldEventsTitle: 'World Events',
        devNoteTitle: "Dev's Note: ritmo das dungeons",
        dungeonLabel: 'Dungeon',
        requiredLabel: 'Required Lv',
        notesLabel: 'Notas',
        serghettoAlt: 'Serghetto pode aparecer ao concluir uma dungeon',
        serghettoCaption: 'Serghetto pode surgir ao concluir uma dungeon.',
        serghettoShopAlt: 'Loja do Serghetto com ofertas de gemas',
        serghettoShopCaption: 'A seleção e a quantidade de itens mudam a cada aparição.',
      },
      gear: {
        sectionTitle: 'Equipamentos & Progressão',
        consolidationTitle: 'Accessory Consolidation',
        promotionTitle: 'Melhorias na chance de promoção',
        upgradeTitle: 'Additional Accessory Upgrades',
        maskTitle: 'Mask of Annihilation',
        fixedEffectLabel: 'Efeito fixo',
        randomEffectLabel: 'Efeito aleatório',
        annihilationTitle: 'Annihilation Weapons/Armor',
        breakpointsTitle: 'Bônus adicionais por breakpoint',
        consolidationImageAlt: 'Resumo visual da consolidação de acessórios',
        consolidationImageCaption: "Stormcry, Heroic Oath, Enhanced Heroic Oath e Kaia's Fury passam a convergir para o mesmo modelo.",
        upgradeImageAlt: 'Visão geral dos upgrades adicionais de acessórios',
        upgradeImageCaption: "Os acessórios Annihilation passam a ser o próximo passo acima de Kaia's Fury.",
        maskDropImageAlt: "Mask of Annihilation obtida em Akeron's Inferno Hard",
        maskDropImageCaption: "A máscara cai em Akeron's Inferno (Hard).",
        maskTypesImageAlt: 'Tipos de Mask of Annihilation',
        maskTypesImageCaption: 'Iron Wall, Salvation e Destruction possuem funções distintas.',
        annihilationImageAlt: 'Visão geral do aprimoramento Annihilation',
        annihilationImageCaption: 'O sistema de aprimoramento Annihilation passa a alcançar +15.',
        annihilationBonusImageAlt: 'Bônus adicionais do gear Annihilation em +15',
        annihilationBonusImageCaption: 'Bônus extras são concedidos em +10, +12, +14 e +15.',
      },
      events: {
        sectionTitle: 'Eventos',
        easterTitle: '2026 Easter Event',
        periodLabel: 'Período',
        shopTitle: 'Loja do evento',
        exchangeRateLabel: 'Taxa de troca',
        lillyTitle: '[Event] Lilly e jackpot egg',
        rewardsTitle: 'Possíveis recompensas',
        eggThiefTitle: 'Caiman Egg Thief e síntese dos ovos',
        hiddenEggsTitle: 'Ovos escondidos e achievements',
        rapidGrowthTitle: 'Rapid Growth Event',
        easterPeriod: 'Após a manutenção de 09/04/2026 até antes da manutenção de 23/04/2026, por 2 semanas.',
        easterOverview:
          'Para celebrar a Páscoa, o evento pede que você ajude Bunbunmin a encontrar os ovos escondidos em cada região e derrote o Caiman Egg Thief para obter recompensas.',
        easterNote: 'O cabeçalho extraído do aviso traz datas divergentes; o período acima replica o texto do corpo oficial do evento.',
        hiddenEggsNotice:
          'Além das trocas, o evento também recompensa a exploração: encontrar todos os ovos escondidos faz parte dos achievements da Páscoa 2026.',
        easterNpcImageAlt: 'NPC do evento de Páscoa',
        easterNpcImageCaption: 'Ajude Bunbunmin a recuperar os ovos escondidos.',
        easterSceneImageAlt: 'Cena do evento de Páscoa',
        easterSceneImageCaption: 'O evento espalha ovos e objetivos por várias regiões.',
        lillyImageAlt: 'Montaria [Event] Lilly',
        lillyImageCaption: '[Event] Lilly é uma montaria padrão voadora, sem skill passiva nem efeito adicional.',
        jackpotEggImageAlt: 'Nutrient-Packed Jackpot Egg',
        jackpotEggImageCaption: 'O jackpot egg pode conceder várias recompensas aleatórias.',
        eggThiefWorldImageAlt: 'Caiman Egg Thief no mundo',
        eggThiefWorldImageCaption: 'Derrote o Caiman Egg Thief para recuperar ovos.',
        eggThiefCombatImageAlt: 'Caiman Egg Thief em combate',
        eggThiefCombatImageCaption: 'O inimigo aparece pelo mundo durante o evento.',
        eggDyeImageAlt: 'Item Event Egg Dye',
        eggDyeImageCaption: '[Event] Egg Dye chega como recompensa de presença diária.',
        redEggImageAlt: 'Item Event Red Egg',
        redEggImageCaption: '[Event] Red Egg é usado para trocas adicionais.',
        hiddenEggsImageAlt: 'Ovos escondidos do evento nas cidades',
        hiddenEggsImageCaption: 'Procure os ovos escondidos em cada cidade.',
        achievementsImageAlt: 'Achievements do evento de Páscoa',
        achievementsImageCaption: 'Os objetivos do evento incluem exploração e coleta.',
      },
      crafting: {
        sectionTitle: 'Itens, Recompensas & Crafting',
        sourcesTitle: 'Novos itens e fontes',
        dropAdjustmentsTitle: 'Ajustes de drops e recompensas',
        futureChangeTitle: 'Mudança futura',
        cleanupTitle: 'Limpeza de crafting',
        recipesTitle: 'Receitas de Crafting',
        itemLabel: 'Item',
        sourceLabel: 'Origem',
        noteLabel: 'Observação',
        materialsLabel: 'Materiais',
      },
      system: {
        sectionTitle: 'Sistema & Correções',
        economyTitle: 'Mudanças de sistema e economia',
        bugFixTitle: 'Correções de bugs',
        devNoteTitle: "Dev's Note: estabilidade da economia",
      },
    },
    battlePassPlus: [
      { item: 'Battle Pass Premium: SEASON 21', qty: '1' },
      { item: '[Style] Face Engraving Scroll - Wings of Dawn VIII', qty: '4' },
      { item: 'Training book for promotion: 20%.', qty: '5' },
      { item: "God's Power Stone", qty: '3' },
      { item: 'Card EXP 5000', qty: '1' },
      { item: 'Battle Pass Level +30', qty: '1' },
      { item: 'Season 2 Enchanting Powder', qty: '50.000' },
      { item: 'Battle Pass Season 21 Exchange Coin', qty: '500' },
    ],
    battlePassRewards: [
      { level: 1, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Dungeon Reset Scroll Fragment', premiumQty: 30 },
      { level: 2, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 3, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 4, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 5, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 6, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 7, freeItem: 'Stigma Shard', freeQty: 200, premiumItem: 'Stigma Shard', premiumQty: '2.000' },
      { level: 8, freeItem: 'Stigma Shard', freeQty: 200, premiumItem: 'Stigma Shard', premiumQty: '2.000' },
      { level: 9, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 10, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 11, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Training book for promotion: 20%.', premiumQty: 1 },
      { level: 12, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Training book for promotion: 20%.', premiumQty: 1 },
      { level: 13, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Training book for promotion: 20%.', premiumQty: 1 },
      { level: 14, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 15, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 16, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 17, freeItem: 'Lein-style Dark Root Beer', freeQty: 10, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 20 },
      { level: 18, freeItem: 'Lein-style Dark Root Beer', freeQty: 10, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 20 },
      { level: 19, freeItem: 'Lein-style Dark Root Beer', freeQty: 10, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 20 },
      { level: 20, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 21, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 22, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 23, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 24, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 25, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 26, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 27, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 28, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 29, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 30, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Dungeon Reset Scroll Fragment', premiumQty: 30 },
      { level: 31, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 32, freeItem: 'Healing Potion', freeQty: 30, premiumItem: 'Battle Pass Special Potion', premiumQty: 30 },
      { level: 33, freeItem: 'Healing Potion', freeQty: 30, premiumItem: 'Battle Pass Special Potion', premiumQty: 30 },
      { level: 34, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 30, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 35, freeItem: 'Battle Pass Season 20 Exchange Coin', freeQty: 50, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 36, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 37, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 30 },
      { level: 38, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 30 },
      { level: 39, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 30 },
      { level: 40, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: 'Dungeon Reset Scroll Fragment', premiumQty: 30 },
      { level: 41, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 42, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 43, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 44, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 45, freeItem: 'Battle Pass Season 20 Exchange Coin', freeQty: 50, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 46, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 47, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 48, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 49, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 50, freeItem: 'Battle Pass Season 20 Exchange Coin', freeQty: 100, premiumItem: 'Legendary Card Exchange Token', premiumQty: 1 },
    ],
    seasonRewardBreakdown: [
      { range: '+30', weapon: '2000', armor: '1900', glovesFootwear: '1700' },
      { range: '+35 a +40', weapon: '7148 ~ 22800', armor: '6791 ~ 21660', glovesFootwear: '6076 ~ 19380' },
    ],
    seasonRewardSections: [
      {
        title: 'Aba 1 - Equipamentos',
        items: [
          { item: "[Event] Kaia's Fury Weapon Box", price: '3000', limitType: 'personagem', limitQty: 1 },
          { item: "[Event] Kaia's Fury Armor Box", price: '2500', limitType: 'personagem', limitQty: 1 },
          { item: "[Event] Kaia's Fury Gauntlet Box", price: '2000', limitType: 'personagem', limitQty: 1 },
          { item: "[Event] Kaia's Fury Footwear Box", price: '2000', limitType: 'personagem', limitQty: 1 },
          { item: "Kaia's Fury Belt", price: '3000', limitType: 'personagem', limitQty: 1 },
          { item: "Kaia's Fury Brooch", price: '3000', limitType: 'conta', limitQty: 2 },
          { item: "Kaia's Fury Circlet", price: '3000', limitType: 'conta', limitQty: 2 },
        ],
      },
      {
        title: 'Aba 2 - Materiais de Aprimoramento',
        items: [
          { item: 'Rare Etching Exchange Coin', price: '1500', limitType: 'conta', limitQty: 20 },
          { item: 'Enchanting Dust - Storm Cry (Box of 1,000)', price: '100', limitType: 'personagem', limitQty: 1 },
          { item: 'Enchanting Dust - Oath (Box of 1,000)', price: '500', limitType: 'personagem', limitQty: 10 },
          { item: "Enchanting Dust - Kaia's Fury (Box of 1,000)", price: '800', limitType: 'personagem', limitQty: 10 },
          { item: 'Enchanting Dust (Annihilation) (Box of 1,000)', price: '1000', limitType: 'personagem', limitQty: 10 },
          { item: 'Fluorite Shard (Box of 100)', price: '5', limitType: 'personagem', limitQty: 100 },
          { item: 'Fluorite Fragment (Box of 100)', price: '50', limitType: 'personagem', limitQty: 100 },
          { item: 'Fluorite Niveot Stone (Box of 100)', price: '500', limitType: 'personagem', limitQty: 100 },
        ],
      },
      {
        title: 'Aba 3 - Premium',
        note:
          'O Transcendence Training Book permite selecionar com garantia a opção desejada do estágio 3, mas os três efeitos restantes continuam sendo alterados aleatoriamente.',
        items: [
          { item: '[Random] Advanced ~ Legendary Card Box', price: '40', limitType: 'personagem', limitQty: 100 },
          { item: 'Card EXP 10000', price: '5000', limitType: 'personagem', limitQty: 10 },
          { item: 'Destruction Training Book X', price: '280', limitType: 'personagem', limitQty: 50 },
          { item: 'Bulwark Training Book X', price: '280', limitType: 'personagem', limitQty: 50 },
          { item: 'Enlightenment Training Book X', price: '280', limitType: 'personagem', limitQty: 50 },
          { item: 'Transcendence Training Book Exchange Coin', price: '1500', limitType: 'personagem', limitQty: 10 },
          { item: 'LV 7 Arun Stone', price: '10000', limitType: 'personagem', limitQty: 2 },
          { item: 'LV 7 Shara Stone', price: '10000', limitType: 'personagem', limitQty: 2 },
          { item: 'Stat Change Stone [Superior]', price: '100', limitType: 'personagem', limitQty: 300 },
          { item: 'Refined Legendary Stigma Option Change Stone', price: '350', limitType: 'personagem', limitQty: 100 },
          { item: 'Complete Stigma Crystal (Legendary)', price: '1000', limitType: 'personagem', limitQty: 1 },
          { item: 'Refined Stigma Crystal (Legendary)', price: '5000', limitType: 'personagem', limitQty: 1 },
          { item: 'Skill Manual: Summon: Swift Canary [Rare]', price: '1000', limitType: 'personagem', limitQty: 1 },
          { item: 'High Training Book', price: '40', limitType: 'personagem', limitQty: 1000 },
        ],
      },
      {
        title: 'Aba 4 - Aparência',
        items: [
          { item: 'Mermushmung Fashion Item Exchange Voucher', price: '5', limitType: 'personagem', limitQty: 10000 },
          { item: 'Nyanyang Cat Paw Pad Stamp', price: '1000', limitType: 'personagem', limitQty: 1 },
          { item: 'Nyanyang Cat Stamp', price: '1000', limitType: 'personagem', limitQty: 1 },
          { item: 'Signal Manual: Hurry!', price: '250', limitType: 'personagem', limitQty: 1 },
          { item: 'Signal Manual: Look at me', price: '250', limitType: 'personagem', limitQty: 1 },
          { item: 'Signal Manual: Scissors', price: '250', limitType: 'personagem', limitQty: 1 },
          { item: 'Signal Manual: Rock', price: '250', limitType: 'personagem', limitQty: 1 },
          { item: 'Signal Manual: Paper', price: '250', limitType: 'personagem', limitQty: 1 },
          { item: "Signal Manual: It's okay", price: '250', limitType: 'personagem', limitQty: 1 },
          { item: 'Signal Manual: 1st!', price: '250', limitType: 'personagem', limitQty: 1 },
          { item: 'Signal Manual: Newb', price: '250', limitType: 'personagem', limitQty: 1 },
          { item: 'Signal Manual: Wow!', price: '250', limitType: 'personagem', limitQty: 1 },
          { item: 'Signal Manual: Please', price: '250', limitType: 'personagem', limitQty: 1 },
          { item: 'Signal Manual: Cigarette', price: '250', limitType: 'personagem', limitQty: 1 },
        ],
      },
      {
        title: 'Aba 5 - Diversos',
        items: [
          { item: 'Health Potion', price: '2', limitType: 'personagem', limitQty: 10000 },
          { item: 'Elixir', price: '5', limitType: 'personagem', limitQty: 100 },
          { item: 'Feast', price: '10', limitType: 'personagem', limitQty: 100 },
          { item: 'Multi-Nostrum', price: '4', limitType: 'personagem', limitQty: 10000 },
          { item: "Lein's Refreshing Dark Root Beer", price: '20', limitType: 'personagem', limitQty: 1000 },
          { item: 'Infinite Health Potion Box - 7 days', price: '100', limitType: 'conta', limitQty: 4 },
          { item: 'Infinite Elixir Box - 7 days', price: '300', limitType: 'conta', limitQty: 4 },
          { item: 'Infinite All-Purpose Battle Nostrum Box - 7 days', price: '500', limitType: 'conta', limitQty: 4 },
        ],
      },
    ],
    seasonAdditionalChanges: [
      'Equipment EXP será adicionado a armas e armaduras Annihilation, exceto acessórios.',
      'A quantidade de chance extra obtida ao falhar no aprimoramento de armas e armaduras Annihilation será aumentada.',
      'Materiais de tier superior ao Diamond serão adicionados.',
      'O consumo de Diamond dos equipamentos sazonais será levemente ajustado.',
      'Após concluir uma dungeon, uma loja secreta poderá aparecer e vender Ruby, Emerald, Diamond e outros itens por preços reduzidos.',
      'Todas as cutscenes em vídeo das dungeons serão removidas, assim como os minigames.',
      'Para compensar a duração curta do EVENT Battle Pass, 4 Battle Pass +5 Level Tickets foram enviados uma vez por conta antes da manutenção de 09/04/2026.',
    ],
    dungeonsList: [
      { name: 'Forbidden Arena (Eternal God of War)', req: 900, note: 'Leaderboard exclusiva de B131' },
      { name: "Akeron's Inferno (Hard)", req: 890, note: '10 jogadores' },
      { name: 'Chaos Ice Throne', req: 880, note: '' },
      { name: 'Timescape (Hard)', req: 850, note: '' },
      { name: 'RK-9 Kennel', req: 810, note: '' },
      { name: 'Forbidden Arena (Eternal Warrior)', req: 800, note: '' },
      { name: 'Ice Throne', req: 790, note: '' },
      { name: 'Dark Reach Citadel (Hard)', req: 780, note: '' },
      { name: 'Demokron Factory (Hard)', req: 750, note: '7 jogadores' },
      { name: 'Timescape', req: 700, note: '' },
      { name: 'Dark Reach Citadel', req: 650, note: '' },
      { name: 'Demokron Factory', req: 600, note: '' },
      { name: 'Ravenous Gorge (3-Person)', req: 500, note: '3 jogadores / matching apenas' },
    ],
    dungeonOverviewHighlights: [
      'O HP do Petre enfrentado por determinadas classes será ajustado.',
      'As Valkyon Directives serão ajustadas para acompanhar a rotação de dungeons desta atualização.',
      'Achievements de dungeons desativadas deixam de poder ser concluídos; os achievements das dungeons ativas serão habilitados.',
    ],
    serghettoHighlights: [
      'Ao concluir uma dungeon, o comerciante secreto Serghetto pode aparecer com uma certa chance.',
      'Serghetto vende gemas como Sapphire, Emerald e Diamond pelos menores preços, com itens e quantidades variando a cada visita.',
    ],
    dungeonScalingChanges: [
      'Critical Resistance aumenta significativamente.',
      'O escalonamento de HP por item level aumenta significativamente.',
    ],
    dungeonOtherChanges: [
      'Todas as cutscenes em vídeo das dungeons foram removidas.',
      'Os minigames obrigatórios foram removidos de Ice Throne e RK-9 Kennel.',
    ],
    achievementChanges: [
      'A temporada de achievements será alterada.',
      'O cálculo de pontuação será redefinido com base apenas nos achievements atualmente aplicados.',
      'Por causa do reset de pontuação, o seu rank pode mudar.',
    ],
    worldEventChanges: [
      'O HP do boss de Velika Defense aumenta significativamente.',
      'Os efeitos-base dos buffs concedidos nas Guardian Missions aumentam significativamente.',
    ],
    dungeonDevNote: [
      'As dungeons atuais estão sendo concluídas mais rápido do que o planejado. Isso se acelerou ainda mais desde o ajuste de scaling dos healers e deve aumentar novamente após a unificação dos acessórios, já que os buffs de healer elevam bastante a taxa média de crítico da party.',
      'Como consequência, a diferença no DPS total da party de acordo com o estado de upgrade do healer ficou grande demais. Este ajuste foi aplicado para tornar o crescimento do healer mais significativo e, como classes especializadas em crítico vinham ficando em desvantagem relativa, Critical Resistance será aplicada em etapas para deixar os papéis e identidades de classe mais claros.',
      'Para apoiar essa direção, scrolls de engraving selecionáveis foram adicionadas às recompensas da season. A equipe afirma que continuará monitorando o resultado e fazendo ajustes finos.',
      'Além disso, grupos que recrutam apenas classes específicas para repetir clears rápidos com burst DPS totalmente buffado logo no início estão explorando uma vantagem do sistema, mas esse não é o padrão de jogo desejado. Por isso, o HP das dungeons foi aumentado para que os clears ocorram em um ponto em que o DPS fique mais normalizado independentemente da composição levada.',
    ],
    accessoryConsolidationHighlights: [
      "Stormcry, Heroic Oath, Enhanced Heroic Oath e Kaia's Fury serão consolidados em um único tipo de acessório.",
      'Os efeitos de Crit e Power passam a ser aplicados simultaneamente.',
    ],
    accessoryPromotionChanges: [
      {
        title: 'Stormcry',
        details: ['A chance adicional obtida via Equipment Mastery passa a chegar a 50%.'],
      },
      {
        title: 'Heroic Oath',
        details: [
          'A chance base de promoção passa a ser 30%.',
          'Em caso de falha, a correção de chance passa de 1% para 3%.',
          'A chance adicional obtida via Equipment Mastery passa a chegar a 70%, um aumento de 7 vezes.',
        ],
      },
      {
        title: 'Enhanced Heroic Oath',
        details: [
          'A chance base de promoção passa a ser 20%.',
          'A chance adicional obtida via Equipment Mastery passa a chegar a 40%, um aumento de 4 vezes.',
        ],
      },
      {
        title: "Kaia's Fury",
        details: [
          'Recebe +15.000.000 de Equipment Mastery EXP.',
          'Ao preencher totalmente o Equipment Mastery EXP, você ganha 40% adicionais de chance de promoção.',
        ],
      },
    ],
    additionalAccessoryUpgradeHighlights: [
      "Acessórios Annihilation serão adicionados e poderão ser promovidos a partir de acessórios Kaia's Fury.",
      'A taxa base de sucesso do upgrade é 10%.',
      'Em caso de falha, é aplicada uma correção de 1%.',
      'Brooches e Circlets exigem consumo maior de materiais.',
      'Etching não é preservado durante o upgrade.',
    ],
    maskOfAnnihilation: [
      {
        name: 'Mask of Annihilation - Iron Wall',
        fixed:
          'Causa 12% de dano adicional ao monstro com maior hostilidade contra você.\nGera 15% de ameaça adicional ao atacar monstros.',
        random: 'Reduz o dano recebido de ataques frontais em 1% a 5%, em incrementos de 1%.',
      },
      {
        name: 'Mask of Annihilation - Salvation',
        fixed:
          'Aumenta a velocidade de ataque em 5%.\nReduz o tempo de recarga em 2% (há um bug visual na cor da fonte).',
        random: 'Poder +2 a +10, em incrementos de 2.',
      },
      {
        name: 'Mask of Annihilation - Destruction',
        fixed:
          'Causa 12% de dano adicional ao atacar pelas costas.\nReduz a geração de ameaça em 15% ao atacar monstros.',
        random: 'Reduz o tempo de recarga em 1% a 3%, em incrementos de 0,5%.',
      },
    ],
    maskHighlights: [
      'A nova Mask of Annihilation pode ser equipada a partir do gear level total 800.',
      "Ela cai em Akeron's Inferno (Hard), com limite de 2 vezes por semana.",
      'O item é comercializável e fica bound ao equipar, podendo receber unbind uma vez.',
      'Cada máscara vem com 3 efeitos aleatórios adicionais que mudam a cada obtenção.',
      'Ao desmontar a máscara, você recebe 1 Source of Destruction.',
      'Com 5 Sources of Destruction, é possível obter uma Mask of Annihilation Random Crate.',
      'Com 10 Sources of Destruction, é possível comprar a máscara desejada.',
      "Após completar Akeron's Inferno (Hard) 5 vezes, é possível obter 5 Sources of Destruction via achievements.",
      'Problema conhecido: a cor da fonte do segundo efeito de Mask of Annihilation - Salvation aparece roxa em vez de violeta.',
    ],
    annihilationEnhancementHighlights: [
      'O aprimoramento de armas e armaduras Annihilation será liberado até +15.',
      'Problema conhecido: há um bug de equipment level anormal, com correção prevista para B132.',
      'A partir de +9, passam a ser usados Darkshard enhancement stones e Alexandrite.',
      'As enhancement stones são separadas entre arma e armadura.',
      'A principal fonte dos materiais de +9 em diante é o crafting.',
      'Equipment Mastery será adicionado ao gear Annihilation.',
      'Ao preencher totalmente a EXP de Equipment Mastery, a chance de sucesso aumenta no mesmo valor da taxa base.',
      'Em caso de falha, a chance de correção passa a crescer cerca de 2 a 5 vezes mais rápido.',
    ],
    annihilationBonusBreakdown: [
      'Weapon: Damage amplification',
      'Armor: Toughness',
      'Gloves: Critical chance',
      'Shoes: Critical resistance',
    ],
    craftingCleanupChanges: ['Listas de crafting sem utilidade serão removidas.'],
    craftingRecipes: [
      {
        title: 'Alexandrite',
        description: 'Gema de tier superior ao Diamond, consumida no aprimoramento de itens Annihilation +9 ou superiores.',
        materials: ['10 Diamonds', '10.000 Craft Kits', '800 Production Points'],
        note: 'Tem taxa de drop extremamente baixa e sua principal fonte é o crafting.',
      },
      {
        title: 'Darkshard Weapon Enhancement Stones',
        description: 'Material de aprimoramento para armas Annihilation +9 ou superiores.',
        materials: ['5 Disenchantment Neutralizer', '10 Darkshard of Red Magic', '500 Enchanting Dust (Annihilation)', '100 Production Points'],
      },
      {
        title: 'Darkshard Armor Enhancement Stones',
        description: 'Material de aprimoramento para armaduras Annihilation +9 ou superiores.',
        materials: ['5 Disenchantment Neutralizer', '10 Blue Enchanted Darkshard', '500 Enchanting Dust (Annihilation)', '100 Production Points'],
      },
      {
        title: 'Sapphire bulk crafting',
        description: 'Permite fabricar 10 Sapphires por vez.',
        materials: ['20 Rubies', '200 Craft Kits', '200 Production Points'],
      },
    ],
    newItemSources: [
      { item: 'Darkshard of Red Magic', source: 'Dungeons de nível 850+' },
      { item: 'Blue Enchanted Darkshard', source: 'Dungeons de nível 850+' },
      { item: 'Disenchantment Neutralizer', source: 'Dungeons de nível 700 a 850 e Pet Adventures' },
      { item: 'Novas receitas de crafting', source: 'Caem em dungeons acima de determinado nível.', note: 'Jewelry Patterns: Alexandrite caem apenas em dungeons de nível 900+.' },
      { item: '[Season 2] Enchanting Dust', source: 'Dungeons, exceto 890/900' },
      { item: '[Season 2] Broken Enchanted Steel Fragment', source: 'RK-9 Kennel e dungeons de nível 900' },
      { item: 'Shining Tears of Elinu', source: 'Maioria das dungeons', note: 'Restaura 10.000 Production Points e é comercializável.' },
      { item: 'Tears of Elinu', source: 'Pet Adventures', note: 'Restaura 500 Production Points, não é comercializável e não acumula acima de 10.' },
    ],
    itemRewardChanges: [
      'De forma geral, a quantidade de drop de season Enchanting Dust será reduzida.',
      'Dungeon Core terá a quantidade de drop reduzida em 50%. Com ELITE GOLD, você recebe em dobro.',
      'A Equipment EXP recebida de Dungeon Vanguard Requests será aumentada.',
      "Os itens Stormcry, Heroic Oath, Kaia's Fury e Vergos não poderão mais receber unbind.",
      'Missões de baixa eficiência concedidas após exceder 25 Vanguard Requests serão removidas.',
    ],
    upcomingItemChanges: ['O preço dos dungeon reset scrolls trocáveis por Dungeon Reset Scrolls será ajustado em 2 semanas.'],
    easterEventInfo: {
      period: 'Após a manutenção de 09/04/2026 até antes da manutenção de 23/04/2026, por 2 semanas.',
      overview:
        'Para celebrar a Páscoa, o evento pede que você ajude Bunbunmin a encontrar os ovos escondidos em cada região e derrote o Caiman Egg Thief para obter recompensas.',
      unlockRules: ['O evento desbloqueia 1 estágio por dia durante 6 dias.', 'Todo o conteúdo fica liberado no 6º dia.'],
      note: 'O cabeçalho extraído do aviso traz datas divergentes; o período acima replica o texto do corpo oficial do evento.',
    },
    easterShopItems: [
      { item: '[Event] Lilly', rate: 16 },
      { item: '[Event] Nutrient-Packed Jackpot Egg', rate: 1 },
      { item: 'Footsteps: Sakura Tree (Normal)', rate: 8 },
      { item: 'Footsteps: Sakura Tree (Rare)', rate: 16 },
      { item: 'Hot! Easter Bunny Stamp (Normal)', rate: 8 },
      { item: 'Hot! Easter Bunny Stamp (Rare)', rate: 16 },
      { item: 'Revealing Water Bomb (Rainbow)', rate: 1 },
    ],
    easterJackpotRewards: [
      '[Event] Lilly',
      'Arun Stone/Shara Stone Gem Gacha Box (Lv. 1-3)',
      'High Training Book',
      'Training book for promotion: 10%.',
      'Training book for promotion: 20%.',
      'Stat Change Stone [Superior]',
      'Card EXP 100',
    ],
    easterEggHuntSteps: [
      'Derrote o Caiman Egg Thief que aparece pelo mundo para recuperar ovos.',
      '[Event] Egg Dye é entregue diariamente como recompensa de presença; nos fins de semana, Hot Time também concede recompensas extras.',
      'O item chega por correio após um total diário de 2 horas e 30 minutos de login.',
      'Combine 2 [Event] Egg Dye com 1 [Event] Decorative Egg para obter 1 [Event] Red Egg.',
      'Use [Event] Red Egg para trocar por vários itens.',
      'Encontre os ovos escondidos em cada cidade para concluir achievements do evento.',
    ],
    rapidGrowthInfo: {
      overview: 'O Rapid Growth Event da Season 1 retorna nesta atualização.',
      claim: 'Você pode resgatar o item uma vez ao fazer login.',
      period: 'Disponível até 11/06/2026.',
    },
    rapidGrowthChanges: [
      'Desmontar uma Arun Stone ou Shara Stone de nível 5 concede 1 Diamond.',
      'Desmontar uma Arun Stone ou Shara Stone de nível 7 concede 2 Diamonds.',
      'A primeira caixa passa a conceder também um item que aumenta a EXP de equipamento em 300% por 30 dias.',
      'O bônus adicional acumula com o Battle Pass.',
    ],
    systemChanges: [
      'O período de retenção do correio muda de 180 dias para 30 dias.',
      'A taxa para envio de gold por correio muda de 0,5% para 33%.',
      'O custo-base para enviar correio passa a ser 10.000 gold.',
      'A taxa-base do View Brokerage muda de 3% para 10%.',
      'Com ELITE GOLD, a taxa do View Brokerage muda de 2% para 0,5%.',
      'O período de listagem no View Brokerage muda de 7 dias para 14 dias.',
      'O tempo de espera para entrar novamente em uma guild após sair muda de 24 horas para 72 horas.',
    ],
    systemDevNote: [
      'TERA proíbe a negociação de itens por dinheiro real. Mais especificamente, de acordo com os termos da plataforma de console, o real-money trading de itens não é permitido.',
      'Para manter o serviço de TERA Console, a equipe afirma que precisa estabilizar o ambiente do jogo. Recentemente, muitos golpes foram reportados em transações por correio, nas quais o jogador recebe o gold primeiro e depois não entrega o item, explorando a taxa baixa do sistema de mail.',
      'Por isso, a atualização busca incentivar o uso do View Brokerage: a taxa para quem usa ELITE GOLD foi reduzida e o período de listagem dos itens foi dobrado. Segundo a nota, deixar o cenário atual como está tende a piorar a situação, então as medidas acima foram aplicadas como forma de contenção.',
      'A equipe informa ainda que contas envolvidas em crimes como golpes já estão sendo listadas e que todos os logs de chat e de transferência de itens estão sendo gravados.',
      'A recomendação oficial é nunca enviar gold ou itens primeiro e sempre usar o View Brokerage. A nota também afirma que golpes são considerados falha pessoal e, por isso, não há restauração em nenhuma situação.',
      'Também não haverá resposta a incidentes de hacking causados por exposição de senha.',
    ],
    bugFixes: [
      'Corrigido o problema em que os efeitos do pet não eram atualizados após o fim da duração.',
      'Corrigido o problema em que o efeito de corrosion do pet permanecia ativo após swap.',
      'Corrigido o problema em que alguns costumes não podiam receber unbind mesmo ainda tendo contagens restantes.',
    ],
  },
  'en-US': {
    labels: {
      battlePass: {
        sectionTitle: 'Season 21 Battle Pass',
        periodTitle: 'Battle Pass Schedule',
        availableLabel: 'Available:',
        salesLabel: 'Sales period:',
        notice: 'The previous Event Battle Pass ends and Season 21 starts after maintenance.',
        plusTitle: 'Battle Pass PLUS Contents',
        rewardsTitle: 'Battle Pass rewards by level',
        officialBadge: 'Official item names preserved',
        itemLabel: 'Item',
        qtyLabel: 'Qty.',
        levelLabel: 'Level',
        freeRewardLabel: 'Free Reward',
        premiumRewardLabel: 'Premium Reward',
      },
      season: {
        sectionTitle: 'Season 2 & Rewards',
        processingTitle: 'Season-end processing',
        processingParagraphs: [
          'Season 1 equipment becomes dismantlable, loses its base effects and can no longer be enhanced.',
          'Season 2 equipment will be added for purchase. The acquisition method stays the same and obtained items will be delivered temporarily in an indestructible state.',
          'Diamond cost for the +37 to +40 range will be slightly reduced.',
        ],
        additionalTitle: 'Additional Season 2 changes',
        planTitle: 'Season 2 Reward Plan',
        planIntro:
          'The rewards below use the Condensed Curse of the Abyss Token. The current reward NPC list will be converted to the Season 1 version and the previous growth token will no longer be used.',
        rangeLabel: 'Range',
        weaponLabel: 'Weapon',
        armorLabel: 'Armor',
        glovesLabel: 'Gloves / Shoes',
        priceLabel: 'Price',
        limitLabel: 'Limit',
        rewardsImageAlt: 'Visual summary of reward and drop changes',
        rewardsImageCaption: 'Visual summary of the Season 2 changes related to drops, rewards and progression.',
      },
      dungeons: {
        sectionTitle: 'Dungeons & World Adjustments',
        rotationTitle: 'Dungeon rotation',
        secretMerchantTitle: 'Serghetto, the secret merchant',
        scalingTitle: 'Scaling and removals',
        itemLevelTitle: 'Item level adjustments',
        otherChangesTitle: 'Other changes',
        achievementsTitle: 'Achievements',
        worldEventsTitle: 'World Events',
        devNoteTitle: "Dev's Note: dungeon pace",
        dungeonLabel: 'Dungeon',
        requiredLabel: 'Required Lv',
        notesLabel: 'Notes',
        serghettoAlt: 'Serghetto may appear after clearing a dungeon',
        serghettoCaption: 'Serghetto may spawn after a dungeon clear.',
        serghettoShopAlt: 'Serghetto shop with gem offers',
        serghettoShopCaption: 'The item list and quantities change on each appearance.',
      },
      gear: {
        sectionTitle: 'Gear & Progression',
        consolidationTitle: 'Accessory Consolidation',
        promotionTitle: 'Promotion chance improvements',
        upgradeTitle: 'Additional Accessory Upgrades',
        maskTitle: 'Mask of Annihilation',
        fixedEffectLabel: 'Fixed effect',
        randomEffectLabel: 'Random effect',
        annihilationTitle: 'Annihilation Weapons/Armor',
        breakpointsTitle: 'Additional bonuses by breakpoint',
        consolidationImageAlt: 'Visual summary of accessory consolidation',
        consolidationImageCaption: "Stormcry, Heroic Oath, Enhanced Heroic Oath, and Kaia's Fury now converge into the same model.",
        upgradeImageAlt: 'Overview of additional accessory upgrades',
        upgradeImageCaption: "Annihilation accessories become the next step above Kaia's Fury.",
        maskDropImageAlt: "Mask of Annihilation obtained in Akeron's Inferno Hard",
        maskDropImageCaption: "The mask drops in Akeron's Inferno (Hard).",
        maskTypesImageAlt: 'Types of Mask of Annihilation',
        maskTypesImageCaption: 'Iron Wall, Salvation, and Destruction serve different roles.',
        annihilationImageAlt: 'Overview of Annihilation enhancement',
        annihilationImageCaption: 'The Annihilation enhancement system now reaches +15.',
        annihilationBonusImageAlt: 'Additional gear bonuses for Annihilation at +15',
        annihilationBonusImageCaption: 'Extra bonuses are granted at +10, +12, +14, and +15.',
      },
      events: {
        sectionTitle: 'Events',
        easterTitle: '2026 Easter Event',
        periodLabel: 'Period',
        shopTitle: 'Event shop',
        exchangeRateLabel: 'Exchange rate',
        lillyTitle: '[Event] Lilly and jackpot egg',
        rewardsTitle: 'Possible rewards',
        eggThiefTitle: 'Caiman Egg Thief and egg synthesis',
        hiddenEggsTitle: 'Hidden eggs and achievements',
        rapidGrowthTitle: 'Rapid Growth Event',
        easterPeriod: 'After the April 9, 2026 maintenance until before the April 23, 2026 maintenance, for 2 weeks.',
        easterOverview: 'To celebrate Easter, the event asks you to help Bunbunmin find the hidden eggs in each region and defeat the Caiman Egg Thief for rewards.',
        easterNote: 'The extracted notice header has conflicting dates; the period above follows the event body text.',
        hiddenEggsNotice:
          'Besides exchanges, the event also rewards exploration: finding all hidden eggs is part of the Easter 2026 achievements.',
        easterNpcImageAlt: 'Easter event NPC',
        easterNpcImageCaption: 'Help Bunbunmin recover the hidden eggs.',
        easterSceneImageAlt: 'Easter event scene',
        easterSceneImageCaption: 'The event spreads eggs and objectives across several regions.',
        lillyImageAlt: '[Event] Lilly mount',
        lillyImageCaption: '[Event] Lilly is a standard flying mount with no passive skill or extra effect.',
        jackpotEggImageAlt: 'Nutrient-Packed Jackpot Egg',
        jackpotEggImageCaption: 'The jackpot egg can grant several random rewards.',
        eggThiefWorldImageAlt: 'Caiman Egg Thief in the world',
        eggThiefWorldImageCaption: 'Defeat the Caiman Egg Thief to recover eggs.',
        eggThiefCombatImageAlt: 'Caiman Egg Thief in combat',
        eggThiefCombatImageCaption: 'The enemy appears throughout the world during the event.',
        eggDyeImageAlt: 'Event Egg Dye item',
        eggDyeImageCaption: '[Event] Egg Dye arrives as a daily attendance reward.',
        redEggImageAlt: 'Event Red Egg item',
        redEggImageCaption: '[Event] Red Egg is used for additional exchanges.',
        hiddenEggsImageAlt: 'Hidden event eggs in the cities',
        hiddenEggsImageCaption: 'Look for the hidden eggs in each city.',
        achievementsImageAlt: 'Easter event achievements',
        achievementsImageCaption: 'The event goals include exploration and collection.',
      },
      crafting: {
        sectionTitle: 'Items, Rewards & Crafting',
        sourcesTitle: 'New items and sources',
        dropAdjustmentsTitle: 'Drop and reward adjustments',
        futureChangeTitle: 'Upcoming change',
        cleanupTitle: 'Crafting cleanup',
        recipesTitle: 'Crafting Recipes',
        itemLabel: 'Item',
        sourceLabel: 'Source',
        noteLabel: 'Note',
        materialsLabel: 'Materials',
      },
      system: {
        sectionTitle: 'System & Fixes',
        economyTitle: 'System and economy changes',
        bugFixTitle: 'Bug fixes',
        devNoteTitle: "Dev's Note: economy stability",
      },
    },
    battlePassPlus: [
      { item: 'Battle Pass Premium: SEASON 21', qty: '1' },
      { item: '[Style] Face Engraving Scroll - Wings of Dawn VIII', qty: '4' },
      { item: 'Training book for promotion: 20%.', qty: '5' },
      { item: "God's Power Stone", qty: '3' },
      { item: 'Card EXP 5000', qty: '1' },
      { item: 'Battle Pass Level +30', qty: '1' },
      { item: 'Season 2 Enchanting Powder', qty: '50.000' },
      { item: 'Battle Pass Season 21 Exchange Coin', qty: '500' },
    ],
    battlePassRewards: [
      { level: 1, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Dungeon Reset Scroll Fragment', premiumQty: 30 },
      { level: 2, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 3, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 4, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 5, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 6, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 7, freeItem: 'Stigma Shard', freeQty: 200, premiumItem: 'Stigma Shard', premiumQty: '2.000' },
      { level: 8, freeItem: 'Stigma Shard', freeQty: 200, premiumItem: 'Stigma Shard', premiumQty: '2.000' },
      { level: 9, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 10, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 11, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Training book for promotion: 20%.', premiumQty: 1 },
      { level: 12, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Training book for promotion: 20%.', premiumQty: 1 },
      { level: 13, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Training book for promotion: 20%.', premiumQty: 1 },
      { level: 14, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 15, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 16, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 17, freeItem: 'Lein-style Dark Root Beer', freeQty: 10, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 20 },
      { level: 18, freeItem: 'Lein-style Dark Root Beer', freeQty: 10, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 20 },
      { level: 19, freeItem: 'Lein-style Dark Root Beer', freeQty: 10, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 20 },
      { level: 20, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 21, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 22, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 23, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 24, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 25, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 26, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 27, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 28, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 29, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 30, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Dungeon Reset Scroll Fragment', premiumQty: 30 },
      { level: 31, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 32, freeItem: 'Healing Potion', freeQty: 30, premiumItem: 'Battle Pass Special Potion', premiumQty: 30 },
      { level: 33, freeItem: 'Healing Potion', freeQty: 30, premiumItem: 'Battle Pass Special Potion', premiumQty: 30 },
      { level: 34, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 30, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 35, freeItem: 'Battle Pass Season 20 Exchange Coin', freeQty: 50, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 36, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 37, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 30 },
      { level: 38, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 30 },
      { level: 39, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 30 },
      { level: 40, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: 'Dungeon Reset Scroll Fragment', premiumQty: 30 },
      { level: 41, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 42, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 43, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 44, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 45, freeItem: 'Battle Pass Season 20 Exchange Coin', freeQty: 50, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 46, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 47, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 48, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 49, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 50, freeItem: 'Battle Pass Season 20 Exchange Coin', freeQty: 100, premiumItem: 'Legendary Card Exchange Token', premiumQty: 1 },
    ],
    seasonRewardBreakdown: [
      { range: '+30', weapon: '2000', armor: '1900', glovesFootwear: '1700' },
      { range: '+35 to +40', weapon: '7148 ~ 22800', armor: '6791 ~ 21660', glovesFootwear: '6076 ~ 19380' },
    ],
    seasonRewardSections: [
      {
        title: 'Tab 1 - Equipment',
        items: [
          { item: "[Event] Kaia's Fury Weapon Box", price: '3000', limitType: 'character', limitQty: 1 },
          { item: "[Event] Kaia's Fury Armor Box", price: '2500', limitType: 'character', limitQty: 1 },
          { item: "[Event] Kaia's Fury Gauntlet Box", price: '2000', limitType: 'character', limitQty: 1 },
          { item: "[Event] Kaia's Fury Footwear Box", price: '2000', limitType: 'character', limitQty: 1 },
          { item: "Kaia's Fury Belt", price: '3000', limitType: 'character', limitQty: 1 },
          { item: "Kaia's Fury Brooch", price: '3000', limitType: 'account', limitQty: 2 },
          { item: "Kaia's Fury Circlet", price: '3000', limitType: 'account', limitQty: 2 },
        ],
      },
      {
        title: 'Tab 2 - Upgrade Materials',
        items: [
          { item: 'Rare Etching Exchange Coin', price: '1500', limitType: 'account', limitQty: 20 },
          { item: 'Enchanting Dust - Storm Cry (Box of 1,000)', price: '100', limitType: 'character', limitQty: 1 },
          { item: 'Enchanting Dust - Oath (Box of 1,000)', price: '500', limitType: 'character', limitQty: 10 },
          { item: "Enchanting Dust - Kaia's Fury (Box of 1,000)", price: '800', limitType: 'character', limitQty: 10 },
          { item: 'Enchanting Dust (Annihilation) (Box of 1,000)', price: '1000', limitType: 'character', limitQty: 10 },
          { item: 'Fluorite Shard (Box of 100)', price: '5', limitType: 'character', limitQty: 100 },
          { item: 'Fluorite Fragment (Box of 100)', price: '50', limitType: 'character', limitQty: 100 },
          { item: 'Fluorite Niveot Stone (Box of 100)', price: '500', limitType: 'character', limitQty: 100 },
        ],
      },
      {
        title: 'Tab 3 - Premium',
        note:
          'The Transcendence Training Book allows you to select the desired stage 3 option with guaranteed success, but the remaining three effects will continue to change randomly.',
        items: [
          { item: '[Random] Advanced ~ Legendary Card Box', price: '40', limitType: 'character', limitQty: 100 },
          { item: 'Card EXP 10000', price: '5000', limitType: 'character', limitQty: 10 },
          { item: 'Destruction Training Book X', price: '280', limitType: 'character', limitQty: 50 },
          { item: 'Bulwark Training Book X', price: '280', limitType: 'character', limitQty: 50 },
          { item: 'Enlightenment Training Book X', price: '280', limitType: 'character', limitQty: 50 },
          { item: 'Transcendence Training Book Exchange Coin', price: '1500', limitType: 'character', limitQty: 10 },
          { item: 'LV 7 Arun Stone', price: '10000', limitType: 'character', limitQty: 2 },
          { item: 'LV 7 Shara Stone', price: '10000', limitType: 'character', limitQty: 2 },
          { item: 'Stat Change Stone [Superior]', price: '100', limitType: 'character', limitQty: 300 },
          { item: 'Refined Legendary Stigma Option Change Stone', price: '350', limitType: 'character', limitQty: 100 },
          { item: 'Complete Stigma Crystal (Legendary)', price: '1000', limitType: 'character', limitQty: 1 },
          { item: 'Refined Stigma Crystal (Legendary)', price: '5000', limitType: 'character', limitQty: 1 },
          { item: 'Skill Manual: Summon: Swift Canary [Rare]', price: '1000', limitType: 'character', limitQty: 1 },
          { item: 'High Training Book', price: '40', limitType: 'character', limitQty: 1000 },
        ],
      },
      {
        title: 'Tab 4 - Appearance',
        items: [
          { item: 'Mermushmung Fashion Item Exchange Voucher', price: '5', limitType: 'character', limitQty: 10000 },
          { item: 'Nyanyang Cat Paw Pad Stamp', price: '1000', limitType: 'character', limitQty: 1 },
          { item: 'Nyanyang Cat Stamp', price: '1000', limitType: 'character', limitQty: 1 },
          { item: 'Signal Manual: Hurry!', price: '250', limitType: 'character', limitQty: 1 },
          { item: 'Signal Manual: Look at me', price: '250', limitType: 'character', limitQty: 1 },
          { item: 'Signal Manual: Scissors', price: '250', limitType: 'character', limitQty: 1 },
          { item: 'Signal Manual: Rock', price: '250', limitType: 'character', limitQty: 1 },
          { item: 'Signal Manual: Paper', price: '250', limitType: 'character', limitQty: 1 },
          { item: "Signal Manual: It's okay", price: '250', limitType: 'character', limitQty: 1 },
          { item: 'Signal Manual: 1st!', price: '250', limitType: 'character', limitQty: 1 },
          { item: 'Signal Manual: Newb', price: '250', limitType: 'character', limitQty: 1 },
          { item: 'Signal Manual: Wow!', price: '250', limitType: 'character', limitQty: 1 },
          { item: 'Signal Manual: Please', price: '250', limitType: 'character', limitQty: 1 },
          { item: 'Signal Manual: Cigarette', price: '250', limitType: 'character', limitQty: 1 },
        ],
      },
      {
        title: 'Tab 5 - Miscellaneous',
        items: [
          { item: 'Health Potion', price: '2', limitType: 'character', limitQty: 10000 },
          { item: 'Elixir', price: '5', limitType: 'character', limitQty: 100 },
          { item: 'Feast', price: '10', limitType: 'character', limitQty: 100 },
          { item: 'Multi-Nostrum', price: '4', limitType: 'character', limitQty: 10000 },
          { item: "Lein's Refreshing Dark Root Beer", price: '20', limitType: 'character', limitQty: 1000 },
          { item: 'Infinite Health Potion Box - 7 days', price: '100', limitType: 'account', limitQty: 4 },
          { item: 'Infinite Elixir Box - 7 days', price: '300', limitType: 'account', limitQty: 4 },
          { item: 'Infinite All-Purpose Battle Nostrum Box - 7 days', price: '500', limitType: 'account', limitQty: 4 },
        ],
      },
    ],
    seasonAdditionalChanges: [
      'Equipment EXP will be added to Annihilation weapons and armor, except for accessories.',
      'The amount of extra chance obtained when failing Annihilation weapon and armor enhancement will be increased.',
      'Materials of higher tier than Diamond will be added.',
      'Diamond consumption of seasonal equipment will be slightly adjusted.',
      'After completing a dungeon, a secret shop may appear and sell Ruby, Emerald, Diamond and other items at reduced prices.',
      'All video cutscenes in dungeons will be removed, as well as minigames.',
      'To compensate for the short duration of the EVENT Battle Pass, 4 Battle Pass +5 Level Tickets were sent once per account before the April 9, 2026 maintenance.',
    ],
    dungeonsList: [
      { name: 'Forbidden Arena (Eternal God of War)', req: 900, note: 'Exclusive B131 Leaderboard' },
      { name: "Akeron's Inferno (Hard)", req: 890, note: '10 players' },
      { name: 'Chaos Ice Throne', req: 880, note: '' },
      { name: 'Timescape (Hard)', req: 850, note: '' },
      { name: 'RK-9 Kennel', req: 810, note: '' },
      { name: 'Forbidden Arena (Eternal Warrior)', req: 800, note: '' },
      { name: 'Ice Throne', req: 790, note: '' },
      { name: 'Dark Reach Citadel (Hard)', req: 780, note: '' },
      { name: 'Demokron Factory (Hard)', req: 750, note: '7 players' },
      { name: 'Timescape', req: 700, note: '' },
      { name: 'Dark Reach Citadel', req: 650, note: '' },
      { name: 'Demokron Factory', req: 600, note: '' },
      { name: 'Ravenous Gorge (3-Person)', req: 500, note: '3 players / matching only' },
    ],
    dungeonOverviewHighlights: [
      'The HP of Petre faced by certain classes will be adjusted.',
      'Valkyon Directives will be adjusted to follow the dungeon rotation of this update.',
      'Achievements for deactivated dungeons can no longer be completed; achievements for active dungeons will be enabled.',
    ],
    serghettoHighlights: [
      'Upon clearing a dungeon, the secret merchant Serghetto may appear with a certain chance.',
      'Serghetto sells gems like Sapphire, Emerald and Diamond at the lowest prices, with items and quantities changing each visit.',
    ],
    dungeonScalingChanges: [
      'Critical Resistance scales up significantly.',
      'HP scaling by item level increases significantly.',
    ],
    dungeonOtherChanges: [
      'All video cutscenes in dungeons have been removed.',
      'Mandatory minigames were removed from Ice Throne and RK-9 Kennel.',
    ],
    achievementChanges: [
      'The achievement season will be changed.',
      'Score calculation will be redefined based only on current achievements.',
      'Due to the score reset, your rank might change.',
    ],
    worldEventChanges: [
      'The HP of the Velika Defense boss increases significantly.',
      'The base effects of buffs granted in Guardian Missions increase significantly.',
    ],
    dungeonDevNote: [
      'Current dungeons are being cleared faster than planned. This accelerated further since the healer scaling adjustment and is expected to increase again after the accessory unification, as healer buffs significantly raise the party’s average crit rate.',
      'Consequently, the difference in total party DPS according to the healer’s upgrade state became too large. This adjustment was applied to make healer growth more significant and, since crit-specialized classes were at a relative disadvantage, Critical Resistance will be applied in stages to clarify class roles and identities.',
      'To support this direction, selectable engraving scrolls were added to the season rewards. The team states they will continue to monitor the results and make fine adjustments.',
      'Additionally, groups that recruit only specific classes to repeat fast clears with fully-buffed burst DPS right from the start are exploring a system advantage, but this is not the desired playstyle. Therefore, dungeon HP was increased so clears occur at a point where DPS is more normalized regardless of composition.',
    ],
    accessoryConsolidationHighlights: [
      "Stormcry, Heroic Oath, Enhanced Heroic Oath and Kaia's Fury will be consolidated into a single accessory type.",
      'Both Crit and Power effects are now applied simultaneously.',
    ],
    accessoryPromotionChanges: [
      {
        title: 'Stormcry',
        details: ['Extra chance obtained via Equipment Mastery now reaches up to 50%.'],
      },
      {
        title: 'Heroic Oath',
        details: [
          'Base promotion chance is now 30%.',
          'Upon failure, chance correction increases from 1% to 3%.',
          'Extra chance obtained via Equipment Mastery now reaches up to 70%, a 7x increase.',
        ],
      },
      {
        title: 'Enhanced Heroic Oath',
        details: [
          'Base promotion chance is now 20%.',
          'Extra chance obtained via Equipment Mastery now reaches up to 40%, a 4x increase.',
        ],
      },
      {
        title: "Kaia's Fury",
        details: [
          'Receives +15,000,000 Equipment Mastery EXP.',
          'Upon fully filling Equipment Mastery EXP, you gain an extra 40% promotion chance.',
        ],
      },
    ],
    additionalAccessoryUpgradeHighlights: [
      "Annihilation accessories will be added and can be promoted from Kaia's Fury accessories.",
      'Base upgrade success rate is 10%.',
      'Upon failure, a 1% correction is applied.',
      'Brooches and Circlets require a higher material consumption.',
      'Etching is not preserved during the upgrade.',
    ],
    maskOfAnnihilation: [
      {
        name: 'Mask of Annihilation - Iron Wall',
        fixed:
          'Deals 12% extra damage to the monster with the highest hostility against you.\nGenerates 15% extra threat when attacking monsters.',
        random: 'Reduces damage received from frontal attacks by 1% to 5%, in 1% increments.',
      },
      {
        name: 'Mask of Annihilation - Salvation',
        fixed:
          'Increases attack speed by 5%.\nReduces cooldown by 2% (there is a visual bug in the font color).',
        random: 'Power +2 to +10, in increments of 2.',
      },
      {
        name: 'Mask of Annihilation - Destruction',
        fixed:
          'Deals 12% extra damage when attacking from behind.\nReduces threat generation by 15% when attacking monsters.',
        random: 'Reduces cooldown by 1% to 3%, in 0.5% increments.',
      },
    ],
    maskHighlights: [
      'The new Mask of Annihilation can be equipped starting from total gear level 800.',
      "It drops from Akeron's Inferno (Hard), limited to 2 times per week.",
      'The item is tradeable and becomes bound on equip, allowing unbind once.',
      'Each mask comes with 3 extra random effects that change upon acquisition.',
      'Dismantling the mask grants 1 Source of Destruction.',
      'With 5 Sources of Destruction, you can obtain a Mask of Annihilation Random Crate.',
      'With 10 Sources of Destruction, you can purchase the desired mask.',
      "After clearing Akeron's Inferno (Hard) 5 times, 5 Sources of Destruction can be obtained via achievements.",
      'Known issue: the font color of the second effect of Mask of Annihilation - Salvation appears purple instead of violet.',
    ],
    annihilationEnhancementHighlights: [
      'Annihilation weapon and armor enhancement will be released up to +15.',
      'Known issue: there is an abnormal equipment level bug, with a fix planned for B132.',
      'From +9 onwards, Darkshard enhancement stones and Alexandrite are used.',
      'Enhancement stones are split between weapon and armor.',
      'The main source of materials from +9 onwards is crafting.',
      'Equipment Mastery will be added to Annihilation gear.',
      'Upon fully filling Equipment Mastery EXP, success chance increases by the same value as the base rate.',
      'Upon failure, correction chance now grows about 2 to 5 times faster.',
    ],
    annihilationBonusBreakdown: [
      'Weapon: Damage amplification',
      'Armor: Toughness',
      'Gloves: Critical chance',
      'Shoes: Critical resistance',
    ],
    craftingCleanupChanges: ['Useless crafting lists will be removed.'],
    craftingRecipes: [
      {
        title: 'Alexandrite',
        description: 'Higher tier gem than Diamond, consumed in Annihilation gear enhancement (+9 or higher).',
        materials: ['10 Diamonds', '10,000 Craft Kits', '800 Production Points'],
        note: 'Has an extremely low drop rate and its main source is crafting.',
      },
      {
        title: 'Darkshard Weapon Enhancement Stones',
        description: 'Enhancement material for Annihilation weapons (+9 or higher).',
        materials: ['5 Disenchantment Neutralizer', '10 Darkshard of Red Magic', '500 Enchanting Dust (Annihilation)', '100 Production Points'],
      },
      {
        title: 'Darkshard Armor Enhancement Stones',
        description: 'Enhancement material for Annihilation armor (+9 or higher).',
        materials: ['5 Disenchantment Neutralizer', '10 Blue Enchanted Darkshard', '500 Enchanting Dust (Annihilation)', '100 Production Points'],
      },
      {
        title: 'Sapphire bulk crafting',
        description: 'Allows crafting 10 Sapphires at once.',
        materials: ['20 Rubies', '200 Craft Kits', '200 Production Points'],
      },
    ],
    newItemSources: [
      { item: 'Darkshard of Red Magic', source: 'Dungeons level 850+' },
      { item: 'Blue Enchanted Darkshard', source: 'Dungeons level 850+' },
      { item: 'Disenchantment Neutralizer', source: 'Dungeons level 700 to 850 and Pet Adventures' },
      { item: 'New crafting recipes', source: 'Dropped in dungeons above a certain level.', note: 'Jewelry Patterns: Alexandrite only drop from level 900+ dungeons.' },
      { item: '[Season 2] Enchanting Dust', source: 'Dungeons, except 890/900' },
      { item: '[Season 2] Broken Enchanted Steel Fragment', source: 'RK-9 Kennel and level 900 dungeons' },
      { item: 'Shining Tears of Elinu', source: 'Most dungeons', note: 'Restores 10,000 Production Points and is tradeable.' },
      { item: 'Tears of Elinu', source: 'Pet Adventures', note: 'Restores 500 Production Points, not tradeable and does not stack above 10.' },
    ],
    itemRewardChanges: [
      'Generally, the drop amount of seasonal Enchanting Dust will be reduced.',
      'Dungeon Core drop amount will be reduced by 50%. With ELITE GOLD, you receive double.',
      'Equipment EXP received from Dungeon Vanguard Requests will be increased.',
      "Stormcry, Heroic Oath, Kaia's Fury and Vergos items can no longer be unbound.",
      'Low efficiency missions granted after exceeding 25 Vanguard Requests will be removed.',
    ],
    upcomingItemChanges: ['The price of dungeon reset scrolls exchangeable for Dungeon Reset Scrolls will be adjusted in 2 weeks.'],
    easterEventInfo: {
      period: 'After the April 9, 2026 maintenance until before the April 23, 2026 maintenance, for 2 weeks.',
      overview: 'To celebrate Easter, the event asks you to help Bunbunmin find the hidden eggs in each region and defeat the Caiman Egg Thief for rewards.',
      unlockRules: ['The event unlocks 1 stage per day for 6 days.', 'All content is unlocked on the 6th day.'],
      note: 'The extracted notice header has conflicting dates; the period above follows the event body text.',
    },
    easterShopItems: [
      { item: '[Event] Lilly', rate: 16 },
      { item: '[Event] Nutrient-Packed Jackpot Egg', rate: 1 },
      { item: 'Footsteps: Sakura Tree (Normal)', rate: 8 },
      { item: 'Footsteps: Sakura Tree (Rare)', rate: 16 },
      { item: 'Hot! Easter Bunny Stamp (Normal)', rate: 8 },
      { item: 'Hot! Easter Bunny Stamp (Rare)', rate: 16 },
      { item: 'Revealing Water Bomb (Rainbow)', rate: 1 },
    ],
    easterJackpotRewards: [
      '[Event] Lilly',
      'Arun Stone/Shara Stone Gem Gacha Box (Lv. 1-3)',
      'High Training Book',
      'Training book for promotion: 10%.',
      'Training book for promotion: 20%.',
      'Stat Change Stone [Superior]',
      'Card EXP 100',
    ],
    easterEggHuntSteps: [
      'Defeat the Caiman Egg Thief that appears throughout the world to retrieve eggs.',
      '[Event] Egg Dye is delivered daily as a login reward; on weekends, Hot Time also grants extra rewards.',
      'The item arrives by mail after a daily total of 2 hours and 30 minutes of login time.',
      'Combine 2 [Event] Egg Dye with 1 [Event] Decorative Egg to obtain 1 [Event] Red Egg.',
      'Use the [Event] Red Egg to exchange for various items.',
      'Find hidden eggs in each city to complete event achievements.',
    ],
    rapidGrowthInfo: {
      overview: 'The Season 1 Rapid Growth Event returns in this update.',
      claim: 'You can claim the item once per login.',
      period: 'Available until 11/06/2026.',
    },
    rapidGrowthChanges: [
      'Dismantling a level 5 Arun Stone or Shara Stone grants 1 Diamond.',
      'Dismantling a level 7 Arun Stone or Shara Stone grants 2 Diamonds.',
      'The first box now also grants an item that increases equipment EXP by 300% for 30 days.',
      'The extra bonus stacks with the Battle Pass.',
    ],
    systemChanges: [
      'Mail retention period changes from 180 days to 30 days.',
      'Fee for sending gold by mail changes from 0.5% to 33%.',
      'Base cost for sending mail is now 10,000 gold.',
      'Base fee for View Brokerage changes from 3% to 10%.',
      'With ELITE GOLD, the View Brokerage fee changes from 2% to 0.5%.',
      'View Brokerage listing period changes from 7 days to 14 days.',
      'Wait time to rejoin a guild after leaving changes from 24 hours to 72 hours.',
    ],
    systemDevNote: [
      'TERA prohibits trading items for real money. More specifically, according to the terms of the console platform, real-money trading of items is not allowed.',
      'To maintain the service of TERA Console, the team states they need to stabilize the game environment. Recently, many scams were reported in mail transactions where a player receives the gold first and then fails to deliver the item, exploiting the low system fee.',
      'Therefore, the update seeks to encourage the use of the View Brokerage: the fee for those using ELITE GOLD was reduced and the item listing period was doubled. According to the note, leaving the current scenario as it is tends to worsen the situation, so the measures above were applied as a containment form.',
      'The team also informs that accounts involved in offenses such as scams are already being listed and that all chat and item transfer logs are being recorded.',
      'The official recommendation is never to send gold or items first and always use the View Brokerage. The note also states that scams are considered personal failure and, therefore, there is no restoration in any situation.',
      'There will also be no response to hacking incidents caused by password exposure.',
    ],
    bugFixes: [
      'Fixed an issue where pet effects were not updated after the duration ended.',
      'Fixed an issue where the pet’s corrosion effect remained active after swap.',
      'Fixed an issue where some costumes could not be unbound even if they still had remaining counts.',
    ],
  },
  'es-ES': {
    labels: {
      battlePass: {
        sectionTitle: 'Battle Pass de la Temporada 21',
        periodTitle: 'Periodo del Battle Pass',
        availableLabel: 'Disponible:',
        salesLabel: 'Periodo de venta:',
        notice: 'El Event Battle Pass anterior terminará y la Season 21 comenzará después del mantenimiento.',
        plusTitle: 'Contenido del Battle Pass PLUS',
        rewardsTitle: 'Recompensas del Battle Pass por nivel',
        officialBadge: 'Nombres oficiales de ítems preservados',
        itemLabel: 'Ítem',
        qtyLabel: 'Cant.',
        levelLabel: 'Nivel',
        freeRewardLabel: 'Recompensa Free',
        premiumRewardLabel: 'Recompensa Premium',
      },
      season: {
        sectionTitle: 'Temporada 2 & Recompensas',
        processingTitle: 'Procesamiento del fin de temporada',
        processingParagraphs: [
          'Los ítems de equipo de la Season 1 pasan a poder desmontarse, pierden sus efectos base y dejan de poder mejorarse.',
          'Los ítems de la Season 2 se añadirán para compra. El método de obtención sigue siendo el mismo y los ítems obtenidos se entregarán temporalmente en estado indestructible.',
          'El consumo de Diamond en el rango +37 a +40 se reducirá ligeramente.',
        ],
        additionalTitle: 'Cambios adicionales de la Temporada 2',
        planTitle: 'Season 2 Reward Plan',
        planIntro:
          'Las recompensas de abajo usan el token Condensed Curse of the Abyss Token. La lista actual del NPC de recompensas será convertida a la versión de la Season 1 y el token de crecimiento anterior dejará de usarse.',
        rangeLabel: 'Rango',
        weaponLabel: 'Arma',
        armorLabel: 'Armadura',
        glovesLabel: 'Guantes / Botas',
        priceLabel: 'Precio',
        limitLabel: 'Límite',
        rewardsImageAlt: 'Resumen visual de cambios en drops y recompensas',
        rewardsImageCaption: 'Resumen visual de los cambios de la Season 2 relacionados con drops, recompensas y progresión.',
      },
      dungeons: {
        sectionTitle: 'Dungeons & Ajustes del Mundo',
        rotationTitle: 'Rotación de dungeons',
        secretMerchantTitle: 'Serghetto, el comerciante secreto',
        scalingTitle: 'Escalado y eliminaciones',
        itemLevelTitle: 'Ajustes por item level',
        otherChangesTitle: 'Otros cambios',
        achievementsTitle: 'Achievements',
        worldEventsTitle: 'World Events',
        devNoteTitle: "Dev's Note: ritmo de las dungeons",
        dungeonLabel: 'Dungeon',
        requiredLabel: 'Required Lv',
        notesLabel: 'Notas',
        serghettoAlt: 'Serghetto puede aparecer al completar una dungeon',
        serghettoCaption: 'Serghetto puede aparecer tras completar una dungeon.',
        serghettoShopAlt: 'Tienda de Serghetto con ofertas de gemas',
        serghettoShopCaption: 'La selección de ítems y las cantidades cambian en cada aparición.',
      },
      gear: {
        sectionTitle: 'Equipamiento & Progresión',
        consolidationTitle: 'Accessory Consolidation',
        promotionTitle: 'Mejoras en la probabilidad de promoción',
        upgradeTitle: 'Additional Accessory Upgrades',
        maskTitle: 'Mask of Annihilation',
        fixedEffectLabel: 'Efecto fijo',
        randomEffectLabel: 'Efecto aleatorio',
        annihilationTitle: 'Annihilation Weapons/Armor',
        breakpointsTitle: 'Bonos adicionales por breakpoint',
        consolidationImageAlt: 'Resumen visual de la consolidación de accesorios',
        consolidationImageCaption: "Stormcry, Heroic Oath, Enhanced Heroic Oath y Kaia's Fury ahora convergen en el mismo modelo.",
        upgradeImageAlt: 'Vista general de las mejoras adicionales de accesorios',
        upgradeImageCaption: "Los accesorios Annihilation pasan a ser el siguiente paso por encima de Kaia's Fury.",
        maskDropImageAlt: "Mask of Annihilation obtenida en Akeron's Inferno Hard",
        maskDropImageCaption: "La máscara cae en Akeron's Inferno (Hard).",
        maskTypesImageAlt: 'Tipos de Mask of Annihilation',
        maskTypesImageCaption: 'Iron Wall, Salvation y Destruction cumplen funciones distintas.',
        annihilationImageAlt: 'Vista general de la mejora Annihilation',
        annihilationImageCaption: 'El sistema de mejora Annihilation pasa a alcanzar +15.',
        annihilationBonusImageAlt: 'Bonos adicionales del gear Annihilation en +15',
        annihilationBonusImageCaption: 'Se conceden bonos extra en +10, +12, +14 y +15.',
      },
      events: {
        sectionTitle: 'Eventos',
        easterTitle: '2026 Easter Event',
        periodLabel: 'Periodo',
        shopTitle: 'Tienda del evento',
        exchangeRateLabel: 'Tasa de intercambio',
        lillyTitle: '[Event] Lilly y jackpot egg',
        rewardsTitle: 'Posibles recompensas',
        eggThiefTitle: 'Caiman Egg Thief y síntesis de huevos',
        hiddenEggsTitle: 'Huevos ocultos y achievements',
        rapidGrowthTitle: 'Rapid Growth Event',
        easterPeriod: 'Después del mantenimiento del 09/04/2026 hasta antes del mantenimiento del 23/04/2026, durante 2 semanas.',
        easterOverview: 'Para celebrar Pascua, el evento te pide ayudar a Bunbunmin a encontrar los huevos ocultos en cada región y derrotar al Caiman Egg Thief para conseguir recompensas.',
        easterNote: 'El encabezado extraído del aviso trae fechas contradictorias; el periodo anterior sigue el texto del cuerpo del evento.',
        hiddenEggsNotice:
          'Además de los intercambios, el evento también recompensa la exploración: encontrar todos los huevos ocultos forma parte de los achievements de Pascua 2026.',
        easterNpcImageAlt: 'NPC del evento de Pascua',
        easterNpcImageCaption: 'Ayuda a Bunbunmin a recuperar los huevos ocultos.',
        easterSceneImageAlt: 'Escena del evento de Pascua',
        easterSceneImageCaption: 'El evento reparte huevos y objetivos por varias regiones.',
        lillyImageAlt: 'Montura [Event] Lilly',
        lillyImageCaption: '[Event] Lilly es una montura voladora estándar, sin skill pasiva ni efecto adicional.',
        jackpotEggImageAlt: 'Nutrient-Packed Jackpot Egg',
        jackpotEggImageCaption: 'El jackpot egg puede conceder varias recompensas aleatorias.',
        eggThiefWorldImageAlt: 'Caiman Egg Thief en el mundo',
        eggThiefWorldImageCaption: 'Derrota al Caiman Egg Thief para recuperar huevos.',
        eggThiefCombatImageAlt: 'Caiman Egg Thief en combate',
        eggThiefCombatImageCaption: 'El enemigo aparece por el mundo durante el evento.',
        eggDyeImageAlt: 'Ítem Event Egg Dye',
        eggDyeImageCaption: '[Event] Egg Dye llega como recompensa diaria de asistencia.',
        redEggImageAlt: 'Ítem Event Red Egg',
        redEggImageCaption: '[Event] Red Egg se usa para intercambios adicionales.',
        hiddenEggsImageAlt: 'Huevos ocultos del evento en las ciudades',
        hiddenEggsImageCaption: 'Busca los huevos ocultos en cada ciudad.',
        achievementsImageAlt: 'Achievements del evento de Pascua',
        achievementsImageCaption: 'Los objetivos del evento incluyen exploración y recolección.',
      },
      crafting: {
        sectionTitle: 'Ítems, Recompensas & Crafting',
        sourcesTitle: 'Nuevos ítems y fuentes',
        dropAdjustmentsTitle: 'Ajustes de drops y recompensas',
        futureChangeTitle: 'Cambio futuro',
        cleanupTitle: 'Limpieza de crafting',
        recipesTitle: 'Recetas de Crafting',
        itemLabel: 'Ítem',
        sourceLabel: 'Origen',
        noteLabel: 'Observación',
        materialsLabel: 'Materiales',
      },
      system: {
        sectionTitle: 'Sistema & Correcciones',
        economyTitle: 'Cambios de sistema y economía',
        bugFixTitle: 'Correcciones de bugs',
        devNoteTitle: "Dev's Note: estabilidad de la economía",
      },
    },
    battlePassPlus: [
      { item: 'Battle Pass Premium: SEASON 21', qty: '1' },
      { item: '[Style] Face Engraving Scroll - Wings of Dawn VIII', qty: '4' },
      { item: 'Training book for promotion: 20%.', qty: '5' },
      { item: "God's Power Stone", qty: '3' },
      { item: 'Card EXP 5000', qty: '1' },
      { item: 'Battle Pass Level +30', qty: '1' },
      { item: 'Season 2 Enchanting Powder', qty: '50.000' },
      { item: 'Battle Pass Season 21 Exchange Coin', qty: '500' },
    ],
    battlePassRewards: [
      { level: 1, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Dungeon Reset Scroll Fragment', premiumQty: 30 },
      { level: 2, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 3, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 4, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 5, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 6, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 7, freeItem: 'Stigma Shard', freeQty: 200, premiumItem: 'Stigma Shard', premiumQty: '2.000' },
      { level: 8, freeItem: 'Stigma Shard', freeQty: 200, premiumItem: 'Stigma Shard', premiumQty: '2.000' },
      { level: 9, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 10, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 11, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Training book for promotion: 20%.', premiumQty: 1 },
      { level: 12, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Training book for promotion: 20%.', premiumQty: 1 },
      { level: 13, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Training book for promotion: 20%.', premiumQty: 1 },
      { level: 14, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 15, freeItem: 'High Training Book', freeQty: 1, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 16, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 17, freeItem: 'Lein-style Dark Root Beer', freeQty: 10, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 20 },
      { level: 18, freeItem: 'Lein-style Dark Root Beer', freeQty: 10, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 20 },
      { level: 19, freeItem: 'Lein-style Dark Root Beer', freeQty: 10, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 20 },
      { level: 20, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 21, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 22, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 23, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Fluorite Niveot Stone', premiumQty: 5 },
      { level: 24, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 25, freeItem: 'Fluorite Niveot Stone', freeQty: 1, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 26, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 27, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 28, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 29, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Rare ~ Legendary Card Box', premiumQty: 10 },
      { level: 30, freeItem: '(Random) Normal ~ Legendary Card Box', freeQty: 10, premiumItem: 'Dungeon Reset Scroll Fragment', premiumQty: 30 },
      { level: 31, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 32, freeItem: 'Healing Potion', freeQty: 30, premiumItem: 'Battle Pass Special Potion', premiumQty: 30 },
      { level: 33, freeItem: 'Healing Potion', freeQty: 30, premiumItem: 'Battle Pass Special Potion', premiumQty: 30 },
      { level: 34, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 30, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 35, freeItem: 'Battle Pass Season 20 Exchange Coin', freeQty: 50, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 36, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 37, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 30 },
      { level: 38, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 30 },
      { level: 39, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: "Lein's Refreshing Dark Root Beer", premiumQty: 30 },
      { level: 40, freeItem: 'Lein-style Dark Root Beer', freeQty: 30, premiumItem: 'Dungeon Reset Scroll Fragment', premiumQty: 30 },
      { level: 41, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 42, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 43, freeItem: 'Season 2 Enchanting Powder', freeQty: '1.000', premiumItem: 'Season 2 Enchanting Powder', premiumQty: '10.000' },
      { level: 44, freeItem: '[Style] Face Engraving Scroll - Wings of Dawn VII', freeQty: 1, premiumItem: 'Item XP Buff 500% (3 days)', premiumQty: 1 },
      { level: 45, freeItem: 'Battle Pass Season 20 Exchange Coin', freeQty: 50, premiumItem: 'Battle Pass Season 20 Exchange Coin', premiumQty: 200 },
      { level: 46, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 47, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 48, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 49, freeItem: 'Battle Pass Rune: Exchange Ticket', freeQty: 10, premiumItem: 'Battle Pass Rune: Exchange Ticket', premiumQty: 100 },
      { level: 50, freeItem: 'Battle Pass Season 20 Exchange Coin', freeQty: 100, premiumItem: 'Legendary Card Exchange Token', premiumQty: 1 },
    ],
    seasonRewardBreakdown: [
      { range: '+30', weapon: '2000', armor: '1900', glovesFootwear: '1700' },
      { range: '+35 a +40', weapon: '7148 ~ 22800', armor: '6791 ~ 21660', glovesFootwear: '6076 ~ 19380' },
    ],
    seasonRewardSections: [
      {
        title: 'Pestaña 1 - Equipamiento',
        items: [
          { item: "[Event] Kaia's Fury Weapon Box", price: '3000', limitType: 'personaje', limitQty: 1 },
          { item: "[Event] Kaia's Fury Armor Box", price: '2500', limitType: 'personaje', limitQty: 1 },
          { item: "[Event] Kaia's Fury Gauntlet Box", price: '2000', limitType: 'personaje', limitQty: 1 },
          { item: "[Event] Kaia's Fury Footwear Box", price: '2000', limitType: 'personaje', limitQty: 1 },
          { item: "Kaia's Fury Belt", price: '3000', limitType: 'personaje', limitQty: 1 },
          { item: "Kaia's Fury Brooch", price: '3000', limitType: 'cuenta', limitQty: 2 },
          { item: "Kaia's Fury Circlet", price: '3000', limitType: 'cuenta', limitQty: 2 },
        ],
      },
      {
        title: 'Pestaña 2 - Materiales de Mejora',
        items: [
          { item: 'Rare Etching Exchange Coin', price: '1500', limitType: 'cuenta', limitQty: 20 },
          { item: 'Enchanting Dust - Storm Cry (Box of 1,000)', price: '100', limitType: 'personaje', limitQty: 1 },
          { item: 'Enchanting Dust - Oath (Box of 1,000)', price: '500', limitType: 'personaje', limitQty: 10 },
          { item: "Enchanting Dust - Kaia's Fury (Box of 1,000)", price: '800', limitType: 'personaje', limitQty: 10 },
          { item: 'Enchanting Dust (Annihilation) (Box of 1,000)', price: '1000', limitType: 'personaje', limitQty: 10 },
          { item: 'Fluorite Shard (Box of 100)', price: '5', limitType: 'personaje', limitQty: 100 },
          { item: 'Fluorite Fragment (Box of 100)', price: '50', limitType: 'personaje', limitQty: 100 },
          { item: 'Fluorite Niveot Stone (Box of 100)', price: '500', limitType: 'personaje', limitQty: 100 },
        ],
      },
      {
        title: 'Pestaña 3 - Premium',
        note:
          'El Transcendence Training Book permite seleccionar con éxito garantizado la opción deseada de la etapa 3, pero los três efectos restantes siguen cambiando aleatoriamente.',
        items: [
          { item: '[Random] Advanced ~ Legendary Card Box', price: '40', limitType: 'personaje', limitQty: 100 },
          { item: 'Card EXP 10000', price: '5000', limitType: 'personaje', limitQty: 10 },
          { item: 'Destruction Training Book X', price: '280', limitType: 'personaje', limitQty: 50 },
          { item: 'Bulwark Training Book X', price: '280', limitType: 'personaje', limitQty: 50 },
          { item: 'Enlightenment Training Book X', price: '280', limitType: 'personaje', limitQty: 50 },
          { item: 'Transcendence Training Book Exchange Coin', price: '1500', limitType: 'personaje', limitQty: 10 },
          { item: 'LV 7 Arun Stone', price: '10000', limitType: 'personaje', limitQty: 2 },
          { item: 'LV 7 Shara Stone', price: '10000', limitType: 'personaje', limitQty: 2 },
          { item: 'Stat Change Stone [Superior]', price: '100', limitType: 'personaje', limitQty: 300 },
          { item: 'Refined Legendary Stigma Option Change Stone', price: '350', limitType: 'personaje', limitQty: 100 },
          { item: 'Complete Stigma Crystal (Legendary)', price: '1000', limitType: 'personaje', limitQty: 1 },
          { item: 'Refined Stigma Crystal (Legendary)', price: '5000', limitType: 'personaje', limitQty: 1 },
          { item: 'Skill Manual: Summon: Swift Canary [Rare]', price: '1000', limitType: 'personaje', limitQty: 1 },
          { item: 'High Training Book', price: '40', limitType: 'personaje', limitQty: 1000 },
        ],
      },
      {
        title: 'Pestaña 4 - Apariencia',
        items: [
          { item: 'Mermushmung Fashion Item Exchange Voucher', price: '5', limitType: 'personaje', limitQty: 10000 },
          { item: 'Nyanyang Cat Paw Pad Stamp', price: '1000', limitType: 'personaje', limitQty: 1 },
          { item: 'Nyanyang Cat Stamp', price: '1000', limitType: 'personaje', limitQty: 1 },
          { item: 'Signal Manual: Hurry!', price: '250', limitType: 'personaje', limitQty: 1 },
          { item: 'Signal Manual: Look at me', price: '250', limitType: 'personaje', limitQty: 1 },
          { item: 'Signal Manual: Scissors', price: '250', limitType: 'personaje', limitQty: 1 },
          { item: 'Signal Manual: Rock', price: '250', limitType: 'personaje', limitQty: 1 },
          { item: 'Signal Manual: Paper', price: '250', limitType: 'personaje', limitQty: 1 },
          { item: "Signal Manual: It's okay", price: '250', limitType: 'personaje', limitQty: 1 },
          { item: 'Signal Manual: 1st!', price: '250', limitType: 'personaje', limitQty: 1 },
          { item: 'Signal Manual: Newb', price: '250', limitType: 'personaje', limitQty: 1 },
          { item: 'Signal Manual: Wow!', price: '250', limitType: 'personaje', limitQty: 1 },
          { item: 'Signal Manual: Please', price: '250', limitType: 'personaje', limitQty: 1 },
          { item: 'Signal Manual: Cigarette', price: '250', limitType: 'personaje', limitQty: 1 },
        ],
      },
      {
        title: 'Pestaña 5 - Varios',
        items: [
          { item: 'Health Potion', price: '2', limitType: 'personaje', limitQty: 10000 },
          { item: 'Elixir', price: '5', limitType: 'personaje', limitQty: 100 },
          { item: 'Feast', price: '10', limitType: 'personaje', limitQty: 100 },
          { item: 'Multi-Nostrum', price: '4', limitType: 'personaje', limitQty: 10000 },
          { item: "Lein's Refreshing Dark Root Beer", price: '20', limitType: 'personaje', limitQty: 1000 },
          { item: 'Infinite Health Potion Box - 7 days', price: '100', limitType: 'cuenta', limitQty: 4 },
          { item: 'Infinite Elixir Box - 7 days', price: '300', limitType: 'cuenta', limitQty: 4 },
          { item: 'Infinite All-Purpose Battle Nostrum Box - 7 days', price: '500', limitType: 'cuenta', limitQty: 4 },
        ],
      },
    ],
    seasonAdditionalChanges: [
      'Se añadirá EXP de equipo a las armas y armaduras Annihilation, excepto a los accesorios.',
      'Se incrementará la probabilidad extra obtenida al fallar en la mejora de armas y armaduras Annihilation.',
      'Se añadirán materiales de tier superior al Diamond.',
      'El consumo de Diamond de los equipos estacionales se ajustará ligeramente.',
      'Tras completar una dungeon, podrá aparecer una tienda secreta que vende Ruby, Emerald, Diamond y otros ítems a precios reducidos.',
      'Se eliminarán todas las escenas de video de las dungeons, así como los minijuegos.',
      'Para compensar la corta duración del EVENT Battle Pass, se enviaron 4 Battle Pass +5 Level Tickets una vez por cuenta antes del mantenimiento del 09/04/2026.',
    ],
    dungeonsList: [
      { name: 'Forbidden Arena (Eternal God of War)', req: 900, note: 'Leaderboard exclusiva de B131' },
      { name: "Akeron's Inferno (Hard)", req: 890, note: '10 jugadores' },
      { name: 'Chaos Ice Throne', req: 880, note: '' },
      { name: 'Timescape (Hard)', req: 850, note: '' },
      { name: 'RK-9 Kennel', req: 810, note: '' },
      { name: 'Forbidden Arena (Eternal Warrior)', req: 800, note: '' },
      { name: 'Ice Throne', req: 790, note: '' },
      { name: 'Dark Reach Citadel (Hard)', req: 780, note: '' },
      { name: 'Demokron Factory (Hard)', req: 750, note: '7 jugadores' },
      { name: 'Timescape', req: 700, note: '' },
      { name: 'Dark Reach Citadel', req: 650, note: '' },
      { name: 'Demokron Factory', req: 600, note: '' },
      { name: 'Ravenous Gorge (3-Person)', req: 500, note: '3 jugadores / solo matching' },
    ],
    dungeonOverviewHighlights: [
      'Se ajustará el HP de Petre al que se enfrentan determinadas clases.',
      'Las Valkyon Directives se ajustarán para seguir la rotación de dungeons de esta actualización.',
      'Los achievements de dungeons desactivadas ya no podrán completarse; se habilitarán los de las dungeons activas.',
    ],
    serghettoHighlights: [
      'Al completar una dungeon, el comerciante secreto Serghetto puede aparecer con cierta probabilidad.',
      'Serghetto vende gemas como Sapphire, Emerald y Diamond a los precios más bajos, con ítems y cantidades que varían en cada visita.',
    ],
    dungeonScalingChanges: [
      'La Critical Resistance aumenta significativamente.',
      'El escalado de HP por item level aumenta significativamente.',
    ],
    dungeonOtherChanges: [
      'Se han eliminado todas las escenas de video de las dungeons.',
      'Se eliminaron los minijuegos obligatorios de Ice Throne y RK-9 Kennel.',
    ],
    achievementChanges: [
      'La temporada de achievements cambiará.',
      'El cálculo de puntuación se redefinirá basándose solo en los achievements aplicados actualmente.',
      'Debido al reinicio de puntuación, tu rango podría cambiar.',
    ],
    worldEventChanges: [
      'El HP del jefe de Velika Defense aumenta significativamente.',
      'Los efectos base de los beneficios otorgados en las Guardian Missions aumentan significativamente.',
    ],
    dungeonDevNote: [
      'Las dungeons actuales se están completando más rápido de lo planeado. Esto se aceleró aún más tras el ajuste de scaling de los healers y volverá a aumentar tras la unificación de accesorios, ya que los beneficios de healer elevan mucho la tasa media de crítico de la party.',
      'Como consecuencia, la diferencia en el DPS total de la party según el estado de mejora del healer se volvió demasiado grande. Se aplicó este ajuste para que el crecimiento del healer sea más significativo y, dado que las clases especializadas en crítico estaban quedando en desventaja relativa, se aplicará Critical Resistance por etapas para aclarar los roles e identidades de clase.',
      'Para apoyar esta dirección, se añadieron pergaminos de grabado seleccionables a las recompensas de la temporada. El equipo afirma que seguirá monitoreando el resultado y haciendo ajustes finos.',
      'Además, los grupos que reclutan solo clases específicas para repetir clears rápidos con burst DPS totalmente potenciado justo al inicio están explotando una ventaja del sistema, pero ese no es el estilo de juego deseado. Por ello, se aumentó el HP de las dungeons para que los clears ocurran en un punto donde el DPS esté más normalizado independientemente de la composición.',
    ],
    accessoryConsolidationHighlights: [
      "Stormcry, Heroic Oath, Enhanced Heroic Oath y Kaia's Fury se consolidarán en un único tipo de accesorio.",
      'Los efectos de Crítico y Poder pasan a aplicarse simultáneamente.',
    ],
    accessoryPromotionChanges: [
      {
        title: 'Stormcry',
        details: ['La probabilidad adicional obtenida vía Equipment Mastery ahora llega hasta el 50%.'],
      },
      {
        title: 'Heroic Oath',
        details: [
          'La probabilidad base de promoción ahora es del 30%.',
          'En caso de fallo, la corrección de probabilidad aumenta del 1% al 3%.',
          'La probabilidad adicional obtenida vía Equipment Mastery ahora llega hasta el 70%, un aumento de 7 veces.',
        ],
      },
      {
        title: 'Enhanced Heroic Oath',
        details: [
          'La probabilidad base de promoción ahora es del 20%.',
          'La probabilidad adicional obtenida vía Equipment Mastery ahora llega hasta el 40%, un aumento de 4 veces.',
        ],
      },
      {
        title: "Kaia's Fury",
        details: [
          'Recibe +15.000.000 de Equipment Mastery EXP.',
          'Al completar totalmente la Equipment Mastery EXP, obtienes un 40% adicional de probabilidad de promoción.',
        ],
      },
    ],
    additionalAccessoryUpgradeHighlights: [
      "Se añadirán accesorios Annihilation y podrán promoverse a partir de accesorios Kaia's Fury.",
      'La tasa base de éxito de la mejora es del 10%.',
      'En caso de fallo, se aplica una corrección del 1%.',
      'Los Brooches y Circlets requieren un mayor consumo de materiales.',
      'El Etching no se preserva durante la mejora.',
    ],
    maskOfAnnihilation: [
      {
        name: 'Mask of Annihilation - Iron Wall',
        fixed:
          'Inflige un 12% de daño adicional al monstruo con mayor hostilidad contra ti.\nGenera un 15% de amenaza adicional al atacar monstruos.',
        random: 'Reduce el daño recibido de ataques frontales del 1% al 5%, en incrementos del 1%.',
      },
      {
        name: 'Mask of Annihilation - Salvation',
        fixed:
          'Aumenta la velocidad de ataque en un 5%.\nReduce el tiempo de recarga en un 2% (hay un error visual en el color de la fuente).',
        random: 'Poder +2 a +10, en incrementos de 2.',
      },
      {
        name: 'Mask of Annihilation - Destruction',
        fixed:
          'Inflige un 12% de daño adicional al atacar por la espalda.\nReduce la generación de amenaza en un 15% al atacar monstruos.',
        random: 'Reduce el tiempo de recarga del 1% al 3%, en incrementos del 0,5%.',
      },
    ],
    maskHighlights: [
      'La nueva Mask of Annihilation puede equiparse a partir del nivel de equipo total 800.',
      "Cae en Akeron's Inferno (Hard), con un límite de 2 veces por semana.",
      'El ítem es comercializable y se vincula al equipar, pudiendo desvincularse una vez.',
      'Cada máscara viene con 3 efectos aleatorios adicionales que cambian en cada obtención.',
      'Al desmontar la máscara, recibes 1 Source of Destruction.',
      'Con 5 Sources of Destruction, puedes obtener una Mask of Annihilation Random Crate.',
      'Con 10 Sources of Destruction, puedes comprar la máscara deseada.',
      "Tras completar Akeron's Inferno (Hard) 5 veces, se pueden obtener 5 Sources of Destruction vía achievements.",
      'Problema conocido: el color de la fuente del segundo efecto de Mask of Annihilation - Salvation aparece púrpura en lugar de violeta.',
    ],
    annihilationEnhancementHighlights: [
      'La mejora de armas y armaduras Annihilation se liberará hasta +15.',
      'Problema conocido: hay un error de nivel de equipo anormal, con corrección prevista para B132.',
      'A partir de +9, se empiezan a usar Darkshard enhancement stones y Alexandrite.',
      'Las enhancement stones se separan entre arma y armadura.',
      'La principal fuente de materiales de +9 en adelante es el crafting.',
      'Se añadirá Equipment Mastery al equipo Annihilation.',
      'Al completar la EXP de Equipment Mastery, la probabilidad de éxito aumenta en el mismo valor que la tasa base.',
      'En caso de fallo, la probabilidad de corrección crece de 2 a 5 veces más rápido.',
    ],
    annihilationBonusBreakdown: [
      'Weapon: Damage amplification',
      'Armor: Toughness',
      'Gloves: Critical chance',
      'Shoes: Critical resistance',
    ],
    craftingCleanupChanges: ['Se eliminarán las listas de crafting sin utilidad.'],
    craftingRecipes: [
      {
        title: 'Alexandrite',
        description: 'Gema de tier superior al Diamond, consumida en la mejora de equipo Annihilation (+9 o superior).',
        materials: ['10 Diamonds', '10.000 Craft Kits', '800 Production Points'],
        note: 'Tiene una tasa de caída extremadamente baja y su principal fuente es el crafting.',
      },
      {
        title: 'Darkshard Weapon Enhancement Stones',
        description: 'Material de mejora para armas Annihilation (+9 o superior).',
        materials: ['5 Disenchantment Neutralizer', '10 Darkshard of Red Magic', '500 Enchanting Dust (Annihilation)', '100 Production Points'],
      },
      {
        title: 'Darkshard Armor Enhancement Stones',
        description: 'Material de mejora para armaduras Annihilation (+9 o superior).',
        materials: ['5 Disenchantment Neutralizer', '10 Blue Enchanted Darkshard', '500 Enchanting Dust (Annihilation)', '100 Production Points'],
      },
      {
        title: 'Sapphire bulk crafting',
        description: 'Permite fabricar 10 Sapphires a la vez.',
        materials: ['20 Rubies', '200 Craft Kits', '200 Production Points'],
      },
    ],
    newItemSources: [
      { item: 'Darkshard of Red Magic', source: 'Dungeons de nivel 850+' },
      { item: 'Blue Enchanted Darkshard', source: 'Dungeons de nivel 850+' },
      { item: 'Disenchantment Neutralizer', source: 'Dungeons de nivel 700 a 850 y Pet Adventures' },
      { item: 'Nuevas recetas de crafting', source: 'Cae en dungeons por encima de determinado nivel.', note: 'Jewelry Patterns: Alexandrite cae solo en dungeons de nivel 900+.' },
      { item: '[Season 2] Enchanting Dust', source: 'Dungeons, excepto 890/900' },
      { item: '[Season 2] Broken Enchanted Steel Fragment', source: 'RK-9 Kennel y dungeons de nivel 900' },
      { item: 'Shining Tears of Elinu', source: 'La mayoría de las dungeons', note: 'Restaura 10.000 Production Points e es comercializable.' },
      { item: 'Tears of Elinu', source: 'Pet Adventures', note: 'Restaura 500 Production Points, no comercializable y no se acumula por encima de 10.' },
    ],
    itemRewardChanges: [
      'En general, se reducirá la cantidad de caída de seasonal Enchanting Dust.',
      'Se reducirá la cantidad de caída de Dungeon Core en un 50%. Con ELITE GOLD, recibes el doble.',
      'Se aumentará la Equipment EXP recibida en las Dungeon Vanguard Requests.',
      "Los ítems Stormcry, Heroic Oath, Kaia's Fury y Vergos ya no podrán desvincularse.",
      'Se eliminarán las misiones de baja eficiencia otorgadas tras superar las 25 Vanguard Requests.',
    ],
    upcomingItemChanges: ['El precio de los pergaminos de reinicio de dungeon canjeables por Dungeon Reset Scrolls se ajustará en 2 semanas.'],
    easterEventInfo: {
      period: 'Después del mantenimiento del 09/04/2026 hasta antes del mantenimiento del 23/04/2026, durante 2 semanas.',
      overview: 'Para celebrar Pascua, el evento te pide ayudar a Bunbunmin a encontrar los huevos ocultos en cada región y derrotar al Caiman Egg Thief para conseguir recompensas.',
      unlockRules: ['El evento desbloquea 1 etapa por día durante 6 días.', 'Todo el contenido queda liberado el 6º día.'],
      note: 'El encabezado extraído del aviso trae fechas contradictorias; el periodo anterior sigue el texto del cuerpo del evento.',
    },
    easterShopItems: [
      { item: '[Event] Lilly', rate: 16 },
      { item: '[Event] Nutrient-Packed Jackpot Egg', rate: 1 },
      { item: 'Footsteps: Sakura Tree (Normal)', rate: 8 },
      { item: 'Footsteps: Sakura Tree (Rare)', rate: 16 },
      { item: 'Hot! Easter Bunny Stamp (Normal)', rate: 8 },
      { item: 'Hot! Easter Bunny Stamp (Rare)', rate: 16 },
      { item: 'Revealing Water Bomb (Rainbow)', rate: 1 },
    ],
    easterJackpotRewards: [
      '[Event] Lilly',
      'Arun Stone/Shara Stone Gem Gacha Box (Lv. 1-3)',
      'High Training Book',
      'Training book for promotion: 10%.',
      'Training book for promotion: 20%.',
      'Stat Change Stone [Superior]',
      'Card EXP 100',
    ],
    easterEggHuntSteps: [
      'Derrota al Caiman Egg Thief que aparece por el mundo para recuperar huevos.',
      '[Event] Egg Dye se entrega diariamente como recompensa de presencia; los fines de semana, Hot Time también otorga recompensas extras.',
      'El ítem llega por correo tras un total diario de 2 horas y 30 minutos de login.',
      'Combina 2 [Event] Egg Dye con 1 [Event] Decorative Egg para obtener 1 [Event] Red Egg.',
      'Usa el [Event] Red Egg para canjearlo por varios ítems.',
      'Encuentra los huevos ocultos en cada ciudad para completar los achievements del evento.',
    ],
    rapidGrowthInfo: {
      overview: 'El Rapid Growth Event de la Temporada 1 regresa en esta actualización.',
      claim: 'Puedes reclamar el ítem una vez al iniciar sesión.',
      period: 'Disponible hasta el 11/06/2026.',
    },
    rapidGrowthChanges: [
      'Desmontar una Arun Stone o Shara Stone de nivel 5 otorga 1 Diamond.',
      'Desmontar una Arun Stone o Shara Stone de nivel 7 otorga 2 Diamonds.',
      'La primera caja ahora también otorga un ítem que aumenta la EXP de equipo en un 300% durante 30 días.',
      'El bono adicional se acumula con el Battle Pass.',
    ],
    systemChanges: [
      'El periodo de retención del correo cambia de 180 días a 30 días.',
      'La comisión por enviar oro por correo cambia del 0,5% al 33%.',
      'El coste base por enviar correo ahora es de 10.000 de oro.',
      'La comisión base del View Brokerage cambia del 3% al 10%.',
      'Con ELITE GOLD, la comisión del View Brokerage cambia del 2% al 0,5%.',
      'El periodo de listado en el View Brokerage cambia de 7 días a 14 días.',
      'El tiempo de espera para volver a unirse a una guild tras salir cambia de 24 horas a 72 horas.',
    ],
    systemDevNote: [
      'TERA prohíbe el comercio de ítems por dinero real. Más específicamente, según los términos de la plataforma de consola, no se permite el real-money trading de ítems.',
      'Para mantener el servicio de TERA Console, el equipo afirma que necesita estabilizar el entorno del juego. Recientemente, se informaron muchas estafas en transacciones por correo, en las que el jugador recibe el oro primero y luego no entrega el ítem, explotando la baja comisión del sistema de correo.',
      'Por ello, la actualización busca incentivar el uso del View Brokerage: se redujo la comisión para quienes usan ELITE GOLD y se duplicó el periodo de listado de ítems. Según la nota, dejar el escenario actual como está tiende a empeorar la situación, por lo que las medidas anteriores se aplicaron como forma de contención.',
      'El equipo informa además que las cuentas involucradas en delitos como estafas ya han sido listadas y que se están grabando todos los registros de chat y de transferencia de ítems.',
      'La recomendación oficial es nunca enviar oro o ítems primero y usar siempre el View Brokerage. La nota también afirma que las estafas se consideran un fallo personal y, por tanto, no hay restauración en ninguna situación.',
      'Tampoco habrá respuesta ante incidentes de hackeo causados por la exposición de la contraseña.',
    ],
    bugFixes: [
      'Se corrigió un problema en el que los efectos de la mascota no se actualizaban tras finalizar su duración.',
      'Se corrigió un problema en el que el efecto de corrosión de la mascota seguía activo tras el cambio (swap).',
      'Se corrigió un problema en el que algunos trajes no podían desvincularse incluso si aún tenían usos restantes.',
    ],
  },
};
