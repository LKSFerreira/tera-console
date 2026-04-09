---
name: ambiente_docker
description: Gerencia dependências e a integridade do ambiente Docker Compose do projeto, usando templates da pasta `.agents/templates/.docker/`, comandos consistentes de `docker compose` e scripts utilitários como `dev.sh` e `exec.sh`. Use quando for necessário configurar, corrigir ou manter o ambiente Docker do projeto.
---

# Propósito

Atue como especialista em DevOps. Use esta skill sempre que for necessário configurar o ambiente Docker do zero, ajustar o `compose.yaml`, instalar dependências dentro dos containers ou corrigir problemas operacionais da stack conteinerizada.

# Pré-requisitos

- Identificar a stack via `AGENTS.md` (`LINGUAGEM_PROJETO`).
- Confirmar que o host possui Docker e Docker Compose funcionais.
- Se o ambiente estiver no Windows, usar um shell compatível com `.sh` quando os scripts auxiliares forem executados.

# Instruções de Execução

## 1. Configuração Inicial

1. **Diretório**
   - Criar `.docker/` na raiz do projeto se ainda não existir.

2. **Templates Dockerfiles**
   - Acessar `.agents/templates/.docker/` e listar os subdiretórios disponíveis.
   - Identificar os serviços da stack do projeto, como `node`, `postgres`, `python` ou equivalentes.
   - Para cada serviço identificado, copiar o `Dockerfile.*` do subdiretório correspondente para `.docker/`.
   - Manter exatamente o nome original do template, como `Dockerfile.node` e `Dockerfile.postgres`.
   - Não criar Dockerfiles do zero quando existir template compatível.

3. **Templates compose.yaml**
   - Cada subdiretório de template possui seu próprio `compose.yaml`.
   - Não criar o `compose.yaml` do zero se os templates cobrirem a stack.
   - Mesclar os `compose.yaml` dos serviços utilizados em um único arquivo em `.docker/compose.yaml`.
   - Ajustar apenas nomes dos containers, portas, variáveis específicas do projeto, volumes e caminhos de contexto.
   - Atualizar `dockerfile:` para apontar para `.docker/Dockerfile.<serviço>`.

4. **Variáveis de ambiente**
   - Usar `.agents/templates/.docker/.env.example` como base.
   - Copiar para a raiz como `.env.example` e preencher com os valores do projeto.
   - Criar `.env` local apenas quando o fluxo do projeto realmente exigir variáveis para desenvolvimento.

5. **Scripts utilitários**
   - Se `dev.sh` não existir, criar um wrapper simples para `docker compose -f .docker/compose.yaml up`.
   - Se `exec.sh` não existir, criar um wrapper simples para `docker compose -f .docker/compose.yaml exec`.
   - Se os scripts já existirem, não sobrescrever sem validar compatibilidade com o projeto.

## 2. Manutenção e Dependências

- **Subir ou rebuildar**: usar `bash dev.sh` e adicionar `--build` quando houver mudança de imagem ou Dockerfile.
- **Node.js**: usar `bash exec.sh npm install <pacote>` dentro do container correto.
- **Python**: usar `docker compose -f .docker/compose.yaml exec backend uv pip install --system <pacotes>` quando o serviço `backend` existir.
- **Diagnóstico**: antes de alterar imagens ou compose, revisar containers, portas, volumes e variáveis já existentes para evitar drift.

# Regras e Restrições

- **PROIBIDO** instalar dependências no host.
- **PROIBIDO** usar `docker compose` sem `-f .docker/compose.yaml`.
- **PROIBIDO** assumir que todos os projetos usam os serviços `app` e `backend`; confirmar os nomes reais no `compose.yaml`.
- **PROIBIDO** apagar templates originais em `.agents/templates/`.
- **SEMPRE** remover apenas artefatos temporários criados durante a montagem do ambiente.
