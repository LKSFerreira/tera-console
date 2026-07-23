import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { carregarEnv } from './lib/load-env.ts';
import {
  carregarGlossario,
  detectarProvedorTraducao,
  traduzirTexto,
} from './lib/localize-content.ts';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
carregarEnv(raiz);

const provedor = detectarProvedorTraducao();
console.log(`[smoke] provedor=${provedor}`);
console.log(`[smoke] model=${process.env.GEMINI_MODEL || 'gemini-3.6-flash'}`);
console.log(`[smoke] chave_configurada=${Boolean(process.env.GEMINI || process.env.GEMINI_API_KEY)}`);

const glossario = carregarGlossario(raiz);
const amostra =
  'Fixed an issue where Priest Divine Charge disappeared when using Energy Stars. RK-9 Kennel HP was increased.';

const pt = await traduzirTexto(amostra, 'pt-BR', glossario, provedor);
console.log('[smoke] pt-BR:', pt.texto);
if (pt.warning) console.log('[smoke] warning:', pt.warning);

const es = await traduzirTexto(amostra, 'es-ES', glossario, provedor);
console.log('[smoke] es-ES:', es.texto);
if (es.warning) console.log('[smoke] warning:', es.warning);
