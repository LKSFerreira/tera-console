---
name: sincroniza_contexto
description: Sincroniza contexto, audita o estado real do projeto e identifica a próxima frente de trabalho a partir de documentação, regras e código existente. Use ao iniciar um novo chat ou quando for necessário um check-up objetivo do estado atual do projeto.
---

# Propósito

Atue como tech lead. Antes de qualquer ação profunda em um novo chat, realize uma auditoria objetiva do projeto para alinhar documentação, regras e código real.

# Instruções de Execução

## 1. Leitura de Contexto

Ler e processar os arquivos abaixo para entender regras e progresso:

1. `AGENTS.md`
2. `.agents/rules/workflow.md`
3. `.metadocs/`
4. `README.md` e arquivos de stack como `package.json`, `pyproject.toml` ou equivalentes

## 2. Auditoria de Estado Atual

Comparar `.metadocs/roadmap.md` com os arquivos reais do diretório:

- identificar a última tarefa concluída;
- identificar a próxima pendente;
- verificar inconsistências entre documentação e código.

## 3. Relatório de Prontidão

Responder ao usuário com um resumo curto contendo:

- status do roadmap;
- consistência entre docs e código;
- problemas encontrados;
- próxima frente recomendada.

# Regras e Restrições

- **PROIBIDO** gerar código durante a sincronização inicial, salvo hotfix explicitamente pedido.
- **SEMPRE** priorizar entendimento e alinhamento antes de execução.
