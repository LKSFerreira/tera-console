---
name: cria_pr
description: Gera o texto de Pull Request com base no template obrigatório do projeto, preservando formatação, links relativos e rigor técnico. Use quando o usuário pedir para criar, formatar ou rascunhar a descrição de um PR.
---

# Propósito

Use esta skill sempre que for solicitado criar, formatar ou rascunhar um texto de Pull Request. Nunca gerar PR genérico sem usar a estrutura obrigatória do projeto.

# Pré-requisitos

- Verificar os commits incluídos ou o diff recente para entender o escopo.
- Levantar impactos técnicos, riscos e comandos reais de validação.

# Instruções de Execução

1. **Reunir contexto**
   - Identificar as áreas do projeto afetadas.
   - Organizar as mudanças por categoria técnica.

2. **Carregar o molde**
   - Utilizar exatamente `resources/pr_template.md`.

3. **Preencher**
   - Substituir todos os placeholders com conteúdo técnico concreto.
   - Ajustar as seções conforme o que realmente foi alterado.

4. **Entregar**
   - Retornar a saída final em bloco de código Markdown.

# Regras de Formatação

1. **Caminhos**
   - Nunca usar `cci:`, `file:///` ou caminhos absolutos do Windows.
   - Ao citar arquivos, usar apenas Markdown relativo, como `[src/App.tsx](src/App.tsx)`.

2. **Links**
   - Não envolver links já formatados com colchetes extras.
   - Não gerar smart links nem referências inválidas.

3. **Texto**
   - Manter o texto em `pt-BR`.
   - Preservar a estética do template e os títulos principais.
   - Não inventar métricas, testes ou validações que não foram executados.
