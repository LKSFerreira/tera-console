# GitHub Actions — radar de conteúdo (sem publicação automática)

## Política

O portal **não** publica patch notes gerados só por parser.  
Padrão de qualidade = **B131** (curadoria). Ver [politica_qualidade_conteudo.md](./politica_qualidade_conteudo.md).

## Workflows

| Arquivo | Gatilho | O que faz | Publica no site? |
|---------|---------|-----------|------------------|
| `detect-official-updates.yml` | Cron `0 12 */3 * *` UTC (~5×/quinzena) + manual | Detecta UPDATES novos → **abre Issue** | **Não** |
| `ingest-update.yml` | Manual + confirmação `LAB` | Rascunho bruto experimental (PR WIP) | **Não** |

## Setup manual (uma vez)

**Detect (Issue):**

1. Settings → Actions → General  
2. Actions habilitadas  
3. Workflow permissions: permitir criar issues (ou read/write conforme UI do GitHub)

**Experimental ingest (opcional):** write + create PRs — só se for usar o lab.

Sem secrets de tradução. Sem auto-merge.

## Uso

1. Cron ou *Run workflow* no **Detect** → chega Issue “Radar: UPDATE…”  
2. Você cura no padrão B131  
3. Só então publica (`published` + `index.json`)

## Local

```bash
npm run ingest:detect
# lab only — grava em sources/raw-drafts, NÃO no portal:
npm run ingest:update -- --news-id 1018
```
