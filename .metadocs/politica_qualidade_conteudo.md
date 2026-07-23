# Política de qualidade de conteúdo — TERA Console Portal

> **Objetivo do produto:** curadoria no padrão **B131** (estrutura, PT, cards, imagens com legenda).  
> Automação é **radar e apoio**, nunca substituto de qualidade editorial.

## Regras absolutas

1. **Portal só mostra** patches com qualidade editorial aceitável.
2. **Data-driven publicado** exige:
   - `meta.status === "published"`
   - id em `src/content/patches/index.json` → `order` **e** `dataDrivenIds`
3. **Ingest automático / parser da API** gera no máximo **rascunho** (`draft` / `draftIds` / archive).
4. **Nunca** promover rascunho bruto (texto grudado, EN só, dump de imagem) para `published`.
5. Legado **B131.01** em TSX permanece como **referência de ouro** visual e editorial.

## O que cada peça faz

| Peça | Papel | Publica no site? |
|------|--------|------------------|
| Workflow **Detect official updates** | Issue de radar (~3 dias) | **Não** |
| Workflow **Experimental raw ingest** | Lab / referência bruta | **Não** (PR WIP) |
| CLI `ingest:update` | Lab local; grava draft | **Não** (sem curadoria) |
| Curadoria humana (padrão B131) | Cards, PT, imagens, abas | **Sim** |
| `DynamicPatchRenderer` | Render de conteúdo **já curado** | Sim, se published |

## Fluxo correto de um update novo

```text
1. Radar (Issue Actions ou ingest:detect local)
2. Ler patch oficial
3. Curar no padrão B131 (manual ou agente sob revisão)
4. meta.status = published + index.order
5. Review visual → merge/deploy
```

## O que não fazer

- Mergear PR de ingest bruto “porque build passou”
- Colocar B133 auto na sidebar “para não ficar atrasado”
- Confundir “schema válido” com “conteúdo bom”

## Arquivo de rascunhos ruins

Dumps que falharam o padrão de qualidade (ex. B133 auto) ficam em:

`src/content/sources/archive/`

Não entram no `import.meta.glob` de patches publicados.

## Tradução (pt-BR / es-ES)

| Camada | Como funciona |
|--------|----------------|
| Conteúdo **publicado** (B131, B130) | Já localizado editorialmente |
| Lab / ingest | `localizarConteudoPatch` após o EN |
| CLI | `npm run content:localize -- --path <pasta>` |

### Provedores (ordem)

1. `DEEPL_AUTH_KEY` → DeepL (melhor para volume)
2. `OPENAI_API_KEY` ou `XAI_API_KEY` → modelo de chat
3. **MyMemory** (padrão sem secret) — grátis, cotas e qualidade limitadas

Glossário: `src/content/glossary.json` (`doNotTranslate` + `fixedPhrases`).

**Regra:** tradução automática **não** dispensa review no padrão B131 antes de `published`.

### Exemplos

```bash
# Relocaliza um draft/archive a partir do en-US.json
npm run content:localize -- --path src/content/sources/archive/b133.02 --force

# Ingest já tenta localizar pt/es no raw-draft
npm run ingest:update -- --news-id 1018
```

## Checklist de publicação (curadoria)

- [ ] Textos em pt-BR naturais (en-US/es-ES coerentes)
- [ ] Tradução automática revisada (não publicar MT cego)
- [ ] Termos de jogo preservados (classes, dungeons, itens)
- [ ] Sem palavras grudadas / paredes de HTML
- [ ] Abas com hierarquia (SectionTitle, cards, listas, tabelas)
- [ ] Imagens com legenda útil (não “Official patch image”)
- [ ] Mesmo dark theme / tipografia / densidade do B131
- [ ] `status: published` + entrada no `index.json`
