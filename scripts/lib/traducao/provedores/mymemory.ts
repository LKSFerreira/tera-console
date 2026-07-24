import type { EstrategiaTraducao } from '../estrategia.ts';
import type { LocaleAlvo } from '../tipos.ts';
import { sleep } from '../util-openai-compativel.ts';

function codigoMyMemory(locale: LocaleAlvo): string {
  return locale === 'pt-BR' ? 'pt' : 'es';
}

export class EstrategiaMyMemory implements EstrategiaTraducao {
  readonly id = 'mymemory' as const;

  descricao(): string {
    return 'mymemory';
  }

  /** Sem chave; só entra na cadeia se allowMyMemory. */
  disponivel(): boolean {
    return true;
  }

  async traduzir(texto: string, locale: LocaleAlvo): Promise<string> {
    await sleep(600);
    const langpair = `en|${codigoMyMemory(locale)}`;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${langpair}`;

    const tentar = async (): Promise<string> => {
      const resposta = await fetch(url, {
        headers: { 'User-Agent': 'tera-console-portal-localize/1.0' },
      });
      if (!resposta.ok) {
        throw new Error(`MyMemory HTTP ${resposta.status}`);
      }
      const json = (await resposta.json()) as {
        responseData?: { translatedText?: string };
        responseStatus?: number;
      };
      if (json.responseStatus && json.responseStatus !== 200) {
        throw new Error(`MyMemory status ${json.responseStatus}`);
      }
      const traduzido = json.responseData?.translatedText?.trim();
      if (!traduzido || /MYMEMORY WARNING/i.test(traduzido)) {
        throw new Error(`MyMemory sem tradução útil: ${traduzido ?? 'vazio'}`);
      }
      return traduzido;
    };

    try {
      return await tentar();
    } catch (erro) {
      const msg = erro instanceof Error ? erro.message : String(erro);
      if (msg.includes('429')) {
        await sleep(2000);
        return await tentar();
      }
      throw erro;
    }
  }
}
