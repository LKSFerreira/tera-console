import type { EstrategiaTraducao } from './estrategia.ts';
import type { IdProvedorTraducao, LocaleAlvo, ResultadoTraducaoTexto } from './tipos.ts';
import { sleep } from './util-openai-compativel.ts';

/**
 * Orquestra strategies com fallback + circuit breaker por provedor.
 * Um 429/erro num provider desliga-o para o resto da execução e tenta o próximo.
 */
export class CadeiaTraducao {
  private readonly desabilitados = new Set<IdProvedorTraducao>();
  private readonly avisosCircuit = new Set<IdProvedorTraducao>();

  constructor(private readonly estrategias: EstrategiaTraducao[]) {}

  /** IDs na ordem da cadeia (debug / logs). */
  ids(): IdProvedorTraducao[] {
    return this.estrategias.map((estrategia) => estrategia.id);
  }

  descricaoCadeia(): string {
    return this.estrategias
      .filter((estrategia) => estrategia.disponivel())
      .map((estrategia) => estrategia.descricao())
      .join(' → ');
  }

  resetarCircuitBreakers(): void {
    this.desabilitados.clear();
    this.avisosCircuit.clear();
  }

  async traduzir(texto: string, locale: LocaleAlvo): Promise<ResultadoTraducaoTexto> {
    const erros: string[] = [];
    const candidatas = this.estrategias.filter(
      (estrategia) => estrategia.disponivel() && !this.desabilitados.has(estrategia.id),
    );

    if (candidatas.length === 0) {
      return {
        texto,
        provedorEfetivo: 'none',
        warning: 'Nenhum provedor de tradução disponível na cadeia',
      };
    }

    for (const estrategia of candidatas) {
      try {
        const traduzido = await estrategia.traduzir(texto, locale);
        await sleep(estrategia.id === 'mymemory' ? 0 : 80);
        return { texto: traduzido, provedorEfetivo: estrategia.id };
      } catch (erro) {
        const mensagem = erro instanceof Error ? erro.message : String(erro);
        erros.push(`${estrategia.id}: ${mensagem.slice(0, 160)}`);

        this.desabilitados.add(estrategia.id);
        if (!this.avisosCircuit.has(estrategia.id)) {
          this.avisosCircuit.add(estrategia.id);
          console.warn(
            `[traducao] circuit breaker: ${estrategia.descricao()} desabilitado nesta execucao. ` +
              `Motivo: ${mensagem.slice(0, 200)}`,
          );
        }
      }
    }

    throw new Error(
      `Todos os provedores da cadeia falharam: ${erros.join(' | ').slice(0, 500)}`,
    );
  }
}
