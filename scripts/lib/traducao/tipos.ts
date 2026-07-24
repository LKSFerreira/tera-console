/** Identificadores de estratégias de tradução MT. */
export type IdProvedorTraducao =
  | 'gemini'
  | 'openrouter'
  | 'groq'
  | 'deepl'
  | 'openai'
  | 'xai'
  | 'mymemory'
  | 'none';

export type LocaleAlvo = 'pt-BR' | 'es-ES';

export interface ResultadoTraducaoTexto {
  texto: string;
  /** Estratégia que produziu o texto (pode diferir da pedida se houve fallback). */
  provedorEfetivo: IdProvedorTraducao;
  warning?: string;
}

export interface OpcoesCadeiaTraducao {
  /** Inclui MyMemory no fim da cadeia (só com flag CLI). */
  allowMyMemory?: boolean;
  /**
   * Força uma única estratégia (sem fallback).
   * Se omitido, usa cadeia completa dos provedores disponíveis.
   */
  apenas?: IdProvedorTraducao;
}
