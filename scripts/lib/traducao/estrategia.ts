import type { IdProvedorTraducao, LocaleAlvo } from './tipos.ts';

/**
 * Strategy: um provedor de MT isolado.
 * Novos providers = nova classe + registro na cadeia (sem if/else no core).
 */
export interface EstrategiaTraducao {
  readonly id: IdProvedorTraducao;
  /** Descrição curta para logs (modelo, etc.). */
  descricao(): string;
  /** true se chaves/config mínimas existem (não garante cota). */
  disponivel(): boolean;
  traduzir(texto: string, locale: LocaleAlvo): Promise<string>;
}
