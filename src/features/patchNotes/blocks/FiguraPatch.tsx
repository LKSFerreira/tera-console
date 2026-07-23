import { useState } from 'react';

interface FiguraPatchProps {
  alt: string;
  caption: string;
  src: string;
  className?: string;
}

function resolverSrc(src: string): string {
  if (src.startsWith('//')) {
    return `https:${src}`;
  }
  return src;
}

/**
 * Figura de patch: aceita asset local ou URL oficial do CDN.
 * object-contain preserva screenshots oficiais sem crop agressivo.
 */
export const FiguraPatch = ({ alt, caption, src, className = '' }: FiguraPatchProps) => {
  const [falhou, setFalhou] = useState(false);
  const srcResolvido = resolverSrc(src);
  const ehRemota = /^https?:\/\//i.test(srcResolvido);

  if (falhou) {
    return (
      <figure
        className={`overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/60 shadow-xl ${className}`}
      >
        <div className="flex min-h-[120px] items-center justify-center px-4 py-8 text-center text-xs text-slate-500">
          Imagem indisponível
          {ehRemota ? ' (CDN oficial)' : ''}
        </div>
        {caption ? (
          <figcaption className="border-t border-slate-800/70 px-4 py-3 text-xs text-slate-400">{caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure
      className={`overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/60 shadow-xl ${className}`}
    >
      <img
        src={srcResolvido}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="mx-auto max-h-[min(70vh,720px)] w-full object-contain transition-transform duration-300 hover:scale-[1.01]"
        onError={() => setFalhou(true)}
      />
      {caption ? (
        <figcaption className="border-t border-slate-800/70 px-4 py-3 text-xs text-slate-400">{caption}</figcaption>
      ) : null}
    </figure>
  );
};
