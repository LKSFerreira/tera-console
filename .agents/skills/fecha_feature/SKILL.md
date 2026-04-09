---
name: fecha_feature
description: Finaliza uma feature documentalmente, promovendo artefatos de planejamento para `walkthrough`, atualizando histórico e refletindo o estado real da entrega. Use quando o usuário sinalizar que concluiu uma feature ou pedir para fechar a documentação correspondente.
---

# Propósito

Use esta skill sempre que o usuário indicar que terminou o trabalho de uma feature ou quando for necessário consolidar a documentação final de uma entrega já implementada.

# Pré-requisitos

- Confirmar se existe um arquivo de plano em `/.metadocs/feat/<tema>.md`.
- Confirmar que a feature foi validada em código e não possui pendências relevantes em aberto.

# Instruções de Execução

Escolher o fluxo correto baseado na origem da tarefa.

## Fluxo A: Promoção de Feature Planejada

1. Abrir o documento em `/.metadocs/feat/`.
2. Atualizar o texto para o passado, refletindo o que realmente foi entregue.
3. Incluir detalhes concretos de implementação, impacto e validação.
4. Mover o arquivo para `/.metadocs/walkthrough/<nome_curto>.md`.
5. Atualizar `/.metadocs/historico.md` com link relativo.
6. Marcar como concluído no `/.metadocs/roadmap.md` quando o roadmap referenciar essa entrega.

## Fluxo B: Documentação Ad-hoc

1. Criar um novo arquivo diretamente em `/.metadocs/walkthrough/<nome_curto>.md`.
2. Descrever contexto, o que foi feito e como validar.
3. Adicionar a entrada cronológica em `/.metadocs/historico.md`.

# Regras e Restrições

- **SEMPRE** priorizar o Fluxo A quando existir planejamento anterior.
- **PROIBIDO** deixar o mesmo conteúdo duplicado em `feat/` e `walkthrough/`.
- **PROIBIDO** usar links absolutos ou `file:///` em `historico.md`.
- **SEMPRE** usar nome curto em `snake_case` para arquivos de `walkthrough`.
