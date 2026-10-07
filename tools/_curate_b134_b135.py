"""Converte as fontes Markdown fornecidas em patches data-driven curados."""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any

from _manual_localization import localizar_conteudo


RAIZ_PROJETO = Path(__file__).resolve().parents[1]
PASTA_PATCHES = RAIZ_PROJETO / "src" / "content" / "patches"
FONTE_B134 = RAIZ_PROJETO / "novos_updates_B134 Update.md"
FONTE_B135 = RAIZ_PROJETO / "novos_updates_B135 Update.md"


def ler_linhas(caminho: Path) -> list[str]:
    return [linha.strip() for linha in caminho.read_text(encoding="utf-8").splitlines()]


def indice(linhas: list[str], marcador: str, inicio: int = 0) -> int:
    return linhas.index(marcador, inicio)


def trecho(linhas: list[str], inicio: str, fim: str, deslocamento: int = 1) -> list[str]:
    indice_inicio = indice(linhas, inicio) + deslocamento
    indice_fim = indice(linhas, fim, indice_inicio)
    return [linha for linha in linhas[indice_inicio:indice_fim] if linha]


def linhas_ate_fim(linhas: list[str], inicio: str, fim: str) -> list[str]:
    return trecho(linhas, inicio, fim)


def tabela_de_linhas(linhas: list[str]) -> dict[str, Any]:
    linhas_tabela = [linha.split("\t") for linha in linhas if "\t" in linha]
    return {
        "type": "table",
        "headerTone": "amber",
        "columns": linhas_tabela[0],
        "rows": linhas_tabela[1:],
    }


def tabela_entre(linhas: list[str], cabecalho: str, fim: str, inicio_busca: int = 0) -> dict[str, Any]:
    indice_inicio = indice(linhas, cabecalho, inicio_busca)
    indice_fim = indice(linhas, fim, indice_inicio + 1)
    return tabela_de_linhas(linhas[indice_inicio:indice_fim])


def lista(itens: list[str]) -> dict[str, Any]:
    return {"type": "bulletList", "items": [item.removeprefix("· ").removeprefix("※ ") for item in itens if item]}


def paragrafos(itens: list[str]) -> dict[str, Any]:
    return {"type": "paragraphs", "items": [item for item in itens if item]}


def card(titulo: str, blocos: list[dict[str, Any]], tom: str = "slate", borda: str = "none") -> dict[str, Any]:
    return {
        "type": "card",
        "title": titulo,
        "titleTone": tom,
        "border": borda,
        "blocks": blocos,
    }


def titulo_secao(titulo: str, icone: str) -> dict[str, str]:
    return {"type": "sectionTitle", "title": titulo, "icon": icone}


def figura(linha: str, legenda: str) -> dict[str, str]:
    correspondencia = re.fullmatch(r"!\[(.+)]\((.+)\)", linha)
    if not correspondencia:
        raise ValueError(f"Imagem inválida: {linha}")
    texto_alternativo, origem = correspondencia.groups()
    return {"type": "figure", "src": origem, "alt": texto_alternativo, "caption": legenda}


