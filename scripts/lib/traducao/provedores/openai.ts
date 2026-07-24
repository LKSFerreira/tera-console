import type { EstrategiaTraducao } from '../estrategia.ts';
import type { LocaleAlvo } from '../tipos.ts';
import { traduzirViaChatCompletions } from '../util-openai-compativel.ts';

export class EstrategiaOpenAI implements EstrategiaTraducao {
  readonly id = 'openai' as const;

  descricao(): string {
    const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';
    return `openai (${model})`;
  }

  disponivel(): boolean {
    return Boolean(process.env.OPENAI_API_KEY?.trim());
  }

  async traduzir(texto: string, locale: LocaleAlvo): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY ausente');
    }

    return traduzirViaChatCompletions(texto, locale, {
      rotuloErro: 'OpenAI',
      apiKey,
      baseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
      model: process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
    });
  }
}

export class EstrategiaXai implements EstrategiaTraducao {
  readonly id = 'xai' as const;

  descricao(): string {
    const model = process.env.XAI_MODEL?.trim() || 'grok-4-1-fast-non-reasoning';
    return `xai (${model})`;
  }

  disponivel(): boolean {
    return Boolean(process.env.XAI_API_KEY?.trim());
  }

  async traduzir(texto: string, locale: LocaleAlvo): Promise<string> {
    const apiKey = process.env.XAI_API_KEY?.trim();
    if (!apiKey) {
      throw new Error('XAI_API_KEY ausente');
    }

    return traduzirViaChatCompletions(texto, locale, {
      rotuloErro: 'xAI',
      apiKey,
      baseUrl: process.env.XAI_BASE_URL || 'https://api.x.ai/v1',
      model: process.env.XAI_MODEL?.trim() || 'grok-4-1-fast-non-reasoning',
    });
  }
}
