---
name: traduza
description: Tradução fiel e contextual de conteúdo fornecido no prompt ou em arquivos, preservando formato, placeholders, código, nomes próprios e termos consolidados quando a tradução literal degradar naturalidade ou precisão. Use quando o usuário pedir para traduzir textos, legendas, documentos, strings de interface ou arquivos como `.txt`, `.json`, `.md`, `.yaml` e conteúdos mistos.
---

# Propósito

Traduzir conteúdo com qualidade estável independentemente da forma de entrada. Tratar texto colado no prompt, arquivo bruto ou conteúdo estruturado com o mesmo rigor, preservando contexto, intenção, estrutura e legibilidade sem quebrar sintaxe nem descaracterizar o domínio.

# Pré-requisitos

- Identificar idioma de origem e idioma de destino.
- Detectar se o conteúdo é texto corrido, arquivo estruturado, legenda, documentação, interface, configuração ou mistura de código com texto humano.
- Capturar restrições explícitas do usuário, como tom, público, localidade, glossário e termos proibidos.
- Se o idioma de destino estiver ambíguo, pedir confirmação antes de traduzir.

# Instruções de Execução

1. **Ler o conteúdo inteiro primeiro**
   - Entender tema, público, registro e termos recorrentes antes de traduzir trechos isolados.

2. **Preservar a estrutura original**
   - Manter ordem, quebras relevantes, placeholders, variáveis, tags, links, nomes de arquivos, comandos e demais elementos estruturais intactos.

3. **Traduzir por contexto**
   - Priorizar fluidez, precisão semântica e naturalidade no idioma de destino.
   - Ajustar gênero, número, tempo verbal e ordem da frase quando necessário.

4. **Aplicar equilíbrio terminológico**
   - Preservar no original nomes próprios, marcas, franquias, classes, itens, habilidades, comandos, APIs, tecnologias e jargões consolidados quando a tradução piorar precisão ou reconhecimento.
   - Traduzir quando houver equivalente natural, estável e útil para o público-alvo.

5. **Tratar formatos estruturados com critério**
   - Em `json`, `yaml`, `toml` e similares, preservar chaves, identificadores, enums, tokens e campos técnicos por padrão, traduzindo apenas valores textuais voltados a leitura humana.
   - Em `markdown`, `html`, `xml` e legendas, preservar marcação e atributos técnicos, traduzindo somente o texto humano.
   - Em código e configuração, não traduzir identificadores, contratos externos, comandos, funções, classes, rotas, schemas ou payloads técnicos, salvo pedido explícito de localização.

6. **Revisar antes de entregar**
   - Confirmar que a tradução não quebrou sintaxe, placeholders, serialização, links ou consistência terminológica.

# Regras e Restrições

- **NUNCA** traduzir literalmente palavra por palavra quando isso degradar naturalidade ou precisão.
- **NUNCA** quebrar sintaxe de arquivo, placeholders, interpolação, escapes, tags, variáveis ou estruturas serializadas.
- **NUNCA** traduzir nomes próprios, marcas, franquias, comandos, APIs, identificadores e termos consolidados só para parecer mais traduzido.
- **SEMPRE** preservar o nível técnico e o tom do original.
- **SEMPRE** preferir `pt-BR` quando o usuário pedir tradução para português sem especificar variante.
- **PROIBIDO** resumir, adaptar culturalmente ou reescrever além do necessário para traduzir, salvo pedido explícito.
