# Plano de Implementação - Automação de Conteúdo (Updates & Eventos)

| Campo | Valor |
|-------|--------|
| **Status** | Aguardando aprovação para execução |
| **Versão** | 1.3 |
| **Data** | 2026-07-23 |
| **Escopo** | Manter o portal atualizado sem manutenção manual pesada |
| **Restrição de produto** | Não alterar padrão visual, formato de leitura nem stack pública do site |
| **Documento único** | Este arquivo em `.metadocs/` - rascunhos antigos foram **removidos** |

> **Fonte única de verdade.** Não existem outros planos de automação no repositório.
> Debate + rascunhos anteriores foram fundidos aqui; `discusao_contexto.md` e `plano_automacao_patches.md` foram apagados.

---

## 0. Snapshot oficial - agora (API, 2026-07-23)

Como descobrir as últimas notícias **sem adivinhar** `XXXX`:

```http
GET 


```

Depois filtrar no cliente:

```ts
itens.filter((item) => item.categoryLabel?.key === 'update')
```

Detalhe completo (HTML + imagens no corpo):

```http
GET https://api.tera-console.com/news/{id}?languageType=EN
```

URL pública correspondente:

```text
https://tera-console.com/news/{id}
```

### 0.1 UPDATES oficiais (mais recentes → mais antigos)

