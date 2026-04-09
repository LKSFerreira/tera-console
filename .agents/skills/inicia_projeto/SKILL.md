---
name: inicia_projeto
description: Inicializa e padroniza a base documental de um projeto novo ou recém-criado, identificando a stack, criando arquivos obrigatórios e preenchendo regras mínimas de operação. Use quando o usuário pedir para iniciar, estruturar ou preparar o contexto base do projeto.
---

# Propósito

Atue como arquiteto de software focado em padronização. Use esta skill sempre que o usuário pedir para analisar, inicializar ou configurar as bases de um projeto novo ou recém-criado, garantindo a infraestrutura documental exigida.

# Pré-requisitos

- Verificar se a aplicação está vazia ou já tem arquivos relevantes, para não sobrescrever documentação importante.
- Ler `AGENTS.md`, se já existir, antes de regenerar qualquer arquivo central.

# Instruções de Execução

## 1. Identificação de Stack

Analisar os arquivos na raiz usando ferramentas de listagem e leitura disponíveis no ambiente para determinar a linguagem dominante.

Prioridade de identificação:

1. `package.json` -> `javascript/typescript`
2. `pyproject.toml` ou `requirements.txt` -> `python`
3. `go.mod` -> `go`
4. `Cargo.toml` -> `rust`
5. `composer.json` -> `php`
6. `pom.xml` ou `build.gradle` -> `java`
7. Fallback: analisar as extensões predominantes em `src/`

## 2. Mapeamento e Criação de Estrutura Documental

Verificar a existência dos arquivos primários. Caso não existam, criar com base nos templates desta skill:

- `AGENTS.md`: usar `resources/template_agents.md`.
- `.agents/rules/workflow.md`: usar `resources/template_workflow.md`.
- `.metadocs/roadmap.md`: usar `resources/template_roadmap.md`.
- `README.md`: criar um arquivo enxuto e funcional se ainda não existir.

Se o arquivo já existir, revisar antes de substituir. Não sobrescrever conteúdo maduro sem necessidade.

## 3. Configuração de Regras Específicas

1. **AGENTS.md**
   - Substituir `> LINGUAGEM_PROJETO: <linguagem>` pela linguagem detectada.

2. **Rules locais**
   - Verificar se `.agents/rules/<linguagem>.md` existe.
   - Se não existir, criar o arquivo com melhores práticas de Clean Code, nomenclatura e estrutura de pastas para a linguagem detectada.

## 4. Finalização

Ao concluir as criações e identificar a stack, responder objetivamente ao usuário com:

1. linguagem detectada;
2. arquivos gerados ou ajustados;
3. pendências para o próximo passo, como Docker, CI ou documentação adicional.

# Regras e Restrições

- **PROIBIDO** citar ferramentas que não existam no ambiente atual como requisito rígido de execução.
- **PROIBIDO** sobrescrever `AGENTS.md`, `README.md` ou regras locais sem antes verificar se já contêm contexto válido do projeto.
- **SEMPRE** preferir criar o mínimo necessário para o projeto ficar operável.
- **SEMPRE** manter coerência entre `AGENTS.md`, regras locais e a stack detectada.