def escrever_json(caminho: Path, conteudo: dict[str, Any]) -> None:
    caminho.parent.mkdir(parents=True, exist_ok=True)
    caminho.write_text(json.dumps(conteudo, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def normalizar_pontuacao(valor: Any) -> Any:
    if isinstance(valor, dict):
        return {chave: normalizar_pontuacao(conteudo) for chave, conteudo in valor.items()}
    if isinstance(valor, list):
        return [normalizar_pontuacao(item) for item in valor]
    if isinstance(valor, str):
        return valor.replace(" — ", ": ").replace("—", "-")
    return valor


def metadados(
    identificador: str,
    rotulo_build: str,
    tipo: str,
    data_iso: str,
    exibicao: dict[str, dict[str, str]],
    abas: list[tuple[str, str]],
) -> dict[str, Any]:
    return {
        "schemaVersion": 1,
        "id": identificador,
        "buildLabel": rotulo_build,
        "kind": tipo,
        "status": "published",
        "source": {"languageType": "EN"},
        "publishedAt": data_iso,
        "parse": {"quality": "ok", "warnings": [], "unmappedHeadings": [], "fallbackTabs": []},
        "display": exibicao,
        "tabs": [{"id": identificador_aba, "icon": icone} for identificador_aba, icone in abas],
    }


def criar_b134(linhas: list[str]) -> tuple[dict[str, Any], dict[str, Any]]:
    indice_passe = indice(linhas, "Item\tQty")
    indice_recompensas = indice(linhas, "Level\tFree Rewards\tPremium Rewards")
    tabela_passe = tabela_de_linhas(linhas[indice_passe:indice_recompensas - 1])
    tabela_recompensas = tabela_de_linhas(linhas[indice_recompensas:indice(linhas, "Known Bug")])

    indice_tokens = indice(linhas, "Enhance\tWeapon\tArmor\tShoes/Gloves")
    tabela_tokens = tabela_de_linhas(linhas[indice_tokens:indice(linhas, "Visit Highwatch Laura (Elin) to exchange your season rewards.")])

    indice_loja_equipamento = indice(linhas, "Item\tPrice\tPurchase Limit", indice(linhas, "Gear"))
    indice_materiais = indice(linhas, "Enhancement Materials", indice_loja_equipamento)
    indice_loja_materiais = indice(linhas, "Item\tPrice\tPurchase Limit", indice_materiais)
    indice_premium = indice(linhas, "Premium", indice_loja_materiais)
    indice_loja_premium = indice(linhas, "Item\tPrice\tPurchase Limit", indice_premium)
    indice_outros = indice(linhas, "Other", indice_loja_premium)
    indice_loja_outros = indice(linhas, "Item\tPrice\tPurchase Limit", indice_outros)
    indice_fim_loja = indice(linhas, "Shop purchase counts will be reset.")

    indice_rotacao_normal = indice(linhas, "Dungeon\tItem Level\tRecommended Players")
    indice_rotacao_matchmaking = indice(linhas, "Dungeon\tItem Level\tRecommended Players", indice_rotacao_normal + 1)
    tabela_matchmaking = tabela_de_linhas(linhas[indice_rotacao_matchmaking:indice(linhas, "The following equipment will be provided in auto matchmaking dungeons.")])
    tabela_matchmaking["rows"].append(["Akeron's Inferno (Hard)", "Not specified", "Not specified"])

    indice_novos_itens = indice(linhas, "Item\tDescription")
    indice_opcoes_comuns = indice(linhas, "Type\tLevel 1~5 Effect\tApplicable Class")
    classes = [
        "Warrior", "Lancer", "Slayer", "Berserker", "Sorcerer", "Archer", "Priest",
        "Mystic", "Reaper", "Gunner", "Brawler", "Ninja", "Valkyrie",
    ]
    blocos_classes_runa: list[dict[str, Any]] = []
    inicio_classes = indice(linhas, "Class-Specific Options")
    for posicao, nome_classe in enumerate(classes):
        indice_classe = indice(linhas, nome_classe, inicio_classes)
        fim_classe = indice(linhas, classes[posicao + 1], indice_classe + 1) if posicao + 1 < len(classes) else indice(linhas, "System")
        blocos_classes_runa.append(
            card(nome_classe, [tabela_de_linhas(linhas[indice_classe + 1:fim_classe])], "sky", "sky-left")
        )

    abas = {
        "highlights": {
            "label": "Highlights",
            "blocks": [
                titulo_secao("B134 at a glance", "sparkles"),
                {
                    "type": "cardGrid",
                    "columns": 2,
                    "cards": [
                        {
                            "title": "What changes your progression",
                            "titleTone": "amber",
                            "blocks": [lista([
                                "Battle Pass Season 22 begins with 50 reward levels.",
                                "Season 2 equipment can be dismantled for Forgotten Steel Fragments.",
                                "Dungeon rotations and matchmaking-only rewards have been reorganized.",
                            ])],
                        },
                        {
                            "title": "What changes your build",
                            "titleTone": "sky",
                            "blocks": [lista([
                                "Accessory Runes add base stats and class-specific skill effects.",
                                "Heroic Oath and Kaia's Fury enhancement become easier.",
                                "Valkyrie receives a major Godsfall and Ragnarok rework.",
                            ])],
                        },
                    ],
                },
                {"type": "callout", "tone": "warning", "text": "The HARD difficulty system announced for B134 was postponed to the next update."},
            ],
        },
        "battlepass": {
            "label": "Battle Pass",
            "blocks": [
                titulo_secao("Battle Pass Season 22", "award"),
                card("Schedule", [{"type": "keyValueList", "rows": [
                    {"label": "Sale period", "value": "After Aug. 27, 2026 maintenance through Jan. 3, 2027"},
                    {"label": "Active period", "value": "After Aug. 27, 2026 maintenance until before Jan. 7, 2027 maintenance"},
                ]}], "amber", "amber-top"),
                card("Battle Pass PLUS Premium contents", [paragrafos(["These bonus rewards are granted when the item is used."]), tabela_passe]),
                card("Season 22 level rewards", [tabela_recompensas], "sky", "sky-left"),
                {"type": "callout", "tone": "warning", "text": "Known bug: additional item claims are temporarily disabled after level 50. Accumulated rewards will be granted together in the next build update."},
            ],
        },
        "season": {
            "label": "Season Rewards",
            "blocks": [
                titulo_secao("Season 2 equipment conversion", "award"),
                card("What happens to Season 2 equipment", [lista(linhas_ate_fim(linhas, "Season Rewards", "Season Reward Token Amounts"))], "amber", "amber-left"),
                card("Forgotten Steel Fragments by enhancement level", [tabela_tokens]),
                paragrafos(["Visit Laura (Elin) in Highwatch to exchange your season rewards."]),
                figura(linhas[indice(linhas, "![Laura (Elin)](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_1.png)")], "Laura (Elin), the Season Reward exchange NPC in Highwatch."),
                card("Season Reward Shop", [
                    {"type": "keyValueList", "rows": [{"label": "Currency", "value": "Forgotten Steel Fragment"}, {"label": "Reset", "value": "Purchase counts will be reset"}]},
                ], "amber", "amber-top"),
                card("Gear", [tabela_de_linhas(linhas[indice_loja_equipamento:indice_materiais])]),
                card("Enhancement Materials", [tabela_de_linhas(linhas[indice_loja_materiais:indice_premium])]),
                card("Premium", [tabela_de_linhas(linhas[indice_loja_premium:indice_outros])]),
                card("Other", [tabela_de_linhas(linhas[indice_loja_outros:indice_fim_loja])]),
            ],
        },
        "dungeons": {
            "label": "Dungeons & Content",
            "blocks": [
                titulo_secao("Content and dungeon rotation", "swords"),
                card("Quest", [paragrafos([linhas[indice(linhas, "Quest") + 1]])]),
                card("Dungeons going offline", [paragrafos([
                    "Difficulty will be reset. Reset Scroll shop entries change to the normal rotation; matchmaking-only dungeons are excluded.",
                ]), lista(linhas[indice(linhas, "Dungeons Going Offline (Changed to Forgotten Achievements)") + 1:indice(linhas, "Normal Dungeon Rotation")])], "red", "red-soft"),
                card("Normal dungeon rotation", [paragrafos([linhas[indice(linhas, "Normal Dungeon Rotation") + 1]]), tabela_de_linhas(linhas[indice_rotacao_normal:indice(linhas, "Matchmaking-Only Rotation")])], "amber", "amber-top"),
                card("Matchmaking-only rotation", [
                    lista(linhas[indice(linhas, "Matchmaking-Only Rotation") + 1:indice(linhas, "![Imagem com recompensas](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_2.png)")]),
                    figura(linhas[indice(linhas, "![Imagem com recompensas](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_2.png)")], "Official overview of matchmaking-only dungeon rewards."),
                    tabela_matchmaking,
                ], "sky", "sky-left"),
                card("Provided equipment", [
                    paragrafos(["Standardized equipment and Stigmas are provided in auto matchmaking dungeons."]),
                    figura(linhas[indice(linhas, "![Imagem dos equipamentos de demonstração](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_3.png)")], "Equipment provided in auto matchmaking dungeons."),
                    figura(linhas[indice(linhas, "![Imagem dos stigmas de demonstrados](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_4.png)")], "Stigmas provided in auto matchmaking dungeons."),
                ]),
                card("Matchmaking-only rewards", [
                    {"type": "keyValueList", "rows": [
                        {"label": "Vanguard Request", "value": "Item EXP 5,000 · 2 Common–Legendary Card Boxes · 250 Stigma Fragments · Training Book · 20,000 Gold"},
                        {"label": "Final boss drops", "value": "Training Books · Stigmas · Common–Legendary Card Boxes"},
                    ]},
                ], "amber", "amber-left"),
                {"type": "callout", "tone": "warning", "text": "The HARD difficulty system planned for B134 was postponed to the next update due to system reorganization."},
                card("Achievements and cards", [lista([
                    *linhas[indice(linhas, "Achievement") + 1:indice(linhas, "Card")],
                    linhas[indice(linhas, "Card") + 1],
                ]), figura(linhas[indice(linhas, "![Imagem das 5 cartas](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_5.png)")], "The five stages of the Blessing of Shakan legendary card collection.")]),
                card("Battleground and gear", [lista([
                    *linhas[indice(linhas, "Battleground") + 1:indice(linhas, "Gear", indice(linhas, "Battleground"))],
                    *linhas[indice(linhas, "Gear", indice(linhas, "Battleground")) + 1:indice(linhas, "Items")],
                ])]),
            ],
        },
        "runes": {
            "label": "Accessory Runes",
            "blocks": [
                titulo_secao("Accessory Runes", "sparkles"),
                {"type": "callout", "tone": "info", "text": "Accessory Runes are a new progression layer: stronger evolutions of accessory crystals that combine base stats with class skill effects."},
                card("Rune behavior and new items", [
                    paragrafos([linhas[indice(linhas, "All Runes") + 1], linhas[indice(linhas, "Accessory Rune") + 1]]),
                    figura(linhas[indice(linhas, "![Imagem das novas Runas de acessórios](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_6.png)")], "New Accessory Runes."),
                    tabela_de_linhas(linhas[indice_novos_itens:indice(linhas, "Crafting")]),
                ], "amber", "amber-top"),
                card("Crafting and growth", [
                    lista(linhas[indice(linhas, "Crafting") + 1:indice(linhas, "![Imagem com exemplo de refinamento das Runas de Acessórios](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_7.png)")]),
                    figura(linhas[indice(linhas, "![Imagem com exemplo de refinamento das Runas de Acessórios](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_7.png)")], "Example of Accessory Rune crafting and growth."),
                ]),
                card("How additional options work", [
                    figura(linhas[indice(linhas, "![Imagem exemplificando as opções das Runas de Acessórios](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_8.png)")], "Examples of Accessory Rune options."),
                    paragrafos(linhas[indice(linhas, "Accessory Rune Options") + 2:indice(linhas, "Common Options")]),
                    tabela_de_linhas(linhas[indice_opcoes_comuns:indice(linhas, "Class-Specific Options")]),
                ], "sky", "sky-left"),
                titulo_secao("Class-specific Rune options", "user-cog"),
                *blocos_classes_runa,
            ],
        },
        "classes": {
            "label": "Classes",
            "blocks": [
                titulo_secao("Latency and class changes", "user-cog"),
                card("Latency improvement", [lista(linhas[indice(linhas, "Latency Improvement") + 1:indice(linhas, "Character")])], "sky", "sky-left"),
                card("Gunner — Bombardment", [paragrafos([linhas[indice(linhas, "Bombardment") + 1]])]),
                card("Valkyrie — Godsfall / Ragnarok", [
                    lista(linhas[indice(linhas, "Godsfall / Ragnarok") + 1:indice(linhas, "Godsfall")]),
                    {"type": "subsection", "title": "Godsfall", "blocks": [
                        lista(linhas[indice(linhas, "Godsfall") + 1:indice(linhas, "![Imagem com demonstrando a explosão](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_9.png)")]),
                        figura(linhas[indice(linhas, "![Imagem com demonstrando a explosão](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_9.png)")], "Runemark explosion during Godsfall."),
                    ]},
                    {"type": "subsection", "title": "Godsfall: The Wrath of the Red Moon", "blocks": [
                        figura(linhas[indice(linhas, "![Imagem com a skill Godsfall sendo exibida](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_10.png)")], "Godsfall: The Wrath of the Red Moon."),
                        lista(linhas[indice(linhas, "![Imagem com a skill Godsfall sendo exibida](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_10.png)") + 1:indice(linhas, "![Imagem com a skill Shining Crescent sendo exibida](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_11.png)")]),
                        figura(linhas[indice(linhas, "![Imagem com a skill Shining Crescent sendo exibida](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B134_11.png)")], "Shining Crescent changes during Wrath of the Red Moon."),
                    ]},
                ], "amber", "amber-top"),
            ],
        },
        "system": {
            "label": "System & Fixes",
            "blocks": [
                titulo_secao("System changes and bug fixes", "settings"),
                card("Gold cap", [lista(linhas[indice(linhas, "Other", indice(linhas, "System")) + 1:indice(linhas, "Bug Fixes")])], "amber", "amber-left"),
                {"type": "issueList", "title": "Bug fixes", "icon": "alert-triangle", "items": [
                    {"main": texto.removeprefix("※ ")} for texto in linhas[indice(linhas, "Bug Fixes") + 1:indice(linhas, "Thank you. — TERA Console Operations Team")] if texto
                ]},
            ],
        },
    }

    meta = metadados(
        "b134", "B134", "update", "2026-08-27",
        {
            "pt-BR": {"name": "B134 Update", "date": "27 de agosto de 2026", "parts": "Battle Pass · Temporada · Dungeons · Runas · Classes"},
            "en-US": {"name": "B134 Update", "date": "August 27, 2026", "parts": "Battle Pass · Season · Dungeons · Runes · Classes"},
            "es-ES": {"name": "B134 Update", "date": "27 de agosto de 2026", "parts": "Battle Pass · Temporada · Dungeons · Runas · Clases"},
        },
        [("highlights", "sparkles"), ("battlepass", "award"), ("season", "award"), ("dungeons", "swords"), ("runes", "sparkles"), ("classes", "user-cog"), ("system", "settings")],
    )
    return meta, {"schemaVersion": 1, "locale": "en-US", "tabs": abas}


def criar_b134_03(linhas: list[str]) -> tuple[dict[str, Any], dict[str, Any]]:
    inicio = indice(linhas, "B134.03 Update Notes")
    conteudo = linhas[inicio:]
    abas = {
        "dungeons": {
            "label": "Dungeons",
            "blocks": [
                titulo_secao("Dungeon reward and transition fixes", "swords"),
                card("Velik's Sanctuary / Velik's Hold", [paragrafos([conteudo[indice(conteudo, "Velik's Sanctuary / Velik's Hold") + 1]])], "amber", "amber-left"),
                card("Auto Matchmaking Dungeons", [lista(conteudo[indice(conteudo, "Auto Matchmaking Dungeons") + 1:indice(conteudo, "Ace Dungeon")])], "sky", "sky-left"),
                card("Ace Dungeon", [lista(conteudo[indice(conteudo, "Ace Dungeon") + 1:indice(conteudo, "Thank you. — The TERA Console Team")])]),
            ],
        }
    }
    meta = metadados(
        "b134.03", "B134.03", "hotfix", "2026-09-22",
        {
            "pt-BR": {"name": "B134.03 Update", "date": "22 de setembro de 2026", "parts": "Dungeons · Matchmaking · Recompensas"},
            "en-US": {"name": "B134.03 Update", "date": "September 22, 2026", "parts": "Dungeons · Matchmaking · Rewards"},
            "es-ES": {"name": "B134.03 Update", "date": "22 de septiembre de 2026", "parts": "Dungeons · Matchmaking · Recompensas"},
        },
        [("dungeons", "swords")],
    )
    return meta, {"schemaVersion": 1, "locale": "en-US", "tabs": abas}


def criar_b135(linhas: list[str]) -> tuple[dict[str, Any], dict[str, Any]]:
    indice_loja_materiais = indice(linhas, "Item Name\tDawnstorm Tokens Required\t7-Day Limit")
    indice_loja_outros = indice(linhas, "Item Name\tDawnstorm Tokens Required\t7-Day Limit", indice_loja_materiais + 1)
    classes = ["Sorcerer", "Archer", "Valkyrie", "Priest", "Mystic", "Warrior"]
    blocos_classes: list[dict[str, Any]] = []
    inicio_classes = indice(linhas, "Balance Adjustments")
    for posicao, nome_classe in enumerate(classes):
        indice_classe = indice(linhas, nome_classe, inicio_classes)
        fim_classe = indice(linhas, classes[posicao + 1], indice_classe + 1) if posicao + 1 < len(classes) else indice(linhas, "Glyphs")
        blocos_classes.append(card(nome_classe, [lista(linhas[indice_classe + 1:fim_classe])], "sky", "sky-left"))

    abas = {
        "highlights": {
            "label": "Highlights",
            "blocks": [
                titulo_secao("B135 at a glance", "sparkles"),
                {"type": "cardGrid", "columns": 2, "cards": [
                    {"title": "Dungeon progression", "titleTone": "amber", "blocks": [lista([
                        "HARD I and HARD II difficulty tiers are now available for eligible dungeons.",
                        "New-player bonuses now apply through 15 clears, with extra party rewards.",
                        "Several dungeons received pacing, difficulty, and drop adjustments.",
                    ])]},
                    {"title": "Build impact", "titleTone": "sky", "blocks": [lista([
                        "Sorcerer, Archer, Valkyrie, Priest, Mystic, and Warrior were adjusted.",
                        "Healer Strength and Tanker Endurance scaling were redesigned.",
                        "Accessory Etchings and stronger Annihilation armor stats were added.",
                    ])]},
                ]},
                {"type": "callout", "tone": "info", "text": "The most impactful changes are the HARD difficulty tiers and the new healer/tanker stat scaling. Review those tabs before rebuilding gear."},
            ],
        },
        "dungeons": {
            "label": "Dungeons",
            "blocks": [
                titulo_secao("Dungeons and difficulty tiers", "swords"),
                card("New-player support and Vanguard reputation", [
                    lista(linhas[indice(linhas, "Dungeons") + 1:indice(linhas, "Dungeon Changes")]),
                ], "amber", "amber-top"),
                card("Sky Cruiser Endeavor", [lista(linhas[indice(linhas, "Sky Cruiser Endeavor", indice(linhas, "Dungeon Changes")) + 1:indice(linhas, "Sky Cruiser Endeavor (Hard)")])]),
                card("Sky Cruiser Endeavor (Hard)", [lista(linhas[indice(linhas, "Sky Cruiser Endeavor (Hard)") + 1:indice(linhas, "Corrupted Skynest")])]),
                card("Corrupted Skynest", [lista(linhas[indice(linhas, "Corrupted Skynest") + 1:indice(linhas, "Difficulty System")])]),
                card("HARD I — Level 950", [lista(linhas[indice(linhas, "HARD I — Level 950 — Consumes 1 Condensed Dungeon Core") + 1:indice(linhas, "HARD II — Level 1000 — Consumes 3 Condensed Dungeon Cores")])], "amber", "amber-left"),
                card("HARD II — Level 1000", [lista(linhas[indice(linhas, "HARD II — Level 1000 — Consumes 3 Condensed Dungeon Cores") + 1:indice(linhas, "Applicable Dungeon List and Changes")])], "red", "red-soft"),
                card("Broken Prison", [lista(linhas[indice(linhas, "Broken Prison") + 1:indice(linhas, "Ruinous Manor (Hard)")])]),
                card("Ruinous Manor (Hard)", [lista(linhas[indice(linhas, "Ruinous Manor (Hard)") + 1:indice(linhas, "Bathysmal Rise (Hard)")])]),
                card("Bathysmal Rise (Hard)", [lista(linhas[indice(linhas, "Bathysmal Rise (Hard)") + 1:indice(linhas, "Forbidden Arena [Undying Warlord]")])]),
                card("Forbidden Arena [Undying Warlord]", [lista(linhas[indice(linhas, "Forbidden Arena [Undying Warlord]") + 1:indice(linhas, "Velik's Sanctuary (Hard)")])]),
                card("Velik's Sanctuary (Hard)", [lista(linhas[indice(linhas, "Velik's Sanctuary (Hard)") + 1:indice(linhas, "Corrupted Skynest (Hard)")])]),
                card("Corrupted Skynest (Hard)", [lista(linhas[indice(linhas, "Corrupted Skynest (Hard)") + 1:indice(linhas, "Ace Dungeon")])]),
                card("Ace Dungeon", [lista(linhas[indice(linhas, "Ace Dungeon") + 1:indice(linhas, "Additional Rewards")])]),
                card("Additional style rewards", [lista(linhas[indice(linhas, "Additional Rewards") + 1:indice(linhas, "Matchmaking")])], "sky", "sky-left"),
                card("Matchmaking", [lista(linhas[indice(linhas, "Matchmaking") + 1:indice(linhas, "Rewards")])]),
            ],
        },
        "rewards": {
            "label": "Rewards",
            "blocks": [
                titulo_secao("Island of Dawn and Vanguard rewards", "award"),
                card("Island of Dawn", [lista(linhas[indice(linhas, "Island of Dawn") + 1:indice(linhas, "Enhancement Materials")])], "amber", "amber-top"),
                card("Enhancement Materials", [tabela_de_linhas(linhas[indice_loja_materiais:indice(linhas, "Other", indice_loja_materiais)])]),
                card("Other weekly shop items", [tabela_de_linhas(linhas[indice_loja_outros:indice(linhas, "Vanguard Requests")])]),
                card("Vanguard Requests", [paragrafos([linhas[indice(linhas, "Vanguard Requests") + 1]])]),
            ],
        },
        "classes": {
            "label": "Class Balance",
            "blocks": [titulo_secao("Class balance adjustments", "user-cog"), *blocos_classes],
        },
        "scaling": {
            "label": "Stat Scaling",
            "blocks": [
                titulo_secao("Glyph and stat scaling changes", "shield"),
                card("Glyph cooldown calculation", [
                    paragrafos(linhas[indice(linhas, "Glyphs") + 1:indice(linhas, "Case\tRemaining Time")]),
                    tabela_de_linhas(linhas[indice(linhas, "Case\tRemaining Time"):indice(linhas, "After gear-based cooldown reduction is applied, the Glyph's -30% is then calculated on the remaining 30 seconds.")]),
                    paragrafos([linhas[indice(linhas, "After gear-based cooldown reduction is applied, the Glyph's -30% is then calculated on the remaining 30 seconds.")]]),
                ], "amber", "amber-left"),
                card("Strength / Endurance stat display", [
                    figura(linhas[indice(linhas, "![Imagem exibindo os status](https://cs-live-static-psap.krapaas.com/console/tera/brand-site/admin/B135_stat.png)")], "Updated Strength and Endurance stat display."),
                    lista(linhas[indice(linhas, "Strength/Endurance Stat Display Changes") + 2:indice(linhas, "Healer Class Strength Scaling")]),
                ]),
                card("Healer Strength scaling", [
                    lista(linhas[indice(linhas, "Healer Class Strength Scaling") + 1:indice(linhas, "Strength (Power)\tBuff Amount Increase")]),
                    tabela_de_linhas(linhas[indice(linhas, "Strength (Power)\tBuff Amount Increase"):indice(linhas, "Taunt")]),
                ], "sky", "sky-left"),
                card("Taunt", [lista(linhas[indice(linhas, "Taunt") + 1:indice(linhas, "Tanker Class Endurance Scaling")])], "red", "red-soft"),
                {"type": "callout", "tone": "warning", "text": "The source describes the Tanker Endurance cap in two different ways: no additional efficiency beyond 550, but later a soft cap from 500~600 and a hard cap at 600. Confirm the effective breakpoint in game."},
                card("Tanker Endurance scaling", [
                    lista(linhas[indice(linhas, "Tanker Class Endurance Scaling") + 1:indice(linhas, "200~500 range\tEfficiency increase per 1 Endurance")]),
                    tabela_de_linhas(linhas[indice(linhas, "200~500 range\tEfficiency increase per 1 Endurance"):indice(linhas, "From the 500~600 range, a soft cap applies and the above values are halved.")]),
                    paragrafos(linhas[indice(linhas, "From the 500~600 range, a soft cap applies and the above values are halved."):indice(linhas, "Example Summary by Endurance Range")]),
                    tabela_de_linhas(linhas[indice(linhas, "Endurance\tTaunt Duration (Total)\tPerfect Defense Bonus Duration\tWeapon Defense Efficiency"):indice(linhas, "Lancer", indice(linhas, "Example Summary by Endurance Range"))]),
                ], "amber", "amber-top"),
                card("Lancer", [
                    paragrafos(linhas[indice(linhas, "Lancer", indice(linhas, "Example Summary by Endurance Range")) + 1:indice(linhas, "Endurance\tArmor Break Efficiency Increase")]),
                    tabela_de_linhas(linhas[indice(linhas, "Endurance\tArmor Break Efficiency Increase"):indice(linhas, "Warrior, Brawler")]),
                ]),
                card("Warrior and Brawler", [
                    lista(linhas[indice(linhas, "Warrior, Brawler") + 1:indice(linhas, "Endurance\tOwn Attack Power Increase")]),
                    tabela_de_linhas(linhas[indice(linhas, "Endurance\tOwn Attack Power Increase"):indice(linhas, "Items")]),
                ]),
            ],
        },
        "items": {
            "label": "Items",
            "blocks": [
                titulo_secao("Items and Etchings", "hammer"),
                card("Accessory Etchings", [
                    paragrafos([linhas[indice(linhas, "Etchings") + 1]]),
                    tabela_de_linhas(linhas[indice(linhas, "Grade\tEndurance Increase"):indice(linhas, "Annihilation Gear")]),
                ], "amber", "amber-left"),
                card("Annihilation Gear", [lista(linhas[indice(linhas, "Annihilation Gear") + 1:indice(linhas, "System")])]),
            ],
        },
        "system": {
            "label": "System & Fixes",
            "blocks": [
                titulo_secao("System changes and fixes", "settings"),
                card("Mail", [lista(linhas[indice(linhas, "Mail") + 1:indice(linhas, "Shop")])], "amber", "amber-left"),
                card("Shop", [lista(linhas[indice(linhas, "Shop") + 1:indice(linhas, "Runes")])]),
                card("Runes", [lista(linhas[indice(linhas, "Runes") + 1:indice(linhas, "Other", indice(linhas, "Runes"))])], "sky", "sky-left"),
                card("Other", [lista(linhas[indice(linhas, "Other", indice(linhas, "System")) + 1:indice(linhas, "Thank you. — The TERA Console Team")])]),
            ],
        },
    }

    meta = metadados(
        "b135", "B135", "update", "2026-10-05",
        {
            "pt-BR": {"name": "B135 Update", "date": "5 de outubro de 2026", "parts": "HARD · Dungeons · Classes · Escalonamento · Itens"},
            "en-US": {"name": "B135 Update", "date": "October 5, 2026", "parts": "HARD · Dungeons · Classes · Scaling · Items"},
            "es-ES": {"name": "B135 Update", "date": "5 de octubre de 2026", "parts": "HARD · Dungeons · Clases · Escalado · Ítems"},
        },
        [("highlights", "sparkles"), ("dungeons", "swords"), ("rewards", "award"), ("classes", "user-cog"), ("scaling", "shield"), ("items", "hammer"), ("system", "settings")],
    )
    return meta, {"schemaVersion": 1, "locale": "en-US", "tabs": abas}


def salvar_patch(identificador: str, meta: dict[str, Any], conteudo: dict[str, Any]) -> None:
    pasta = PASTA_PATCHES / identificador
    escrever_json(pasta / "meta.json", meta)
    escrever_json(pasta / "en-US.json", normalizar_pontuacao(conteudo))
    escrever_json(pasta / "pt-BR.json", normalizar_pontuacao(localizar_conteudo(conteudo, "pt-BR")))
    escrever_json(pasta / "es-ES.json", normalizar_pontuacao(localizar_conteudo(conteudo, "es-ES")))


def main() -> None:
    linhas_b134 = ler_linhas(FONTE_B134)
    linhas_b135 = ler_linhas(FONTE_B135)
    salvar_patch("b134", *criar_b134(linhas_b134))
    salvar_patch("b134.03", *criar_b134_03(linhas_b134))
    salvar_patch("b135", *criar_b135(linhas_b135))
    print("[curate] B134, B134.03 e B135 gerados e localizados.")


if __name__ == "__main__":
    main()
