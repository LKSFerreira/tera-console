# TERA Console - Portal de Patch Notes

Curadoria independente de patch notes do **TERA Console** (React + TypeScript + Vite + Tailwind), com `pt-BR`, `en-US` e `es-ES`.

## Princípio de qualidade

O portal prioriza o **padrão editorial e visual do B131** (cards, hierarquia, textos curados, imagens com legenda).

Automação serve como **radar** (e rascunho de lab), **nunca** como publicação cega.  
Política completa: [`.metadocs/politica_qualidade_conteudo.md`](.metadocs/politica_qualidade_conteudo.md)

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Conteúdo no portal

- Publicado: `src/content/patches/` + `index.json` (`order` / `dataDrivenIds`) e `meta.status: published`
- Legado ouro: **B131.01** ainda em TSX (`B131Tabs`) - referência de qualidade
- B130.x: data-driven já migrados e publicados
- Rascunhos brutos de API: `src/content/sources/raw-drafts/` ou `sources/archive/` - **fora do ar**

## Radar / lab / tradução

```bash
# Lista UPDATES oficiais novos
npm run ingest:detect

# Lab: grava rascunho em sources/raw-drafts (NÃO publica) + tenta pt/es
# Imagens usam URL do CDN oficial por padrão (vida visual sem baixar)
npm run ingest:update -- --news-id 1018
# Opcional: copiar imagens para disco
npm run ingest:update -- --news-id 1018 --download-images

# Relocaliza pasta com en-US.json → pt-BR.json + es-ES.json
npm run content:localize -- --path src/content/sources/raw-drafts/b133.02 --force

npm run content:validate
```

Provedores de tradução (via `.env` na raiz - ver `.env.example`):

| Env | Efeito |
|-----|--------|
| `GEMINI_API_KEY` | **Gemini** (default `gemini-3.6-flash`) |
| `GEMINI_MODEL` | Override (ex.: `gemini-3.1-flash-lite`) |
| `DEEPL_AUTH_KEY` | DeepL |
| `OPENAI_API_KEY` / `XAI_API_KEY` | LLM OpenAI-compat |
| *(nenhum)* | labels pt/es + corpo EN (rápido) |
| `--translate` | MyMemory (só se pedir) |

```bash
# .env com GEMINI_API_KEY=...
npm run ingest:update -- --news-id 1018

npm run content:localize -- --path src/content/sources/raw-drafts/b133.02 --force
```

No GitHub Actions, cadastre o secret com o **mesmo nome**: `GEMINI_API_KEY`.

Glossário: `src/content/glossary.json`.

### GitHub Actions

- **Detect** (~a cada 3 dias): abre **Issue** de radar  
- **Experimental raw ingest**: só com confirmação `LAB` - PR WIP, não é conteúdo final  

Setup: [`.metadocs/github_actions_conteudo.md`](.metadocs/github_actions_conteudo.md)

## Plano técnico

[`.metadocs/implementacao_automacao_patches.md`](.metadocs/implementacao_automacao_patches.md)
