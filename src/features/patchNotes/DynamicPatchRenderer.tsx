import { useIdioma } from '../../i18n/useIdioma';
import { obterConteudoLocalizadoPatch } from '../../data/carregarPatches';
import { RenderizadorBlocos } from './blocks';

interface DynamicPatchRendererProps {
  patchId: string;
  abaId: string;
}

/**
 * Renderiza abas de patch a partir do schema data-driven.
 * Preserva o envelope visual das tabs legadas (fade + espaçamento).
 */
export function DynamicPatchRenderer({ patchId, abaId }: DynamicPatchRendererProps) {
  const { idioma } = useIdioma();
  const conteudo = obterConteudoLocalizadoPatch(patchId, idioma);
  const aba = conteudo?.tabs[abaId];

  if (!conteudo || !aba) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <p className="text-sm text-slate-400">
          Conteúdo indisponível para o patch <span className="text-amber-400">{patchId}</span>
          {abaId ? ` / aba ${abaId}` : ''}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <RenderizadorBlocos blocos={aba.blocks} />
    </div>
  );
}
