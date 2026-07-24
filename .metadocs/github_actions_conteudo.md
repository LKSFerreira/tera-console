# GitHub Actions - conteúdo (sem publicação cega em main)

## Política

O portal **não** publica patch notes em produção só porque o parser/build passou.  
Padrão de qualidade = **B131** (curadoria). Gate humano = **PR de merge para `main`** (Preview Vercel + checklist no corpo do PR).

Ver [politica_qualidade_conteudo.md](./politica_qualidade_conteudo.md).

## Workflows

| Arquivo | Estado | O que faz | Publica em produção? |
|---------|--------|-----------|----------------------|
| `detect-official-updates.yml` | **DESATIVADO** (modelo preservado) | Antes: cron → GitHub **Issue** de radar | **Não** |
| `ingest-update.yml` | Lab manual (`LAB`) | Rascunho bruto + Gemini (se secret) → PR WIP | **Não** |

### Por que a Issue de radar foi desligada

O checklist (markdown, links oficiais, checkboxes) migra para o **corpo do PR** de homolog → `main`.  
O workflow e o template (`scripts/format-radar-issue.ts`) **não foram apagados** — servem de modelo para outros projetos ou reativação futura.

Para reativar o radar por Issue: ver comentários no topo de `detect-official-updates.yml` (restaurar cron, remover `if: false`).

## Alvo de produto (esteira) — **Opção A: PR por update**

Decisão 2026-07-23: **não** branch `homolog` fixa. Um update = um PR.

```text
Detect encontra newsId 1018 (e so ele neste job, ou um PR por id)
  → branch content/b133.02-1018
  → PR para main (checklist no body; template baseado em format-radar-issue)
  → Preview Vercel daquele PR
  → QA (traducao, visual, identidade, formatacao)
  → merge → producao

Se faltam 4 updates → 4 PRs independentes
```

## Secrets (repositório)

| Nome | Tipo | Obrigatório? | Uso |
|------|------|----------------|-----|
| **`GEMINI_API_KEY`** | Secret | MT | Strategy Gemini |
| **`OPENROUTER_API_KEY`** | Secret | Recomendado | Strategy OpenRouter free |
| **`GROQ_API_KEY`** | Secret | Opcional | Strategy Groq free-tier |
| `OPENROUTER_MODEL` | Variable (ou Secret) | Não | Default Nemotron 3 Super free |
| `GROQ_MODEL` | Variable (ou Secret) | Não | Default `llama-3.3-70b-versatile` |
| `OPENROUTER_SITE_URL` / `APP_NAME` | Variable | Não | Ranking OpenRouter |
| `GEMINI_MODEL` | Variable | Não | Default `gemini-3.6-flash` |
| `LOCALIZE_CHAIN` | Variable | Não | Ordem custom da cadeia Strategy |
| `GITHUB_TOKEN` | Automático | Sim | PRs do workflow |

Cadeia: **gemini → openrouter → groq → …** com circuit breaker (`scripts/lib/traducao/`).

**Não** commite `.env`.

- Local: `.env` com as mesmas chaves  
- CI: Secrets + Variables → Actions (nomes **exatos** acima)  
- O workflow **só usa** o que estiver no `env:` do YAML **e** o código já estiver em `main` (push)

### Setup da secret

1. Settings → Secrets and variables → Actions  
2. New repository secret  
3. Name: **`GEMINI_API_KEY`**  
4. Value: a chave do Google AI Studio  

## Permissões

**Experimental ingest:** write + create pull requests (PR draft de lab).

Sem auto-merge em `main`.

## Local

```bash
# .env com GEMINI_API_KEY=...
npm run ingest:detect
npm run ingest:update -- --news-id 1018
```
