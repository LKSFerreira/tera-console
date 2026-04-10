# Walkthrough: Internacionalização do Portal em 3 Idiomas

> [!TIP]
> Esta entrega adicionou suporte completo a `pt-BR`, `en-US` e `es-ES` no portal, com escolha inicial baseada no idioma do navegador, persistência da preferência local do usuário e seletor visual discreto no topo da interface.

## Contexto

O site estava limitado a um único idioma visível e exigia leitura manual do conteúdo em português mesmo para usuários com navegador configurado em inglês ou espanhol.

Além disso, a interface não oferecia uma forma clara e imediata de trocar o idioma durante a navegação.

## Alterações Realizadas

### 1. Infraestrutura de idioma
- Foi criada uma camada local de i18n sem dependência externa.
- O projeto passou a trabalhar com os idiomas suportados `pt-BR`, `en-US` e `es-ES`.
- Foi implementado um provider/hook de idioma para centralizar:
  - idioma ativo
  - origem da escolha inicial
  - troca manual em runtime
- A preferência escolhida manualmente passou a ser persistida em `localStorage`.
- O atributo `lang` do documento passou a ser sincronizado com o idioma ativo.

### 2. Regra de idioma padrão
- Na primeira visita, o site passa a detectar o idioma a partir de `navigator.languages` e `navigator.language`.
- O mapeamento adotado foi:
  - qualquer `pt-*` -> `pt-BR`
  - qualquer `en-*` -> `en-US`
  - qualquer `es-*` -> `es-ES`
  - qualquer idioma não suportado -> fallback em `pt-BR`
- Em visitas seguintes, a preferência salva do usuário passa a ter prioridade sobre o idioma informado pelo navegador.

### 3. Localização da interface e do conteúdo
- O shell global do portal foi movido para estruturas localizadas, incluindo:
  - cabeçalho
  - rodapé
  - títulos de patches
  - nomes das abas
  - rótulos de interface
- As tabs de `B130` foram convertidas para consumo de conteúdo por idioma em estruturas de dados centralizadas.
- O `B131` passou a consumir labels localizados para navegação, seções, cabeçalhos de tabela e blocos visíveis principais.
- O trabalho priorizou tirar strings fixas do shell e reduzir o acoplamento entre renderização e idioma ativo.

### 4. Seletor visual de idioma
- Foi adicionado um seletor visível e discreto no card superior do cabeçalho.
- O controle usa bandeiras locais em SVG inline, sem dependências externas e sem uso de emoji.
- A versão final ficou compacta, exibindo apenas as bandeiras para ocupar o mínimo de espaço possível sem alterar o porte visual do card.
- O seletor funciona em runtime, sem reload da página.

## Impacto

- O portal agora respeita o idioma preferido do navegador logo na primeira visita.
- Usuários podem alternar rapidamente entre português, inglês e espanhol sem sair da página.
- O projeto ganhou uma base reutilizável para internacionalizar novos patches sem replicar a lógica de idioma em múltiplos pontos.
- A navegação e o shell do site ficaram mais preparados para crescimento futuro e para consumo por públicos internacionais.

## Validação

As alterações foram validadas localmente com:

1. `npm.cmd run build`
2. `npm.cmd run lint`

Ambos os comandos concluíram sem erros.
