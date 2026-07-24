# Política de qualidade de conteúdo - TERA Console Portal

> **Objetivo do produto:** curadoria no padrão **B131** (estrutura, PT, cards, imagens com legenda).  
> Automação prepara conteúdo e abre **PR**; o freio de qualidade é **review no Preview + merge em `main`**, nunca publicação cega.

## Regras absolutas

1. **Portal de produção** (`main`) só mostra patches com qualidade editorial aceitável.
2. **Data-driven publicado** exige:
 - `meta.status === "published"`
 - id em `src/content/patches/index.json` → `order` **e** `dataDrivenIds`
3. **Ingest automático / parser da API** não pusha direto em `main`.
4. **Nunca** mergear rascunho bruto (texto grudado, EN só, dump de imagem) como conteúdo final.
5. Legado **B131.01** em TSX permanece como **referência de ouro** visual e editorial.
6. **Gate humano** = corpo do **PR** (markdown, links, checkboxes) + HTTPS de Preview — **não** GitHub Issue de radar.
7. **Modelo de homologação (decisão 2026-07-23): Opção A — PR por update.**  
   Um UPDATE oficial → uma branch → um PR para `main` → um Preview Vercel.  
   **Não** usar branch `homolog` fixa sobrescrita com vários patches misturados.

## O que cada peça faz

| Peça | Papel | Publica em produção? |
|------|--------|----------------------|
| Workflow **Detect official updates** | **Desativado** (modelo Issue preservado no repo) | **Não** |
| Workflow **Experimental raw ingest** | Lab / referência bruta | **Não** (PR WIP) |
| CLI `ingest:update` | Lab local; grava draft | **Não** (sem curadoria) |
| PR de conteúdo + Preview Vercel | Homologação / QA | **Não** até merge |
| Review + merge em `main` | Freio editorial B131 | **Sim** |
| `DynamicPatchRenderer` | Render de conteúdo **já aprovado** | Sim, se published |

## Fluxo correto de um update novo (Opção A)

```text
1. Detect / ingest de UM newsId (ex. 1018)
2. Branch content/<patchId>-<newsId> (ex. content/b133.02-1018)
3. PR unico para main: checklist + link oficial + Preview Vercel
4. QA no Preview (traducao, visual, identidade, formatacao)
5. Ajustes no mesmo PR se preciso
6. Merge → producao (so aquele update)
```

Se chegarem 4 updates de uma vez: **4 PRs**, nao um monstro. Pode mergear o hotfix pequeno e segurar o major.

## O que não fazer

- Mergear PR de ingest bruto “porque build passou”
- Publicar direto em `main` sem Preview/review
- Confundir “schema válido” com “conteúdo bom”
- Reativar Issue de radar neste portal sem necessidade (modelo fica no repo para outros usos)

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

1. **`GEMINI_API_KEY` no `.env`** → Gemini (default **`gemini-3.6-flash`**)  
   - Se **qualquer** chamada Gemini falhar e existir **`OPENROUTER_API_KEY`** → fallback **OpenRouter free**  
   - Modelo free padrão: **`nvidia/nemotron-3-super-120b-a12b:free`** (Nemotron 3 Super; override: `OPENROUTER_MODEL`)  
2. Só `OPENROUTER_API_KEY` (sem Gemini) → OpenRouter como primário  
3. `DEEPL_AUTH_KEY` → DeepL  
4. `OPENAI_API_KEY` / `XAI_API_KEY` → LLM OpenAI-compat  
5. **Sem chave** → `none`: labels pt/es + corpo EN (rápido)  
6. `--translate` → MyMemory (só se pedir)  

- Nome canônico Gemini: **`GEMINI_API_KEY`**.  
- Secrets GitHub: `GEMINI_API_KEY` + `OPENROUTER_API_KEY` (recomendado para não ficar sem MT se a cota Gemini acabar).  
- Arquivo local: `.env` (gitignored). Template: `.env.example`.

Glossário: `src/content/glossary.json` (`doNotTranslate` + `fixedPhrases`).

**Regra:** tradução automática **não** dispensa review no padrão B131 antes de `published`.

### Exemplos

```bash
# Com .env → GEMINI=... (Gemini 3.6 Flash)
npm run ingest:update -- --news-id 1018

npm run content:localize -- --path src/content/sources/raw-drafts/b133.02 --force
```

## Imagens oficiais

- **Padrão:** `figure.src` = URL **https** do CDN do post oficial (sem download).
- Parser e ingest gravam esses links; o `FiguraPatch` renderiza remoto com `object-contain` e fallback se o CDN falhar.
- **Opcional:** `npm run ingest:update -- --news-id X --download-images` para cópia local + `/patches/...`.
- Curadoria B131 pode continuar com webp local **ou** link oficial - o que importar é legenda e encaixe no layout.

## Checklist de publicação (curadoria)

- [ ] Textos em pt-BR naturais (en-US/es-ES coerentes)
- [ ] Tradução automática revisada (não publicar MT cego)
- [ ] Termos de jogo preservados (classes, dungeons, itens)
- [ ] Sem palavras grudadas / paredes de HTML
- [ ] Abas com hierarquia (SectionTitle, cards, listas, tabelas)
- [ ] Imagens com legenda útil (não “Official patch image”)
- [ ] Mesmo dark theme / tipografia / densidade do B131
- [ ] `status: published` + entrada no `index.json`
