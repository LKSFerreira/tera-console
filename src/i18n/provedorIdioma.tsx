import { startTransition, type ReactNode, useEffect, useState } from 'react';
import { CHAVE_IDIOMA, ContextoIdioma, obterEstadoInicial } from './idioma-context';
import type { IdiomaSuportado } from '../types/idioma';

export function ProvedorIdioma({ children }: { children: ReactNode }) {
  const [estadoIdioma, setEstadoIdioma] = useState(obterEstadoInicial);

  useEffect(() => {
    document.documentElement.lang = estadoIdioma.idioma;
    window.localStorage.setItem(CHAVE_IDIOMA, estadoIdioma.idioma);
  }, [estadoIdioma.idioma]);

  const definirIdioma = (idioma: IdiomaSuportado) => {
    startTransition(() => {
      setEstadoIdioma({ idioma, origemIdioma: 'armazenado' });
    });
  };

  return (
    <ContextoIdioma.Provider
      value={{
        idioma: estadoIdioma.idioma,
        origemIdioma: estadoIdioma.origemIdioma,
        definirIdioma,
      }}
    >
      {children}
    </ContextoIdioma.Provider>
  );
}
