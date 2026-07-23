# TERA Console — Portal de Patch Notes

Curadoria independente de patch notes do **TERA Console** (React + TypeScript + Vite + Tailwind), com suporte a `pt-BR`, `en-US` e `es-ES`.

## Desenvolvimento

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Conteúdo data-driven

Patches novos vivem em `src/content/patches/{id}/` (meta + locales + imagens).  
A ordem da sidebar está em `src/content/patches/index.json`.

### Ingestão de UPDATE oficial

```bash
# Ver UPDATES novos na API oficial
npm run ingest:detect

# Ingerir por ID ou URL
npm run ingest:update -- --news-id 1018
npm run ingest:update -- --url https://tera-console.com/news/1008

# Validar schema
npm run content:validate
```

### GitHub Actions

- **Cron ~a cada 3 dias** + dispatch: detecta UPDATES e abre **PR draft**
- Manual: *Actions → Ingest official update*

Setup de permissões (uma vez): [`.metadocs/github_actions_conteudo.md`](.metadocs/github_actions_conteudo.md)

### Plano de automação

Documentação completa: [`.metadocs/implementacao_automacao_patches.md`](.metadocs/implementacao_automacao_patches.md)

## Notas

- Visual do portal é estável; automação só alimenta conteúdo.
- NOTICE (manutenção, loja) **não** entra no auto — só `categoryLabel.key === "update"`.
- Legado ainda em TSX: **B131.01** (migração futura). B130.x e B133.x já são data-driven.
