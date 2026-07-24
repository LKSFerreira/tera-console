#!/usr/bin/env python3
"""Gera patches curados B131 (pt/en/es) e publica no index — uso único maintainer."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATCHES = ROOT / "src" / "content" / "patches"
CDN = "https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin"


def dump(path: Path, data: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def meta(
    pid: str,
    label: str,
    kind: str,
    news_id: int,
    published: str,
    display: dict,
    tabs: list,
) -> dict:
    return {
        "schemaVersion": 1,
        "id": pid,
        "buildLabel": label,
        "kind": kind,
        "status": "published",
        "source": {
            "officialNewsId": news_id,
            "officialUrl": f"https://tera-console.com/news/{news_id}",
            "languageType": "EN",
        },
        "publishedAt": published,
        "parse": {"quality": "ok", "warnings": [], "unmappedHeadings": [], "fallbackTabs": []},
        "display": display,
        "tabs": tabs,
    }


def loc(locale: str, tabs: dict) -> dict:
    return {"schemaVersion": 1, "locale": locale, "tabs": tabs}


def write_patch(pid: str, m: dict, locales: dict[str, dict]) -> None:
    base = PATCHES / pid
    dump(base / "meta.json", m)
    for code, body in locales.items():
        dump(base / f"{code}.json", body)
    print(f"OK {pid}")


# ─── B133.02 (1018) ───────────────────────────────────────────────────────────

def b133_02() -> None:
    m = meta(
        "b133.02",
        "B133.02",
        "update",
        1018,
        "2026-07-23",
        {
            "pt-BR": {"name": "Update de 23 de Julho", "date": "23 de julho de 2026", "parts": "Dungeons · Classes · Shop · Bugs"},
            "en-US": {"name": "July 23 Update", "date": "July 23, 2026", "parts": "Dungeons · Classes · Shop · Bugs"},
            "es-ES": {"name": "Update del 23 de julio", "date": "23 de julio de 2026", "parts": "Dungeons · Classes · Shop · Bugs"},
        },
        [
            {"id": "dungeons", "icon": "swords"},
            {"id": "classes", "icon": "user-cog"},
            {"id": "system", "icon": "settings"},
            {"id": "bugs", "icon": "alert-triangle"},
        ],
    )
    pt = loc(
        "pt-BR",
        {
            "dungeons": {
                "label": "Dungeons",
                "blocks": [
                    {"type": "sectionTitle", "title": "Dungeons", "icon": "swords"},
                    {
                        "type": "card",
                        "title": "Ice Throne",
                        "titleTone": "slate",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": [
                                    "A distância de knockback do pattern em crescente do Boss 2 foi reduzida (corrige casos em que o jogador era lançado para fora do mapa)."
                                ],
                            }
                        ],
                    },
                    {
                        "type": "card",
                        "title": "Rampaging RK-9 Kennel / RK-9 Kennel (Hard)",
                        "titleTone": "sky",
                        "border": "sky-left",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": ["O HP da bomba temporizada foi reduzido de forma significativa."],
                            }
                        ],
                    },
                    {
                        "type": "card",
                        "title": "Rampaging RK-9 Kennel",
                        "titleTone": "amber",
                        "border": "amber-top",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": [
                                    "O efeito de reflexão do Boss 1 foi removido.",
                                    "A redução de dano durante a perfect defense do Boss 3 foi aumentada.",
                                    "O benefício de redução de defesa baseado no número de acionamentos do pattern Brain Fog (todos os bosses) agora é visualizado na UI.",
                                ],
                            }
                        ],
                    },
                ],
            },
            "classes": {
                "label": "Classes",
                "blocks": [
                    {"type": "sectionTitle", "title": "Classes", "icon": "user-cog"},
                    {
                        "type": "card",
                        "title": "Reaper",
                        "titleTone": "amber",
                        "border": "amber-left",
                        "blocks": [
                            {
                                "type": "subsection",
                                "title": "Grim Strike",
                                "blocks": [{"type": "bulletList", "items": ["Duração do Chained Glyph: 3s → 6s"]}],
                            },
                            {
                                "type": "subsection",
                                "title": "Cable Step",
                                "blocks": [
                                    {"type": "bulletList", "items": ["Duração do Attack Speed Boost Glyph: 2.5s → 3.5s"]}
                                ],
                            },
                            {
                                "type": "subsection",
                                "title": "Binding Scythes",
                                "blocks": [
                                    {"type": "bulletList", "items": ["Velocidade de ativação inicial das stacks aumentada."]}
                                ],
                            },
                        ],
                    },
                    {
                        "type": "card",
                        "title": "Archer",
                        "titleTone": "sky",
                        "border": "sky-left",
                        "blocks": [
                            {
                                "type": "subsection",
                                "title": "Find Weakness",
                                "blocks": [
                                    {
                                        "type": "bulletList",
                                        "items": [
                                            "Gatilho de liberação do efeito revertido: 1–2 aleatório → 1",
                                            "Correção de efeito na geração de flechas ao usar a skill.",
                                        ],
                                    }
                                ],
                            }
                        ],
                    },
                ],
            },
            "system": {
                "label": "Shop",
                "blocks": [
                    {"type": "sectionTitle", "title": "Shop", "icon": "settings"},
                    {
                        "type": "card",
                        "title": "Condensed Dungeon Core — troca",
                        "titleTone": "amber",
                        "border": "amber-top",
                        "blocks": [
                            {
                                "type": "paragraphs",
                                "items": [
                                    "As taxas de troca do Condensed Dungeon Core foram reduzidas e os limites de compra aumentados."
                                ],
                            },
                            {
                                "type": "table",
                                "headerTone": "amber",
                                "columns": ["Loja", "Preço", "Limite de compra"],
                                "rows": [
                                    ["Dungeon Core (Kaia)", "250 → 200", "2 → 4"],
                                    ["Dungeon Core (Annihilation)", "25 → 15", "4 → 10"],
                                ],
                            },
                        ],
                    },
                ],
            },
            "bugs": {
                "label": "Correção de Bugs",
                "blocks": [
                    {"type": "sectionTitle", "title": "Correção de Bugs", "icon": "alert-triangle"},
                    {
                        "type": "issueList",
                        "title": "Problemas resolvidos",
                        "icon": "alert-triangle",
                        "items": [
                            {"main": "Corrigido o problema em que um NPC diferente era atribuído a uma Guild Mission."},
                            {"main": "Corrigido o problema em que alguns patterns do RK-9 Boss 2 eram ocasionalmente cancelados."},
                            {
                                "main": "Corrigido o problema em que o pattern de bomba elétrica relacionado ao Hexapleon (RK-9 Boss 2) era cancelado quando o jogador saía brevemente do alcance em um timing específico."
                            },
                            {
                                "main": "Corrigido o problema no RK-9 Kennel (Hard) em que, após completar o pattern de escudo do Boss 3 e resetar o NPC, o Hard Mode ainda era aplicado mesmo ignorando a interação com o objeto, e o tempo do leaderboard acumulava com o tempo pré-reset."
                            },
                            {"main": "Corrigido o problema em que Burning Heart (Ninja) não era afetado por Attack Speed."},
                            {
                                "main": "Corrigido o problema em que o aumento de dano de Burning Heart (Ninja) não era aplicado com base na contagem de usos."
                            },
                        ],
                    },
                ],
            },
        },
    )
    en = loc(
        "en-US",
        {
            "dungeons": {
                "label": "Dungeons",
                "blocks": [
                    {"type": "sectionTitle", "title": "Dungeons", "icon": "swords"},
                    {
                        "type": "card",
                        "title": "Ice Throne",
                        "titleTone": "slate",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": [
                                    "Boss 2 crescent pattern knockback distance has been reduced (fixes cases where players were launched outside the map)."
                                ],
                            }
                        ],
                    },
                    {
                        "type": "card",
                        "title": "Rampaging RK-9 Kennel / RK-9 Kennel (Hard)",
                        "titleTone": "sky",
                        "border": "sky-left",
                        "blocks": [{"type": "bulletList", "items": ["Timed bomb HP has been significantly reduced."]}],
                    },
                    {
                        "type": "card",
                        "title": "Rampaging RK-9 Kennel",
                        "titleTone": "amber",
                        "border": "amber-top",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": [
                                    "Boss 1 reflection effect has been removed.",
                                    "Damage reduction during Boss 3 perfect defense has been increased.",
                                    "Defense reduction benefit based on Brain Fog pattern trigger count (all bosses) is now visualized.",
                                ],
                            }
                        ],
                    },
                ],
            },
            "classes": {
                "label": "Classes",
                "blocks": [
                    {"type": "sectionTitle", "title": "Classes", "icon": "user-cog"},
                    {
                        "type": "card",
                        "title": "Reaper",
                        "titleTone": "amber",
                        "border": "amber-left",
                        "blocks": [
                            {
                                "type": "subsection",
                                "title": "Grim Strike",
                                "blocks": [{"type": "bulletList", "items": ["Chained Glyph duration: 3s → 6s"]}],
                            },
                            {
                                "type": "subsection",
                                "title": "Cable Step",
                                "blocks": [
                                    {"type": "bulletList", "items": ["Attack Speed Boost Glyph duration: 2.5s → 3.5s"]}
                                ],
                            },
                            {
                                "type": "subsection",
                                "title": "Binding Scythes",
                                "blocks": [
                                    {"type": "bulletList", "items": ["Initial stack activation speed has been increased."]}
                                ],
                            },
                        ],
                    },
                    {
                        "type": "card",
                        "title": "Archer",
                        "titleTone": "sky",
                        "border": "sky-left",
                        "blocks": [
                            {
                                "type": "subsection",
                                "title": "Find Weakness",
                                "blocks": [
                                    {
                                        "type": "bulletList",
                                        "items": [
                                            "Effect release trigger rolled back: 1–2 random → 1",
                                            "Effect correction for arrow generation on use has been added.",
                                        ],
                                    }
                                ],
                            }
                        ],
                    },
                ],
            },
            "system": {
                "label": "Shop",
                "blocks": [
                    {"type": "sectionTitle", "title": "Shop", "icon": "settings"},
                    {
                        "type": "card",
                        "title": "Condensed Dungeon Core exchange",
                        "titleTone": "amber",
                        "border": "amber-top",
                        "blocks": [
                            {
                                "type": "paragraphs",
                                "items": [
                                    "Condensed Dungeon Core exchange rates have been reduced and purchase limits have been increased."
                                ],
                            },
                            {
                                "type": "table",
                                "headerTone": "amber",
                                "columns": ["Shop", "Price", "Purchase limit"],
                                "rows": [
                                    ["Dungeon Core (Kaia)", "250 → 200", "2 → 4"],
                                    ["Dungeon Core (Annihilation)", "25 → 15", "4 → 10"],
                                ],
                            },
                        ],
                    },
                ],
            },
            "bugs": {
                "label": "Bug Fixes",
                "blocks": [
                    {"type": "sectionTitle", "title": "Bug Fixes", "icon": "alert-triangle"},
                    {
                        "type": "issueList",
                        "title": "Issue resolution",
                        "icon": "alert-triangle",
                        "items": [
                            {"main": "Fixed an issue where a different NPC was assigned to a Guild Mission."},
                            {"main": "Fixed an issue where some patterns of RK-9 Boss 2 were occasionally cancelled."},
                            {
                                "main": "Fixed an issue where the Hexapleon-related electric bomb pattern of RK-9 Boss 2 was cancelled when a player briefly moved out of range at a specific timing."
                            },
                            {
                                "main": "Fixed an issue in RK-9 Kennel (Hard) where, after completing Boss 3's shield pattern and resetting the NPC, Hard Mode was still applied even when object interaction was ignored, and the leaderboard record time was accumulated with the pre-reset time."
                            },
                            {"main": "Fixed an issue where Ninja's Burning Heart was not affected by Attack Speed."},
                            {
                                "main": "Fixed an issue where Ninja's Burning Heart damage increase effect was not applied based on usage count."
                            },
                        ],
                    },
                ],
            },
        },
    )
    es = loc(
        "es-ES",
        {
            "dungeons": {
                "label": "Dungeons",
                "blocks": [
                    {"type": "sectionTitle", "title": "Dungeons", "icon": "swords"},
                    {
                        "type": "card",
                        "title": "Ice Throne",
                        "titleTone": "slate",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": [
                                    "Se redujo la distancia de knockback del pattern en media luna del Boss 2 (corrige casos en los que el jugador era lanzado fuera del mapa)."
                                ],
                            }
                        ],
                    },
                    {
                        "type": "card",
                        "title": "Rampaging RK-9 Kennel / RK-9 Kennel (Hard)",
                        "titleTone": "sky",
                        "border": "sky-left",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": ["El HP de la bomba temporizada se ha reducido de forma significativa."],
                            }
                        ],
                    },
                    {
                        "type": "card",
                        "title": "Rampaging RK-9 Kennel",
                        "titleTone": "amber",
                        "border": "amber-top",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": [
                                    "Se eliminó el efecto de reflexión del Boss 1.",
                                    "Se aumentó la reducción de daño durante la perfect defense del Boss 3.",
                                    "El beneficio de reducción de defensa según el número de activaciones del pattern Brain Fog (todos los bosses) ahora se visualiza en la UI.",
                                ],
                            }
                        ],
                    },
                ],
            },
            "classes": {
                "label": "Classes",
                "blocks": [
                    {"type": "sectionTitle", "title": "Classes", "icon": "user-cog"},
                    {
                        "type": "card",
                        "title": "Reaper",
                        "titleTone": "amber",
                        "border": "amber-left",
                        "blocks": [
                            {
                                "type": "subsection",
                                "title": "Grim Strike",
                                "blocks": [{"type": "bulletList", "items": ["Duración del Chained Glyph: 3s → 6s"]}],
                            },
                            {
                                "type": "subsection",
                                "title": "Cable Step",
                                "blocks": [
                                    {"type": "bulletList", "items": ["Duración del Attack Speed Boost Glyph: 2.5s → 3.5s"]}
                                ],
                            },
                            {
                                "type": "subsection",
                                "title": "Binding Scythes",
                                "blocks": [
                                    {"type": "bulletList", "items": ["Aumentada la velocidad de activación inicial de las stacks."]}
                                ],
                            },
                        ],
                    },
                    {
                        "type": "card",
                        "title": "Archer",
                        "titleTone": "sky",
                        "border": "sky-left",
                        "blocks": [
                            {
                                "type": "subsection",
                                "title": "Find Weakness",
                                "blocks": [
                                    {
                                        "type": "bulletList",
                                        "items": [
                                            "Gatillo de liberación del efecto revertido: 1–2 aleatorio → 1",
                                            "Corrección del efecto en la generación de flechas al usar la skill.",
                                        ],
                                    }
                                ],
                            }
                        ],
                    },
                ],
            },
            "system": {
                "label": "Shop",
                "blocks": [
                    {"type": "sectionTitle", "title": "Shop", "icon": "settings"},
                    {
                        "type": "card",
                        "title": "Condensed Dungeon Core — intercambio",
                        "titleTone": "amber",
                        "border": "amber-top",
                        "blocks": [
                            {
                                "type": "paragraphs",
                                "items": [
                                    "Se redujeron las tasas de intercambio del Condensed Dungeon Core y se aumentaron los límites de compra."
                                ],
                            },
                            {
                                "type": "table",
                                "headerTone": "amber",
                                "columns": ["Tienda", "Precio", "Límite de compra"],
                                "rows": [
                                    ["Dungeon Core (Kaia)", "250 → 200", "2 → 4"],
                                    ["Dungeon Core (Annihilation)", "25 → 15", "4 → 10"],
                                ],
                            },
                        ],
                    },
                ],
            },
            "bugs": {
                "label": "Corrección de Bugs",
                "blocks": [
                    {"type": "sectionTitle", "title": "Corrección de Bugs", "icon": "alert-triangle"},
                    {
                        "type": "issueList",
                        "title": "Problemas resueltos",
                        "icon": "alert-triangle",
                        "items": [
                            {"main": "Se corrigió un problema en el que se asignaba un NPC diferente a una Guild Mission."},
                            {
                                "main": "Se corrigió un problema en el que algunos patterns del RK-9 Boss 2 se cancelaban ocasionalmente."
                            },
                            {
                                "main": "Se corrigió un problema en el que el pattern de bomba eléctrica relacionado con Hexapleon (RK-9 Boss 2) se cancelaba cuando el jugador salía brevemente del alcance en un timing concreto."
                            },
                            {
                                "main": "Se corrigió un problema en RK-9 Kennel (Hard) en el que, tras completar el pattern de escudo del Boss 3 y reiniciar el NPC, el Hard Mode seguía aplicándose aunque se ignorara la interacción con el objeto, y el tiempo del leaderboard se acumulaba con el tiempo previo al reset."
                            },
                            {"main": "Se corrigió un problema en el que Burning Heart (Ninja) no se veía afectado por Attack Speed."},
                            {
                                "main": "Se corrigió un problema en el que el aumento de daño de Burning Heart (Ninja) no se aplicaba según el número de usos."
                            },
                        ],
                    },
                ],
            },
        },
    )
    write_patch("b133.02", m, {"pt-BR": pt, "en-US": en, "es-ES": es})


# ─── B132.03 (1001) ───────────────────────────────────────────────────────────

def b132_03() -> None:
    m = meta(
        "b132.03",
        "B132.03",
        "hotfix",
        1001,
        "2026-06-18",
        {
            "pt-BR": {"name": "Update de 18 de Junho", "date": "18 de junho de 2026", "parts": "Dungeons · Bugs"},
            "en-US": {"name": "June 18 Update", "date": "June 18, 2026", "parts": "Dungeons · Bugs"},
            "es-ES": {"name": "Update del 18 de junio", "date": "18 de junio de 2026", "parts": "Dungeons · Bugs"},
        },
        [{"id": "dungeons", "icon": "swords"}, {"id": "bugs", "icon": "alert-triangle"}],
    )
    pt = loc(
        "pt-BR",
        {
            "dungeons": {
                "label": "Dungeons",
                "blocks": [
                    {"type": "sectionTitle", "title": "Dungeons", "icon": "swords"},
                    {
                        "type": "card",
                        "title": "Forbidden Arena — Hard",
                        "titleTone": "amber",
                        "border": "amber-top",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": ["Crit Factor levemente aumentado.", "Crit Resistance diminuído."],
                            },
                            {
                                "type": "callout",
                                "tone": "info",
                                "text": "O aumento de Crit Factor compensa a redução do HARD I — na prática, a diferença deve ser pouco perceptível.",
                            },
                        ],
                    },
                    {
                        "type": "card",
                        "title": "RK-9 Kennel: Ultimate",
                        "titleTone": "sky",
                        "border": "sky-left",
                        "blocks": [{"type": "bulletList", "items": ["Crit Factor reduzido de forma significativa."]}],
                    },
                    {
                        "type": "card",
                        "title": "Efeito de dificuldade HARD I",
                        "titleTone": "slate",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": ["Crit Factor levemente diminuído.", "Crit Resistance diminuído."],
                            }
                        ],
                    },
                ],
            },
            "bugs": {
                "label": "Correção de Bugs",
                "blocks": [
                    {"type": "sectionTitle", "title": "Correção de Bugs", "icon": "alert-triangle"},
                    {
                        "type": "issueList",
                        "title": "Itens",
                        "icon": "alert-triangle",
                        "items": [
                            {
                                "main": "Corrigido o problema em que o efeito de critical hit do Ghost Horse do Battle Pass bloqueava efeitos de pet."
                            }
                        ],
                    },
                ],
            },
        },
    )
    en = loc(
        "en-US",
        {
            "dungeons": {
                "label": "Dungeons",
                "blocks": [
                    {"type": "sectionTitle", "title": "Dungeons", "icon": "swords"},
                    {
                        "type": "card",
                        "title": "Forbidden Arena — Hard",
                        "titleTone": "amber",
                        "border": "amber-top",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": ["Crit Factor slightly increased.", "Crit Resistance decreased."],
                            },
                            {
                                "type": "callout",
                                "tone": "info",
                                "text": "Offset by the HARD I reduction — no noticeable difference in practice.",
                            },
                        ],
                    },
                    {
                        "type": "card",
                        "title": "RK-9 Kennel: Ultimate",
                        "titleTone": "sky",
                        "border": "sky-left",
                        "blocks": [{"type": "bulletList", "items": ["Crit Factor significantly decreased."]}],
                    },
                    {
                        "type": "card",
                        "title": "HARD I difficulty effect",
                        "titleTone": "slate",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": ["Crit Factor slightly decreased.", "Crit Resistance decreased."],
                            }
                        ],
                    },
                ],
            },
            "bugs": {
                "label": "Bug Fixes",
                "blocks": [
                    {"type": "sectionTitle", "title": "Bug Fixes", "icon": "alert-triangle"},
                    {
                        "type": "issueList",
                        "title": "Items",
                        "icon": "alert-triangle",
                        "items": [
                            {
                                "main": "Fixed an issue where the Battle Pass Ghost Horse's critical hit effect was blocking pet effects."
                            }
                        ],
                    },
                ],
            },
        },
    )
    es = loc(
        "es-ES",
        {
            "dungeons": {
                "label": "Dungeons",
                "blocks": [
                    {"type": "sectionTitle", "title": "Dungeons", "icon": "swords"},
                    {
                        "type": "card",
                        "title": "Forbidden Arena — Hard",
                        "titleTone": "amber",
                        "border": "amber-top",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": ["Crit Factor ligeramente aumentado.", "Crit Resistance reducido."],
                            },
                            {
                                "type": "callout",
                                "tone": "info",
                                "text": "Compensa la reducción de HARD I: en la práctica, la diferencia apenas se nota.",
                            },
                        ],
                    },
                    {
                        "type": "card",
                        "title": "RK-9 Kennel: Ultimate",
                        "titleTone": "sky",
                        "border": "sky-left",
                        "blocks": [{"type": "bulletList", "items": ["Crit Factor reducido de forma significativa."]}],
                    },
                    {
                        "type": "card",
                        "title": "Efecto de dificultad HARD I",
                        "titleTone": "slate",
                        "blocks": [
                            {
                                "type": "bulletList",
                                "items": ["Crit Factor ligeramente reducido.", "Crit Resistance reducido."],
                            }
                        ],
                    },
                ],
            },
            "bugs": {
                "label": "Corrección de Bugs",
                "blocks": [
                    {"type": "sectionTitle", "title": "Corrección de Bugs", "icon": "alert-triangle"},
                    {
                        "type": "issueList",
                        "title": "Items",
                        "icon": "alert-triangle",
                        "items": [
                            {
                                "main": "Se corrigió un problema en el que el efecto de critical hit del Ghost Horse del Battle Pass bloqueaba los efectos de pet."
                            }
                        ],
                    },
                ],
            },
        },
    )
    write_patch("b132.03", m, {"pt-BR": pt, "en-US": en, "es-ES": es})


def update_index() -> None:
    order = [
        "b133.02",
        "b133.01",
        "b132.03",
        "b132.01",
        "b131.01",
        "b130.03",
        "b130.02",
        "b130.01",
    ]
    data = {
        "schemaVersion": 1,
        "order": order,
        "dataDrivenIds": [
            "b133.02",
            "b133.01",
            "b132.03",
            "b132.01",
            "b130.03",
            "b130.02",
            "b130.01",
        ],
        "draftIds": [],
        "_policy": "Só entra em order+dataDrivenIds com meta.status=published e curadoria no padrão B131. Ingest automático NUNCA publica. Rascunhos brutos de API, se existirem, ficam em sources/archive ou sources/raw-drafts.",
    }
    dump(PATCHES / "index.json", data)
    print("OK index.json")


if __name__ == "__main__":
    b133_02()
    b132_03()
    # large patches in companion module
    from _curate_pending_patches_large import b132_01, b133_01  # type: ignore

    b133_01()
    b132_01()
    update_index()
    print("ALL DONE")

