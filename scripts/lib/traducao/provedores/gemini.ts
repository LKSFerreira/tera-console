import type { EstrategiaTraducao } from '../estrategia.ts';
import { promptSistemaLocalizacao, promptUsuarioLocalizacao } from '../prompt.ts';
import type { LocaleAlvo } from '../tipos.ts';

function obterChave(): string | undefined {
  return process.env.GEMINI_API_KEY?.trim() || process.env.GEMINI?.trim() || undefined;
}

function modelo(): string {
  return (process.env.GEMINI_MODEL || 'gemini-3.6-flash').trim();
}

export class EstrategiaGemini implements EstrategiaTraducao {
  readonly id = 'gemini' as const;

  descricao(): string {
    return `gemini (${modelo()})`;
  }

  disponivel(): boolean {
    return Boolean(obterChave());
  }

  async traduzir(texto: string, locale: LocaleAlvo): Promise<string> {
    const apiKey = obterChave();
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY ausente');
    }

    const model = modelo();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const prompt =
      `${promptSistemaLocalizacao()}\n\n${promptUsuarioLocalizacao(locale, texto)}`;

    const resposta = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2 },
      }),
    });

    if (!resposta.ok) {
      const corpo = await resposta.text();
      throw new Error(`Gemini HTTP ${resposta.status}: ${corpo.slice(0, 400)}`);
    }

    const json = (await resposta.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      error?: { message?: string };
    };

    if (json.error?.message) {
      throw new Error(`Gemini: ${json.error.message}`);
    }

    const textoSaida = json.candidates?.[0]?.content?.parts?.map((parte) => parte.text ?? '').join('').trim();
    if (!textoSaida) {
      throw new Error('Gemini retornou resposta vazia');
    }

    return textoSaida;
  }
}
