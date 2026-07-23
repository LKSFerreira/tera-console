/**
 * Gera o corpo Markdown da Issue de radar a partir do payload do detect.
 * Uso: PAYLOAD='...' COUNT=2 IDS='1001,991' npx tsx scripts/format-radar-issue.ts > body.md
 */
const payloadBruto = process.env.PAYLOAD ?? '{}';
const count = process.env.COUNT ?? '0';
const ids = process.env.IDS ?? '';

type Item = { id?: number; title?: string; url?: string };

let items: Item[] = [];
try {
  const parsed = JSON.parse(payloadBruto) as { items?: Item[] };
  items = parsed.items ?? [];
} catch {
  items = [];
}

const secoes = items
  .map((item, indice) => {
    const titulo = item.title?.trim() || `Update #${item.id ?? '?'}`;
    const url = item.url ?? `https://tera-console.com/news/${item.id ?? ''}`;
    const id = item.id ?? '—';

    return `### ${indice + 1}. ${titulo}

| Campo | Valor |
| ----- | ----- |
| **News ID** | \`${id}\` |
| **Patch note oficial** | [Abrir no tera-console.com](${url}) |
| **Status no portal** | ⏳ Pendente de curadoria |
`;
  })
  .join('\n---\n\n');

const checklist = items
  .map((item) => {
    const titulo = item.title?.trim() || `ID ${item.id}`;
    return `- [ ] Curar e publicar **${titulo}** (\`${item.id}\`)`;
  })
  .join('\n');

const corpo = `## 📡 Radar de UPDATE oficial

Olá! O robô de detecção encontrou **${count}** update(s) novo(s) na API oficial do TERA Console.

> [!IMPORTANT]
> **Isto não publica nada no site.**
> O portal só sobe conteúdo no padrão **B131** (curadoria humana, visual caprichado).
> Ingest automático bruto **não** entra em produção.

---

## 📦 Updates detectados

${secoes || '_Nenhum item estruturado no payload._'}

---

## ✅ Checklist do maintainer

${checklist || '- [ ] Revisar payload do detect'}

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

## 🆔 IDs (referência rápida)

\`${ids}\`

<sub>Gerado por <code>detect-official-updates</code> · cron ~a cada 3 dias · fonte: <code>api.tera-console.com</code></sub>
`;

process.stdout.write(corpo);
