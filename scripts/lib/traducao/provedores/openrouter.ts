import type { EstrategiaTraducao } from '../estrategia.ts';
import type { LocaleAlvo } from '../tipos.ts';
import { traduzirViaChatCompletions } from '../util-openai-compativel.ts';

function obterChave(): string | undefined {
  return process.env.OPENROUTER_API_KEY?.trim() || undefined;
}

export function modeloOpenRouterPadrao(): string {
  return process.env.OPENROUTER_MODEL?.trim() || 'nvidia/nemotron-3-super-120b-a12b:free';
}

export class EstrategiaOpenRouter implements EstrategiaTraducao {
  readonly id = 'openrouter' as const;

  descricao(): string {
    return `openrouter (${modeloOpenRouterPadrao()})`;
  }

  disponivel(): boolean {
    return Boolean(obterChave());
  }

  async traduzir(texto: string, locale: LocaleAlvo): Promise<string> {
    const apiKey = obterChave();
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY ausente');
    }

    return traduzirViaChatCompletions(texto, locale, {
      rotuloErro: 'OpenRouter',
      apiKey,
      baseUrl: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
      model: modeloOpenRouterPadrao(),
      headersExtras: {
        'HTTP-Referer':
          process.env.OPENROUTER_SITE_URL || 'https://github.com/LKSFerreira/tera-console',
        'X-Title': process.env.OPENROUTER_APP_NAME || 'tera-console-portal-localize',
      },
    });
  }
}
