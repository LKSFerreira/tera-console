import type { EstrategiaTraducao } from '../estrategia.ts';
import type { LocaleAlvo } from '../tipos.ts';

function codigoDeepL(locale: LocaleAlvo): string {
  return locale === 'pt-BR' ? 'PT-BR' : 'ES';
}

export class EstrategiaDeepL implements EstrategiaTraducao {
  readonly id = 'deepl' as const;

  descricao(): string {
    return 'deepl';
  }

  disponivel(): boolean {
    return Boolean(process.env.DEEPL_AUTH_KEY?.trim());
  }

  async traduzir(texto: string, locale: LocaleAlvo): Promise<string> {
    const chave = process.env.DEEPL_AUTH_KEY?.trim();
    if (!chave) {
      throw new Error('DEEPL_AUTH_KEY ausente');
    }

    const free = chave.endsWith(':fx') || process.env.DEEPL_API_URL?.includes('api-free');
    const base = process.env.DEEPL_API_URL ?? (free ? 'https://api-free.deepl.com' : 'https://api.deepl.com');

    const resposta = await fetch(`${base}/v2/translate`, {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${chave}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: texto,
        source_lang: 'EN',
        target_lang: codigoDeepL(locale),
        preserve_formatting: '1',
      }),
    });

    if (!resposta.ok) {
      throw new Error(`DeepL HTTP ${resposta.status}: ${await resposta.text()}`);
    }

    const json = (await resposta.json()) as { translations?: Array<{ text: string }> };
    const saida = json.translations?.[0]?.text;
    if (!saida) {
      throw new Error('DeepL retornou resposta vazia');
    }
    return saida;
  }
}
