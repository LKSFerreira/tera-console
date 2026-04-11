# Walkthrough: Consolidação Estética e Redesign do Hero

Este documento detalha o redesign completo da seção Hero, focado em simplificação, equilíbrio visual e uma identidade de marca mais forte.

## Alterações Realizadas

### 1. Redesign de Cards (Layout Horizontal)
- **Card da Comunidade**:
    - Removidos elementos redundantes (`communityBadge`, `communityCtaLabel`).
    - Título "TERA Community" fixado em linha única com `whitespace-nowrap`.
    - Imagem do card agora possui bordas arredondadas (`rounded-2xl`).
    - Espaçamento interno (gap) otimizado para um visual mais limpo.
- **Card do Mantenedor**:
    - Simplificação radical: o card inteiro agora é um link direto para o GitHub.
    - Removidos ícones sociais avulsos, bio e botão de cópia do Discord para reduzir drasticamente a altura.
    - Preservadas métricas dinâmicas (seguidores e repositórios) em badges compactos.

### 2. Branding e Tipografia
- **Título TERA Console**:
    - Implementação da fonte **Cinzel Decorative** com foco em elegância e legibilidade.
    - Ajuste de escala: equilibrado entre o tamanho original e versões exageradas, fixando em `text-6xl md:text-7xl`.
    - Peso ajustado para `font-bold` (700) para destacar os ornamentos da fonte sem "borrar" o design.
- **Grid do Hero**: Proporções reequilibradas para `1fr 1.1fr 1fr`, garantindo que o título de marca no lado esquerdo não seja comprimido.

### 3. Melhorias de UI/UX
- **Efeito de Hover**: O feedback visual de escala (`scale-[1.02]`) foi movido das imagens internas para os **cards inteiros**, tornando a interatividade mais intuitiva.
- **Seletor de Idioma**: 
    - Criado modo `compacto` no componente `SeletorIdioma`.
    - Movido do Hero para o topo da barra lateral de patches (Sidebar), limpando a área de cabeçalho e facilitando o acesso durante a leitura de notas.

### 4. Integração Técnica
- **GitHub API**: Adicionada lógica de `fetch` para carregar dados reais do perfil `LKSFerreira`, incluindo métricas de seguidores e repositórios públicos.
- **i18n**: Atualizados arquivos de tradução para incluir novos rótulos de carregamento e métricas do GitHub.

## Como Validar

1. **Visão Geral**: Verifique se os cards do Hero agora são horizontais e não ultrapassam a altura do título principal.
2. **Tipografia**: Confirme se o título "TERA Console" está com a fonte ornamentada e peso equilibrado.
3. **Interação**: Passe o mouse sobre os cards da comunidade/mantenedor e verifique o efeito de escala no card todo.
4. **Navegação**: Clique no card do mantenedor e confirme o redirecionamento para o perfil do GitHub.
5. **Idioma**: Verifique se o seletor compacto na barra lateral funciona corretamente e se as traduções dos badges de métricas estão OK.

## Arquivos Modificados
- `src/App.tsx`: Reestruturação completa do layout e lógica de dados.
- `src/components/ui/SeletorIdioma.tsx`: Adição do modo compacto.
- `src/data/siteContent.ts` & `src/types/idioma.ts`: Strings de internacionalização.
- `index.html`: Carregamento de novas fontes.
