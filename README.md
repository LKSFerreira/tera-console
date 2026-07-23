# TERA Console — Portal de Patch Notes

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
- Legado ouro: **B131.01** ainda em TSX (`B131Tabs`) — referência de qualidade
- B130.x: data-driven já migrados e publicados
- Rascunhos brutos de API: `src/content/sources/raw-drafts/` ou `sources/archive/` — **fora do ar**

## Radar / lab

```bash
# Lista UPDATES oficiais novos
npm run ingest:detect

# Lab: grava rascunho em sources/raw-drafts (NÃO publica)
npm run ingest:update -- --news-id 1018

npm run content:validate
```

### GitHub Actions

- **Detect** (~a cada 3 dias): abre **Issue** de radar  
- **Experimental raw ingest**: só com confirmação `LAB` — PR WIP, não é conteúdo final  

Setup: [`.metadocs/github_actions_conteudo.md`](.metadocs/github_actions_conteudo.md)

## Plano técnico

[`.metadocs/implementacao_automacao_patches.md`](.metadocs/implementacao_automacao_patches.md)
