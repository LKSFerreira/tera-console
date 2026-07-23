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

  // aliases comuns
  if (!process.env.GEMINI_API_KEY?.trim() && process.env.GEMINI?.trim()) {
    process.env.GEMINI_API_KEY = process.env.GEMINI;
  }
  if (!process.env.GEMINI?.trim() && process.env.GEMINI_API_KEY?.trim()) {
    process.env.GEMINI = process.env.GEMINI_API_KEY;
  }
}

export function obterChaveGemini(): string | undefined {
  const chave = process.env.GEMINI_API_KEY?.trim() || process.env.GEMINI?.trim();
  return chave || undefined;
}
