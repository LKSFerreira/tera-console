/** Versão major do contrato de conteúdo data-driven. */
export const VERSAO_SCHEMA_PATCH = 1 as const;

export type QualidadeParse = 'ok' | 'partial' | 'fallback' | 'failed';

export type TomCallout = 'default' | 'danger' | 'warning' | 'info' | 'success';

export type TomBordaCard =
  | 'none'
  | 'amber'
  | 'sky'
  | 'red'
  | 'amber-top'
  | 'sky-left'
  | 'amber-left'
  | 'red-soft';

export interface RelatorioParse {
  quality: QualidadeParse;
  warnings: string[];
  unmappedHeadings: string[];
  fallbackTabs: string[];
}

export interface ExibicaoPatchLocalizada {
  name: string;
  date: string;
  parts: string;
}

export interface DefinicaoAbaPatch {
  id: string;
  icon: string;
}

export interface MetadadosPatch {
  schemaVersion: number;
  id: string;
  buildLabel: string;
  kind: 'update' | 'hotfix' | 'event';
  status: 'draft' | 'published';
  source?: {
    officialNewsId?: number;
    officialUrl?: string;
    fetchedAt?: string;
    languageType?: string;
  };
  publishedAt?: string;
  parse?: RelatorioParse;
  display: Record<string, ExibicaoPatchLocalizada>;
  tabs: DefinicaoAbaPatch[];
}

export interface ItemIssue {
  main: string;
  notes?: string[];
}

export type BlocoConteudo =
  | { type: 'sectionTitle'; title: string; icon?: string }
  | { type: 'paragraphs'; items: string[] }
  | { type: 'bulletList'; items: string[] }
  | { type: 'callout'; tone?: TomCallout; text: string }
  | { type: 'keyValueList'; rows: Array<{ label: string; value: string }> }
  | {
      type: 'table';
      columns: string[];
      rows: string[][];
      headerTone?: 'default' | 'amber';
    }
  | { type: 'figure'; src: string; alt: string; caption: string; className?: string }
  | { type: 'devNote'; title: string; paragraphs: string[]; tone?: 'amber' | 'sky' }
  | {
      type: 'card';
      title?: string;
      titleTone?: 'amber' | 'sky' | 'red' | 'slate';
      icon?: string;
      border?: TomBordaCard;
      blocks: BlocoConteudo[];
    }
  | {
      type: 'cardGrid';
      columns?: 1 | 2;
      cards: Array<{ title?: string; titleTone?: 'amber' | 'sky' | 'red' | 'slate'; blocks: BlocoConteudo[] }>;
    }
  | {
      type: 'subsection';
      title: string;
      badge?: string;
      blocks: BlocoConteudo[];
    }
  | {
      type: 'issueList';
      title: string;
      icon?: string;
      items: ItemIssue[];
    };

export interface AbaConteudoLocalizado {
  label: string;
  blocks: BlocoConteudo[];
}

export interface ConteudoPatchLocalizado {
  schemaVersion: number;
  locale: string;
  tabs: Record<string, AbaConteudoLocalizado>;
}

export interface PatchDataDriven {
  meta: MetadadosPatch;
  locales: Record<string, ConteudoPatchLocalizado>;
}

export interface IndicePatches {
  schemaVersion: number;
  order: string[];
  /** Patches publicados no portal (data-driven). */
  dataDrivenIds: string[];
  /** Rascunhos de ingest — não entram na sidebar até curadoria. */
  draftIds?: string[];
}
