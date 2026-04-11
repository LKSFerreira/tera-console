export type IdiomaSuportado = 'pt-BR' | 'en-US' | 'es-ES';

export type OrigemIdioma = 'armazenado' | 'navegador' | 'fallback';

export type PatchId = 'b131.01' | 'b130.03' | 'b130.02' | 'b130.01';

export type AbaPatchId =
  | 'battlepass'
  | 'season'
  | 'dungeons'
  | 'gear'
  | 'events'
  | 'crafting'
  | 'system'
  | 'bugs'
  | 'rewards'
  | 'classes';

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
  patches: Record<PatchId, MetadadosPatchLocalizados>;
}
