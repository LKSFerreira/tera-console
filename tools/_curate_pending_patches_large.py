# -*- coding: utf-8 -*-
"""Patches grandes B133.01 e B132.01 — curadoria B131."""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from _curate_pending_patches import CDN, loc, meta, write_patch  # noqa: E402


def b133_01() -> None:
    m = meta(
        "b133.01",
        "B133",
        "update",
        1008,
        "2026-07-15",
        {
            "pt-BR": {
                "name": "Update de 15 de Julho",
                "date": "15 de julho de 2026",
                "parts": "Last Stand · HARD I · Classes · BG · Rewards",
            },
            "en-US": {
                "name": "July 15 Update",
                "date": "July 15, 2026",
                "parts": "Last Stand · HARD I · Classes · BG · Rewards",
            },
            "es-ES": {
                "name": "Update del 15 de julio",
                "date": "15 de julio de 2026",
                "parts": "Last Stand · HARD I · Classes · BG · Rewards",
            },
        },
        [
            {"id": "highlights", "icon": "sparkles"},
            {"id": "dungeons", "icon": "swords"},
            {"id": "events", "icon": "calendar"},
            {"id": "classes", "icon": "user-cog"},
            {"id": "rewards", "icon": "gift"},
            {"id": "system", "icon": "settings"},
            {"id": "bugs", "icon": "alert-triangle"},
        ],
    )

    bugs_en = [
        "Refined Stigma names not displaying.",
        "Crafting material quantities not fully shown with large stacks.",
        "Incorrect trade attribute on Evolution Training Book.",
        '"Brrr….." achievement easier to complete.',
        "Season Runner2 count fixed (1/10 of previous requirement).",
        "Damage Amplification not applying to Mystic Aura.",
        "Title effects could speed up manual fishing.",
        "Moonblader Lunar: Moonlight Resonance Crit Power applied to all skills.",
        "HP/MP dropped when mounting a flying mount with HP/MP increase options.",
        "Cooldown reset not resetting certain skills besides brooches.",
        "Season Moonblade weapon level only up to 830.",
        "Overlapping patterns with high burst in Ice Throne.",
        "Incorrect patterns in Ice Throne (Normal).",
        "Akeron's Inferno: skills unusable after steam vent airborne.",
        "Timescape: Dimensional Gem missing after Boss 3 reset.",
        "Items showing as [Damaged] on Trade Broker.",
        "Certain guild quests functioning abnormally.",
        "Binding Scythes intermittently failing to activate.",
    ]
    bugs_pt = [
        "Nomes de Refined Stigma não exibiam.",
        "Quantidades de material de crafting incompletas com grandes stacks.",
        "Atributo de trade incorreto no Evolution Training Book.",
        'Achievement "Brrr….." mais fácil de completar.',
        "Season Runner2: contagem corrigida (1/10 do requisito anterior).",
        "Damage Amplification no Aura do Mystic.",
        "Efeitos de título podiam acelerar fishing manual.",
        "Moonblader Lunar: Moonlight Resonance Crit Power em todas as skills.",
        "HP/MP caíam ao montar flying mount com opções de aumento.",
        "Reset de CD não resetava certas skills além de brooches.",
        "Season Moonblade weapon level só até 830.",
        "Patterns sobrepostos com high burst no Ice Throne.",
        "Patterns incorretos no Ice Throne (Normal).",
        "Akeron's Inferno: skills bloqueadas após steam vent airborne.",
        "Timescape: Dimensional Gem ausente após reset do Boss 3.",
        "Itens [Damaged] no Trade Broker.",
        "Guild quests anormais.",
        "Binding Scythes falhava intermitentemente.",
    ]

    class_cards_pt = [
        {
            "type": "card",
            "title": "Reaper",
            "titleTone": "amber",
            "border": "amber-left",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Shadow Burst: tempo do 2º hit no atalho mais rápido.",
                        "Shadow Reaping: duração 8s → 15s.",
                        "Retribution: dano em caso de acerto −90%.",
                    ],
                },
                {
                    "type": "devNote",
                    "title": "Dev note",
                    "tone": "amber",
                    "paragraphs": [
                        "O nerf de Retribution alinha-se ao buff de Binding Scythes, e Shadow Step não é mais removido por DoT.",
                    ],
                },
            ],
        },
        {
            "type": "card",
            "title": "Lancer",
            "titleTone": "sky",
            "border": "sky-left",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Line Held: Stamina ao bloquear 50 → 75; Crit Factor por acúmulo 24 → 35.",
                        "Guardian Barrier não aplica mais Retribution Shield.",
                        "Retribution Shield: dano de Thrust por acúmulo 12.5% → 17.5%; acúmulos 7 → 5.",
                        "Second Wind: recuperação de HP ×2; CD do Focus Glyph alterado de % para valor fixo.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Sorcerer",
            "titleTone": "amber",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Equipoise: +10% de Crit Rate em combos de 2 elementos e acertos de Fusion.",
                        "Element Zero: Crit Factor 10 → 15.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Ninja",
            "titleTone": "sky",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Focus: +5 de Crit Factor por acúmulo.",
                        "Circular Tactics II: Crit Rate à distância 40% → 50%; +10% de Crit Rate corpo a corpo.",
                        "Burning Heart: dano igual para todos os alvos no alcance.",
                        "Boomerang Shuriken: correção para travamento com CDR excessivo.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Berserker",
            "titleTone": "slate",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Cyclone: acerto pelas costas (back hit) usa a posição de impacto do dano.",
                        "Unleash: acúmulos esquerdo/direito aplicam 10% do próprio Crit Factor.",
                        "Bloodlust: Crit Factor +50.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Archer",
            "titleTone": "slate",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Find Weakness: correção parcial quando o efeito é consumido sem causar dano real.",
                        "Find Weakness: aumento de dano 40% → 50%.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Slayer",
            "titleTone": "amber",
            "border": "amber-left",
            "blocks": [
                {"type": "paragraphs", "items": ["Nova passiva Reload (adquirida automaticamente no nível 65):"]},
                {
                    "type": "bulletList",
                    "items": [
                        "Crítico de [Knock Down] → CD de [One Strike] −0.5s",
                        "Crítico de [Whirlwind] → CD de [One Strike] −0.5s",
                        "Acerto de [Knock Down] → CD de [Whirlwind] −0.75s",
                        "Acerto de [In Cold Blood]/[Ultimate In Cold Blood] → CD de [Whirlwind] −0.5s",
                    ],
                },
            ],
        },
    ]

    class_cards_es = [
        {
            "type": "card",
            "title": "Reaper",
            "titleTone": "amber",
            "border": "amber-left",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Shadow Burst: tiempo del 2.º golpe en el atajo más rápido.",
                        "Shadow Reaping: duración 8s → 15s.",
                        "Retribution: daño en caso de éxito −90%.",
                    ],
                },
                {
                    "type": "devNote",
                    "title": "Dev note",
                    "tone": "amber",
                    "paragraphs": [
                        "El nerf de Retribution se alinea con el buff de Binding Scythes, y Shadow Step ya no se elimina por DoT.",
                    ],
                },
            ],
        },
        {
            "type": "card",
            "title": "Lancer",
            "titleTone": "sky",
            "border": "sky-left",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Line Held: Stamina al bloquear 50 → 75; Crit Factor por acumulación 24 → 35.",
                        "Guardian Barrier ya no aplica Retribution Shield.",
                        "Retribution Shield: daño de Thrust por acumulación 12.5% → 17.5%; acumulaciones 7 → 5.",
                        "Second Wind: recuperación de HP ×2; CD de Focus Glyph cambiado de % a valor fijo.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Sorcerer",
            "titleTone": "amber",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Equipoise: +10% de Crit Rate en combos de 2 elementos y golpes de Fusion.",
                        "Element Zero: Crit Factor 10 → 15.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Ninja",
            "titleTone": "sky",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Focus: +5 de Crit Factor por acumulación.",
                        "Circular Tactics II: Crit Rate a distancia 40% → 50%; +10% de Crit Rate cuerpo a cuerpo.",
                        "Burning Heart: daño igual para todos los objetivos en el alcance.",
                        "Boomerang Shuriken: corrección para bloqueo con CDR excesivo.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Berserker",
            "titleTone": "slate",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Cyclone: el golpe por la espalda (back hit) usa la posición de impacto del daño.",
                        "Unleash: acumulaciones izquierda/derecha aplican 10% de su propio Crit Factor.",
                        "Bloodlust: Crit Factor +50.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Archer",
            "titleTone": "slate",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Find Weakness: corrección parcial cuando el efecto se consume sin daño real.",
                        "Find Weakness: aumento de daño 40% → 50%.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Slayer",
            "titleTone": "amber",
            "border": "amber-left",
            "blocks": [
                {"type": "paragraphs", "items": ["Nueva pasiva Reload (adquirida automáticamente en nivel 65):"]},
                {
                    "type": "bulletList",
                    "items": [
                        "Crítico de [Knock Down] → CD de [One Strike] −0.5s",
                        "Crítico de [Whirlwind] → CD de [One Strike] −0.5s",
                        "Golpe de [Knock Down] → CD de [Whirlwind] −0.75s",
                        "Golpe de [In Cold Blood]/[Ultimate In Cold Blood] → CD de [Whirlwind] −0.5s",
                    ],
                },
            ],
        },
    ]

    class_cards_en = [
        {
            "type": "card",
            "title": "Reaper",
            "titleTone": "amber",
            "border": "amber-left",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Shadow Burst: 2nd hit hotkey timing faster.",
                        "Shadow Reaping duration: 8s → 15s.",
                        "Retribution: damage on success −90%.",
                    ],
                },
                {
                    "type": "devNote",
                    "title": "Dev note",
                    "tone": "amber",
                    "paragraphs": [
                        "Retribution nerf aligns with Binding Scythes buff and Shadow Step no longer removed by DoT.",
                    ],
                },
            ],
        },
        {
            "type": "card",
            "title": "Lancer",
            "titleTone": "sky",
            "border": "sky-left",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Line Held: Stamina on block 50 → 75; Crit Factor/stack 24 → 35.",
                        "Guardian Barrier no longer applies Retribution Shield.",
                        "Retribution Shield: Thrust dmg/stack 12.5% → 17.5%; stacks 7 → 5.",
                        "Second Wind: HP recovery ×2; Focus Glyph CD from % to fixed.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Sorcerer",
            "titleTone": "amber",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Equipoise: +10% Crit Rate on 2-element combo and Fusion hits.",
                        "Element Zero: Crit Factor 10 → 15.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Ninja",
            "titleTone": "sky",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Focus: +5 Crit Factor per stack.",
                        "Circular Tactics II: ranged Crit Rate 40% → 50%; +10% melee Crit Rate.",
                        "Burning Heart: equal damage to all targets in range.",
                        "Boomerang Shuriken: fix for lock with excessive CDR.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Berserker",
            "titleTone": "slate",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Cyclone: back hit uses damage hit position.",
                        "Unleash: left/right stacks apply 10% of own Crit Factor.",
                        "Bloodlust: Crit Factor +50.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Archer",
            "titleTone": "slate",
            "blocks": [
                {
                    "type": "bulletList",
                    "items": [
                        "Find Weakness: partial fix when effect consumed without real damage.",
                        "Find Weakness damage increase: 40% → 50%.",
                    ],
                }
            ],
        },
        {
            "type": "card",
            "title": "Slayer",
            "titleTone": "amber",
            "border": "amber-left",
            "blocks": [
                {"type": "paragraphs", "items": ["New passive Reload (auto at level 65):"]},
                {
                    "type": "bulletList",
                    "items": [
                        "[Knock Down] crit → [One Strike] CD −0.5s",
                        "[Whirlwind] crit → [One Strike] CD −0.5s",
                        "[Knock Down] hit → [Whirlwind] CD −0.75s",
                        "[In Cold Blood]/[Ultimate In Cold Blood] hit → [Whirlwind] CD −0.5s",
                    ],
                },
            ],
        },
    ]

    def make_locale(code: str, L: dict) -> dict:
        return loc(
            code,
            {
                "highlights": {
                    "label": L["hl_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["hl_t"], "icon": "sparkles"},
                        {
                            "type": "cardGrid",
                            "columns": 2,
                            "cards": [
                                {
                                    "title": L["hl1"],
                                    "titleTone": "amber",
                                    "blocks": [{"type": "bulletList", "items": L["hl1i"]}],
                                },
                                {
                                    "title": L["hl2"],
                                    "titleTone": "sky",
                                    "blocks": [{"type": "bulletList", "items": L["hl2i"]}],
                                },
                            ],
                        },
                    ],
                },
                "dungeons": {
                    "label": L["d_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["d_t"], "icon": "swords"},
                        {
                            "type": "card",
                            "title": "Rampaging RK-9 Kennel — Last Stand",
                            "titleTone": "amber",
                            "border": "amber-top",
                            "blocks": [
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/B133_7.jpg",
                                    "alt": "Last Stand RK-9",
                                    "caption": L["cap_ls"],
                                },
                                {
                                    "type": "keyValueList",
                                    "rows": [
                                        {"label": "Item level", "value": "950"},
                                        {"label": L["entry"], "value": L["ls_entry"]},
                                    ],
                                },
                                {
                                    "type": "cardGrid",
                                    "columns": 2,
                                    "cards": [
                                        {
                                            "title": L["ls_rules_t"],
                                            "blocks": [{"type": "bulletList", "items": L["ls_rules"]}],
                                        },
                                        {
                                            "title": L["ls_rew_t"],
                                            "blocks": [{"type": "bulletList", "items": L["ls_rew"]}],
                                        },
                                    ],
                                },
                                {"type": "callout", "tone": "warning", "text": L["ls_known"]},
                                {
                                    "type": "devNote",
                                    "title": L["dev"],
                                    "tone": "amber",
                                    "paragraphs": L["ls_dev"],
                                },
                            ],
                        },
                        {
                            "type": "card",
                            "title": L["hard_t"],
                            "titleTone": "sky",
                            "border": "sky-left",
                            "blocks": [
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/B133_1.png",
                                    "alt": "HARD I Condensed Core",
                                    "caption": L["cap_hard"],
                                },
                                {
                                    "type": "subsection",
                                    "title": L["cons_t"],
                                    "blocks": [
                                        {"type": "paragraphs", "items": L["cons_p"]},
                                        {"type": "bulletList", "items": L["obtain"]},
                                    ],
                                },
                                {
                                    "type": "subsection",
                                    "title": L["hard_o_t"],
                                    "blocks": [{"type": "bulletList", "items": L["hard_o"]}],
                                },
                                {
                                    "type": "devNote",
                                    "title": L["dev"],
                                    "tone": "sky",
                                    "paragraphs": L["hard_dev"],
                                },
                            ],
                        },
                        {
                            "type": "card",
                            "title": L["od_t"],
                            "titleTone": "slate",
                            "blocks": [{"type": "bulletList", "items": L["od"]}],
                        },
                    ],
                },
                "events": {
                    "label": L["ev_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["ev_t"], "icon": "calendar"},
                        {
                            "type": "card",
                            "title": L["bg_t"],
                            "titleTone": "slate",
                            "blocks": [{"type": "bulletList", "items": L["bg"]}],
                        },
                        {
                            "type": "card",
                            "title": L["coast_t"],
                            "titleTone": "amber",
                            "border": "amber-top",
                            "blocks": [
                                {"type": "paragraphs", "items": L["coast_p"]},
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/B133_2.png",
                                    "alt": "Coastal Battleground",
                                    "caption": L["cap_coast"],
                                },
                                {
                                    "type": "subsection",
                                    "title": L["tok_t"],
                                    "blocks": [
                                        {
                                            "type": "figure",
                                            "src": f"{CDN}/B133_3.png",
                                            "alt": "Event tokens",
                                            "caption": L["cap_tok"],
                                        },
                                        {
                                            "type": "table",
                                            "headerTone": "amber",
                                            "columns": L["tok_c"],
                                            "rows": L["tok_r"],
                                        },
                                        {"type": "bulletList", "items": L["tok_n"]},
                                    ],
                                },
                                {
                                    "type": "subsection",
                                    "title": L["shop_t"],
                                    "blocks": [
                                        {
                                            "type": "figure",
                                            "src": f"{CDN}/B133_4.png",
                                            "alt": "Starung shop",
                                            "caption": L["cap_shop"],
                                        },
                                        {
                                            "type": "table",
                                            "headerTone": "amber",
                                            "columns": L["shop_c"],
                                            "rows": L["shop_r"],
                                        },
                                    ],
                                },
                                {"type": "callout", "tone": "danger", "text": L["del"]},
                            ],
                        },
                    ],
                },
                "classes": {
                    "label": L["cl_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["cl_t"], "icon": "user-cog"},
                        *L["class_cards"],
                        {
                            "type": "card",
                            "title": L["heal_t"],
                            "titleTone": "sky",
                            "border": "sky-left",
                            "blocks": [
                                {"type": "bulletList", "items": L["heal_c"]},
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/B133_5.png",
                                    "alt": "Buff scaling UI",
                                    "caption": L["cap_buff"],
                                },
                                {
                                    "type": "subsection",
                                    "title": "Mystic",
                                    "blocks": [{"type": "bulletList", "items": L["mystic"]}],
                                },
                                {
                                    "type": "subsection",
                                    "title": "Priest",
                                    "blocks": [{"type": "bulletList", "items": L["priest"]}],
                                },
                            ],
                        },
                    ],
                },
                "rewards": {
                    "label": L["rw_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["rw_t"], "icon": "gift"},
                        {
                            "type": "devNote",
                            "title": L["dev"],
                            "tone": "amber",
                            "paragraphs": L["rw_dev"],
                        },
                        {
                            "type": "card",
                            "title": L["i9_t"],
                            "titleTone": "amber",
                            "border": "amber-top",
                            "blocks": [{"type": "bulletList", "items": L["i9"]}],
                        },
                        {
                            "type": "card",
                            "title": "Akeron's Inferno",
                            "titleTone": "slate",
                            "blocks": [{"type": "bulletList", "items": L["ak"]}],
                        },
                        {
                            "type": "card",
                            "title": L["all_t"],
                            "titleTone": "slate",
                            "blocks": [{"type": "bulletList", "items": L["all_d"]}],
                        },
                        {
                            "type": "card",
                            "title": "Vanguard Request",
                            "titleTone": "sky",
                            "border": "sky-left",
                            "blocks": [
                                {"type": "bulletList", "items": L["vg"]},
                                {
                                    "type": "subsection",
                                    "title": L["vg_s_t"],
                                    "blocks": [{"type": "bulletList", "items": L["vg_s"]}],
                                },
                            ],
                        },
                    ],
                },
                "system": {
                    "label": L["sy_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["sy_t"], "icon": "settings"},
                        {
                            "type": "card",
                            "title": "Pit of Petrax",
                            "titleTone": "slate",
                            "blocks": [{"type": "bulletList", "items": L["petrax"]}],
                        },
                        {
                            "type": "card",
                            "title": "Quick Signal / World Events",
                            "titleTone": "slate",
                            "blocks": [{"type": "bulletList", "items": L["world"]}],
                        },
                        {
                            "type": "card",
                            "title": L["ui_t"],
                            "titleTone": "amber",
                            "border": "amber-top",
                            "blocks": [
                                {"type": "paragraphs", "items": L["ui_p"]},
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/B133_6.png",
                                    "alt": "Boss shield gauge",
                                    "caption": L["cap_ui"],
                                },
                            ],
                        },
                        {
                            "type": "card",
                            "title": L["ot_t"],
                            "titleTone": "slate",
                            "blocks": [{"type": "callout", "tone": "warning", "text": L["ping"]}],
                        },
                    ],
                },
                "bugs": {
                    "label": L["bu_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["bu_t"], "icon": "alert-triangle"},
                        {
                            "type": "issueList",
                            "title": L["bu_list"],
                            "icon": "alert-triangle",
                            "items": [{"main": x} for x in L["bugs"]],
                        },
                    ],
                },
            },
        )

    L_pt = {
        "hl_l": "Destaques",
        "hl_t": "Destaques do update",
        "hl1": "Conteúdo principal",
        "hl1i": [
            "Last Stand: Rampaging RK-9 Kennel (ilvl 950).",
            "HARD I: consumível Condensed Dungeon Core; pena de ressurreição 10× → 3×.",
            "Coastal Battleground evento de 6 semanas (5v5).",
        ],
        "hl2": "Balance, rewards e UI",
        "hl2i": [
            "Balance em várias classes.",
            "Mais Darkshard; Vanguard e drops rebalanceados.",
            "UI da barra de escudo em chefes.",
            "Várias correções de bugs.",
        ],
        "d_l": "Dungeons",
        "d_t": "Dungeons",
        "entry": "Entrada",
        "ls_entry": "Dimensional Gem do RK-9 · matching e party recruitment",
        "cap_ls": "Arte oficial do Rampaging RK-9 Kennel Last Stand.",
        "ls_rules_t": "Regras e leaderboard",
        "ls_rules": [
            "Records só se o shield-break do Boss 3 (HARD) for concluído.",
            "HARD I não se aplica neste Last Stand.",
            "Novos patterns por boss; ênfase em cooperação.",
        ],
        "ls_rew_t": "Recompensas",
        "ls_rew": [
            "Vanguard só com shield-break do Boss 3.",
            "Darkshard e rewards extras (quantidade aumentada).",
            "Restrição de entradas compartilhadas do Last Stand removida.",
            "Só leaderboard por enquanto; títulos depois.",
        ],
        "ls_known": "Known issue: indicador de enrage por HP não bate com o timing real.",
        "dev": "Nota dos devs",
        "ls_dev": [
            "Patterns reforçados para cooperação. Clear varia com mecânicas de cada boss.",
            "Parties top que trocam 1–2 membros não contam para título.",
        ],
        "hard_t": "Sistema HARD I",
        "cap_hard": "Condensed Dungeon Core para HARD I.",
        "cons_t": "Mudança de consumível",
        "cons_p": [
            "Dungeon Core (Annihilation) → Condensed Dungeon Core.",
            "Não transferível entre personagens.",
        ],
        "obtain": [
            "25× Dungeon Core (Annihilation) — até 4/semana",
            "250× Dungeon Core (Kaia) — até 2/semana",
            "Chest em dungeons 850+ (tradeable, 1 core)",
            "Legacy of Annihilation em bosses HARD I",
            "10× Condensed Magic Crystal → 1 core",
        ],
        "hard_o_t": "Outras mudanças HARD I",
        "hard_o": [
            "Ressurreição HARD I: 10× → 3× (também Last Stand).",
            "ATK e Crit Power HARD I levemente reduzidos.",
        ],
        "hard_dev": [
            "Materiais regulares no lugar de Dungeon Core (Annihilation). Contagem compartilhada do Last Stand removida.",
        ],
        "od_t": "Outras mudanças de dungeon",
        "od": [
            "Bosses RK-9 (3 dungeons) non-aggressive.",
            "Ultimate leaderboard só após shield-break Boss 3.",
            "Dano em 850+ rebalanceado; skills/brooches resetam no reset/boss kill.",
            "Oshar's Resurrection Scroll: só Prime Battle Solution.",
        ],
        "ev_l": "Eventos",
        "ev_t": "Battleground e eventos",
        "bg_t": "Battleground geral",
        "bg": ["AFK warning mais rápido.", "HP ×4 ao entrar no matching de BG."],
        "coast_t": "Coastal Battleground — 6 semanas",
        "coast_p": ["Evento 5v5 via matchmaking por 6 semanas."],
        "cap_coast": "Coastal Battleground 5v5.",
        "tok_t": "Tokens",
        "cap_tok": "Tokens do evento Coastal.",
        "tok_c": ["Item", "Descrição"],
        "tok_r": [
            ["[Event] Starlit Sand", "Troca com Starung ou craft com Empty Bottle"],
            ["[Event] Empty Bottle to Catch Starlight", "1/dia + 1 no Vanguard Coastal"],
            ["[Event] Sand That Holds the Glow of the Stars", "7 bottles + 50 sand → etchings Tier 4 / Legendary"],
        ],
        "tok_n": ["7 Empty Bottles + 50 Starlight Sand → 1 Glowing Starlight Sand."],
        "shop_t": "Loja Starung",
        "cap_shop": "Loja de etchings e coins do evento.",
        "shop_c": ["Aba", "Item", "Preço", "Limite"],
        "shop_r": [
            ["Accessory", "Necklace Etching Power II (+9)", "20 Sand", "1× char"],
            ["Accessory", "Necklace Etching Power III (+9)", "45 Sand", "1× char"],
            ["Equipment", "Superior Weapon Etching (+15)", "20 Sand", "1× char"],
            ["Equipment", "Rare Weapon Etching (+15)", "45 Sand", "1× char"],
            ["Limited", "Rare / T3 Etching Coin", "45 Sand", "3× conta"],
            ["Limited", "Legendary / T4 Etching Coin", "200 Sand", "2× conta"],
        ],
        "del": "Etchings do Coastal Battleground removidos em 27/08/2026. Use antes.",
        "cl_l": "Classes",
        "cl_t": "Balance de classes",
        "heal_t": "Healers",
        "heal_c": [
            "Trocar gear/preset remove buffs de party/raid.",
            "Buff Scaling na página de stats detalhados.",
        ],
        "cap_buff": "UI de buff scaling.",
        "mystic": ["Vow of Rebirth Focus Glyph: CD fixo.", "Contagion: −2% Crit Resistance."],
        "priest": [
            "Grace of Resurrection Focus Glyph: CD fixo.",
            "Divine Charge: Crit Power 40% → 20%; Power 15 → 25; duração 10s → 8s.",
        ],
        "rw_l": "Rewards",
        "rw_t": "Rewards e economia",
        "rw_dev": [
            "Mais Darkshard; menos recipes. Party incompleta sofre corte forte de drops.",
        ],
        "i9_t": "Item level 900+",
        "i9": ["Darkshard ↑ (HARD I e Last Stand).", "Rune Option Change Stone ↓↓."],
        "ak": ["Darkshard no Vanguard (2× ELITE GOLD).", "Raid −1: −80%; −2: −99%."],
        "all_t": "Todas as dungeons",
        "all_d": ["Alexandrite e Shining Ellinu's Tear ↓.", "Party −1: −25%; −2+: −50%."],
        "vg": [
            "Reputation Vanguard ↑↑.",
            "Semanal +3000 Initiative pts; daily 3/8/16/25 = 500/750/1000/2000.",
        ],
        "vg_s_t": "Vanguard Initiative Shop",
        "vg_s": ["Enchantment Powder ↓; Card Boxes ↑; Essences/Rune ajustados."],
        "sy_l": "Sistema",
        "sy_t": "Conteúdo e UI",
        "petrax": ["Bosses consolidados; HP ↑.", "Frente −50%; lado −20%; costas +10%."],
        "world": ["Quick Signal repete animação.", "HP de world bosses ↑↑."],
        "ui_t": "Barra do Chefe — Escudo",
        "ui_p": ["O padrão de escudo mostra o ícone e o valor restante na barra do chefe."],
        "cap_ui": "Padrão de escudo na barra do chefe.",
        "ot_t": "Outros",
        "ping": "Ping Compensation adiado (issue crítica na preparação).",
        "bu_l": "Bugs",
        "bu_t": "Correção de Bugs",
        "bu_list": "Problemas resolvidos",
        "bugs": bugs_pt,
        "class_cards": class_cards_pt,
    }

    L_en = {
        **L_pt,
        "hl_l": "Highlights",
        "hl_t": "Update highlights",
        "hl1": "Main content",
        "hl1i": [
            "Last Stand: Rampaging RK-9 Kennel (ilvl 950).",
            "HARD I: Condensed Dungeon Core; resurrection penalty 10× → 3×.",
            "Coastal Battleground 6-week event (5v5).",
        ],
        "hl2": "Balance, rewards & UI",
        "hl2i": [
            "Class balance across multiple classes.",
            "More Darkshard; Vanguard and drops rebalanced.",
            "Boss shield gauge UI.",
            "Multiple bug fixes.",
        ],
        "d_l": "Dungeons",
        "d_t": "Dungeons",
        "entry": "Entry",
        "ls_entry": "RK-9 Dimensional Gem · matching and party recruitment",
        "cap_ls": "Official art for Rampaging RK-9 Kennel Last Stand.",
        "ls_rules_t": "Rules & leaderboard",
        "ls_rules": [
            "Records only after Boss 3 shield-break (HARD).",
            "HARD I not applied in this Last Stand.",
            "New patterns per boss; party cooperation focus.",
        ],
        "ls_rew_t": "Rewards",
        "ls_rew": [
            "Vanguard only with Boss 3 shield-break.",
            "Extra Darkshard and rewards (increased).",
            "Last Stand entry sharing restriction removed.",
            "Leaderboard only for now; titles later.",
        ],
        "ls_known": "Known issue: enrage HP indicator does not match actual timing.",
        "dev": "Developer note",
        "ls_dev": [
            "Patterns reworked for cooperation. Clear times vary by boss mechanics.",
            "Top parties swapping 1–2 members excluded from title eligibility.",
        ],
        "hard_t": "HARD I system",
        "cap_hard": "Condensed Dungeon Core for HARD I.",
        "cons_t": "Consumable change",
        "cons_p": [
            "Dungeon Core (Annihilation) → Condensed Dungeon Core.",
            "Not transferable between characters.",
        ],
        "obtain": L_pt["obtain"],
        "hard_o_t": "Other HARD I changes",
        "hard_o": [
            "HARD I resurrection penalty: 10× → 3× (also Last Stand).",
            "HARD I ATK and Crit Power slightly decreased.",
        ],
        "hard_dev": [
            "Regular materials replace Dungeon Core (Annihilation). Last Stand entry sharing removed.",
        ],
        "od_t": "Other dungeon changes",
        "od": [
            "RK-9 bosses (all 3) non-aggressive.",
            "Ultimate leaderboard only after Boss 3 shield-break.",
            "850+ damage rebalanced; skills/brooches reset on reset/boss kill.",
            "Oshar's Resurrection Scroll: Prime Battle Solution only.",
        ],
        "ev_l": "Events",
        "ev_t": "Battleground & events",
        "bg_t": "General Battleground",
        "bg": ["Faster AFK warning.", "HP ×4 on BG matching entry."],
        "coast_t": "Coastal Battleground — 6 weeks",
        "coast_p": ["6-week 5v5 event via matchmaking."],
        "cap_coast": "Coastal Battleground 5v5.",
        "tok_t": "Tokens",
        "cap_tok": "Coastal event tokens.",
        "tok_c": ["Item", "Description"],
        "tok_r": L_pt["tok_r"],
        "tok_n": L_pt["tok_n"],
        "shop_t": "Starung shop",
        "cap_shop": "Event etchings and exchange coins.",
        "shop_c": ["Tab", "Item", "Price", "Limit"],
        "shop_r": L_pt["shop_r"],
        "del": "Coastal etchings deleted Aug 27, 2026. Use before the deadline.",
        "cl_l": "Classes",
        "cl_t": "Class balance",
        "heal_t": "Healers",
        "heal_c": [
            "Gear/preset swap clears party/raid buffs.",
            "Buff Scaling on detailed stats page.",
        ],
        "cap_buff": "Buff scaling UI.",
        "mystic": L_pt["mystic"],
        "priest": L_pt["priest"],
        "rw_l": "Rewards",
        "rw_t": "Rewards & economy",
        "rw_dev": ["More Darkshard; fewer recipes. Underfilled parties take heavy drop penalties."],
        "i9_t": "Item level 900+",
        "i9": ["Darkshard up (HARD I & Last Stand).", "Rune Option Change Stone down."],
        "ak": ["Darkshard on Vanguard (2× ELITE GOLD).", "Raid −1: −80%; −2: −99%."],
        "all_t": "All dungeons",
        "all_d": ["Alexandrite and Shining Ellinu's Tear down.", "Party −1: −25%; −2+: −50%."],
        "vg": [
            "Vanguard reputation up.",
            "Weekly +3000 Initiative pts; daily 3/8/16/25 = 500/750/1000/2000.",
        ],
        "vg_s_t": "Vanguard Initiative Shop",
        "vg_s": ["Enchantment Powder cheaper; Card Boxes pricier; Essences/Rune adjusted."],
        "sy_l": "System",
        "sy_t": "Content & UI",
        "petrax": ["Bosses consolidated; HP up.", "Front −50%; side −20%; back +10%."],
        "world": ["Quick Signal animation repeats.", "World boss HP up."],
        "ui_t": "Boss Gauge — shield",
        "ui_p": ["Shield pattern shows icon and remaining value on the gauge."],
        "cap_ui": "Shield pattern on boss gauge.",
        "ot_t": "Other",
        "ping": "Ping Compensation postponed (critical issue during prep).",
        "bu_l": "Bugs",
        "bu_t": "Bug Fixes",
        "bu_list": "Issue resolution",
        "bugs": bugs_en,
        "class_cards": class_cards_en,
    }

    L_es = {
        **L_en,
        "class_cards": class_cards_es,
        "hl_l": "Destacados",
        "hl_t": "Destacados del update",
        "hl1": "Contenido principal",
        "hl2": "Balance, rewards y UI",
        "d_l": "Dungeons",
        "d_t": "Dungeons",
        "entry": "Entrada",
        "dev": "Nota de los devs",
        "ev_l": "Eventos",
        "ev_t": "Battleground y eventos",
        "cl_l": "Classes",
        "cl_t": "Balance de classes",
        "rw_l": "Rewards",
        "rw_t": "Rewards y economía",
        "sy_l": "Sistema",
        "sy_t": "Contenido y UI",
        "bu_l": "Bugs",
        "bu_t": "Corrección de Bugs",
        "bu_list": "Problemas resueltos",
        "bugs": bugs_en,
    }

    write_patch(
        "b133.01",
        m,
        {
            "pt-BR": make_locale("pt-BR", L_pt),
            "en-US": make_locale("en-US", L_en),
            "es-ES": make_locale("es-ES", L_es),
        },
    )


