# 🗺️ Roadmap — TERA Console Patch Notes

> Documento vivo de planejamento e progresso do projeto.
> Última atualização: 2026-07-23

---

## 📌 Visão Geral do Projeto

**TERA Console** é uma aplicação React (TypeScript) de página única que consolida e apresenta as Patch Notes do jogo TERA Console em uma interface moderna, navegável e organizada por abas.

**Stack:** React + TypeScript + Lucide Icons + Tailwind CSS (classes utilitárias inline)

---

## 🏗️ Fase Atual: Automação de Conteúdo + Qualidade

### ✅ Concluído

- [x] Estrutura base do projeto com `App.tsx` monolítico
- [x] Patch Notes B131.01 (Battle Pass, Dungeons, Gear, Crafting, Eventos, Sistema)
- [x] Patch Notes B130.03 (Bug Fixes)
- [x] Patch Notes B130.02 (Rewards, Classes, Sistema)
- [x] Patch Notes B130.01 (conteúdo base)
- [x] Navegação por sidebar com seleção de Patch e sub-abas
- [x] Design dark theme com Tailwind CSS
- [x] Componentes reutilizáveis (`SectionTitle`, `Card`)
- [x] Infraestrutura de agentes (`.agents/`) configurada
- [x] Modularização do `App.tsx` em componentes separados (extração de dados, componentes de UI, tipos)
- [x] Adição de `package.json` e setup de build (Vite ou similar)
- [x] Tipagem TypeScript rigorosa (interfaces para dados de patch)
- [x] Deploy automatizado preparatório (Vercel/Netlify)
- [x] Renderer data-driven + schema `schemaVersion: 1`
- [x] Índice dinâmico de patches (`index.json`)
- [x] CLI de ingestão API oficial + section-map + validate
- [x] GitHub Actions (cron ~3 dias + ingest manual → PR draft)
- [x] Conteúdo B133 / B133.02 ingerido; B130.x data-driven

### 🔲 Próximos Passos (Backlog)

- [ ] Migrar B131.01 do TSX legado para o schema JSON
- [ ] Tradução automática pt-BR/es-ES no pipeline (hoje labels localizados; corpo EN em ingests novos)
- [ ] Eventos ativos (`/event` API) — fase 1.1 do plano
- [ ] Otimização de imagens oficiais (webp / tamanho)
- [ ] Responsividade mobile refinada
- [ ] Sistema de busca/filtro dentro das patch notes

---

## 📝 Decisões de Arquitetura

| Data | Decisão | Contexto |
|------|---------|----------|
| 2026-04-07 | Monólito em `App.tsx` | Fase inicial de prototipagem rápida |
| 2026-04-07 | Tailwind CSS inline | Sem build system configurado ainda |
| 2026-04-07 | Refatoração Vite + Tailwind v4 | Necessidade de infra sustentável e modularização para deploy via Vercel |

---

## 🐛 Problemas Conhecidos

- Todos os scripts testados localmente. Cobertura de testes e lint explícito (eslint) pendentes de configuração refinada em escopos extras além do `TSC`.
