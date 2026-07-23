/**
 * Migra B130.01 e B130.02 do monólito TS para content/patches JSON.
 * Uso: npx tsx scripts/migrate-b130-legacy.ts
 */
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { patchNotesB130PorIdioma } from '../src/data/patchNotesB130.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const raiz = resolve(__dirname, '..');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function b130_02_toBlocks(c: any, locale: string) {
  const r = c.b130_02.rewards;
  const cl = c.b130_02.classes;
  const sy = c.b130_02.system;

  return {
    schemaVersion: 1,
    locale,
    tabs: {
      rewards: {
        label: r.sectionTitle,
        blocks: [
          { type: 'sectionTitle', title: r.sectionTitle, icon: 'award' },
          { type: 'devNote', title: r.devNoteTitle, paragraphs: r.devNoteParagraphs, tone: 'sky' },
          {
            type: 'cardGrid',
            columns: 2,
            cards: [
              {
                title: r.leftCardTitle,
                titleTone: 'amber',
                blocks: r.leftSections.map((section: { title: string; items: string[] }) => ({
                  type: 'subsection',
                  title: section.title,
                  blocks: [{ type: 'bulletList', items: section.items }],
                })),
              },
              {
                title: r.rightCardTitle,
                titleTone: 'amber',
                blocks: r.rightSections.map((section: { title: string; items: string[] }) => ({
                  type: 'subsection',
                  title: section.title,
                  blocks: [{ type: 'bulletList', items: section.items }],
                })),
              },
            ],
          },
        ],
      },
      classes: {
        label: cl.sectionTitle,
        blocks: [
          { type: 'sectionTitle', title: cl.sectionTitle, icon: 'user-cog' },
          {
            type: 'card',
            title: cl.heroTitle,
            titleTone: 'sky',
            border: 'sky-left',
            blocks: [{ type: 'paragraphs', items: cl.heroParagraphs }],
          },
          {
            type: 'cardGrid',
            columns: 2,
            cards: cl.cards.map(
              (card: {
                title: string;
                sections: Array<{ title: string; description?: string; notes?: string[] }>;
              }) => ({
                title: card.title,
                titleTone: 'amber',
                blocks: card.sections.map((sec) => ({
                  type: 'subsection',
                  title: sec.title,
                  blocks: [
                    ...(sec.description ? [{ type: 'paragraphs', items: [sec.description] }] : []),
                    ...(sec.notes?.length ? [{ type: 'bulletList', items: sec.notes }] : []),
                  ],
                })),
              }),
            ),
          },
        ],
      },
      system: {
        label: sy.sectionTitle,
        blocks: [
          { type: 'sectionTitle', title: sy.sectionTitle, icon: 'alert-triangle' },
          {
            type: 'issueList',
            title: sy.sectionTitle,
            icon: 'alert-triangle',
            items: sy.issues.map((main: string) => ({ main })),
          },
        ],
      },
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function b130_01_toBlocks(c: any, locale: string) {
  const bp = c.b130_01.battlePass;
  const d = c.b130_01.dungeons;
  const cr = c.b130_01.crafting;
  const cl = c.b130_01.classes;
  const sy = c.b130_01.system;

  return {
    schemaVersion: 1,
    locale,
    tabs: {
      battlepass: {
        label: bp.sectionTitle,
        blocks: [
          { type: 'sectionTitle', title: bp.sectionTitle, icon: 'award' },
          {
            type: 'cardGrid',
            columns: 2,
            cards: [
              {
                title: bp.leftTitle,
                titleTone: 'amber',
                blocks: [
                  { type: 'paragraphs', items: [bp.leftDescription] },
                  { type: 'callout', tone: 'warning', text: bp.leftBoxTop },
                  { type: 'callout', tone: 'info', text: bp.leftBoxBottom },
                ],
              },
              {
                title: bp.rightTitle,
                titleTone: 'amber',
                blocks: [{ type: 'bulletList', items: bp.rewards }],
              },
            ],
          },
        ],
      },
      dungeons: {
        label: d.sectionTitle,
        blocks: [
          { type: 'sectionTitle', title: d.sectionTitle, icon: 'swords' },
          {
            type: 'card',
            title: d.featured.title,
            titleTone: 'amber',
            border: 'amber-top',
            blocks: [
              {
                type: 'keyValueList',
                rows: [
                  { label: 'Item level', value: d.featured.itemLevel },
                  { label: 'Entry', value: d.featured.entryLimit },
                ],
              },
              {
                type: 'cardGrid',
                columns: 2,
                cards: [
                  {
                    title: d.featured.leftTitle,
                    blocks: d.featured.leftGroups.map((group: { title: string; items: string[] }) => ({
                      type: 'subsection',
                      title: group.title,
                      blocks: [{ type: 'bulletList', items: group.items }],
                    })),
                  },
                  {
                    title: d.featured.rightTitle,
                    blocks: [{ type: 'bulletList', items: d.featured.rightItems }],
                  },
                ],
              },
            ],
          },
          ...d.cards.map(
            (card: {
              title: string;
              levelLine: string;
              locationLine?: string;
              intro?: string;
              items: string[];
            }) => ({
              type: 'card' as const,
              title: card.title,
              titleTone: 'slate' as const,
              blocks: [
                {
                  type: 'paragraphs',
                  items: [card.levelLine, card.locationLine, card.intro].filter(Boolean) as string[],
                },
                { type: 'bulletList', items: card.items },
              ],
            }),
          ),
        ],
      },
      crafting: {
        label: cr.sectionTitle,
        blocks: [
          { type: 'sectionTitle', title: cr.sectionTitle, icon: 'hammer' },
          {
            type: 'card',
            title: cr.heroTitle,
            titleTone: 'sky',
            border: 'sky-left',
            blocks: [{ type: 'paragraphs', items: [cr.heroDescription] }],
          },
          {
            type: 'cardGrid',
            columns: 2,
            cards: cr.bulkCards.map((bulk: { title: string; details: string[] }) => ({
              title: bulk.title,
              blocks: [{ type: 'bulletList', items: bulk.details }],
            })),
          },
          {
            type: 'cardGrid',
            columns: 2,
            cards: [
              {
                title: cr.leftTitle,
                blocks: cr.leftSections.map((section: { title: string; items: string[] }) => ({
                  type: 'subsection',
                  title: section.title,
                  blocks: [{ type: 'bulletList', items: section.items }],
                })),
              },
              {
                title: cr.rightTitle,
                blocks: [{ type: 'bulletList', items: cr.rightItems }],
              },
            ],
          },
        ],
      },
      classes: {
        label: cl.sectionTitle,
        blocks: [
          { type: 'sectionTitle', title: cl.sectionTitle, icon: 'user-cog' },
          {
            type: 'cardGrid',
            columns: 2,
            cards: cl.cards.map(
              (card: {
                title: string;
                sections: Array<{ title: string; description?: string; items?: string[] }>;
              }) => ({
                title: card.title,
                titleTone: 'amber',
                blocks: card.sections.map((sec) => ({
                  type: 'subsection',
                  title: sec.title,
                  blocks: [
                    ...(sec.description ? [{ type: 'paragraphs', items: [sec.description] }] : []),
                    ...(sec.items?.length ? [{ type: 'bulletList', items: sec.items }] : []),
                  ],
                })),
              }),
            ),
          },
        ],
      },
      system: {
        label: sy.sectionTitle,
        blocks: [
          { type: 'sectionTitle', title: sy.sectionTitle, icon: 'settings' },
          {
            type: 'issueList',
            title: sy.sectionTitle,
            icon: 'alert-triangle',
            items: sy.issues.map((main: string) => ({ main })),
          },
        ],
      },
    },
  };
}

const displays = {
  'b130.02': {
    'pt-BR': { name: 'Build Update', date: '12 de Março de 2026', parts: '' },
    'en-US': { name: 'Build Update', date: 'March 12, 2026', parts: '' },
    'es-ES': { name: 'Build Update', date: '12 de marzo de 2026', parts: '' },
  },
  'b130.01': {
    'pt-BR': { name: 'Last Stand Update', date: '26 de Fevereiro de 2026', parts: '' },
    'en-US': { name: 'Last Stand Update', date: 'February 26, 2026', parts: '' },
    'es-ES': { name: 'Last Stand Update', date: '26 de febrero de 2026', parts: '' },
  },
} as const;

function main() {
  for (const patchId of ['b130.02', 'b130.01'] as const) {
    const dir = resolve(raiz, 'src/content/patches', patchId);
    mkdirSync(dir, { recursive: true });

    const tabsOrder =
      patchId === 'b130.02'
        ? [
            { id: 'rewards', icon: 'award' },
            { id: 'classes', icon: 'user-cog' },
            { id: 'system', icon: 'alert-triangle' },
          ]
        : [
            { id: 'battlepass', icon: 'award' },
            { id: 'dungeons', icon: 'swords' },
            { id: 'crafting', icon: 'hammer' },
            { id: 'classes', icon: 'user-cog' },
            { id: 'system', icon: 'settings' },
          ];

    const meta = {
      schemaVersion: 1,
      id: patchId,
      buildLabel: patchId.toUpperCase(),
      kind: 'update',
      status: 'published',
      parse: {
        quality: 'ok',
        warnings: ['Migrado do legado TypeScript (Etapa 5)'],
        unmappedHeadings: [],
        fallbackTabs: [],
      },
      display: displays[patchId],
      tabs: tabsOrder,
    };

    writeFileSync(resolve(dir, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`, 'utf8');

    for (const locale of ['pt-BR', 'en-US', 'es-ES'] as const) {
      const conteudo = patchNotesB130PorIdioma[locale];
      const json = patchId === 'b130.02' ? b130_02_toBlocks(conteudo, locale) : b130_01_toBlocks(conteudo, locale);
      writeFileSync(resolve(dir, `${locale}.json`), `${JSON.stringify(json, null, 2)}\n`, 'utf8');
    }

    console.log(`[migrate] wrote ${patchId}`);
  }

  // Atualiza index.json
  const indexPath = resolve(raiz, 'src/content/patches/index.json');
  const indice = JSON.parse(readFileSync(indexPath, 'utf8')) as {
    schemaVersion: number;
    order: string[];
    dataDrivenIds: string[];
  };

  for (const id of ['b130.02', 'b130.01']) {
    if (!indice.dataDrivenIds.includes(id)) {
      indice.dataDrivenIds.push(id);
    }
  }

  writeFileSync(indexPath, `${JSON.stringify(indice, null, 2)}\n`, 'utf8');
  console.log('[migrate] index.json atualizado');
}

main();
