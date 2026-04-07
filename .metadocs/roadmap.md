# 🗺️ Roadmap — TERA Console Patch Notes

> Documento vivo de planejamento e progresso do projeto.
> Última atualização: 2026-04-07

---

## 📌 Visão Geral do Projeto

**TERA Console** é uma aplicação React (TypeScript) de página única que consolida e apresenta as Patch Notes do jogo TERA Console em uma interface moderna, navegável e organizada por abas.

**Stack:** React + TypeScript + Lucide Icons + Tailwind CSS (classes utilitárias inline)

---

## 🏗️ Fase Atual: Consolidação & Qualidade

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

### 🔲 Próximos Passos (Backlog)

- [ ] Modularização do `App.tsx` em componentes separados (extração de dados, componentes de UI, tipos)
- [ ] Adição de `package.json` e setup de build (Vite ou similar)
- [ ] Tipagem TypeScript rigorosa (interfaces para dados de patch)
- [ ] Responsividade mobile refinada
- [ ] Sistema de busca/filtro dentro das patch notes
- [ ] Deploy automatizado (Vercel/Netlify)

---

## 📝 Decisões de Arquitetura

| Data | Decisão | Contexto |
|------|---------|----------|
| 2026-04-07 | Monólito em `App.tsx` | Fase inicial de prototipagem rápida |
| 2026-04-07 | Tailwind CSS inline | Sem build system configurado ainda |

---

## 🐛 Problemas Conhecidos

- Projeto não possui `package.json` — atualmente é um arquivo `.tsx` standalone
- Sem testes automatizados
- Sem linting/formatting configurado
