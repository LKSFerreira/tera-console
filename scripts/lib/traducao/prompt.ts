import type { LocaleAlvo } from './tipos.ts';

export function idiomaAlvoLlm(locale: LocaleAlvo): string {
  return locale === 'pt-BR' ? 'Portuguese (Brazil)' : 'Spanish';
}

export function promptSistemaLocalizacao(): string {
  return (
    'You are a professional game localization translator for TERA Console patch notes. ' +
    'Translate from English to the target language. Keep placeholders like ⟦0⟧ exactly unchanged. ' +
    'Do not invent or remove numbers/stats. Do not translate game proper names unless already localized. ' +
    'Keep tone clear and natural for players. Return only the translation, no quotes or commentary.'
  );
}

export function promptUsuarioLocalizacao(locale: LocaleAlvo, texto: string): string {
  return `Target language: ${idiomaAlvoLlm(locale)}\n\nText:\n${texto}`;
}
