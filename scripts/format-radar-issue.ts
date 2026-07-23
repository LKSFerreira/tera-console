/**
 * Gera o corpo Markdown da Issue de radar a partir do payload do detect.
 * Uso: PAYLOAD='...' COUNT=2 IDS='1001,991' npx tsx scripts/format-radar-issue.ts > body.md
 */
const payloadBruto = process.env.PAYLOAD ?? '{}';
const count = process.env.COUNT ?? '0';
const ids = process.env.IDS ?? '';

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
    const id = item.id ?? '—';
    const patchId = item.patchId ?? '—';

    return `### ${indice + 1}. ${titulo}

| Campo | Valor |
| ----- | ----- |
| **News ID** | \`${id}\` |
| **Patch ID (portal)** | \`${patchId}\` |
| **Patch note oficial** | [Abrir no tera-console.com](${url}) |
| **Status no portal** | ⏳ **Faltando** — não está em \`index.order\` |
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

const corpo = `## 📡 Radar de UPDATE oficial

Olá! Comparando a **API oficial** com o que o **portal publica hoje**, faltam **${count}** update(s) de curadoria.

> [!IMPORTANT]
> **Isto não publica nada no site.**
> O portal só sobe conteúdo no padrão **B131** (curadoria humana, visual caprichado).
> Ingest automático bruto **não** entra em produção.

> [!NOTE]
> Na página 1 da API há **${page1Count}** UPDATE(s) oficiais.
> Destes, **${onPortal.length}** já têm correspondência no portal e **${count}** ainda **não**.

---

## 📦 Faltando no portal (ação necessária)

${secoesPendentes || '_Nenhum pendente (portal em dia com a página 1)._'}

---

## ✅ Já cobertos pelo portal (referência)

IDs em \`index.order\` agora: \`${portalOrder.join('`, `') || '(vazio)'}\`

${secoesJaNoPortal}

---

## ✅ Checklist do maintainer

${checklist || '- [ ] Nada pendente na página 1'}

### Critério de “pronto para o portal”

- [ ] Texto legível (sem paredes de HTML / palavras grudadas)
- [ ] Estrutura no visual B131 (cards, abas, listas, tabelas)
- [ ] \`pt-BR\` natural (e en/es coerentes)
- [ ] Imagens oficiais (CDN) com legenda útil
- [ ] \`meta.status: published\` + entrada em \`index.order\`

---

## 🔗 Atalhos úteis

| Ação | Link / comando |
| ---- | -------------- |
| Lista de news (API EN) | https://api.tera-console.com/news?page=1&size=20&languageType=EN |
| Lab local (rascunho, **não** publica) | \`npm run ingest:update -- --news-id <ID>\` |
| Política de qualidade | [.metadocs/politica_qualidade_conteudo.md](https://github.com/LKSFerreira/tera-console/blob/main/.metadocs/politica_qualidade_conteudo.md) |
| Plano de automação | [.metadocs/implementacao_automacao_patches.md](https://github.com/LKSFerreira/tera-console/blob/main/.metadocs/implementacao_automacao_patches.md) |

---

## 🆔 IDs pendentes (referência rápida)

\`${ids}\`

<sub>Gerado por <code>detect-official-updates</code> · compara API vs <code>index.order</code> · cron ~a cada 3 dias</sub>
`;

process.stdout.write(corpo);