def b132_01() -> None:
    m = meta(
        "b132.01",
        "B132.01",
        "update",
        991,
        "2026-05-21",
        {
            "pt-BR": {
                "name": "Update de 21 de Maio",
                "date": "21 de maio de 2026",
                "parts": "RK-9 Ultimate · HARD · Classes · Crafting",
            },
            "en-US": {
                "name": "May 21 Update",
                "date": "May 21, 2026",
                "parts": "RK-9 Ultimate · HARD · Classes · Crafting",
            },
            "es-ES": {
                "name": "Update del 21 de mayo",
                "date": "21 de mayo de 2026",
                "parts": "RK-9 Ultimate · HARD · Classes · Crafting",
            },
        },
        [
            {"id": "dungeons", "icon": "swords"},
            {"id": "classes", "icon": "user-cog"},
            {"id": "items", "icon": "shield"},
            {"id": "crafting", "icon": "hammer"},
            {"id": "system", "icon": "settings"},
            {"id": "bugs", "icon": "alert-triangle"},
        ],
    )

    bugs = [
        "Gunner Castanic dealt higher damage with certain skills.",
        "Legacy gear upgrade required discontinued materials.",
        "Season 2 level 820 rewards incorrectly restricted to 830.",
        "Some achievements had unattainable completion flags.",
        "Incorrect enhancement notifications for Annihilation +10–+15.",
        "Sheik Cat / Apron set showed 0 Liberation charges.",
        'Title "Beyond the Limit" could not be obtained.',
    ]
    bugs_pt = [
        "Gunner Castanic com dano maior em certas skills.",
        "Upgrade de legacy gear pedia materiais descontinuados.",
        "Rewards Season 2 820 restritos a 830 por engano.",
        "Achievements com flag de conclusão inalcançável.",
        "Notificações de enhance incorretas em Annihilation +10–+15.",
        "Sheik Cat / Apron com 0 Liberation charges.",
        'Título "Beyond the Limit" não obtível.',
    ]

    def make(code: str, L: dict) -> dict:
        return loc(
            code,
            {
                "dungeons": {
                    "label": L["d_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["d_t"], "icon": "swords"},
                        {
                            "type": "card",
                            "title": "RK-9 Kennel: Ultimate (New)",
                            "titleTone": "amber",
                            "border": "amber-top",
                            "blocks": [
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/RK-9.png",
                                    "alt": "RK-9 Ultimate",
                                    "caption": L["cap_rk9"],
                                },
                                {
                                    "type": "keyValueList",
                                    "rows": [
                                        {"label": "Item level", "value": "920"},
                                        {"label": L["note"], "value": L["rk9_note"]},
                                    ],
                                },
                                {"type": "bulletList", "items": L["rk9"]},
                            ],
                        },
                        {
                            "type": "card",
                            "title": L["diff_t"],
                            "titleTone": "sky",
                            "border": "sky-left",
                            "blocks": [
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/%EB%82%9C%EC%9D%B4%EB%8F%84%EC%A1%B0%EC%9E%91OBJ.png",
                                    "alt": "Difficulty object",
                                    "caption": L["cap_diff"],
                                },
                                {"type": "bulletList", "items": L["diff"]},
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/보스게이지.png",
                                    "alt": "Boss gauge tier",
                                    "caption": L["cap_gauge"],
                                },
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/하드모드버프.png",
                                    "alt": "Hard buffs",
                                    "caption": L["cap_buff"],
                                },
                            ],
                        },
                        {
                            "type": "card",
                            "title": L["od_t"],
                            "titleTone": "slate",
                            "blocks": [
                                {
                                    "type": "subsection",
                                    "title": "RK-9 / Forbidden Arena / Timescape / Akeron",
                                    "blocks": [{"type": "bulletList", "items": L["od"]}],
                                },
                                {
                                    "type": "subsection",
                                    "title": L["tg_t"],
                                    "blocks": [{"type": "bulletList", "items": L["tg"]}],
                                },
                            ],
                        },
                    ],
                },
                "classes": {
                    "label": L["cl_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["cl_t"], "icon": "user-cog"},
                        {
                            "type": "card",
                            "title": "Ninja / Lancer / Warrior / Slayer",
                            "titleTone": "amber",
                            "border": "amber-left",
                            "blocks": [{"type": "bulletList", "items": L["cls1"]}],
                        },
                        {
                            "type": "card",
                            "title": "Sorcerer / Archer / Reaper",
                            "titleTone": "sky",
                            "blocks": [{"type": "bulletList", "items": L["cls2"]}],
                        },
                    ],
                },
                "items": {
                    "label": L["it_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["it_t"], "icon": "shield"},
                        {
                            "type": "card",
                            "title": L["gear_t"],
                            "titleTone": "amber",
                            "border": "amber-top",
                            "blocks": [{"type": "bulletList", "items": L["gear"]}],
                        },
                        {
                            "type": "card",
                            "title": L["shop_t"],
                            "titleTone": "sky",
                            "blocks": [{"type": "bulletList", "items": L["shops"]}],
                        },
                    ],
                },
                "crafting": {
                    "label": L["cr_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["cr_t"], "icon": "hammer"},
                        {
                            "type": "card",
                            "title": L["craft_g"],
                            "titleTone": "slate",
                            "blocks": [
                                {"type": "bulletList", "items": L["craft"]},
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/%ED%8E%AB%EC%A0%9C%EC%9E%91.png",
                                    "alt": "Training books",
                                    "caption": L["cap_craft"],
                                },
                            ],
                        },
                        {
                            "type": "card",
                            "title": "Etching",
                            "titleTone": "amber",
                            "border": "amber-top",
                            "blocks": [
                                {
                                    "type": "devNote",
                                    "title": L["dev"],
                                    "tone": "amber",
                                    "paragraphs": L["etch_dev"],
                                },
                                {"type": "bulletList", "items": L["etch"]},
                                {
                                    "type": "figure",
                                    "src": f"{CDN}/%EA%B0%81%EC%9D%B8.png",
                                    "alt": "Etching tiers",
                                    "caption": L["cap_etch"],
                                },
                            ],
                        },
                    ],
                },
                "system": {
                    "label": L["sy_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["sy_t"], "icon": "settings"},
                        {
                            "type": "card",
                            "title": "Battleground / Pet / Gathering / Achievements",
                            "titleTone": "sky",
                            "blocks": [{"type": "bulletList", "items": L["sys"]}],
                        },
                    ],
                },
                "bugs": {
                    "label": L["bu_l"],
                    "blocks": [
                        {"type": "sectionTitle", "title": L["bu_t"], "icon": "alert-triangle"},
                        {
                            "type": "issueList",
                            "title": L["bu_list"],
                            "icon": "alert-triangle",
                            "items": [{"main": x} for x in L["bugs"]],
                        },
                    ],
                },
            },
        )

    # Use direct CDN paths as in official HTML (Korean filenames)
    # Fix figures to use raw URLs from extract
    CDN_DIFF = f"{CDN}/난이도조작OBJ.png"
    CDN_GAUGE = f"{CDN}/보스게이지.png"
    CDN_BUFF = f"{CDN}/하드모드버프.png"
    CDN_CRAFT = f"{CDN}/펫제작.png"
    CDN_ETCH = f"{CDN}/각인.png"

    L_pt = {
        "d_l": "Dungeons",
        "d_t": "Dungeons",
        "cap_rk9": "Nova dungeon RK-9 Kennel: Ultimate (ilvl 920).",
        "note": "Notas",
        "rk9_note": "Leaderboard atualizada e rebalanceada",
        "rk9": ["Item level 920.", "Leaderboard dungeon atualizada.", "Dungeon rebalanceada."],
        "diff_t": "Sistema de dificuldade HARD",
        "cap_diff": "Objeto de dificuldade na entrada.",
        "diff": [
            "Interagir na entrada abre seleção de dificuldade (15s).",
            "Após combate, objetos não são mais interagíveis.",
            "Custa 1× Dungeon Core – Annihilation.",
            "Balder's Arbitration reseta dificuldade (itens não retornam).",
            "Nível (Tier) exibido abaixo da barra de HP; chefes fortalecidos; penalidade na área de combate.",
            "Hard clear: Core Annihilation e Vanguard points extras.",
        ],
        "cap_gauge": "Nível (Tier) na barra do chefe.",
        "cap_buff": "Buffs e penalty de Hard Mode.",
        "od_t": "Outras mudanças",
        "od": [
            "Boss skills resetam ao resetar boss (RK-9 Ultimate / Forbidden Arena Advanced).",
            "Normal: rewards ↓ levemente, dificuldade ↓↓; Hard: Enchanting Dust e Reputation extras.",
            "Timescape: reflection dragon −50%; Orbs mais estáveis; teleportal após dragão.",
            "Akeron Hard: entrada no 1º combate; teleportal entre bosses.",
            "RK-9 bosses: Time Bomb HP ↓; wipe/Press/Electric/Lock-On damage ↑.",
        ],
        "tg_t": "Training Ground",
        "tg": [
            "DEF monstro nível 900; buffs Priest/Mystic atualizados.",
            "Reset Stone reseta CD de skills (exceto brooch).",
        ],
        "cl_l": "Classes",
        "cl_t": "Balance",
        "cls1": [
            "Ninja: Inner Harmony Stamina 1000 → 3000; bônus de pet de Stamina aplica.",
            "Lancer: Retribution Shield stacks 10 → 7; Counter 1.1× → 1.125×; Guardian Shout em 7 stacks (10s).",
            "Warrior: Poison Blade não remove AS de Stab; duração 15→10s; AS 12%→10%; Cascade Rage CDR ↑.",
            "Slayer: BTS CD reductions ↑; In Cold Blood Crit Factor 30→60; Linkage/Swift 10s.",
        ],
        "cls2": [
            "Sorcerer: Flaming Barrage/Ice Lance/Lightning Trap dão elementos; Mana Boost dá os 3.",
            "Archer: Find Weakness hitbox melhorado.",
            "Reaper: Binding Scythes burst ↑; stacks/hit 50 → 100.",
        ],
        "it_l": "Itens",
        "it_t": "Itens e lojas",
        "gear_t": "Gear / item level",
        "gear": [
            "Ilvl reset em Annihilation (+15 = 850); season pode baixar levemente.",
            "Arun/Shara boxes → Amplifying Stone Shards; season mats no Vanguard e 900+.",
            "Mensagem e FX de arma Annihilation +10+.",
        ],
        "shop_t": "Dungeon Core Shops",
        "shops": [
            "Anger/Oath/Kaia/Annihilation: card boxes, Elin Coin, Training Books, Succession Runestone, Rare Etching Crystal.",
            "Advanced/Ultimate Training Books desmontáveis; Ellinu's Tears tradeable ↓.",
        ],
        "cr_l": "Crafting",
        "cr_t": "Crafting e Etching",
        "craft_g": "Crafting",
        "craft": [
            "Proficiency ↑; Training Books até Tier 5 + Ascension; páginas no shop.",
            "Novos schematics nos merchants.",
        ],
        "cap_craft": "Crafting de Training Books.",
        "dev": "Nota dos devs",
        "etch_dev": [
            "Etching de accessory com crafting confiável até STR 7 (Crit Factor 2× nos tiers).",
        ],
        "etch": ["T1 STR1 · T2 STR3 · T3 STR5 · T4 STR7."],
        "cap_etch": "Tiers de Etching craftável.",
        "sy_l": "Sistema",
        "sy_t": "BG, Pet, Gathering",
        "sys": [
            "Kumas Royale 3v3 lv65; gear unificado de BG; pet reflect/CDR off em BG.",
            "Pet Legendary: White → Green values; White some do reroll.",
            "Fieldstones jackpot + rate ↑; Lieutenants em Island of Dawn.",
            "Achievement tiers ↓; alguns viram Forgotten.",
        ],
        "bu_l": "Bugs",
        "bu_t": "Correção de Bugs",
        "bu_list": "Problemas resolvidos",
        "bugs": bugs_pt,
    }

    L_en = {
        **L_pt,
        "d_l": "Dungeons",
        "d_t": "Dungeons",
        "cap_rk9": "New RK-9 Kennel: Ultimate (ilvl 920).",
        "note": "Notes",
        "rk9_note": "Leaderboard updated and rebalanced",
        "rk9": ["Item level 920.", "Leaderboard dungeon updated.", "Dungeon rebalanced."],
        "diff_t": "HARD difficulty system",
        "cap_diff": "Difficulty object at entrance.",
        "diff": [
            "Interact at entrance to select difficulty (15s).",
            "No interaction after combat starts.",
            "Costs 1× Dungeon Core – Annihilation.",
            "Balder's Arbitration resets difficulty (items not refunded).",
            "Tier under HP gauge; empowered bosses; combat-area penalty.",
            "Hard clear: extra Annihilation Core and Vanguard points.",
        ],
        "cap_gauge": "Tier on boss gauge.",
        "cap_buff": "Hard Mode buffs and penalty.",
        "od_t": "Other changes",
        "od": [
            "Boss skills reset on boss reset (RK-9 Ultimate / Forbidden Arena Advanced).",
            "Normal: rewards slightly down, difficulty down; Hard: extra Enchanting Dust and Reputation.",
            "Timescape: dragon reflection −50%; safer Orbs; teleportal after dragon.",
            "Akeron Hard: entry at first combat; teleportal between bosses.",
            "RK-9 bosses: Time Bomb HP down; wipe/Press/Electric/Lock-On damage up.",
        ],
        "tg_t": "Training Ground",
        "tg": [
            "Monster DEF at level 900; Priest/Mystic object buffs updated.",
            "Reset Stone resets all skill CDs (brooch excluded).",
        ],
        "cl_l": "Classes",
        "cl_t": "Balance",
        "cls1": [
            "Ninja: Inner Harmony Stamina 1000 → 3000; pet Stamina bonuses apply.",
            "Lancer: Retribution Shield stacks 10 → 7; Counter 1.1× → 1.125×; Guardian Shout at 7 stacks (10s).",
            "Warrior: Poison Blade no longer removes Stab AS; duration 15→10s; AS 12%→10%; Cascade Rage CDR up.",
            "Slayer: BTS CD reductions up; In Cold Blood Crit Factor 30→60; Linkage/Swift 10s.",
        ],
        "cls2": [
            "Sorcerer: element grants on Flaming Barrage/Ice Lance/Lightning Trap; Mana Boost grants all 3.",
            "Archer: Find Weakness hitbox improved.",
            "Reaper: Binding Scythes expire burst up; stacks/hit 50 → 100.",
        ],
        "it_l": "Items",
        "it_t": "Items & shops",
        "gear_t": "Gear / item level",
        "gear": [
            "Ilvl reset around Annihilation (+15 = 850); season may drop slightly.",
            "Arun/Shara boxes → Amplifying Stone Shards; season mats on Vanguard and 900+.",
            "Message and weapon FX on Annihilation +10+.",
        ],
        "shop_t": "Dungeon Core Shops",
        "shops": [
            "Anger/Oath/Kaia/Annihilation: card boxes, Elin Coin, Training Books, Succession Runestone, Rare Etching Crystal.",
            "Advanced/Ultimate Training Books disassemble; tradeable Ellinu's Tears down.",
        ],
        "cr_l": "Crafting",
        "cr_t": "Crafting & Etching",
        "craft_g": "Crafting",
        "craft": [
            "Proficiency up; Training Books to Tier 5 + Ascension; page shop.",
            "New merchant schematics.",
        ],
        "cap_craft": "Training Book crafting.",
        "dev": "Developer note",
        "etch_dev": [
            "Accessory Etching crafting supports reliable progress up to STR 7 (Crit Factor 2×).",
        ],
        "etch": ["T1 STR1 · T2 STR3 · T3 STR5 · T4 STR7."],
        "cap_etch": "Craftable Etching tiers.",
        "sy_l": "System",
        "sy_t": "BG, Pet, Gathering",
        "sys": [
            "Kumas Royale 3v3 lv65; unified BG gear; pet reflect/CDR off in BG.",
            "Legendary pets: White options become Green values; White removed from reroll.",
            "Fieldstones jackpot + rate up; Lieutenants on Island of Dawn.",
            "Achievement tiers down; some become Forgotten.",
        ],
        "bu_l": "Bugs",
        "bu_t": "Bug Fixes",
        "bu_list": "Issue resolution",
        "bugs": bugs,
    }

    L_es = {
        **L_en,
        "d_l": "Dungeons",
        "d_t": "Dungeons",
        "note": "Notas",
        "diff_t": "Sistema de dificultad HARD",
        "od_t": "Otros cambios",
        "cl_l": "Classes",
        "cl_t": "Balance",
        "it_l": "Items",
        "it_t": "Items y tiendas",
        "cr_l": "Crafting",
        "cr_t": "Crafting y Etching",
        "dev": "Nota de los devs",
        "sy_l": "Sistema",
        "sy_t": "BG, Pet, Gathering",
        "bu_l": "Bugs",
        "bu_t": "Corrección de Bugs",
        "bu_list": "Problemas resueltos",
        "bugs": bugs,
    }

    # Patch figure URLs to use real Korean paths from API
    pt_body = make("pt-BR", L_pt)
    en_body = make("en-US", L_en)
    es_body = make("es-ES", L_es)

    def fix_figs(body: dict) -> dict:
        raw = json.dumps(body, ensure_ascii=False)
        raw = raw.replace(f"{CDN}/%EB%82%9C%EC%9D%B4%EB%8F%84%EC%A1%B0%EC%9E%91OBJ.png", CDN_DIFF)
        raw = raw.replace(f"{CDN}/보스게이지.png", CDN_GAUGE)
        raw = raw.replace(f"{CDN}/하드모드버프.png", CDN_BUFF)
        raw = raw.replace(f"{CDN}/%ED%8E%AB%EC%A0%9C%EC%9E%91.png", CDN_CRAFT)
        raw = raw.replace(f"{CDN}/펫제작.png", CDN_CRAFT)
        raw = raw.replace(f"{CDN}/%EA%B0%81%EC%9D%B8.png", CDN_ETCH)
        raw = raw.replace(f"{CDN}/각인.png", CDN_ETCH)
        return json.loads(raw)

    write_patch(
        "b132.01",
        m,
        {
            "pt-BR": fix_figs(pt_body),
            "en-US": fix_figs(en_body),
            "es-ES": fix_figs(es_body),
        },
    )
