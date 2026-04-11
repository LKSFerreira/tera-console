import type { IdiomaSuportado } from '../../types/idioma';

interface SeletorIdiomaProps {
  idiomaAtivo: IdiomaSuportado;
  onChange: (idioma: IdiomaSuportado) => void;
  className?: string;
  compacto?: boolean;
  rotulos: {
    pt: string;
    en: string;
    es: string;
  };
}

const OPCOES_IDIOMA: Array<{
  idioma: IdiomaSuportado;
  labelKey: 'pt' | 'en' | 'es';
}> = [
  { idioma: 'pt-BR', labelKey: 'pt' },
  { idioma: 'en-US', labelKey: 'en' },
  { idioma: 'es-ES', labelKey: 'es' },
];

const BandeiraBrasil = () => (
  <svg viewBox="0 0 24 16" className="h-4 w-5 overflow-hidden rounded-sm" aria-hidden="true">
    <rect width="24" height="16" fill="#17914b" />
    <path d="M12 2 21 8 12 14 3 8Z" fill="#f4d03f" />
    <circle cx="12" cy="8" r="3.6" fill="#1f4aa8" />
  </svg>
);

const BandeiraEstadosUnidos = () => (
  <svg viewBox="0 0 24 16" className="h-4 w-5 overflow-hidden rounded-sm" aria-hidden="true">
    <rect width="24" height="16" fill="#fff" />
    <path d="M0 0h24v2H0Zm0 4h24v2H0Zm0 4h24v2H0Zm0 4h24v2H0Z" fill="#c0392b" />
    <rect width="10.5" height="8.5" fill="#21468b" />
    <circle cx="2.5" cy="2" r="0.55" fill="#fff" />
    <circle cx="5" cy="2" r="0.55" fill="#fff" />
    <circle cx="7.5" cy="2" r="0.55" fill="#fff" />
    <circle cx="2.5" cy="4.25" r="0.55" fill="#fff" />
    <circle cx="5" cy="4.25" r="0.55" fill="#fff" />
    <circle cx="7.5" cy="4.25" r="0.55" fill="#fff" />
    <circle cx="2.5" cy="6.5" r="0.55" fill="#fff" />
    <circle cx="5" cy="6.5" r="0.55" fill="#fff" />
    <circle cx="7.5" cy="6.5" r="0.55" fill="#fff" />
  </svg>
);

const BandeiraEspanha = () => (
  <svg viewBox="0 0 24 16" className="h-4 w-5 overflow-hidden rounded-sm" aria-hidden="true">
    <rect width="24" height="16" fill="#aa151b" />
    <rect y="4" width="24" height="8" fill="#f1bf00" />
    <rect x="5.3" y="5.3" width="2.2" height="5.4" rx="0.3" fill="#aa151b" />
  </svg>
);

function BandeiraIdioma({ idioma }: { idioma: IdiomaSuportado }) {
  if (idioma === 'pt-BR') {
    return <BandeiraBrasil />;
  }

  if (idioma === 'en-US') {
    return <BandeiraEstadosUnidos />;
  }

  return <BandeiraEspanha />;
}

export const SeletorIdioma = ({ idiomaAtivo, onChange, rotulos, className, compacto = false }: SeletorIdiomaProps) => (
  <div className={`flex flex-wrap items-center ${compacto ? 'gap-1.5' : 'gap-2'} ${className ?? ''}`.trim()}>
    {OPCOES_IDIOMA.map((opcao) => {
      const estaAtivo = idiomaAtivo === opcao.idioma;
      const label = rotulos[opcao.labelKey];

      return (
        <button
          key={opcao.idioma}
          type="button"
          onClick={() => onChange(opcao.idioma)}
          title={label}
          aria-label={label}
          className={`inline-flex items-center justify-center border transition-all ${
            compacto ? 'rounded-md p-1.5' : 'rounded-lg p-2'
          } ${
            estaAtivo
              ? 'border-amber-500/40 bg-amber-500/10 shadow-sm shadow-amber-500/10'
              : 'border-slate-700 bg-[#090e17] hover:border-slate-500 hover:bg-slate-800'
          }`}
        >
          <BandeiraIdioma idioma={opcao.idioma} />
        </button>
      );
    })}
  </div>
);
