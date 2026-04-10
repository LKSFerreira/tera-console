import type { IdiomaSuportado } from '../types/idioma';

interface BugFixEntry {
  main: string;
  notes?: string[];
}

interface BlocoTituloLista {
  title: string;
  items: string[];
}

interface ConteudoB130_03 {
  sectionTitle: string;
  cardTitle: string;
  issues: BugFixEntry[];
}

interface ConteudoB130_02_Rewards {
  sectionTitle: string;
  devNoteTitle: string;
  devNoteParagraphs: string[];
  leftCardTitle: string;
  leftSections: BlocoTituloLista[];
  rightCardTitle: string;
  rightSections: BlocoTituloLista[];
}

interface ConteudoB130_02_Classes {
  sectionTitle: string;
  heroTitle: string;
  heroParagraphs: string[];
  cards: Array<{
    title: string;
    sections: Array<{
      title: string;
      description: string;
      notes?: string[];
    }>;
  }>;
}

interface ConteudoB130_02_System {
  sectionTitle: string;
  issues: string[];
}

interface ConteudoB130_01_BattlePass {
  sectionTitle: string;
  leftTitle: string;
  leftDescription: string;
  leftBoxTop: string;
  leftBoxBottom: string;
  rightTitle: string;
  rewards: string[];
}

interface ConteudoB130_01_Dungeons {
  sectionTitle: string;
  featured: {
    title: string;
    itemLevel: string;
    entryLimit: string;
    leftTitle: string;
    leftGroups: BlocoTituloLista[];
    rightTitle: string;
    rightItems: string[];
  };
  cards: Array<{
    title: string;
    levelLine: string;
    locationLine?: string;
    intro?: string;
    items: string[];
  }>;
}

interface ConteudoB130_01_Crafting {
  sectionTitle: string;
  heroTitle: string;
  heroDescription: string;
  bulkCards: Array<{
    title: string;
    details: string[];
  }>;
  leftTitle: string;
  leftSections: BlocoTituloLista[];
  rightTitle: string;
  rightItems: string[];
}

interface ConteudoB130_01_Classes {
  sectionTitle: string;
  cards: Array<{
    title: string;
    sections: Array<{
      title: string;
      description?: string;
      items?: string[];
    }>;
  }>;
}

interface ConteudoB130_01_System {
  sectionTitle: string;
  issues: string[];
}

interface ConteudoPatchB130 {
  b130_03: ConteudoB130_03;
  b130_02: {
    rewards: ConteudoB130_02_Rewards;
    classes: ConteudoB130_02_Classes;
    system: ConteudoB130_02_System;
  };
  b130_01: {
    battlePass: ConteudoB130_01_BattlePass;
    dungeons: ConteudoB130_01_Dungeons;
    crafting: ConteudoB130_01_Crafting;
    classes: ConteudoB130_01_Classes;
    system: ConteudoB130_01_System;
  };
}

