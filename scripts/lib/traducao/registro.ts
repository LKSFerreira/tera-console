import type { EstrategiaTraducao } from './estrategia.ts';
import { CadeiaTraducao } from './cadeia.ts';
import { EstrategiaDeepL } from './provedores/deepl.ts';
import { EstrategiaGemini } from './provedores/gemini.ts';
import { EstrategiaGroq } from './provedores/groq.ts';
import { EstrategiaMyMemory } from './provedores/mymemory.ts';
import { EstrategiaOpenAI, EstrategiaXai } from './provedores/openai.ts';
import { EstrategiaOpenRouter } from './provedores/openrouter.ts';
import type { IdProvedorTraducao, OpcoesCadeiaTraducao } from './tipos.ts';

/**
 * Ordem padrão da cadeia (escalável: acrescente no array).
 * Override: LOCALIZE_CHAIN=gemini,openrouter,groq
 * Single: LOCALIZE_PROVIDER=groq
 */
export const ORDEM_PADRAO_CADEIA: IdProvedorTraducao[] = [
  'gemini',
  'openrouter',
  'groq',
  'deepl',
  'openai',
  'xai',
];

const FABRICAS: Record<Exclude<IdProvedorTraducao, 'none'>, () => EstrategiaTraducao> = {
  gemini: () => new EstrategiaGemini(),
  openrouter: () => new EstrategiaOpenRouter(),
  groq: () => new EstrategiaGroq(),
  deepl: () => new EstrategiaDeepL(),
  openai: () => new EstrategiaOpenAI(),
  xai: () => new EstrategiaXai(),
  mymemory: () => new EstrategiaMyMemory(),
};

export function criarEstrategia(id: IdProvedorTraducao): EstrategiaTraducao | null {
  if (id === 'none') return null;
  const fabrica = FABRICAS[id];
  return fabrica ? fabrica() : null;
}

function parseOrdemEnv(): IdProvedorTraducao[] | null {
  const bruto = process.env.LOCALIZE_CHAIN?.trim();
  if (!bruto) return null;
  const ids = bruto
    .split(',')
    .map((parte) => parte.trim().toLowerCase())
    .filter(Boolean) as IdProvedorTraducao[];
  return ids.length > 0 ? ids : null;
}

/**
 * Monta a cadeia de strategies.
 * - LOCALIZE_PROVIDER=id → só esse (sem fallback), se não for "cadeia"
 * - LOCALIZE_CHAIN=a,b,c → ordem custom
 * - default → ORDEM_PADRAO + mymemory se allow
 */
export function criarCadeiaTraducao(opcoes?: OpcoesCadeiaTraducao): CadeiaTraducao {
  const forcado = (process.env.LOCALIZE_PROVIDER || '').trim().toLowerCase() as IdProvedorTraducao | 'cadeia' | '';

  if (opcoes?.apenas && opcoes.apenas !== 'none') {
    const unica = criarEstrategia(opcoes.apenas);
    if (!unica) {
      return new CadeiaTraducao([]);
    }
    return new CadeiaTraducao([unica]);
  }

  if (forcado && forcado !== 'cadeia' && forcado !== 'none' && FABRICAS[forcado as Exclude<IdProvedorTraducao, 'none'>]) {
    if (forcado === 'mymemory' && !opcoes?.allowMyMemory) {
      console.warn('[traducao] LOCALIZE_PROVIDER=mymemory sem --translate; MyMemory nao entrara na cadeia.');
    }
    const unica = criarEstrategia(forcado as IdProvedorTraducao);
    return new CadeiaTraducao(unica ? [unica] : []);
  }

  const ordem = parseOrdemEnv() ?? [...ORDEM_PADRAO_CADEIA];
  if (opcoes?.allowMyMemory && !ordem.includes('mymemory')) {
    ordem.push('mymemory');
  }

  const estrategias: EstrategiaTraducao[] = [];
  for (const id of ordem) {
    if (id === 'none') continue;
    if (id === 'mymemory' && !opcoes?.allowMyMemory) continue;
    const estrategia = criarEstrategia(id);
    if (estrategia) {
      estrategias.push(estrategia);
    }
  }

  return new CadeiaTraducao(estrategias);
}

/**
 * Compat: devolve o 1º provedor disponível (para logs / meta antiga).
 * Tradução real usa a cadeia completa via criarCadeiaTraducao.
 */
export function detectarProvedorTraducao(opcoes?: OpcoesCadeiaTraducao): IdProvedorTraducao {
  const forcado = (process.env.LOCALIZE_PROVIDER || '').trim().toLowerCase();
  if (forcado === 'none') return 'none';
  if (forcado && forcado !== 'cadeia' && FABRICAS[forcado as Exclude<IdProvedorTraducao, 'none'>]) {
    return forcado as IdProvedorTraducao;
  }

  const cadeia = criarCadeiaTraducao(opcoes);
  for (const id of cadeia.ids()) {
    const estrategia = criarEstrategia(id);
    if (estrategia?.disponivel()) {
      return estrategia.id;
    }
  }
  if (opcoes?.allowMyMemory) return 'mymemory';
  return 'none';
}
