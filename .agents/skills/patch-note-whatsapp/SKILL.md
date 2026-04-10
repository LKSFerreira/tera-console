---
name: patch-note-whatsapp
description: Cria mensagens de patch note para grupos de WhatsApp sobre atualizações no site do usuário, com tom não técnico, linguagem natural e estrutura pronta para envio. Use quando o usuário pedir para anunciar update, patch note, novidade ou changelog do próprio site em formato de mensagem para WhatsApp, Telegram ou comunidade. Antes de escrever, perguntar em qual idioma a mensagem deve ser enviada se isso não estiver explícito.
---

# Propósito

Use esta skill para transformar commits, diffs, changelogs ou resumos de atualização em uma mensagem curta de comunidade, com tom leve, claro e não técnico.

# Pré-requisitos

- Confirmar que a atualização é do site, projeto ou produto do usuário.
- Identificar o conteúdo base da atualização em commit, diff, patch note ou descrição fornecida.
- Confirmar o idioma desejado antes de redigir quando isso não estiver explícito no pedido.

# Instruções de Execução

1. **Entender o escopo**
   - Verificar se a mensagem fala sobre o site do usuário e não sobre produto oficial de terceiros.
   - Se houver risco de ambiguidade, deixar isso explícito no texto final.

2. **Definir o idioma**
   - Perguntar de forma objetiva em qual idioma a mensagem deve ser enviada quando o idioma não estiver definido.
   - Se o usuário já tiver indicado o idioma no pedido ou no contexto imediato, não perguntar novamente.

3. **Ler a base da atualização**
   - Usar o último commit, diff recente ou resumo enviado pelo usuário.
   - Extrair somente mudanças percebidas por quem usa o site.
   - Converter itens técnicos em benefícios ou ações visíveis.

4. **Montar a mensagem**
   - Manter abertura calorosa e curta, adequada para grupo.
   - Explicar a atualização em linguagem natural, sem jargão técnico.
   - Incluir a seção `Resumo do patch:` quando fizer sentido para o formato pedido.
   - Transformar bullets técnicos em ações percebidas, como `Agora dá para...`, `Ficou mais fácil...`, `As patch notes estão...`.

5. **Variar a redação**
   - Nunca reciclar o mesmo parágrafo completo entre pedidos diferentes.
   - Variar verbos, conectores, ritmo e ordem das frases.
   - Preservar apenas âncoras fixas autorizadas pelo usuário, quando ele pedir explicitamente.

6. **Entregar pronta para envio**
   - Retornar a mensagem final limpa, sem explicação adicional, quando o usuário pedir texto pronto.
   - Se útil, oferecer versões alternativas com níveis diferentes de energia, mas sem duplicar a mesma formulação.

# Regras e Restrições

- **SEMPRE:** tratar a atualização como sendo do site, projeto ou conteúdo do usuário, salvo instrução contrária.
- **SEMPRE:** perguntar o idioma antes de escrever quando essa informação não estiver explícita.
- **SEMPRE:** usar tom não técnico, natural e apropriado para grupo de WhatsApp.
- **SEMPRE:** converter mudanças técnicas em impacto percebido por quem usa.
- **SEMPRE:** variar a redação entre execuções para evitar mensagem com cara de template copiado.
- **NUNCA:** dar a entender que saiu patch oficial do jogo, publisher ou produto de terceiro sem confirmação explícita.
- **NUNCA:** listar nomes de arquivos, hooks, componentes, commits ou termos internos do código na mensagem final.
- **NUNCA:** repetir mecanicamente estruturas como `Agora... Agora... Agora...` em sequência, a menos que o usuário peça esse estilo.

# Âncoras Fixas Permitidas

Estas aberturas ou rótulos podem ser mantidos quando o usuário quiser preservar o formato:

- `Pessoal, saiu patch novo no site do TERA ✨`
- `Resumo do patch:`

Todo o restante deve ser reescrito de forma dinâmica a cada solicitação, respeitando o conteúdo real da atualização.
