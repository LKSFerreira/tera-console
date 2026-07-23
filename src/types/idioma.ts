export type IdiomaSuportado = 'pt-BR' | 'en-US' | 'es-ES';

export type OrigemIdioma = 'armazenado' | 'navegador' | 'fallback';

/** Identificador de patch (ex.: b131.01). Livre - ordem vem de `content/patches/index.json`. */
export type PatchId = string;

/** Identificador de aba (ex.: bugs, dungeons). Livre no schema data-driven. */
export type AbaPatchId = string;

export interface RotuloAbaPatch {
  id: AbaPatchId;
  label: string;
}

export interface MetadadosPatchLocalizados {
  name: string;
  date: string;
  parts: string;
  tabs: RotuloAbaPatch[];
}

export interface ConteudoSite {
  shell: {
    portalBadge: string;
    maintainedBy: string;
    communityBadge: string;
    communityTitle: string;
    communityDescription: string;
    communityCtaLabel: string;
    communityCtaTitle: string;
    discordTitle: string;
    discordCopiedTitle: string;
    githubLoadingLabel: string;
    githubFallbackBio: string;
    githubFollowersLabel: string;
    githubReposLabel: string;
    updatesTitle: string;
    footerTitle: string;
    footerDescription: string;
    githubTitle: string;
    linkedinTitle: string;
    copyrightLabel: string;
  };
  seletorIdioma: {
    title: string;
    pt: string;
    en: string;
    es: string;
  };
  /** Metadados de patches legados (ainda não migrados para content/patches). */
  patches: Record<string, MetadadosPatchLocalizados>;
}
