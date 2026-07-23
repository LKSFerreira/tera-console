interface FiguraPatchProps {
  alt: string;
  caption: string;
  src: string;
  className?: string;
}

export const FiguraPatch = ({ alt, caption, src, className = '' }: FiguraPatchProps) => (
  <figure className={`overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/60 shadow-xl ${className}`}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
    />
    <figcaption className="border-t border-slate-800/70 px-4 py-3 text-xs text-slate-400">{caption}</figcaption>
  </figure>
);