export const patchNotesB130PorIdioma = {
  'pt-BR': {
    b130_03: {
      sectionTitle: 'Bug Fixes & Correções',
      cardTitle: 'Resolução de Problemas',
      issues: [
        {
          main: 'Corrigido o problema onde o efeito Divine Charge do Priest desaparecia ao usar Energy Stars.',
          notes: [
            'Em dungeons, os efeitos benéficos de Priest e Mystic não podem mais sobrescrever um ao outro.',
            'Em raid dungeons, os efeitos benéficos de Priest e Mystic continuam podendo sobrescrever um ao outro.',
          ],
        },
        {
          main: 'Corrigido o problema onde os set effects de Accessory não realizavam stack.',
        },
      ],
    },
    b130_02: {
      rewards: {
        sectionTitle: 'Rewards & Dungeon Drops',
        devNoteTitle: 'Notas dos Desenvolvedores',
        devNoteParagraphs: [
          'O DPS meter é uma feature temporária e não temos planos de desenvolvê-la ainda mais, já que desenvolvimento relacionado a isso é visto negativamente da perspectiva do desenvolvedor. Ele permanecerá até o B130, e qualquer implementação contínua será revisada separadamente.',
          'Runes são conteúdo de progressão de tier alto, e Rune Stat Change Stone tem a intenção de dropar apenas de dungeons de tier superior. Para jogadores com item level mais baixo, a progressão de rune é significativamente menos eficiente, então o acesso será restringido para incentivar foco em elementos como Stigma e Card.',
          'Dungeon Reset Scrolls podem sofrer dismantle apenas em versões composite. Não há plano para suportar dismantle em itens General; a recomendação é guardá-los para quando as dungeons relevantes forem adicionadas no futuro.',
        ],
        leftCardTitle: 'Dungeon Rewards',
        leftSections: [
          {
            title: "Cursed Antaroth's Abyss",
            items: [
              'Drop de Rune Stat Change Stone como shared party loot.',
              'Drop de Rune Stat Change Stone Crate (Tradeable) com chance no personal loot; ao usar, concede aleatoriamente de 5 a 20 pedras.',
            ],
          },
          {
            title: 'Ghillieglade (ELITE GOLD)',
            items: [
              'Arun/Shara Stone Jewel Gacha Box (Lv. 1) agora pode conceder Rune Stat Change Stone.',
              'Arun/Shara Stone Jewel Gacha Box (Lv. 1~3) agora pode conceder Diamond.',
              "Bracelet of Absolute Equilibrium agora pode conceder God's Power Stone.",
              'Drops de Fluorite Shard, Rune Stat Change e materiais de rune aumentados; drop de Runestone reduzido.',
            ],
          },
        ],
        rightCardTitle: 'Vanguard & Dismantling',
        rightSections: [
          {
            title: 'Vanguard Request',
            items: ["A recompensa base de reputation para Abyss of the Cursed Antaroth (Last Stand) foi ajustada de 1000 para 1150."],
          },
          {
            title: 'Dismantling Adicionado',
            items: [
              'Growth Support: [Season 1] Enhancement Powder (30 days)',
              'Growth Support: [Season 1] Enhancement Powder (Entire Season)',
              'Instance Reset Scroll',
            ],
          },
        ],
      },
      classes: {
        sectionTitle: 'Classes & Balanceamento',
        heroTitle: 'Balanceamento de Healers',
        heroParagraphs: [
          'Após a recente atualização de healer coefficient, o balanço entre Priest e Mystic foi severamente quebrado. O Mystic será ajustado para aproximar o cenário do equilíbrio esperado.',
          'A taxa de amplification dos efeitos fornecidos por healers aumentou mais de 8x comparado a antes, fazendo partys com dois healers superarem partys com um healer. Alta sobrevivência é intencional, mas alta performance não; por isso, medidas foram tomadas para impedir que os efeitos stackem.',
        ],
        cards: [
          {
            title: 'Mystic',
            sections: [
              {
                title: 'Fortified Thrall of Vengeance',
                description: 'Power increase alterado de 23 para 28.',
                notes: ['Quando aplicado, remove Blessing of Shakan e Energy Stars do Priest.'],
              },
              {
                title: 'Summon: Thrall Lord',
                description: 'Cooldown alterado de 600 para 150 segundos.',
                notes: [
                  'Se usado após Thrall Augmentation:',
                  'Power increase de 15 para 55.',
                  'Duração de 30s para 25s.',
                  'Remove Blessing of Shakan e Energy Stars.',
                ],
              },
            ],
          },
          {
            title: 'Priest',
            sections: [
              {
                title: 'Blessing of Shakan / Energy Stars',
                description: "Ao ser usado, remove fortemente Fortified Thrall of Vengeance e Thrall Lord's Favor do Mystic.",
              },
              {
                title: "Kaia's Shield",
                description: 'Alterado de lock-on para shot-type skill e agora funciona como instant cast skill.',
                notes: ['Mudança feita para reduzir cancelamentos em cenários de ping alto.'],
              },
            ],
          },
          {
            title: 'Warrior & System',
            sections: [
              {
                title: 'Warrior: Blade Draw',
                description: 'O efeito que reduz o cooldown restante de Infuriate foi significativamente reduzido.',
              },
              {
                title: 'System Messages',
                description: 'Mensagens de sistema disparadas por glyph effects de cada classe não serão mais mostradas. Pode sofrer rollback se isso dificultar o reconhecimento das skills.',
              },
            ],
          },
        ],
      },
      system: {
        sectionTitle: 'Bug Fixes & System',
        issues: [
          'Corrigido problema em Abyss of the Cursed Antaroth (Last Stand) onde um wipe pattern impossível ocorria ao fazer certas ações.',
          'Corrigido problema em Refined Stigma onde uma opção rara de cooldown poderia ser selecionada.',
          'Corrigido problema no pacote de idiomas onde o valor de tradução para “Will of Battle” estava incorreto.',
          'Corrigido problema onde a animação de entrada desaparecia ao aplicar shaders/post-processing, como ao usar skills Godsfall.',
          'Corrigido problema onde receitas de evento não podiam sofrer crafting.',
        ],
      },
    },
    b130_01: {
      battlePass: {
        sectionTitle: 'Battle Pass - EVENT SEASON',
        leftTitle: 'Evento Especial: 5 Semanas',
        leftDescription: 'O evento Battle Pass terá duração de 5 semanas, de 26/02/2026 até 02/04/2026.',
        leftBoxTop: 'Pode ser adquirido por 1.000 TERA Coins.',
        leftBoxBottom: 'Um total de 500 TERA Coins será retornado como payback no Nível 50.',
        rightTitle: 'Principais Recompensas',
        rewards: [
          '[Rare] Passionate Yukata Box',
          'Perfect Stigma Crystal (Legendary)',
          'Refined Stigma Crystal (Legendary)',
          'Dungeon Reset Scroll Fragment',
          '500 TERA Coins',
        ],
      },
      dungeons: {
        sectionTitle: 'Novas Dungeons',
        featured: {
          title: 'Cursed Antaroth - Last Stand',
          itemLevel: 'Item Level: 900',
          entryLimit: 'Entry limit: 2',
          leftTitle: 'Entrada & Leaderboard',
          leftGroups: [
            {
              title: 'Entrada & Leaderboard',
              items: [
                'Dedução de entrada compartilhada com Cursed Antaroth / Hard.',
                'É possível entrar usando reset scrolls mesmo com entradas compartilhadas em 0.',
                'Não é possível usar Battle Pass: All Dungeon Reset Scrolls.',
                'Leaderboard em tempo real adicionado, sem recompensas vinculadas.',
              ],
            },
            {
              title: 'Mecânicas',
              items: [
                'Em certos limiares de HP, efeitos de restrição de heal ou ressurreição são aplicados aleatoriamente.',
                'Há aplicação aleatória de 1 entre 3 mecânicas especiais e patterns condicionais.',
              ],
            },
          ],
          rightTitle: 'Recompensas e Drops',
          rightItems: [
            'Acquisition nas boxes foi levemente aumentado.',
            'O item Cursed Abyss Power não cairá mais nas boxes.',
            'Materiais de Rune passam a dropar com 100% de quantidade adicional.',
            'Drop adicional por chance: Rune Essence of Inheritance, Stone Imbued with Divine Power e Random Engraving Book Box - Legendary.',
          ],
        },
        cards: [
          {
            title: 'Frozen Star - Lower',
            levelLine: 'Level: 815 | Limit: 2',
            locationLine: 'Loc: Westonia',
            items: [
              'Recompensa do Vanguard Request igual ao tier 800.',
              'Possui parte da drop table da versão de tier superior.',
              'Drops: Refined Stigma Synthesis Scroll, Stigma Refinement Stone, Crafting Design - Powder of Annihilation.',
              'Baixa chance de dropar Random Engraving Book Box - Legendary.',
            ],
          },
          {
            title: 'Frozen Star - EVENT (Solo)',
            levelLine: 'Level: 500 | Limit: 2',
            locationLine: 'Loc: Velika, Highwatch',
            intro: 'Os itens requeridos para participação no evento serão dropados aqui:',
            items: ['[Event] Frozen Heart', '[Event] Burning Heart'],
          },
        ],
      },
      crafting: {
        sectionTitle: 'Crafting, Stigmas & Itens',
        heroTitle: 'Bulk Gem Crafting',
        heroDescription: 'Novas receitas de Bulk Gem foram adicionadas, permitindo consumir grande quantidade de Production Points de uma só vez. Elas podem ser obtidas em dungeons 700+ com chance baixa.',
        bulkCards: [
          {
            title: 'Bulk Emeralds',
            details: ['PP Consumido: 600', 'Materiais: 50 Sapphires, 1k Crafting Kits', 'Sucesso: 10 Emeralds (13 no Great Success)'],
          },
          {
            title: 'Bulk Diamonds',
            details: ['PP Consumido: 3.500', 'Materiais: 100 Emeralds, 10k Crafting Kits', 'Sucesso: 10 Diamonds (13 no Great Success)'],
          },
        ],
        leftTitle: 'Stigma & Runes',
        leftSections: [
          {
            title: 'Stigma Updates',
            items: [
              'Efeitos Common não aparecerão mais; stigmas atuais serão convertidos para Superior.',
              'Custos de gold reduzidos para trocar opções nos estágios Superior e Rare.',
              'Chance de enhancement e chance de compensação por falha aumentadas bastante, de 1% para 5%.',
              'Legendary Stigmas podem receber upgrade para Refined Stigma por 1.5M gold, sem preservar opções aleatórias.',
            ],
          },
          {
            title: 'Runes Updates',
            items: [
              'Limite de troca de opções aumentado de 5 para 100 vezes.',
              'Consumo de option change stones e gold para Rune polishing bastante aumentados.',
            ],
          },
        ],
        rightTitle: 'Misc Items & Systems',
        rightItems: [
          'ELITE GOLD: o cooldown de ressurreição mudou de 24h para 2 horas.',
          'World Event: um merchant de troca de Reputation Point foi adicionado a Highwatch.',
          'Pet Adventures: Arborea’s Golden/Silver Plate removidos; Fluorite Fragments e Broken Rune Pieces adicionados.',
          'Bracelets podem sofrer dismantle em troca de 5 Fluorites, com pequena chance de dropar Stone Imbued with Divine Power.',
          'Reset Scrolls podem ser desmontados em fragmentos para troca por scrolls de outras dungeons, e o cooldown mudou para 30 minutos.',
        ],
      },
      classes: {
        sectionTitle: 'Classes & Skills',
        cards: [
          {
            title: 'Mystic',
            sections: [
              {
                title: 'Thrall Augmentation + Summon: Thrall Lord',
                items: [
                  'Se invocado durante a skill, concede Power +15 e Attack Speed +5% para a party por 30s.',
                  'Animação simplificada; um Thrall Lord rosa é invocado.',
                  'Não realiza dismiss do Thrall of Wrath/Vengeance, embora a coexistência continue restrita.',
                ],
              },
            ],
          },
          {
            title: 'Priest',
            sections: [
              { title: "Kaia's Shield V", description: 'Após o lock-on, o casting passa a permitir movimento.' },
              { title: 'Divine Charge', description: 'Na carga máxima, critical power aumenta de 20% para 40%.' },
            ],
          },
          {
            title: 'Berserker',
            sections: [
              {
                title: 'Unleashed',
                items: [
                  'Casting speed 20% mais rápido; permanece evasivo até o shockwave sair.',
                  'Rage é restaurado em grande quantidade no shockwave; pode cancelar com Beastly Charge no rage máximo.',
                ],
              },
              { title: 'Frenzy', description: 'Cooldown reduzido de 90s para 70s; Power ajustado de 20% para 16%.' },
            ],
          },
          {
            title: 'Warrior',
            sections: [
              { title: 'Cross Parry', description: 'Após um bloqueio bem-sucedido, Storm Aura não desaparece mais. Perfect Block habilitado.' },
              { title: 'Blade Frenzy: Slash', description: 'Ao usar, reduz o cooldown de Infuriate.' },
            ],
          },
          {
            title: 'Ninja',
            sections: [
              { title: 'Willpower Skills', description: 'Recuperação de Willpower aumentada em Shuriken Burst, Spread Shuriken, Throw Fireball e Quick Attack.' },
              { title: 'Evasion Skills', description: 'Tempo de evasão levemente aumentado em Retreat, Inner Harmony e Evasive Smoke.' },
            ],
          },
          {
            title: 'System Messages',
            sections: [
              { title: 'System Messages', description: 'Mensagens de sistema acionadas por cada classe deixam de ser exibidas. A mudança pode sofrer rollback se afetar o monitoramento do combate.' },
            ],
          },
        ],
      },
      system: {
        sectionTitle: 'Bug Fixes & System',
        issues: [
          'Corrigido nome ausente do pet Kunkun em idiomas diferentes do coreano.',
          'Corrigido problema onde o Reaper podia ignorar special patterns do Cursed Antaroth.',
          'Corrigido problema onde a chance não aumentava conforme a gear EXP para Brooch of the Solemn Oath e Circlet of the Solemn Oath.',
          'Corrigido problema de mensagens não aparecendo em Cursed Antaroth.',
          'Corrigido wipe attack que não disparava mesmo quando as condições eram cumpridas em Cursed Antaroth (Hard).',
          'Corrigidos os quest steps da missão To Stop the Ghilliedhus na vila.',
        ],
      },
    },
  },
  'en-US': {
    b130_03: {
      sectionTitle: 'Bug Fixes & Corrections',
      cardTitle: 'Issue Resolution',
      issues: [
        {
          main: 'Fixed an issue where Priest’s Divine Charge effect disappeared when using Energy Stars.',
          notes: [
            'Inside dungeons, beneficial effects from Priest and Mystic can no longer overwrite each other.',
            'Inside raid dungeons, beneficial effects from Priest and Mystic can still overwrite each other.',
          ],
        },
        {
          main: 'Fixed an issue where Accessory set effects were not stacking properly.',
        },
      ],
    },
    b130_02: {
      rewards: {
        sectionTitle: 'Rewards & Dungeon Drops',
        devNoteTitle: "Developer's Notes",
        devNoteParagraphs: [
          'The DPS meter is a temporary feature and there are no plans to expand it further, since development related to that feature is viewed negatively from the developer perspective. It will remain until B130, and any continued implementation will be reviewed separately.',
          'Runes are high-tier progression content, and Rune Stat Change Stone is intended to drop only from higher-tier dungeons. For players with lower item level, rune progression is much less efficient, so access will be intentionally restricted to keep the focus on systems like Stigma and Card.',
          'Dungeon Reset Scrolls can only be dismantled in composite versions. There are no plans to support dismantling General items, so players are advised to keep them until the relevant dungeons are added later.',
        ],
        leftCardTitle: 'Dungeon Rewards',
        leftSections: [
          {
            title: "Cursed Antaroth's Abyss",
            items: [
              'Rune Stat Change Stone drops as shared party loot.',
              'Rune Stat Change Stone Crate (Tradeable) can drop as a personal loot alternative and grants 5 to 20 stones at random when opened.',
            ],
          },
          {
            title: 'Ghillieglade (ELITE GOLD)',
            items: [
              'Arun/Shara Stone Jewel Gacha Box (Lv. 1) can now grant Rune Stat Change Stone.',
              'Arun/Shara Stone Jewel Gacha Box (Lv. 1~3) can now grant Diamond.',
              "Bracelet of Absolute Equilibrium can now grant God's Power Stone.",
              'Drops of Fluorite Shard, Rune Stat Change and rune materials were increased, while Runestone drop rate was reduced.',
            ],
          },
        ],
        rightCardTitle: 'Vanguard & Dismantling',
        rightSections: [
          {
            title: 'Vanguard Request',
            items: ["The base reputation reward for Abyss of the Cursed Antaroth (Last Stand) was adjusted from 1000 to 1150."],
          },
          {
            title: 'Dismantling Added',
            items: [
              'Growth Support: [Season 1] Enhancement Powder (30 days)',
              'Growth Support: [Season 1] Enhancement Powder (Entire Season)',
              'Instance Reset Scroll',
            ],
          },
        ],
      },
      classes: {
        sectionTitle: 'Classes & Balance',
        heroTitle: 'Healer Balance',
        heroParagraphs: [
          'After the recent healer coefficient update, the balance between Priest and Mystic became severely distorted. Mystic will be adjusted to bring the situation closer to the intended balance.',
          'The amplification rate of healer-provided effects increased by more than 8x compared to before, making parties with two healers stronger than parties with one healer. High survivability is intentional, but high performance is not, so measures were taken to prevent both sets of effects from stacking.',
        ],
        cards: [
          {
            title: 'Mystic',
            sections: [
              {
                title: 'Fortified Thrall of Vengeance',
                description: 'Power increase changed from 23 to 28.',
                notes: ['When applied, it removes Priest’s Blessing of Shakan and Energy Stars.'],
              },
              {
                title: 'Summon: Thrall Lord',
                description: 'Cooldown changed from 600 to 150 seconds.',
                notes: [
                  'If used after Thrall Augmentation:',
                  'Power increase changes from 15 to 55.',
                  'Duration changes from 30s to 25s.',
                  'Removes Blessing of Shakan and Energy Stars.',
                ],
              },
            ],
          },
          {
            title: 'Priest',
            sections: [
              {
                title: 'Blessing of Shakan / Energy Stars',
                description: "When used, it forcibly removes Mystic's Fortified Thrall of Vengeance and Thrall Lord's Favor.",
              },
              {
                title: "Kaia's Shield",
                description: 'Changed from a lock-on shot-type skill into an instant-cast skill.',
                notes: ['This change was made to reduce cancels in high-ping environments.'],
              },
            ],
          },
          {
            title: 'Warrior & System',
            sections: [
              {
                title: 'Warrior: Blade Draw',
                description: 'The effect that reduces the remaining cooldown of Infuriate was significantly reduced.',
              },
              {
                title: 'System Messages',
                description: 'System messages triggered by class glyph effects will no longer be shown. This may be rolled back if it hurts combat recognition.',
              },
            ],
          },
        ],
      },
      system: {
        sectionTitle: 'Bug Fixes & System',
        issues: [
          'Fixed an issue in Abyss of the Cursed Antaroth (Last Stand) where an impossible wipe pattern could occur after specific actions.',
          'Fixed an issue in Refined Stigma where a rare cooldown option could be selected.',
          'Fixed an issue in the language package where the translation value for “Will of Battle” was incorrect.',
          'Fixed an issue where the entry animation disappeared when applying shaders/post-processing, such as Godsfall skills.',
          'Fixed an issue where event recipes could not be crafted.',
        ],
      },
    },
    b130_01: {
      battlePass: {
        sectionTitle: 'Battle Pass - EVENT SEASON',
        leftTitle: 'Special Event: 5 Weeks',
        leftDescription: 'The event Battle Pass lasts 5 weeks, from February 26, 2026 to April 2, 2026.',
        leftBoxTop: 'It can be purchased for 1,000 TERA Coins.',
        leftBoxBottom: 'A total of 500 TERA Coins is returned as payback at Level 50.',
        rightTitle: 'Main Rewards',
        rewards: ['[Rare] Passionate Yukata Box', 'Perfect Stigma Crystal (Legendary)', 'Refined Stigma Crystal (Legendary)', 'Dungeon Reset Scroll Fragment', '500 TERA Coins'],
      },
      dungeons: {
        sectionTitle: 'New Dungeons',
        featured: {
          title: 'Cursed Antaroth - Last Stand',
          itemLevel: 'Item Level: 900',
          entryLimit: 'Entry limit: 2',
          leftTitle: 'Entry & Leaderboard',
          leftGroups: [
            {
              title: 'Entry & Leaderboard',
              items: [
                'Shares entry count with Cursed Antaroth / Hard.',
                'You can still enter with reset scrolls even when shared entries are at 0.',
                'Battle Pass: All Dungeon Reset Scrolls cannot be used.',
                'A live leaderboard was added with no linked rewards.',
              ],
            },
            {
              title: 'Mechanics',
              items: [
                'At certain HP thresholds, restrictions on healing or resurrection are applied at random.',
                'One out of three special mechanics is applied at random together with conditional patterns.',
              ],
            },
          ],
          rightTitle: 'Rewards and Drops',
          rightItems: [
            'Acquisition in the reward boxes was slightly increased.',
            'The item Cursed Abyss Power no longer drops from the boxes.',
            'Rune materials now drop with 100% extra quantity.',
            'Chance-based extra drop: Rune Essence of Inheritance, Stone Imbued with Divine Power and Random Engraving Book Box - Legendary.',
          ],
        },
        cards: [
          {
            title: 'Frozen Star - Lower',
            levelLine: 'Level: 815 | Limit: 2',
            locationLine: 'Loc: Westonia',
            items: [
              'Vanguard Request reward is equal to the tier 800 reward.',
              'Includes part of the drop table from the higher-tier version.',
              'Drops: Refined Stigma Synthesis Scroll, Stigma Refinement Stone, Crafting Design - Powder of Annihilation.',
              'Low chance to drop Random Engraving Book Box - Legendary.',
            ],
          },
          {
            title: 'Frozen Star - EVENT (Solo)',
            levelLine: 'Level: 500 | Limit: 2',
            locationLine: 'Loc: Velika, Highwatch',
            intro: 'The required event participation items can be farmed here:',
            items: ['[Event] Frozen Heart', '[Event] Burning Heart'],
          },
        ],
      },
      crafting: {
        sectionTitle: 'Crafting, Stigmas & Items',
        heroTitle: 'Bulk Gem Crafting',
        heroDescription: 'New Bulk Gem recipes were added, allowing large amounts of Production Points to be spent at once. They can be obtained from 700+ dungeons with low chance.',
        bulkCards: [
          { title: 'Bulk Emeralds', details: ['PP Consumed: 600', 'Materials: 50 Sapphires, 1k Crafting Kits', 'Success: 10 Emeralds (13 on Great Success)'] },
          { title: 'Bulk Diamonds', details: ['PP Consumed: 3,500', 'Materials: 100 Emeralds, 10k Crafting Kits', 'Success: 10 Diamonds (13 on Great Success)'] },
        ],
        leftTitle: 'Stigma & Runes',
        leftSections: [
          {
            title: 'Stigma Updates',
            items: [
              'Common effects will no longer appear; current stigmas will be converted to Superior.',
              'Gold costs for changing options at Superior and Rare stages were reduced.',
              'Enhancement chance and failure compensation chance were both greatly increased, from 1% to 5%.',
              'Legendary Stigmas can be upgraded to Refined Stigma for 1.5M gold without preserving random options.',
            ],
          },
          {
            title: 'Runes Updates',
            items: ['The option reroll limit was increased from 5 to 100 times.', 'Consumption of option change stones and gold for Rune polishing was significantly increased.'],
          },
        ],
        rightTitle: 'Misc Items & Systems',
        rightItems: [
          'ELITE GOLD: resurrection cooldown changed from 24h to 2 hours.',
          'World Event: a Reputation Point exchange merchant was added to Highwatch.',
          'Pet Adventures: Arborea’s Golden/Silver Plate removed; Fluorite Fragments and Broken Rune Pieces added.',
          'Bracelets can be dismantled in exchange for 5 Fluorites, with a small chance to drop Stone Imbued with Divine Power.',
          'Reset Scrolls can be dismantled into fragments for exchange into other dungeon scrolls, and their cooldown changed to 30 minutes.',
        ],
      },
      classes: {
        sectionTitle: 'Classes & Skills',
        cards: [
          { title: 'Mystic', sections: [{ title: 'Thrall Augmentation + Summon: Thrall Lord', items: ['If summoned during the skill, it grants Power +15 and Attack Speed +5% to the party for 30s.', 'Animation was simplified; it now summons a pink Thrall Lord.', 'It does not dismiss Thrall of Wrath/Vengeance, although coexistence remains restricted.'] }] },
          { title: 'Priest', sections: [{ title: "Kaia's Shield V", description: 'After lock-on, the cast now allows movement.' }, { title: 'Divine Charge', description: 'At maximum charge, critical power increases from 20% to 40%.' }] },
          { title: 'Berserker', sections: [{ title: 'Unleashed', items: ['Casting speed is 20% faster and remains evasive until the shockwave is released.', 'Rage is heavily restored on the shockwave and can be cancelled with Beastly Charge at maximum rage.'] }, { title: 'Frenzy', description: 'Cooldown reduced from 90s to 70s, and Power adjusted from 20% to 16%.' }] },
          { title: 'Warrior', sections: [{ title: 'Cross Parry', description: 'After a successful block, Storm Aura no longer disappears. Perfect Block enabled.' }, { title: 'Blade Frenzy: Slash', description: 'Using it reduces the cooldown of Infuriate.' }] },
          { title: 'Ninja', sections: [{ title: 'Willpower Skills', description: 'Willpower recovery increased on Shuriken Burst, Spread Shuriken, Throw Fireball and Quick Attack.' }, { title: 'Evasion Skills', description: 'Evasion time slightly increased on Retreat, Inner Harmony and Evasive Smoke.' }] },
          { title: 'System Messages', sections: [{ title: 'System Messages', description: 'System messages triggered by each class will no longer be displayed. The change may be rolled back if it affects combat tracking.' }] },
        ],
      },
      system: {
        sectionTitle: 'Bug Fixes & System',
        issues: [
          'Fixed missing pet name for Kunkun in languages other than Korean.',
          'Fixed an issue where Reaper could ignore special patterns from Cursed Antaroth.',
          'Fixed an issue where chance did not increase according to gear EXP for Brooch of the Solemn Oath and Circlet of the Solemn Oath.',
          'Fixed an issue where messages were not appearing in Cursed Antaroth.',
          'Fixed a wipe attack that was not triggering even when its conditions were met in Cursed Antaroth (Hard).',
          'Fixed quest steps for To Stop the Ghilliedhus in the village.',
        ],
      },
    },
  },
  'es-ES': {
    b130_03: {
      sectionTitle: 'Bug Fixes & Correcciones',
      cardTitle: 'Resolución de Problemas',
      issues: [
        {
          main: 'Se corrigió un problema en el que el efecto Divine Charge del Priest desaparecía al usar Energy Stars.',
          notes: [
            'Dentro de dungeons, los efectos beneficiosos de Priest y Mystic ya no pueden sobrescribirse entre sí.',
            'Dentro de raid dungeons, los efectos beneficiosos de Priest y Mystic sí pueden seguir sobrescribiéndose.',
          ],
        },
        {
          main: 'Se corrigió un problema en el que los set effects de Accessory no acumulaban correctamente.',
        },
      ],
    },
    b130_02: {
      rewards: {
        sectionTitle: 'Rewards & Dungeon Drops',
        devNoteTitle: 'Notas de los Desarrolladores',
        devNoteParagraphs: [
          'El DPS meter es una función temporal y no hay planes de expandirla más, ya que ese tipo de desarrollo se ve negativamente desde la perspectiva del desarrollador. Permanecerá hasta B130 y cualquier continuación se revisará por separado.',
          'Runes son contenido de progresión de tier alto, y Rune Stat Change Stone está pensado para caer solo en dungeons de tier superior. Para jugadores con item level más bajo, la progresión de runes es mucho menos eficiente, así que el acceso será restringido de forma intencional para mantener el foco en sistemas como Stigma y Card.',
          'Dungeon Reset Scrolls solo pueden desmontarse en versiones composite. No hay planes de permitir dismantle para ítems General, por lo que se recomienda guardarlos hasta que se añadan las dungeons relevantes.',
        ],
        leftCardTitle: 'Dungeon Rewards',
        leftSections: [
          {
            title: "Cursed Antaroth's Abyss",
            items: [
              'Rune Stat Change Stone cae como shared party loot.',
              'Rune Stat Change Stone Crate (Tradeable) puede caer como alternativa en personal loot y concede de 5 a 20 piedras aleatorias al abrirse.',
            ],
          },
          {
            title: 'Ghillieglade (ELITE GOLD)',
            items: [
              'Arun/Shara Stone Jewel Gacha Box (Lv. 1) ahora puede conceder Rune Stat Change Stone.',
              'Arun/Shara Stone Jewel Gacha Box (Lv. 1~3) ahora puede conceder Diamond.',
              "Bracelet of Absolute Equilibrium ahora puede conceder God's Power Stone.",
              'Aumentaron los drops de Fluorite Shard, Rune Stat Change y materiales de rune, mientras que el drop de Runestone fue reducido.',
            ],
          },
        ],
        rightCardTitle: 'Vanguard & Dismantling',
        rightSections: [
          {
            title: 'Vanguard Request',
            items: ["La recompensa base de reputation para Abyss of the Cursed Antaroth (Last Stand) se ajustó de 1000 a 1150."],
          },
          {
            title: 'Dismantling Añadido',
            items: [
              'Growth Support: [Season 1] Enhancement Powder (30 days)',
              'Growth Support: [Season 1] Enhancement Powder (Entire Season)',
              'Instance Reset Scroll',
            ],
          },
        ],
      },
      classes: {
        sectionTitle: 'Clases & Balance',
        heroTitle: 'Balance de Healers',
        heroParagraphs: [
          'Después de la actualización reciente del healer coefficient, el equilibrio entre Priest y Mystic quedó muy roto. Mystic será ajustado para acercar la situación al balance esperado.',
          'La tasa de amplification de los efectos otorgados por healers aumentó más de 8 veces respecto a antes, haciendo que las partys con dos healers superen a las partys con uno. La alta supervivencia es intencional, pero la alta performance no, así que se tomaron medidas para evitar que ambos efectos hagan stack.',
        ],
        cards: [
          {
            title: 'Mystic',
            sections: [
              {
                title: 'Fortified Thrall of Vengeance',
                description: 'Power increase cambió de 23 a 28.',
                notes: ['Cuando se aplica, elimina Blessing of Shakan y Energy Stars del Priest.'],
              },
              {
                title: 'Summon: Thrall Lord',
                description: 'Cooldown cambiado de 600 a 150 segundos.',
                notes: [
                  'Si se usa después de Thrall Augmentation:',
                  'Power increase cambia de 15 a 55.',
                  'La duración cambia de 30s a 25s.',
                  'Elimina Blessing of Shakan y Energy Stars.',
                ],
              },
            ],
          },
          {
            title: 'Priest',
            sections: [
              {
                title: 'Blessing of Shakan / Energy Stars',
                description: "Al usarse, elimina por la fuerza Fortified Thrall of Vengeance y Thrall Lord's Favor del Mystic.",
              },
              {
                title: "Kaia's Shield",
                description: 'Pasó de lock-on shot-type skill a instant cast skill.',
                notes: ['El cambio se hizo para reducir cancelaciones en escenarios con ping alto.'],
              },
            ],
          },
          {
            title: 'Warrior & System',
            sections: [
              {
                title: 'Warrior: Blade Draw',
                description: 'El efecto que reduce el cooldown restante de Infuriate fue reducido de forma significativa.',
              },
              {
                title: 'System Messages',
                description: 'Los mensajes de sistema activados por glyph effects de clase ya no se mostrarán. Este cambio puede revertirse si perjudica el reconocimiento del combate.',
              },
            ],
          },
        ],
      },
      system: {
        sectionTitle: 'Bug Fixes & System',
        issues: [
          'Se corrigió un problema en Abyss of the Cursed Antaroth (Last Stand) donde podía ocurrir un wipe pattern imposible tras ciertas acciones.',
          'Se corrigió un problema en Refined Stigma donde se podía seleccionar una opción rara de cooldown.',
          'Se corrigió un problema del paquete de idiomas donde el valor de traducción de “Will of Battle” era incorrecto.',
          'Se corrigió un problema donde la animación de entrada desaparecía al aplicar shaders/post-processing, como con skills Godsfall.',
          'Se corrigió un problema donde las recetas de evento no podían fabricarse.',
        ],
      },
    },
    b130_01: {
      battlePass: {
        sectionTitle: 'Battle Pass - EVENT SEASON',
        leftTitle: 'Evento Especial: 5 Semanas',
        leftDescription: 'El evento Battle Pass dura 5 semanas, desde el 26/02/2026 hasta el 02/04/2026.',
        leftBoxTop: 'Puede adquirirse por 1.000 TERA Coins.',
        leftBoxBottom: 'Se devuelven 500 TERA Coins como payback en el Nivel 50.',
        rightTitle: 'Recompensas Principales',
        rewards: ['[Rare] Passionate Yukata Box', 'Perfect Stigma Crystal (Legendary)', 'Refined Stigma Crystal (Legendary)', 'Dungeon Reset Scroll Fragment', '500 TERA Coins'],
      },
      dungeons: {
        sectionTitle: 'Nuevas Dungeons',
        featured: {
          title: 'Cursed Antaroth - Last Stand',
          itemLevel: 'Item Level: 900',
          entryLimit: 'Entry limit: 2',
          leftTitle: 'Entrada & Leaderboard',
          leftGroups: [
            {
              title: 'Entrada & Leaderboard',
              items: [
                'Comparte consumo de entrada con Cursed Antaroth / Hard.',
                'Se puede entrar con reset scrolls aunque las entradas compartidas estén en 0.',
                'No se puede usar Battle Pass: All Dungeon Reset Scrolls.',
                'Se añadió leaderboard en tiempo real sin recompensas asociadas.',
              ],
            },
            {
              title: 'Mecánicas',
              items: [
                'En ciertos umbrales de HP se aplican aleatoriamente restricciones de heal o resurrección.',
                'Se aplica aleatoriamente 1 de 3 mecánicas especiales junto con patterns condicionales.',
              ],
            },
          ],
          rightTitle: 'Recompensas y Drops',
          rightItems: [
            'La acquisition en las boxes fue levemente aumentada.',
            'El ítem Cursed Abyss Power deja de caer en las boxes.',
            'Los materiales de Rune pasan a caer con 100% de cantidad adicional.',
            'Drop adicional por probabilidad: Rune Essence of Inheritance, Stone Imbued with Divine Power y Random Engraving Book Box - Legendary.',
          ],
        },
        cards: [
          {
            title: 'Frozen Star - Lower',
            levelLine: 'Level: 815 | Limit: 2',
            locationLine: 'Loc: Westonia',
            items: [
              'La recompensa del Vanguard Request es igual a la del tier 800.',
              'Incluye parte de la drop table de la versión de tier superior.',
              'Drops: Refined Stigma Synthesis Scroll, Stigma Refinement Stone, Crafting Design - Powder of Annihilation.',
              'Baja probabilidad de drop de Random Engraving Book Box - Legendary.',
            ],
          },
          {
            title: 'Frozen Star - EVENT (Solo)',
            levelLine: 'Level: 500 | Limit: 2',
            locationLine: 'Loc: Velika, Highwatch',
            intro: 'Aquí se podrán farmear los ítems necesarios para participar en el evento:',
            items: ['[Event] Frozen Heart', '[Event] Burning Heart'],
          },
        ],
      },
      crafting: {
        sectionTitle: 'Crafting, Stigmas & Ítems',
        heroTitle: 'Bulk Gem Crafting',
        heroDescription: 'Se añadieron nuevas recetas de Bulk Gem para consumir grandes cantidades de Production Points de una sola vez. Pueden obtenerse en dungeons 700+ con baja probabilidad.',
        bulkCards: [
          { title: 'Bulk Emeralds', details: ['PP Consumido: 600', 'Materiales: 50 Sapphires, 1k Crafting Kits', 'Éxito: 10 Emeralds (13 en Great Success)'] },
          { title: 'Bulk Diamonds', details: ['PP Consumido: 3.500', 'Materiales: 100 Emeralds, 10k Crafting Kits', 'Éxito: 10 Diamonds (13 en Great Success)'] },
        ],
        leftTitle: 'Stigma & Runes',
        leftSections: [
          {
            title: 'Stigma Updates',
            items: [
              'Los efectos Common dejarán de aparecer; los stigmas actuales se convertirán en Superior.',
              'Se redujeron los costos de gold para cambiar opciones en las etapas Superior y Rare.',
              'La probabilidad de enhancement y la compensación por fallo aumentaron bastante, de 1% a 5%.',
              'Legendary Stigmas pueden subir a Refined Stigma por 1.5M gold sin preservar las opciones aleatorias.',
            ],
          },
          {
            title: 'Runes Updates',
            items: ['El límite de cambio de opciones sube de 5 a 100 veces.', 'El consumo de option change stones y gold para Rune polishing aumentó de forma notable.'],
          },
        ],
        rightTitle: 'Misc Items & Systems',
        rightItems: [
          'ELITE GOLD: el cooldown de resurrección cambió de 24h a 2 horas.',
          'World Event: se añadió un merchant de intercambio de Reputation Point en Highwatch.',
          'Pet Adventures: Arborea’s Golden/Silver Plate fueron removidos; se añadieron Fluorite Fragments y Broken Rune Pieces.',
          'Bracelets pueden ser desmontados a cambio de 5 Fluorites, con baja probabilidad de drop de Stone Imbued with Divine Power.',
          'Reset Scrolls pueden desmontarse en fragmentos para intercambiar por scrolls de otras dungeons, y su cooldown pasó a 30 minutos.',
        ],
      },
      classes: {
        sectionTitle: 'Classes & Skills',
        cards: [
          { title: 'Mystic', sections: [{ title: 'Thrall Augmentation + Summon: Thrall Lord', items: ['Si se invoca durante la skill, concede Power +15 y Attack Speed +5% a la party durante 30s.', 'La animación fue simplificada y ahora invoca un Thrall Lord rosa.', 'No hace dismiss de Thrall of Wrath/Vengeance, aunque la coexistencia sigue restringida.'] }] },
          { title: 'Priest', sections: [{ title: "Kaia's Shield V", description: 'Después del lock-on, el casteo ahora permite movimiento.' }, { title: 'Divine Charge', description: 'Con carga máxima, critical power sube de 20% a 40%.' }] },
          { title: 'Berserker', sections: [{ title: 'Unleashed', items: ['Casting speed 20% más rápido y permanece evasivo hasta que salga el shockwave.', 'Recupera gran cantidad de Rage con el shockwave y puede cancelarse con Beastly Charge al máximo Rage.'] }, { title: 'Frenzy', description: 'Cooldown reducido de 90s a 70s y Power ajustado de 20% a 16%.' }] },
          { title: 'Warrior', sections: [{ title: 'Cross Parry', description: 'Después de un bloqueo exitoso, Storm Aura ya no desaparece. Perfect Block habilitado.' }, { title: 'Blade Frenzy: Slash', description: 'Al usarla, reduce el cooldown de Infuriate.' }] },
          { title: 'Ninja', sections: [{ title: 'Willpower Skills', description: 'La recuperación de Willpower aumentó en Shuriken Burst, Spread Shuriken, Throw Fireball y Quick Attack.' }, { title: 'Evasion Skills', description: 'El tiempo de evasión aumentó ligeramente en Retreat, Inner Harmony y Evasive Smoke.' }] },
          { title: 'System Messages', sections: [{ title: 'System Messages', description: 'Los mensajes de sistema activados por cada clase dejarán de mostrarse. El cambio puede revertirse si afecta el seguimiento del combate.' }] },
        ],
      },
      system: {
        sectionTitle: 'Bug Fixes & System',
        issues: [
          'Se corrigió la ausencia del nombre de la mascota Kunkun en idiomas distintos al coreano.',
          'Se corrigió un problema donde Reaper podía ignorar special patterns de Cursed Antaroth.',
          'Se corrigió un problema donde la probabilidad no aumentaba de acuerdo con la gear EXP para Brooch of the Solemn Oath y Circlet of the Solemn Oath.',
          'Se corrigió un problema donde no aparecían mensajes en Cursed Antaroth.',
          'Se corrigió un wipe attack que no se activaba incluso cuando se cumplían las condiciones en Cursed Antaroth (Hard).',
          'Se corrigieron los quest steps de la misión To Stop the Ghilliedhus en la aldea.',
        ],
      },
    },
  },
} as Record<IdiomaSuportado, ConteudoPatchB130>;
