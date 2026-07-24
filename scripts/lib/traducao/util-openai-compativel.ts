import { promptSistemaLocalizacao, promptUsuarioLocalizacao } from './prompt.ts';
import type { LocaleAlvo } from './tipos.ts';

export interface ConfigOpenAiCompativel {
  rotuloErro: string;
  apiKey: string;
  baseUrl: string;
  model: string;
  headersExtras?: Record<string, string>;
}

/** Chat completions OpenAI-compatible (OpenAI, xAI, Groq, OpenRouter, etc.). */
export async function traduzirViaChatCompletions(
  texto: string,
  locale: LocaleAlvo,
  config: ConfigOpenAiCompativel,
): Promise<string> {
  const baseUrl = config.baseUrl.replace(/\/$/, '');
  const resposta = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      ...config.headersExtras,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.2,
      messages: [
        { role: 'system', content: promptSistemaLocalizacao() },
        { role: 'user', content: promptUsuarioLocalizacao(locale, texto) },
      ],
    }),
  });

  if (!resposta.ok) {
    const corpo = await resposta.text();
    throw new Error(`${config.rotuloErro} HTTP ${resposta.status}: ${corpo.slice(0, 400)}`);
  }

  const json = (await resposta.json()) as {
    choices?: Array<{ message?: { content?: string | null } }>;
    error?: { message?: string };
  };

  if (json.error?.message) {
    throw new Error(`${config.rotuloErro}: ${json.error.message}`);
  }

  const textoSaida = json.choices?.[0]?.message?.content?.trim();
  if (!textoSaida) {
    throw new Error(`${config.rotuloErro} retornou resposta vazia`);
  }

  return textoSaida;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}
