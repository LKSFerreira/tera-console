import { useContext } from 'react';
import { ContextoIdioma } from './idioma-context';

export function useIdioma() {
  const contexto = useContext(ContextoIdioma);

  if (!contexto) {
    throw new Error('useIdioma deve ser usado dentro de ProvedorIdioma.');
  }

  return contexto;
}
