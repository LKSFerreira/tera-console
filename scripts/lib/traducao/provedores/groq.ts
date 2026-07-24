import type { EstrategiaTraducao } from '../estrategia.ts';
import type { LocaleAlvo } from '../tipos.ts';
import { traduzirViaChatCompletions } from '../util-openai-compativel.ts';

function obterChave(): string | undefined {
  return process.env.GROQ_API_KEY?.trim() || undefined;
}

/** Default: Llama 3.3 70B (melhor qualidade free-tier Groq para localização). */
export function modeloGroqPadrao(): string {
  return process.env.GROQ_MODEL?.trim() || 'llama-3.3-70b-versatile';
}

export class EstrategiaGroq implements EstrategiaTraducao {
  readonly id = 'groq' as const;

  descricao(): string {
    return `groq (${modeloGroqPadrao()})`;
  }

  disponivel(): boolean {
    return Boolean(obterChave());
  }

  async traduzir(texto: string, locale: LocaleAlvo): Promise<string> {
    const apiKey = obterChave();
    if (!apiKey) {
      throw new Error('GROQ_API_KEY ausente');
    }

    return traduzirViaChatCompletions(texto, locale, {
      rotuloErro: 'Groq',
      apiKey,
      baseUrl: process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
      model: modeloGroqPadrao(),
    });
  }
}
