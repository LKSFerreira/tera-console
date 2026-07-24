/**
 * Carrega .env da raiz do projeto em process.env (sem sobrescrever o que já existe).
 * Nunca loga valores de chaves.
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

let jaCarregou = false;

export function carregarEnv(raizProjeto: string): void {
  if (jaCarregou) return;
  jaCarregou = true;

  const caminho = resolve(raizProjeto, '.env');
  if (!existsSync(caminho)) {
    return;
  }

  const texto = readFileSync(caminho, 'utf8');
  for (const linhaBruta of texto.split(/\r?\n/)) {
    const linha = linhaBruta.trim();
    if (!linha || linha.startsWith('#')) continue;

    const separador = linha.indexOf('=');
    if (separador <= 0) continue;

    const chave = linha.slice(0, separador).trim();
    let valor = linha.slice(separador + 1).trim();
    if (
      (valor.startsWith('"') && valor.endsWith('"')) ||
      (valor.startsWith("'") && valor.endsWith("'"))
    ) {
      valor = valor.slice(1, -1);
    }

    if (process.env[chave] === undefined) {
      process.env[chave] = valor;
    }
  }

  // Compat: GEMINI legado → nome canônico GEMINI_API_KEY
  if (!process.env.GEMINI_API_KEY?.trim() && process.env.GEMINI?.trim()) {
    process.env.GEMINI_API_KEY = process.env.GEMINI.trim();
  }
}

/** Nome canônico: GEMINI_API_KEY. Aceita GEMINI só por compatibilidade. */
export function obterChaveGemini(): string | undefined {
  const chave = process.env.GEMINI_API_KEY?.trim() || process.env.GEMINI?.trim();
  return chave || undefined;
}

/** OpenRouter (fallback free de tradução quando Gemini falha). */
export function obterChaveOpenRouter(): string | undefined {
  const chave = process.env.OPENROUTER_API_KEY?.trim();
  return chave || undefined;
}

/**
 * Modelo free no OpenRouter para localização de patch notes.
 * Default: Nemotron 3 Super (qualidade + throughput; não Ultra por latência).
 */
export function modeloOpenRouterPadrao(): string {
  return (
    process.env.OPENROUTER_MODEL?.trim() || 'nvidia/nemotron-3-super-120b-a12b:free'
  );
}
