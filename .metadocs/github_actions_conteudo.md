# GitHub Actions — radar de conteúdo (sem publicação automática)

## Política

O portal **não** publica patch notes gerados só por parser.  
Padrão de qualidade = **B131** (curadoria). Ver [politica_qualidade_conteudo.md](./politica_qualidade_conteudo.md).

## Workflows

| Arquivo | Gatilho | O que faz | Publica no site? |
|---------|---------|-----------|------------------|
| `detect-official-updates.yml` | Cron `0 12 */3 * *` UTC (~5×/quinzena) + manual | Detecta UPDATES novos → **abre Issue** | **Não** |
| `ingest-update.yml` | Manual + confirmação `LAB` | Rascunho bruto + tradução Gemini (se secret) → PR WIP | **Não** |

## Secrets (repositório)

| Secret | Obrigatório? | Uso |
|--------|----------------|-----|
| **`GEMINI_API_KEY`** | Para MT no lab do Actions | Mesmo valor do `.env` local |
| `GITHUB_TOKEN` | Automático | Issues / PRs do workflow |

**Não** commite `.env`. A chave só existe em:

- Local: `.env` → `GEMINI_API_KEY=...`
- CI: Settings → Secrets and variables → Actions → `GEMINI_API_KEY`

Opcional (Variables, não secret): `GEMINI_MODEL` (default no workflow: `gemini-3.6-flash`).

### Setup da secret (já feito se você criou)

1. Settings → Secrets and variables → Actions  
2. New repository secret  
3. Name: **`GEMINI_API_KEY`**  
4. Value: a chave do Google AI Studio  

## Outras permissões (uma vez)

**Detect (Issue):**

1. Settings → Actions → General  
2. Actions habilitadas  
3. Workflow permissions: permitir criar issues / read-write conforme a UI  

**Experimental ingest:** write + create pull requests (para o PR draft de lab).

Sem auto-merge.

## Uso

1. Cron ou *Run workflow* no **Detect** → Issue “Radar: UPDATE…”  
2. (Opcional) *Experimental raw ingest* com `news_ref` + digite `LAB` → rascunho com Gemini se a secret existir  
3. Curadoria no padrão B131  
4. Só então `published` + `index.json`

## Local

```bash
# .env com GEMINI_API_KEY=...
npm run ingest:detect
npm run ingest:update -- --news-id 1018
```
