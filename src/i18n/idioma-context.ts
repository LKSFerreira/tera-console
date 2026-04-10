import { createContext } from 'react';
import type { IdiomaSuportado, OrigemIdioma } from '../types/idioma';

export interface EstadoIdioma {
  idioma: IdiomaSuportado;
  origemIdioma: OrigemIdioma;
  definirIdioma: (idioma: IdiomaSuportado) => void;
}

export const CHAVE_IDIOMA = 'tera-console.idioma-preferido';

export const ContextoIdioma = createContext<EstadoIdioma | null>(null);

export function resolverIdiomaSuportado(idiomaBruto: string | null | undefined): IdiomaSuportado | null {
  if (!idiomaBruto) {
    return null;
  }

  const idiomaNormalizado = idiomaBruto.toLowerCase();

  if (idiomaNormalizado.startsWith('pt')) {
    return 'pt-BR';
  }

  if (idiomaNormalizado.startsWith('en')) {
    return 'en-US';
  }

  if (idiomaNormalizado.startsWith('es')) {
    return 'es-ES';
  }

  return null;
}

export function obterEstadoInicial(): { idioma: IdiomaSuportado; origemIdioma: OrigemIdioma } {
  if (typeof window === 'undefined') {
    return { idioma: 'pt-BR', origemIdioma: 'fallback' };
  }

  const idiomaArmazenado = resolverIdiomaSuportado(window.localStorage.getItem(CHAVE_IDIOMA));

  if (idiomaArmazenado) {
    return { idioma: idiomaArmazenado, origemIdioma: 'armazenado' };
  }

  const idiomasNavegador = window.navigator.languages.length > 0 ? window.navigator.languages : [window.navigator.language];

  for (const idiomaNavegador of idiomasNavegador) {
    const idiomaSuportado = resolverIdiomaSuportado(idiomaNavegador);

    if (idiomaSuportado) {
      return { idioma: idiomaSuportado, origemIdioma: 'navegador' };
    }
  }

  return { idioma: 'pt-BR', origemIdioma: 'fallback' };
}
