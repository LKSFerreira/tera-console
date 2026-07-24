/**
 * Tradução MT — Strategy Pattern + cadeia de fallback.
 *
 * Novo provedor:
 * 1. Criar `provedores/<nome>.ts` implementando EstrategiaTraducao
 * 2. Registrar em `registro.ts` (FABRICAS + ORDEM_PADRAO_CADEIA)
 *
 * Env:
 * - LOCALIZE_PROVIDER=gemini|openrouter|groq|...  (força um só)
 * - LOCALIZE_CHAIN=gemini,openrouter,groq         (ordem custom)
 * - Chaves por provider (GEMINI_API_KEY, OPENROUTER_API_KEY, GROQ_API_KEY, ...)
 */
export type { EstrategiaTraducao } from './estrategia.ts';
export { CadeiaTraducao } from './cadeia.ts';
export {
  criarCadeiaTraducao,
  criarEstrategia,
  detectarProvedorTraducao,
  ORDEM_PADRAO_CADEIA,
} from './registro.ts';
export { modeloOpenRouterPadrao } from './provedores/openrouter.ts';
export { modeloGroqPadrao } from './provedores/groq.ts';
export type {
  IdProvedorTraducao,
  LocaleAlvo,
  OpcoesCadeiaTraducao,
  ResultadoTraducaoTexto,
} from './tipos.ts';
