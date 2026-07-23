# GitHub Actions — automação de conteúdo

## Workflows

| Arquivo | Gatilho | O que faz |
|---------|---------|-----------|
| `.github/workflows/detect-official-updates.yml` | **Cron a cada ~3 dias** (`0 12 */3 * *` UTC) + manual | Detecta UPDATES novos → ingest → validate → build → **PR draft** |
| `.github/workflows/ingest-update.yml` | Só manual | Ingere 1 `newsId`/URL → PR draft |

Sem secret de tradução. Sem auto-merge. Custo típico: poucos minutos de Actions por run.

## Configuração manual (uma vez no GitHub)

1. Abra o repositório no GitHub.  
2. **Settings → Actions → General**.  
3. Em **Workflow permissions**:
   - marque **Read and write permissions**;
   - marque **Allow GitHub Actions to create and approve pull requests**.  
4. Salve.

Se Actions estiverem desabilitadas no org/repo, habilite em **Actions → Allow all actions**.

**Não é necessário** criar secret de API do TERA nem de LLM na v1.

## Como usar

### Automático
- A cada ~3 dias o cron roda sozinho (~5× por quinzena).  
- Se houver UPDATE novo → PR draft `content/auto-update`.  
- Você revisa e faz merge.

### Manual
1. **Actions → Ingest official update → Run workflow**  
2. Campo: `1018` ou `https://tera-console.com/news/1018`  
3. Aguarda o PR draft.

### Local (opcional)
```bash
npm run ingest:detect
npm run ingest:update -- --news-id 1018
npm run content:validate
```

## Se o PR não for criado

- Confira permissões de write do workflow (acima).  
- Veja o log do job: detect com `count=0` não abre PR (comportamento esperado).  
- Ingest `failed` grava relatório em `src/content/sources/failures/` e pode não gerar diff útil.
