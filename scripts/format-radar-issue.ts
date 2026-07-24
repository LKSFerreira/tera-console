/**
 * Template Markdown de radar (checklist + links oficiais).
 *
 * Historico: usado na GitHub Issue do workflow detect-official-updates.
 * Esse workflow esta DESATIVADO no portal; o mesmo formato serve de base
 * para corpo de PR de merge (homolog → main). Nao apagar - modelo reutilizavel.
 *
 * Uso: PAYLOAD='...' COUNT=2 IDS='1001,991' npx tsx scripts/format-radar-issue.ts > body.md
 */
const payloadBruto = process.env.PAYLOAD ?? '{}';
const count = process.env.COUNT ?? '0';
const ids = process.env.IDS ?? '';
const assignee = (process.env.ISSUE_ASSIGNEE ?? process.env.GITHUB_REPOSITORY_OWNER ?? 'LKSFerreira').replace(
  /^@/,
  '',
);

type Item = {
  id?: number;
  title?: string;
  url?: string;
  patchId?: string;
  statusPortal?: string;
};

type Payload = {
  items?: Item[];
  page1UpdateCount?: number;
  onPortalItems?: Item[];
  portalOrder?: string[];
};

let payload: Payload = {};
try {
  payload = JSON.parse(payloadBruto) as Payload;
} catch {
  payload = {};
}

const items = payload.items ?? [];
const onPortal = payload.onPortalItems ?? [];
const page1Count = payload.page1UpdateCount ?? items.length + onPortal.length;
const portalOrder = payload.portalOrder ?? [];

const secoesPendentes = items
  .map((item, indice) => {
    const titulo = item.title?.trim() || `Update #${item.id ?? '?'}`;
    const url = item.url ?? `https://tera-console.com/news/${item.id ?? ''}`;
    const id = item.id ?? '-';
    const patchId = item.patchId ?? '-';

    return `### ${indice + 1}. ${titulo}

| Campo | Valor |
| ----- | ----- |
| **News ID** | \`${id}\` |
| **Patch ID (portal)** | \`${patchId}\` |
| **Patch note oficial** | [Abrir no tera-console.com](${url}) |
| **Status no portal** | ⏳ **Faltando** - nao esta em \`index.order\` |
`;
  })
  .join('\n---\n\n');

const secoesJaNoPortal =
  onPortal.length === 0
    ? '_Nenhum dos UPDATES recentes da página 1 está coberto pelo portal._'
    : onPortal
        .map((item) => {
          const titulo = item.title?.trim() || `Update #${item.id}`;
          return `- ✅ **${titulo}** → \`${item.patchId ?? '?'}\` (news \`${item.id}\`)`;
        })
        .join('\n');

const checklist = items
  .map((item) => {
    const titulo = item.title?.trim() || `ID ${item.id}`;
    const patchId = item.patchId ? ` → \`${item.patchId}\`` : '';
    return `- [ ] Curar e publicar **${titulo}** (\`${item.id}\`${patchId})`;
  })
  .join('\n');

const corpo = `## Radar de UPDATE oficial

@${assignee} - novos updates oficiais precisam de curadoria no portal.

Comparando a **API oficial** com o que o **portal publica hoje**, faltam **${count}** update(s).

> [!IMPORTANT]
> **Isto nao publica nada no site.**
> O portal so sobe conteudo no padrao **B131** (curadoria humana, visual caprichado).
> Ingest automatico bruto **nao** entra em producao.

> [!NOTE]
> Na pagina 1 da API ha **${page1Count}** UPDATE(s) oficiais.
> Destes, **${onPortal.length}** ja tem correspondencia no portal e **${count}** ainda **nao**.

---

## Metadados desta issue

| Campo | Valor |
| ----- | ----- |
| **Assignee** | @${assignee} |
| **Labels** | \`content\`, \`radar\` |
| **IDs pendentes** | \`${ids}\` |
| **Fonte** | \`api.tera-console.com\` |

---

## Faltando no portal (acao necessaria)

${secoesPendentes || '_Nenhum pendente (portal em dia com a pagina 1)._'}

---

## Ja cobertos pelo portal (referencia)

IDs em \`index.order\` agora: \`${portalOrder.join('`, `') || '(vazio)'}\`

${secoesJaNoPortal}

---

## Checklist do maintainer

${checklist || '- [ ] Nada pendente na pagina 1'}

### Criterio de pronto para o portal

- [ ] Texto legivel (sem paredes de HTML / palavras grudadas)
- [ ] Estrutura no visual B131 (cards, abas, listas, tabelas)
- [ ] \`pt-BR\` natural (e en/es coerentes)
- [ ] Imagens oficiais (CDN) com legenda util
- [ ] \`meta.status: published\` + entrada em \`index.order\`

---

## Atalhos uteis

| Acao | Link / comando |
| ---- | -------------- |
| Lista de news (API EN) | https://api.tera-console.com/news?page=1&size=20&languageType=EN |
| Lab local (rascunho, **nao** publica) | \`npm run ingest:update -- --news-id <ID>\` |
| Politica de qualidade | [.metadocs/politica_qualidade_conteudo.md](https://github.com/LKSFerreira/tera-console/blob/main/.metadocs/politica_qualidade_conteudo.md) |
| Plano de automacao | [.metadocs/implementacao_automacao_patches.md](https://github.com/LKSFerreira/tera-console/blob/main/.metadocs/implementacao_automacao_patches.md) |

---

## IDs pendentes (referencia rapida)

\`${ids}\`

<sub>Gerado por <code>detect-official-updates</code> · compara API vs <code>index.order</code> · cron ~a cada 3 dias · assignee: @${assignee}</sub>
`;

process.stdout.write(corpo);
