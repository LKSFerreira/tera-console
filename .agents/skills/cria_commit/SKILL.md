---
name: cria_commit
description: Aplica os padrões de versionamento do projeto para criar commits atômicos, segmentados e com mensagem padronizada por tipo e emoji textual. Use quando o usuário pedir para criar commit, sugerir mensagem de versionamento ou analisar mudanças para commitar.
---

# Propósito

Use esta skill sempre que for solicitado criar um commit, descrever mudanças para versionamento ou executar `git commit`. O objetivo é preservar dois invariantes:

1. cada commit representa um único grupo lógico de alteração;
2. a mensagem segue o padrão imutável do projeto.

# Pré-requisitos

1. Exigir pedido explícito ou aprovação clara antes de executar qualquer commit.
2. Ler `git status`, `git diff --stat`, `git diff` e, quando necessário, `git diff --cached`.
3. Consultar a tabela de tipos abaixo e usar estritamente o modelo em `resources/commit_template.md`.

# Instruções de Execução

## Workflow Obrigatório

1. **Mapear grupos lógicos**
   - Separar mudanças por objetivo, escopo e impacto.
   - Tratar documentação, código, infraestrutura e automação como grupos independentes quando o objetivo não for o mesmo.

2. **Decidir granularidade**
   - Permitir um único commit somente quando todas as mudanças pertencem claramente ao mesmo objetivo.
   - Se houver mais de um grupo lógico, propor a segmentação e seguir com um commit por grupo.

3. **Definir tipo e emoji**
   - Classificar cada grupo usando a tabela oficial.
   - Nunca usar um tipo genérico para esconder mistura de escopos.

4. **Construir mensagem**
   - Usar estritamente `resources/commit_template.md`.

5. **Stagear somente o grupo atual**
   - Executar `git add -- <arquivos do grupo>`.
   - Validar com `git diff --cached --stat` e, se necessário, `git diff --cached`.

6. **Executar commit**
   - Rodar `git commit -m "SUA MENSAGEM"` somente após confirmar que o índice contém um único grupo lógico.

## Regra de Bloqueio

Parar e alinhar com o usuário antes de commitar quando:

- houver múltiplos grupos lógicos e a divisão não estiver óbvia;
- o usuário pedir uma mensagem, mas não definir se quer commitar um subconjunto ou tudo;
- existir mistura de arquivos staged e unstaged que altere o significado do commit;
- houver indício de mudanças de autoria diferente com agrupamento ambíguo.

## Tabela de Tipos Oficial

- `:tada:` -> `init`
- `:books:` -> `docs`
- `:bug:` -> `fix`
- `:sparkles:` -> `feat`
- `:bricks:` -> `ci`
- `:recycle:` -> `refactor`
- `:zap:` -> `perf`
- `:boom:` -> `breaking`
- `:lipstick:` -> `feat`
- `:test_tube:` -> `test`
- `:bulb:` -> `docs`
- `:card_file_box:` -> `data`
- `:broom:` -> `cleanup`
- `:wastebasket:` -> `remove`

# Regras e Restrições

- **SEMPRE** escrever em `pt-BR`.
- **PROIBIDO** usar `git add .`, `git add -A` ou `git commit -a` sem recorte explícito.
- **PROIBIDO** esconder múltiplas mudanças sob rótulos vagos.
- **SEMPRE** usar emoji textual, como `:bug:`, e não emoji Unicode.