| Prioridade portal | `newsId` | Título oficial | Data (API) | URL |
|-------------------|----------|----------------|------------|-----|
| **P0 - ausente** | **1018** | B133.02 Update - July 23 | 2026-07-23 | https://tera-console.com/news/1018 |
| **P0 - ausente** | **1008** | B133 Update - July 15 | 2026-07-12 | https://tera-console.com/news/1008 |
| **P1 - ausente** | **1001** | B132.03 Update - June 18 | 2026-06-15 | https://tera-console.com/news/1001 |
| **P1 - ausente** | **991** | (Updated) B132.01 Update - May 21 | 2026-05-17 | https://tera-console.com/news/991 |
| Já no portal* | 974 / 973 | B131.01 Update - April 9 (#2 / #1) | 2026-04-06 | `/news/974`, `/news/973` |
| Já no portal* | 971 | B130.03 Update - March 26 | 2026-03-25 | https://tera-console.com/news/971 |
| Já no portal* | 962 | B130.02 Build Update - March 12 | 2026-03-08 | https://tera-console.com/news/962 |
| Já no portal* | 955 | B130.01 Build Update - February 26 | 2026-02-19 | https://tera-console.com/news/955 |

\* Conteúdo equivalente já curado no portal; IDs oficiais servem de referência de fonte, não de reimportação obrigatória.

### 0.2 O que **não** é update (mesmo na timeline recente)

Na mesma listagem da API aparecem muitos `notice` - **não importar no auto**:

| `newsId` | Categoria | Título (exemplo) |
|----------|-----------|------------------|
| 1017 | notice | Server Maintenance [Jul. 23] |
| 1015 | notice | [TERA Shop] Sale & New Items |
| 1011 / 1010 | notice | Maintenance / Extension |
| 1009 | notice | LAST STAND 2026 Season #2 Event Notice |
| 1003 | notice | B133 Update & Future Plans *(é notice, não patch notes completo)* |

### 0.3 Evento ativo em destaque

| Campo | Valor |
|-------|--------|
| `eventId` | **1016** |
| Título | LAST STAND 2026 Season #2 - Global Leaderboard |
| Período (API) | 2026-07-14 → 2026-08-28 |
| Detalhe | `GET /event/1016?languageType=EN` |
| UI oficial | seção EVENT do site |

### 0.4 Comando-alvo do maintainer (pós-automação)

```bash
# Em vez de adivinhar XXXX - usar os IDs da tabela 0.1
npm run ingest:update -- --news-id 1018
npm run ingest:update -- --url https://tera-console.com/news/1008
```

Catch-up mínimo recomendado (ordem): **1008 → 1018** (major B133, depois hotfix). Opcional em seguida: **991 → 1001** (B132).

---

## 1. Problema

### 1.1 Situação real

O portal **TERA Console** (React + TypeScript + Vite + Tailwind v4 + i18n `pt-BR` / `en-US` / `es-ES`) está visualmente maduro. O que não escala é a **esteira de conteúdo**.

Hoje, publicar um update grande implica:

1. Descobrir que saiu patch (depende de jogar ou acompanhar o site).
2. Ler o HTML oficial e extrair seções/imagens.
3. Modelar dezenas/centenas de estruturas em TypeScript (`patchNotesB13x.ts`).
4. Escrever componentes React por build (`B131Tabs.tsx`, `B130Tabs.tsx`).
5. Localizar shell + conteúdo em 3 idiomas.
6. Registrar `PatchId` rígido em tipos + `App.tsx` + `siteContent.ts`.
7. Build, commit, deploy.

### 1.2 Evidência de atraso

| Fonte | Estado em 2026-07-23 |
|-------|----------------------|
| Portal da comunidade | Até **B131.01** (Abril/2026) |
| Site oficial (UPDATES) | **B132.x**, **B133** (`1008`), **B133.02** (`1018`) |

O atraso não é falta de vontade: o custo unitário de cada patch é alto demais para quem joga pouco e tem pouco tempo.

### 1.3 Objetivo de produto

Automatizar **descoberta → ingestão → estruturação → tradução → PR**, preservando:

- dark theme, cards, sidebar de updates, abas, hero, SEO e i18n de shell;
- tom de curadoria independente (não se passar por site oficial do jogo);
- revisão humana mínima (gate de qualidade), não publicação cega.

**Métrica de sucesso:** de “fim de semana por patch” para “≤ 15-20 minutos de review quando o bot abrir PR”.

---

## 2. Análise da fonte oficial

### 2.1 Site público vs API

| Camada | URL | Observação |
|--------|-----|------------|
| UI | `https://tera-console.com/news` | SPA Vue (requer JS; HTML vazio para scrapers ingênuos) |
| API real | `https://api.tera-console.com` | JSON estável; **fonte primária recomendada** |
| CDN de mídia | `//cs-live-static-psap.krapaas.com/...` | Imagens oficiais referenciadas no HTML do post |

**Decisão:** não scrapear o DOM da SPA. Consumir a **API JSON** usada pelo próprio site oficial.

### 2.2 Taxonomia de NEWS no site oficial (UPDATE vs NOTICE)

Na UI: **ALL | NOTICE | UPDATES**.  
Na API, **cada item já vem classificado** - não precisamos “adivinhar” manutenção vs patch só por NLP.

```json
"categoryLabel": { "key": "update", "label": "UPDATE" }
// ou
"categoryLabel": { "key": "notice", "label": "NOTICE" }
```

| Categoria | `key` | Exemplos reais (API, 2026-07-23) | Interesse do portal |
|-----------|-------|----------------------------------|---------------------|
| **UPDATES** | `update` | `1018` B133.02, `1008` B133 | **Alta** - vira patch no portal |
| **NOTICE** | `notice` | `1017` Server Maintenance, shop sale, known issues, event notice, “Future Plans” | **Baixa** - **não** auto-importar |
| **ALL** | - | Mistura | Só listagem bruta |

#### Prova empírica - o post de manutenção que parece “notícia de patch”

Texto do usuário (manutenção Jul. 23, rewards, UTC/KST) = item oficial:

| Campo | Valor testado |
|-------|----------------|
| `id` | **1017** |
| `categoryLabel.key` | **`notice`** (não `update`) |
| `title` | TERA Console Server Maintenance [Jul. 23] |
| Corpo | “Scheduled maintenance… Maintenance Schedule… Maintenance Rewards…” |
| Contraste | `1018` é `update` no **mesmo dia** (B133.02 Patch Note) |

Na página 1 da API (~20 itens): **16 notice / 4 update**. Ou seja, a maior parte do feed é ruído para o portal - e a API já rotula.

#### Pipeline de classificação (camadas - simples, não “IA mágica”)

```text
Camada 1 (obrigatória, barata):
  se categoryLabel.key !== "update"  →  DESCARTAR (ou fila "ignorar")

Camada 2 (segurança, título):
  se título casa com maintenance/shop/known issues  →  DESCARTAR mesmo se cat errar
  se título NÃO parece patch (sem B\d+ / "Build Update" / "Patch") →  PR revisável ou skip

Camada 3 (corpo HTML, opcional):
  header "Patch Notes · …"  →  reforça UPDATE
  header "Maintenance Notice · …"  →  reforça NOTICE

Camada 4 (humano):
  só entra no site via merge de PR; override manual por --news-id
```

**Regra de ouro v1:**  
`importar automaticamente = category === update` **E** título compatível com patch.  
Todo o resto (maintenance, shop, known issues, “Future Plans”, event notice) **não** vira página de patch.

| Tipo de post | `key` típico | Auto? |
|--------------|--------------|--------|
| Patch notes / Build Update (`B133`, `B133.02`) | `update` | **Sim** |
| Server Maintenance + rewards de login | `notice` | **Não** |
| Shop sale / new items | `notice` | **Não** |
| Known Issues | `notice` | **Não** |
| Event Notice / Leaderboard aviso | `notice` | **Não** (evento vai por `/event/*` na v1.1) |
| “Update & Future Plans” (dev blog) | `notice` (ex. `1003`) | **Não** |

> Por isso **não** é um problema de NLP pesado: a separação principal já é **campo estruturado da API**. Heurística de título é cinto de segurança; PR é o freio final.

### 2.3 Eventos ativos

Além de NEWS, o site oficial tem **EVENT** (ex.: Last Stand / Global Leaderboard).

| Endpoint | Uso |
|----------|-----|
| `GET /event/top?languageType=EN` | Evento em destaque |
| `GET /event/{id}?languageType=EN` | Detalhe do evento (HTML em `description`, datas, `imageUrl`, status) |

**Interesse do portal:** **alto** para eventos ativos (período vigente), alinhado ao pedido do maintainer.  
**Escopo de UI:** eventos podem nascer como:

- aba `events` dentro de um patch relacionado, **ou**
- bloco/aba transversal “Eventos ativos” (fase posterior), sem mudar o look base.

Na **v1 da automação**, priorizar **UPDATES**; eventos entram na **v1.1** com o mesmo schema de blocos.

### 2.4 Endpoints oficiais validados (2026-07-23)

Base: `https://api.tera-console.com`

| Método | Endpoint | Função | Payload relevante |
|--------|----------|--------|-------------------|
| `GET` | `/news?page={n}&size={s}&languageType=EN` | Lista paginada (~589 itens) | `content[]`: `id`, `title`, `startDate`, `categoryLabel`, `description` (resumo curto na listagem) |
| `GET` | `/news/top?languageType=EN` | Notícia topo | Objeto único |
| `GET` | `/news/{id}?languageType=EN` | Detalhe completo | `title`, `startDate`, `categoryLabel`, **`description` = HTML completo** (~100k+ chars em patches grandes), `prev`/`next` |
| `GET` | `/event/top?languageType=EN` | Evento topo | `id`, `title`, `startDate`, `endDate`, `imageUrl`, `description` (HTML), status |
| `GET` | `/event/{id}?languageType=EN` | Detalhe de evento | Idem |

Idiomas oficiais observados na SPA (`languageType`): `EN`, `KO`, `JA`, `CN`, `TW`, `DE`, `FR`.  
**Não há `PT` nem `ES` nativos** → o portal continua sendo a camada de localização para `pt-BR` e `es-ES`; `en-US` pode espelhar o EN oficial com edição leve.

### 2.5 Anatomia de um UPDATE (ex.: id `1008` - B133)

O campo `description` é HTML rico com padrões recorrentes:

- **Header:** “Patch Notes · TERA Console · B133”
- **Highlights:** lista de bullets no topo
- **Seções `h2`:** Dungeon, Class Balance, Item/System, Bug Fix, Event, etc.
- **Subseções** com badges (ex.: Last Stand)
- **Listas** de mudanças
- **Tabelas** (recompensas, regras)
- **Imagens** em CDN (`cs-live-static-psap.krapaas.com/...`)
- **Notas de dev / Additional Notes**

Isso mapeia bem para o visual atual do portal (`SectionTitle`, `Card`, listas com seta, tabelas, `FiguraPatch`, nota de desenvolvedor).

### 2.6 O que **não** importa automaticamente

- Manutenções de servidor
- Avisos de loja / sale
- Extensões de maintenance
- Notices genéricos sem patch notes
- Mídia de marketing genérica (`/media`) salvo anexada a um update/evento

---

## 3. Diagnóstico da arquitetura atual do portal

### 3.1 Pontos de acoplamento (custo de cada update)

| Arquivo / conceito | Papel hoje | Problema |
|--------------------|------------|----------|
| `src/types/idioma.ts` → `PatchId` | Union literal de patches | Cada build exige alterar tipos |
| `src/data/siteContent.ts` | Metadados localizados (nome, data, abas) | Duplicação × 3 idiomas |
| `src/data/patchNotesB130.ts` / `B131.ts` | Conteúdo monólito | B131 ~1.7k+ linhas |
| `src/features/patchNotes/tabs/B13xTabs.tsx` | UI **específica por patch** | Novo TSX a cada major |
| `src/App.tsx` → `registroComponentes` | Mapa patch → abas → componentes | Wiring manual |
| `src/assets/imagens/B131_01/*` | Imagens por pasta | OK; precisa virar convenção automática |

### 3.2 O que já está bom (preservar)

- Componentes UI base: `Card`, `SectionTitle`, padrões de tipografia amber/slate
- i18n de shell + seletor de idioma
- Layout hero + sidebar de updates + abas
- Deploy estático (Vercel) + build `tsc -b && vite build`
- Tom de curadoria independente

### 3.3 Princípio arquitetural

```text
ANTES:  Update oficial → engenharia React → conteúdo
DEPOIS: Update oficial → dados versionados → renderer único → UI idêntica
```

Sem **renderer data-driven**, automação só gera monólitos TS frágeis.  
Com renderer, automação só gera **dados + assets**.

---

## 4. Estratégia recomendada (decisão consolidada)

### 4.0 Homologação: **Opção A — PR por update** (decidido 2026-07-23)

| Decisão | Valor |
|---------|--------|
| Modelo | **1 UPDATE oficial = 1 branch = 1 PR = 1 Preview Vercel** |
| Branch | `content/<patchId>-<newsId>` (ex. `content/b133.02-1018`) |
| Base do PR | sempre `main` |
| Corpo do PR | checklist QA (markdown, links, checkboxes) — substitui a Issue de radar |
| Rejeitado | branch `homolog` fixa sobrescrita com vários patches misturados |
| Issue radar | workflow **desativado** (modelo preservado no repo) |

### 4.1 Estratégia vencedora: **Híbrida com gate de PR (Opção A)**

| Camada | Nome | Comportamento |
|--------|------|----------------|
| **Fundação** | Conteúdo data-driven + `DynamicPatchRenderer` | Novo patch = JSON + imagens CDN; **zero TSX novo** |
| **Ingestão** | CLI / Action | Um `newsId` → conteudo na branch do PR |
| **Descoberta** | Cron / detect | Cada update faltante → **PR separado** (nao Issue) |
| **Homologação** | Preview Vercel do PR | HTTPS para QA visual/editorial |
| **Publicação** | Merge do PR em `main` | **Nunca** merge automatico na v1 |
| **Tradução** | EN oficial + Gemini → `pt-BR` / `es-ES` | Review humano no Preview |

Isso une:

- **Detecção automática** (Actions/cron na API)
- **CLI com URL ou `newsId`** sob demanda
- **Gate humano** (PR + Preview) em vez de Issue ou commit cego

### 4.2 Por que não as alternativas puras

| Alternativa | Veredito | Motivo |
|-------------|----------|--------|
| Continuar com `B13xTabs.tsx` | Rejeitada | Não escala com o tempo disponível |
| Scrape da SPA HTML | Rejeitada | SPA sem conteúdo no HTML estático; API existe |
| CMS headless (Sanity/Contentful) | Adiada | Overkill para SPA de curadoria; aumenta custo operacional |
| Publish 100% automático na `main` | Rejeitada (v1) | Risco de erro de classificação/tradução em conteúdo de comunidade |
| Playwright-only sem API | Desnecessário | API JSON já entrega título, categoria, HTML e navegação |

### 4.3 Método de parsing recomendado

1. **Listar** updates via `/news?page=1&size=20&languageType=EN`.
2. **Filtrar** `categoryLabel.key === "update"`.
3. **Diff** com manifesto local (`source.officialNewsId` já ingeridos).
4. **Detalhar** `/news/{id}?languageType=EN`.
5. **Sanitizar HTML** → AST intermediário (títulos, listas, tabelas, imagens, highlights).
6. **Classificar seções** por heurística de headings (`Dungeon`, `Class`, `Battle Pass`, `Event`, `System`, `Bug`, `Item`…) + fallback `system`.
7. **Mapear** para o **schema canônico** do portal (blocos genéricos).
8. **Baixar imagens** da CDN para `public/` ou `src/assets/imagens/{patchId}/`.
9. **Localizar** `en-US` (base), `pt-BR`, `es-ES`.
10. **Gerar PR** com diff só de dados/assets + atualização de índice.

### 4.4 Tradução - política

| Idioma | Origem | Política |
|--------|--------|----------|
| `en-US` | EN oficial | Cópia fiel com limpeza de HTML/ruído |
| `pt-BR` | Tradução automática + glossário | Preferir termos consolidados do B131 (itens, dungeons, classes) |
| `es-ES` | Tradução automática + glossário | Idem |

**Glossário versionado** (ex.: `content/glossary.json`): nomes próprios, dungeons, itens e classes **não** se traduzem quando a tradução piora o reconhecimento.

Provedor de tradução na v1: **LLM via API** (quando secret disponível) **ou** etapa “agent-assisted” no workflow local; fallback documentado para DeepL/Google se necessário. A escolha concreta de secret fica como **parâmetro de implementação**, não bloqueia o schema.

---

## 5. Modelo de dados canônico (schema)

### 5.0 Versionamento explícito do schema

> **Lacuna fechada na v1.2 do plano.** Antes só existia schema implícito (tabelas de blocos); agora o contrato é versionado.

| Campo | Onde | Valor inicial | Função |
|-------|------|---------------|--------|
| `schemaVersion` | `meta.json` e arquivos de locale | **`1`** (inteiro semver-major simples) | Renderer e `content:validate` sabem qual contrato aplicar |
| `SCHEMA_VERSION` / constante | `src/types/patchContent.ts` + validador | `1` | Fonte de verdade no código |
| Changelog de schema | este doc §5.0 + comentário no tipo | - | Mudanças breaking sobem a major |

**Regras:**

1. Todo patch ingerido grava `"schemaVersion": 1` no `meta.json` e em cada `{locale}.json`.
2. O renderer **recusa** ou entra em modo degradado se `schemaVersion` for maior que a suportada pelo app (mensagem clara no build/dev).
3. O validador **falha o CI** se faltar `schemaVersion` ou se for incompatível.
4. Evolução:
 - **Additive** (novo `type` de bloco opcional, campo opcional) → pode permanecer em `1` se o renderer ignorar desconhecido com warning.
 - **Breaking** (renomear `type`, mudar shape de `table`, remover campo obrigatório) → `schemaVersion: 2` + migração ou dual-support temporário.
5. `content/patches/index.json` também declara `"schemaVersion": 1` no root.

**Exemplo mínimo no locale:**

```json
{
  "schemaVersion": 1,
  "locale": "pt-BR",
  "tabs": {}
}
```

### 5.1 Layout de pastas proposto

```text
content/
  patches/
    index.json                 # schemaVersion + ordem + ids publicados
    b133.01/
      meta.json                # schemaVersion, id, source, abas, status, parseReport?
      en-US.json               # schemaVersion + blocos por aba
      pt-BR.json
      es-ES.json
      images/
        dungeon_rk9.webp
        ...
  events/                      # fase 1.1
    index.json
    e1016/
      meta.json
      en-US.json
      pt-BR.json
      es-ES.json
      images/
  glossary.json
  section-map.json             # mapeamento configurável heading → aba (obrigatório na Etapa 3)
  sources/
    seen-news-ids.json         # ids oficiais já processados
    fixtures/                  # HTML oficial sample (1008, 1018) para testes de parser
```

> Durante a migração, pode-se gerar TypeScript a partir do JSON (`src/data/generated/`) se for mais simples para o bundler. O **contrato canônico** é o JSON em `content/`.

### 5.2 `meta.json` (patch)

```json
{
  "schemaVersion": 1,
  "id": "b133.01",
  "buildLabel": "B133",
  "kind": "update",
  "status": "draft",
  "source": {
    "officialNewsId": 1008,
    "officialUrl": "https://tera-console.com/news/1008",
    "fetchedAt": "2026-07-23T12:00:00Z",
    "languageType": "EN"
  },
  "publishedAt": "2026-07-15",
  "parse": {
    "quality": "ok",
    "warnings": [],
    "unmappedHeadings": [],
    "fallbackTabs": []
  },
  "display": {
    "en-US": {
      "name": "B133 Update",
      "date": "July 15, 2026",
      "parts": ""
    },
    "pt-BR": {
      "name": "Atualização B133",
      "date": "15 de Julho de 2026",
      "parts": ""
    },
    "es-ES": {
      "name": "Actualización B133",
      "date": "15 de julio de 2026",
      "parts": ""
    }
  },
  "tabs": [
    { "id": "highlights", "icon": "sparkles" },
    { "id": "dungeons", "icon": "swords" },
    { "id": "classes", "icon": "user-cog" },
    { "id": "events", "icon": "calendar" },
    { "id": "system", "icon": "settings" },
    { "id": "bugs", "icon": "alert-triangle" }
  ]
}
```

`parse.quality`: `ok` | `partial` | `fallback` | `failed` - ver §5.6.

### 5.3 Blocos de conteúdo (renderer-agnóstico)

Tipos mínimos de bloco (extensíveis):

| `type` | Uso | Campos principais |
|--------|-----|-------------------|
| `sectionTitle` | Título da aba | `title`, `icon?` |
| `paragraphs` | Texto corrido | `items: string[]` |
| `bulletList` | Lista com setas (visual atual) | `items: string[]` |
| `callout` | Aviso / notice | `tone`, `text` |
| `keyValueList` | Período BP, labels | `rows: { label, value }[]` |
| `table` | Battle Pass, recompensas | `columns`, `rows` |
| `figure` | Imagem + legenda | `src`, `alt`, `caption` |
| `devNote` | Nota de desenvolvedor | `title`, `paragraphs` |
| `cardGrid` | 2 colunas de cards | `cards: { title, blocks[] }[]` |
| `subsection` | Título + blocos filhos | `title`, `badge?`, `blocks[]` |

Arquivo por idioma:

```json
{
  "locale": "pt-BR",
  "tabs": {
    "dungeons": {
      "label": "Dungeons",
      "blocks": [
        { "type": "sectionTitle", "title": "Dungeons & Ajustes" },
        {
          "type": "subsection",
          "title": "Rampaging RK-9 Kennel",
          "badge": "Last Stand",
          "blocks": [
            { "type": "figure", "src": "images/dungeon_rk9.webp", "alt": "...", "caption": "..." },
            { "type": "bulletList", "items": ["...", "..."] }
          ]
        }
      ]
    }
  }
}
```

### 5.4 Mapeamento de seções - **configurável** (`content/section-map.json`)

> **Não hardcodar** a tabela de headings no TypeScript do ingestor. O mapa vive em dados versionados no repo; mudar classificação = PR no JSON, sem rebuild de lógica (salvo novo tipo de aba).

**Formato proposto:**

```json
{
  "schemaVersion": 1,
  "defaultTab": "system",
  "rules": [
    {
      "tab": "battlepass",
      "priority": 10,
      "match": { "any": ["battle pass", "season pass"] }
    },
    {
      "tab": "dungeons",
      "priority": 20,
      "match": { "any": ["dungeon", "rk-9", "ace dungeon", "rotation"] }
    },
    {
      "tab": "classes",
      "priority": 30,
      "match": { "any": ["class", "balance", "skill"] }
    },
    {
      "tab": "events",
      "priority": 40,
      "match": { "any": ["event", "battleground", "last stand"] }
    },
    {
      "tab": "gear",
      "priority": 50,
      "match": { "any": ["gear", "accessory", "enchant", "mask of annihilation"] }
    },
    {
      "tab": "crafting",
      "priority": 60,
      "match": { "any": ["craft", "recipe", "production"] }
    },
    {
      "tab": "bugs",
      "priority": 70,
      "match": { "any": ["bug fix", "bug fixes", "known issue", "fixed an issue"] }
    },
    {
      "tab": "system",
      "priority": 80,
      "match": { "any": ["system", "ui", "matching", "reward structure"] }
    },
    {
      "tab": "highlights",
      "priority": 5,
      "match": { "any": ["update highlights", "highlights"] }
    }
  ],
  "normalize": {
    "caseInsensitive": true,
    "stripHtml": true
  }
}
```

**Algoritmo:**

1. Extrair heading de cada seção do AST HTML.
2. Normalizar (lowercase, trim).
3. Avaliar `rules` por `priority` ascendente (menor número = mais específico / primeiro match).
4. Primeira regra cujo `match.any` contenha substring no heading → `tab`.
5. Sem match → `defaultTab` (`system`) **e** registrar heading em `parse.unmappedHeadings`.

**Seed inicial (equivalente à tabela antiga):**

| Sinais no HTML oficial (EN) | Aba portal |
|-----------------------------|------------|
| Battle Pass, Season Pass | `battlepass` / `season` |
| Dungeon, RK-9, Ace, rotation | `dungeons` |
| Class, Balance, skill | `classes` |
| Event, Battleground, Last Stand (event) | `events` |
| Gear, accessory, enchant, mask | `gear` |
| Craft, item, shop, reward structure | `crafting` / `rewards` |
| System, UI, matching | `system` |
| Bug Fix, fixed, corrected | `bugs` |
| Highlights (topo) | `highlights` |

Hotfix pequenos (só bugs) → uma aba `bugs`, como B130.03 (tabs do `meta` geradas só com abas não vazias).

### 5.5 Eventos ativos (fase 1.1)

```json
{
  "id": "e1016",
  "source": { "officialEventId": 1016 },
  "active": true,
  "startDate": "2026-07-...",
  "endDate": "2026-09-...",
  "relatedPatchIds": ["b133.01"]
}
```

Renderer reutiliza os mesmos blocos. UI: seção “Eventos ativos” no shell **ou** aba do patch relacionado - decisão de UX na Etapa 6, sem mudar identidade visual.

### 5.6 Política de falhas de parsing (obrigatória na Etapa 3)

> **Lacuna fechada na v1.2.** Antes só havia uma linha em “Riscos” (“fallback dump em system”). Agora há estados, comportamentos e o que o PR deve mostrar.

#### Níveis de falha

| `parse.quality` | Quando | Comportamento do ingestor | PR / CI |
|-----------------|--------|---------------------------|---------|
| **`ok`** | HTML parseado; ≥1 seção mapeada; blocos válidos no schema | Grava patch normal | PR draft “pronto para review” |
| **`partial`** | Parse OK, mas há `unmappedHeadings` ou blocos truncados (tabela estranha, img falhou) | Grava o que deu; lista warnings em `meta.parse` | PR draft com label `needs-review` + checklist no body |
| **`fallback`** | Não deu para estruturar seções, mas texto/listas foram extraídos | **Tudo** vai para aba `system` (ou `highlights` + `system`) como `bulletList`/`paragraphs` crus; **não** descarta o patch | PR draft label `parse-fallback`; título `[fallback] B133…` |
| **`failed`** | API OK mas HTML vazio/irrecuperável, ou schema inválido após montagem | **Não** atualiza `seen-news-ids` como sucesso; grava artefato de debug opcional em `content/sources/failures/{newsId}.json` (raw meta + erro) | Abre **Issue** ou PR vazio com só relatório; **não** mergeável como conteúdo |

#### Princípios

1. **Nunca falhar em silêncio** - todo run escreve `meta.parse` (quality, warnings, unmappedHeadings, fallbackTabs).
2. **Preferir conteúdo feio a zero conteúdo** - `fallback` ainda gera página legível no visual atual.
3. **Não marcar id como “visto com sucesso”** em `failed` - o cron tenta de novo no dia seguinte.
4. **`partial` / `fallback` ainda abrem PR** - o maintainer decide se publica ou ajusta JSON/`section-map.json`.
5. **Imagem que falha download** → warning + omite `figure` (não derruba o patch inteiro).
6. **Validação de schema** (`content:validate`) roda sempre no fim:
 - inválido → trata como `failed` (não commita locale quebrado).
7. **Fixtures** (`content/sources/fixtures/`) com HTML de `1008` e `1018` alimentam testes unitários do parser (Etapa 7, recomendado já na 3).

#### Saída de debug sugerida (CLI)

```text
[ingest] newsId=1008 quality=partial
[ingest] unmapped: "HARD I System", "Darkshard Supply"
[ingest] images: 12 ok, 1 failed
[ingest] wrote content/patches/b133.01/
```

#### Relação com o renderer

- Renderer **não** implementa lógica de parse; só consome blocos válidos `schemaVersion` suportada.
- Se `parse.quality === fallback'`, a UI continua idêntica - só há menos abas / mais texto na `system`.

---

## 6. Arquitetura da solução

```text
┌─────────────────────────────────────────────────────────────────┐
│  api.tera-console.com                                           │
│  /news (lista) · /news/{id} (HTML) · /event/top · /event/{id}   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  Ingestor (Node script)                                         │
│  filter update · parse HTML · section map · download images     │
│  localize pt-BR/es-ES · write content/patches/{id}              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  GitHub Action                                                  │
│  cron ~3 dias + workflow_dispatch(url|newsId) → PR draft        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                     review humana
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  App React (visual inalterado)                                  │
│  index.json → sidebar                                           │
│  DynamicPatchRenderer → abas/cards/listas/tabelas/figuras       │
└─────────────────────────────────────────────────────────────────┘
```

### 6.1 Componentes de software

| Componente | Caminho proposto | Responsabilidade |
|------------|------------------|------------------|
| Schema types | `src/types/patchContent.ts` | Tipos dos blocos + meta |
| Loader | `src/data/loadPatches.ts` | Lê índice + patches (import ou fetch build-time) |
| Renderer | `src/features/patchNotes/DynamicPatchRenderer.tsx` | Renderiza blocos com UI atual |
| Block primitives | `src/features/patchNotes/blocks/*` | `BulletList`, `FiguraPatch`, `DevNote`, `DataTable` (extraídos do B131) |
| Ingestor | `scripts/ingest-official-update.ts` | Pipeline API → content |
| HTML parser | `scripts/lib/parse-official-html.ts` | HTML → AST → blocos |
| Section mapper | `scripts/lib/map-sections.ts` | Headings → tabs |
| Localizer | `scripts/lib/localize-content.ts` | EN → pt/es + glossário |
| Seen store | `content/sources/seen-news-ids.json` | Dedup |
| Workflow detect | `.github/workflows/detect-official-updates.yml` | Cron |
| Workflow manual | `.github/workflows/ingest-update.yml` | `workflow_dispatch` |

### 6.2 Integração com `App.tsx`

- Remover (gradualmente) `registroComponentes` hard-coded para patches novos.
- Sidebar: `ordemPatches` vem de `content/patches/index.json`.
- Abas: definidas em `meta.tabs` + labels no JSON do idioma.
- Patches legados (B130/B131) podem permanecer nos componentes atuais até migração, **ou** ser convertidos uma vez para o schema (preferível para um único caminho de render).

### 6.3 Comandos npm

```json
{
  "scripts": {
    "ingest:update": "tsx scripts/ingest-official-update.ts",
    "ingest:detect": "tsx scripts/detect-new-updates.ts",
    "content:validate": "tsx scripts/validate-content.ts"
  }
}
```

Exemplos:

```bash
npm run ingest:update -- --news-id 1008
npm run ingest:update -- --url https://tera-console.com/news/1008
npm run ingest:detect
npm run content:validate
```

---

## 7. Plano de execução por etapas

> Gate do projeto (`workflow.md`): cada etapa de código só após aprovação explícita. Este documento **é** o plano; a implementação começa quando o maintainer aprovar.

### Etapa 0 - Alinhamento documental (esta entrega)

- [x] Mapear API oficial e categorias UPDATE/NOTICE
- [x] Consolidar estratégia e schema
- [ ] Aprovação do maintainer para iniciar Etapa 1

### Etapa 1 - Fundação de blocos e renderer (sem mudar visual)

**Objetivo:** provar que o B131 (ou um subset) renderiza igual via schema.

| # | Tarefa | Arquivos |
|---|--------|----------|
| 1.1 | Definir tipos com **`schemaVersion`**, `Block`, `PatchMeta`, `PatchLocaleContent`, `ParseReport` | `src/types/patchContent.ts` |
| 1.2 | Extrair primitivos visuais de `B131Tabs.tsx` | `src/features/patchNotes/blocks/*` |
| 1.3 | Implementar `DynamicPatchRenderer` (recusar schema major desconhecida) | `src/features/patchNotes/DynamicPatchRenderer.tsx` |
| 1.4 | Converter **um** patch de referência com `schemaVersion: 1` | `content/patches/...` |
| 1.5 | Wire no `App` para esse patch via renderer | `App.tsx` |
| 1.6 | `npm run build` + `npm run lint` + checklist visual | - |

**Critério de aceite:** side-by-side, diff visual irrelevante; build verde.

### Etapa 2 - Índice dinâmico de patches

| # | Tarefa |
|---|--------|
| 2.1 | `content/patches/index.json` como fonte da sidebar |
| 2.2 | Remover `PatchId` union rígida (ou gerar tipo a partir do índice) |
| 2.3 | `siteContent` shell permanece; metadados de patch saem do monólito progressivamente |
| 2.4 | Manter B130 legado funcionando durante a transição |

**Critério de aceite:** adicionar pasta + entrada no índice = patch aparece na UI sem editar `App.tsx`.

### Etapa 3 - Ingestor CLI (caminho feliz com update real)

| # | Tarefa |
|---|--------|
| 3.1 | Client HTTP da API (`news` list/detail) |
| 3.2 | Filtro `update` + parser HTML → blocos |
| 3.3 | Implementar leitor de **`content/section-map.json`** (sem hardcode de headings) |
| 3.4 | Política **`parse.quality`** (`ok` / `partial` / `fallback` / `failed`) + `meta.parse` |
| 3.5 | Download/otimização de imagens (falha de img = warning, não abort) |
| 3.6 | Escrita de `meta` + locales com **`schemaVersion: 1`** |
| 3.7 | Localização pt-BR/es-ES + glossário |
| 3.8 | Validação de schema (`content:validate`) - falha ⇒ `failed` |
| 3.9 | Teste com **B133** (`1008`) e **B133.02** (`1018`); gravar fixtures HTML |

**Critério de aceite:** um comando gera pasta completa; build renderiza draft; sem editar TSX; run com HTML “quebrado” artificial produz `fallback` ou `failed` **visível**, nunca silent drop.

### Etapa 4 - GitHub Actions

| # | Workflow | Gatilho | Resultado |
|---|----------|---------|-----------|
| 4.1 | `detect-official-updates.yml` | **Cron a cada ~3 dias** (`0 12 */3 * *` UTC, ~5×/quinzena) + dispatch | Se houver `update` novo ≠ `seen-news-ids`, ingesta e abre **PR draft** |
| 4.2 | `ingest-update.yml` | `workflow_dispatch` com newsId/URL | PR draft sob demanda |
| 4.3 | Proteções | - | Branches `content/auto-update` / `content/ingest-manual`; labels; **sem auto-merge** |

**Secrets:** nenhum na v1 (sem tradução paga no CI).  
**Setup manual (uma vez):** permissões write do Actions - ver `.metadocs/github_actions_conteudo.md`.

**Critério de aceite:** Action manual com id/URL abre PR draft; cron espaçado não duplica ids em `seen-news-ids`.

### Etapa 5 - Migração do legado e limpeza

| # | Tarefa |
|---|--------|
| 5.1 | Migrar B131 e B130 para schema (ou manter adapters finos) |
| 5.2 | Remover `B131Tabs`/`B130Tabs` quando 100% cobertos |
| 5.3 | Atualizar `roadmap.md` / `historico.md` |
| 5.4 | README mínimo: como rodar `ingest:update` |

### Etapa 6 - Eventos ativos (v1.1)

| # | Tarefa |
|---|--------|
| 6.1 | Ingestor `/event/top` + `/event/{id}` |
| 6.2 | Regra `active` por `startDate`/`endDate` |
| 6.3 | UI “Eventos ativos” reutilizando blocos (sem redesign) |
| 6.4 | Cron pode revalidar eventos vigentes (expirar automaticamente) |

### Etapa 7 - Hardening (opcional)

- Testes unitários do parser HTML e do section-map
- Snapshot de um update oficial fixture
- Rate limit / retry na API
- Cache de imagens por hash
- Skill de agente `.agents/skills/` espelhando o CLI (`ingest-patch`)

---

## 8. Fluxo operacional do maintainer (pós-automação)

### Dia a dia (modo automático)

1. Cron detecta update novo.
2. PR draft aparece no GitHub.
3. Maintainer abre o preview (Vercel preview se disponível, ou checkout local).
4. Ajusta 2-3 termos no JSON se necessário.
5. Merge → deploy.

### Modo sob demanda

```bash
npm run ingest:update -- --news-id 1018
# revisa content/patches/b133.02
# commit / PR
```

### O que o maintainer **não** faz mais

- Criar `B13xTabs.tsx`
- Copiar HTML na mão para TypeScript
- Atualizar union `PatchId` manualmente
- Traduzir do zero as 3 línguas

---

## 9. Riscos e mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| HTML oficial muda layout | Parser quebra | §5.6: `fallback`/`failed`; fixtures; testes |
| API rate limit / indisponível | Cron falha | Retry; issue automática; CLI manual |
| Seção mal classificada | UX confusa | `section-map.json` + `unmappedHeadings` no PR |
| Schema antigo vs app novo | Build/runtime inconsistente | `schemaVersion` obrigatório + validate no CI |
| Tradução ruim de itens | Confusão em jogo | Glossário; não traduzir nomes próprios |
| Imagens grandes | Bundle pesado | Download + compressão webp; lazy load (já usado) |
| Direitos de uso de imagem/texto | Legal | Conteúdo de curadoria com atribuição implícita de fonte oficial no `meta.source`; não se apresentar como site oficial |
| Duplicar patch | Ruído | `seen-news-ids` + match por `officialNewsId` |
| NOTICE com info útil | Conteúdo perdido | Override manual por `newsId`; não auto-import |

---

## 10. Fora de escopo (explícito)

- Redesign visual do portal
- Busca/filtro full-text (backlog antigo; independente)
- Mobile polish (backlog antigo; independente)
- Auto-merge na `main`
- Importar **NOTICE** em massa
- App mobile / backend próprio
- Sincronizar histórico completo de 589 news (só **novos** + catch-up seletivo B132/B133)

---

## 11. Catch-up recomendado (conteúdo em atraso)

Ordem após Etapa 3 (ingestor) pronta - IDs **reais** da seção 0:

| Ordem | Prioridade | Item | `newsId` | URL |
|-------|------------|------|----------|-----|
| 1 | P0 | B133 Update - July 15 | `1008` | https://tera-console.com/news/1008 |
| 2 | P0 | B133.02 Update - July 23 | `1018` | https://tera-console.com/news/1018 |
| 3 | P1 | B132.01 (Updated) - May 21 | `991` | https://tera-console.com/news/991 |
| 4 | P1 | B132.03 - June 18 | `1001` | https://tera-console.com/news/1001 |
| 5 | P2 | Evento Last Stand / Leaderboard | event `1016` | após Etapa 6 |

Não reimportar B130/B131 se o conteúdo do portal já estiver correto - só **migrar para o schema** (Etapa 5).

**Heurística extra:** ocasionalmente a API marca item como `update` com título de manutenção. O ingestor deve exigir sinal de patch no título (`B\d+`, `Update`, `Patch Notes`, `Build Update`) ou revisão no PR.

---

## 12. Critérios de pronto (Definition of Done)

A automação está **pronta para o maintainer “sumir” da engenharia de patch** quando:

1. [ ] Qualquer `update` oficial vira pasta em `content/patches/` sem novo TSX.
2. [ ] Sidebar e abas leem só índice + meta.
3. [ ] Visual permanece o do portal (checklist em desktop + mobile básico).
4. [ ] `pt-BR` e `es-ES` saem do pipeline com glossário aplicado.
5. [ ] Cron ou dispatch abre PR draft sem intervenção local obrigatória.
6. [ ] `npm run build` e `npm run lint` passam no PR.
7. [ ] Documentação em `.metadocs/` e README refletem o fluxo.
8. [ ] B133 (ou mais recente) publicado no portal via este fluxo.

---

## 13. Decisões registradas

| Data | Decisão |
|------|---------|
| 2026-07-23 | Fonte primária = **API** `api.tera-console.com`, não scrape da SPA |
| 2026-07-23 | Interesse automático = **`update` + eventos ativos**; **NOTICE** fora do auto |
| 2026-07-23 | Arquitetura = **data-driven + DynamicPatchRenderer**; sem `BxxxTabs` novos |
| 2026-07-23 | Publicação = **PR draft + review humana**; sem auto-merge na v1 |
| 2026-07-23 | Estratégia operacional = **híbrida** (cron + CLI/dispatch) |
| 2026-07-23 | Idiomas portal = `en-US` (base oficial EN), `pt-BR` e `es-ES` localizados |
| 2026-07-23 | Eventos ativos = **fase 1.1**, mesmo schema de blocos |
| 2026-07-23 | **`schemaVersion` explícito** (inicia em `1`) em meta, locales e index |
| 2026-07-23 | Mapeamento de seções **somente** via `content/section-map.json` |
| 2026-07-23 | Falhas de parse: estados `ok` / `partial` / `fallback` / `failed` (§5.6) |

### Parâmetros ainda configuráveis na implementação (não bloqueiam o plano)

- Provedor exato de tradução (LLM secret vs DeepL vs passo agent-only)
- Armazenar assets em `public/patches/...` vs `src/assets/...`
- Importar JSON no Vite via `import.meta.glob` vs gerar `.ts` no prebuild

---

## 14. Ordem de aprovação pedida ao maintainer

Para iniciar código, confirmar:

1. **Aprova este plano (estratégia híbrida + renderer data-driven + PR gate)?**
2. **Catch-up inicial:** focar em B133 / B133.02 após o renderer?
3. **Eventos ativos:** na v1 junto com updates, ou estritamente v1.1?

---

## 15. Referências internas

| Documento | Papel |
|-----------|--------|
| **Este arquivo** | Único plano de automação de conteúdo |
| `.metadocs/roadmap.md` | Progresso geral do produto (atualizar após entrega) |
| `.metadocs/historico.md` | Registro pós-entrega |
| `.agents/rules/workflow.md` | Analisar → discutir → aprovar → implementar |
| `.agents/skills/traduza/` | Reuso conceitual na localização |
| `.agents/skills/patch-note-whatsapp/` | Anúncio **do site** após publicar (não gera conteúdo do jogo) |

---

## 16. Apêndice técnico - exemplos de chamada

```http
GET https://api.tera-console.com/news?page=1&size=30&languageType=EN
GET https://api.tera-console.com/news/1018?languageType=EN
GET https://api.tera-console.com/news/1008?languageType=EN
GET https://api.tera-console.com/news/top?languageType=EN
GET https://api.tera-console.com/event/top?languageType=EN
GET https://api.tera-console.com/event/1016?languageType=EN
```

Filtro client-side obrigatório:

```ts
itens.filter((item) => item.categoryLabel?.key === 'update')
```

Extração de `newsId` a partir da URL pública:

```text
https://tera-console.com/news/1018  →  newsId = 1018
https://tera-console.com/news/1008  →  newsId = 1008
```

---

**Fim do plano de implementação v1.2.**  
Documento único em `.metadocs/implementacao_automacao_patches.md`.  
v1.2: `schemaVersion`, `section-map.json` normativo, política de falhas de parse (§5.0 / §5.4 / §5.6).  
Próximo passo: aprovação do maintainer → execução da **Etapa 1** (blocos + `DynamicPatchRenderer` + patch de referência).
