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

/** OpenRouter (fallback free na cadeia Strategy). */
export function obterChaveOpenRouter(): string | undefined {
  const chave = process.env.OPENROUTER_API_KEY?.trim();
  return chave || undefined;
}

/** Groq free-tier (Strategy na cadeia). */
export function obterChaveGroq(): string | undefined {
  return process.env.GROQ_API_KEY?.trim() || undefined;
}

/** Reexport: modelo OpenRouter default (Nemotron 3 Super free). */
export { modeloOpenRouterPadrao } from './traducao/provedores/openrouter.ts';
export { modeloGroqPadrao } from './traducao/provedores/groq.ts';
