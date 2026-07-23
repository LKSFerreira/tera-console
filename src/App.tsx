import { createElement, useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, FolderGit2, History, RotateCcw, Settings, Users, type LucideIcon } from 'lucide-react';

import teraCommunityArte from './assets/imagens/tera_community/tera_community.webp';
import lksAvatar from './assets/imagens/perfil/lks_avatar.png';
import { SeletorIdioma } from './components/ui';
import {
  listarOrdemPatches,
  obterMetadadosPatchLocalizados,
  obterPatchDataDriven,
  patchEhDataDriven,
} from './data/carregarPatches';
import { conteudoSitePorIdioma } from './data/siteContent';
import { DynamicPatchRenderer } from './features/patchNotes/DynamicPatchRenderer';
import { obterIconePorChave } from './features/patchNotes/mapaIcones';
import { registroAbasLegadas } from './features/patchNotes/registroAbasLegadas';
import { useIdioma } from './i18n/useIdioma';
import type { AbaPatchId, PatchId } from './types/idioma';

interface PerfilGithubPublico {
  avatar_url: string;
  name: string | null;
  login: string;
  bio: string | null;
  followers: number;
  public_repos: number;
  html_url: string;
}

type EstadoPerfilGithub =
  | { status: 'loading' }
  | { status: 'success'; data: PerfilGithubPublico }
  | { status: 'error' };

interface AbaNavegacao {
  id: string;
  label: string;
  icon: LucideIcon;
}

const LINK_DISCORD_COMUNIDADE = 'https://discord.com/invite/vB83wnaykm';
const LINK_GITHUB_PADRAO = 'https://github.com/LKSFerreira';

/** Ordem da sidebar - `src/content/patches/index.json`. */
const ordemPatches = listarOrdemPatches();

function montarAbasNavegacao(patchId: string, idioma: keyof typeof conteudoSitePorIdioma): AbaNavegacao[] {
  const metadados = obterMetadadosPatchLocalizados(patchId, idioma);

  if (!metadados) {
    return [];
  }

  if (patchEhDataDriven(patchId)) {
    const patch = obterPatchDataDriven(patchId);
    return metadados.tabs.map((aba) => {
      const definicaoMeta = patch?.meta.tabs.find((item) => item.id === aba.id);
      return {
        id: aba.id,
        label: aba.label,
        icon: obterIconePorChave(definicaoMeta?.icon) ?? Settings,
      };
    });
  }

  const registroLegado = registroAbasLegadas[patchId] ?? {};
  return metadados.tabs.map((aba) => ({
    id: aba.id,
    label: aba.label,
    icon: registroLegado[aba.id]?.icon ?? Settings,
  }));
}

export default function App() {
  const { idioma, definirIdioma } = useIdioma();
  const conteudoSite = conteudoSitePorIdioma[idioma];
  const [patchAtivoId, setPatchAtivoId] = useState<PatchId>(ordemPatches[0] ?? 'b131.01');
  const [abaAtivaId, setAbaAtivaId] = useState<AbaPatchId>(() => {
    const primeiro = obterMetadadosPatchLocalizados(ordemPatches[0] ?? 'b131.01', 'pt-BR');
    return primeiro?.tabs[0]?.id ?? 'bugs';
  });
  const [perfilGithub, setPerfilGithub] = useState<EstadoPerfilGithub>({ status: 'loading' });

  const abasPatchAtivo = useMemo(
    () => montarAbasNavegacao(patchAtivoId, idioma),
    [patchAtivoId, idioma],
  );
  const abaAtivaResolvida = abasPatchAtivo.find((aba) => aba.id === abaAtivaId) ?? abasPatchAtivo[0];
  const registroLegadoAtivo = registroAbasLegadas[patchAtivoId];
  const ComponenteAbaLegada = abaAtivaResolvida
    ? registroLegadoAtivo?.[abaAtivaResolvida.id]?.component
    : undefined;
  const perfilGithubSucesso = perfilGithub.status === 'success' ? perfilGithub.data : null;
  const nomeMantenedor = perfilGithubSucesso?.name?.trim() || 'LKS Ferreira';
  const loginMantenedor = perfilGithubSucesso?.login ? `@${perfilGithubSucesso.login}` : '@LKSFerreira';
  const avatarMantenedor = perfilGithubSucesso?.avatar_url || lksAvatar;
  const linkGithubPerfil = perfilGithubSucesso?.html_url || LINK_GITHUB_PADRAO;
  const metricasGithub = perfilGithubSucesso
    ? [
        { id: 'followers', icon: Users, value: perfilGithubSucesso.followers, label: conteudoSite.shell.githubFollowersLabel },
        { id: 'repos', icon: FolderGit2, value: perfilGithubSucesso.public_repos, label: conteudoSite.shell.githubReposLabel },
      ]
    : [];

  useEffect(() => {
    const controller = new AbortController();

    async function carregarPerfilGithub() {
      try {
        const resposta = await fetch('https://api.github.com/users/LKSFerreira', {
          headers: {
            Accept: 'application/vnd.github+json',
          },
          signal: controller.signal,
        });

        if (!resposta.ok) {
          throw new Error(`GitHub API returned ${resposta.status}`);
        }

        const dados = (await resposta.json()) as PerfilGithubPublico;

        setPerfilGithub({ status: 'success', data: dados });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        console.error('Falha ao carregar perfil do GitHub:', error);
        setPerfilGithub({ status: 'error' });
      }
    }

    carregarPerfilGithub();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#090e17] font-sans text-slate-200 selection:bg-amber-500/30 flex flex-col">
      <div className="relative shrink-0 overflow-hidden border-b border-slate-800/80 bg-slate-950">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 rounded-[100%] bg-amber-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute left-1/4 top-0 h-[200px] w-[400px] rounded-[100%] bg-sky-500/10 blur-[80px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-6 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] lg:items-stretch">
          <div className="flex flex-col items-center justify-end space-y-4 text-center lg:items-start lg:text-left">
            <h1 className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-6xl font-bold tracking-tight text-transparent drop-shadow-sm md:text-7xl" style={{ fontFamily: "'Cinzel Decorative', serif" }}>
              TERA Console
            </h1>
          </div>

          <a
            href={LINK_DISCORD_COMUNIDADE}
            target="_blank"
            title={conteudoSite.shell.communityCtaTitle}
            rel="noopener noreferrer"
            className="group relative flex w-full overflow-hidden rounded-xl border border-b-2 border-slate-700/50 border-b-sky-500 bg-slate-900/60 pl-5 py-5 pr-[10px] shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-slate-800/80 hover:scale-[1.02]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_38%)]" />
            <div className="pointer-events-none absolute right-[-10px] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-sky-400/10 blur-3xl transition-transform duration-500 group-hover:scale-110" />

            <div className="relative z-10 grid w-full gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
              <div className="flex flex-col justify-center gap-2">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black tracking-tight text-slate-100 flex items-center gap-2 whitespace-nowrap">
                    {conteudoSite.shell.communityTitle}
                    <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-sky-400" />
                  </h2>
                  <p className="text-sm leading-relaxed text-slate-300/85">{conteudoSite.shell.communityDescription}</p>
                </div>
              </div>

              <div className="hidden shrink-0 items-center justify-center sm:flex self-center">
                <img
                  src={teraCommunityArte}
                  alt="TERA Community"
                  className="h-32 w-32 rounded-2xl object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                />
              </div>
            </div>
          </a>

          <a
            href={linkGithubPerfil}
            target="_blank"
            title={conteudoSite.shell.githubTitle}
            rel="noopener noreferrer"
            className="group flex w-full flex-col gap-4 rounded-xl border border-b-2 border-slate-700/50 border-b-amber-500 bg-slate-900/60 p-5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-slate-800/80 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-500/50 to-amber-200/50 blur-md" />
                <div className="relative h-full w-full rounded-full border-2 border-amber-500/30 bg-slate-950 p-1 shadow-2xl">
                  <img
                    src={avatarMantenedor}
                    alt={nomeMantenedor}
                    className="h-full w-full rounded-full object-cover shadow-inner"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500/80">{conteudoSite.shell.maintainedBy}</span>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-2xl font-black leading-tight text-transparent drop-shadow-md whitespace-nowrap">
                    {nomeMantenedor}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-amber-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                {perfilGithub.status === 'success' ? (
                  <div className="mt-0.5 truncate text-xs font-medium tracking-wide text-slate-400">{loginMantenedor}</div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-700/60 pt-4">

              {metricasGithub.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  {metricasGithub.map((metrica) => {
                    const IconeMetrica = metrica.icon;

                    return (
                      <div
                        key={metrica.id}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-950/45 px-3 py-1.5 text-xs font-medium text-slate-300"
                      >
                        <IconeMetrica className="h-3.5 w-3.5 text-amber-400" />
                        <span className="font-semibold text-slate-100">{metrica.value}</span>
                        <span className="text-slate-400">{metrica.label}</span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </a>
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 pb-8 pt-6 lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col lg:w-max">
          <div className="sticky top-8">
            <div className="mb-4 flex flex-wrap items-center gap-3 px-2">
              <SeletorIdioma idiomaAtivo={idioma} onChange={definirIdioma} rotulos={conteudoSite.seletorIdioma} compacto />
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <History className="h-4 w-4" /> {conteudoSite.shell.updatesTitle}
              </h3>
            </div>

            <div className="flex snap-x gap-3 overflow-x-auto pb-4 lg:flex-col lg:overflow-visible lg:pb-0">
              {ordemPatches.map((patchId) => {
                const patchMetadados = obterMetadadosPatchLocalizados(patchId, idioma);
                const patchEstaAtivo = patchAtivoId === patchId;

                if (!patchMetadados) {
                  return null;
                }

                return (
                  <button
                    key={patchId}
                    onClick={() => {
                      setPatchAtivoId(patchId);
                      setAbaAtivaId(patchMetadados.tabs[0]?.id ?? '');
                    }}
                    className={`min-w-[240px] snap-start whitespace-nowrap rounded-xl border px-4 py-4 text-left transition-all lg:min-w-0 ${
                      patchEstaAtivo
                        ? 'border-amber-500/40 bg-amber-500/10 shadow-lg shadow-amber-500/5'
                        : 'border-slate-800/60 bg-slate-900/40 hover:border-slate-700/80 hover:bg-slate-800'
                    }`}
                  >
                    <div className="mb-1 flex items-start justify-between">
                      <span className={`text-lg font-black ${patchEstaAtivo ? 'text-amber-400' : 'text-slate-300'}`}>{patchId.toUpperCase()}</span>
                      {patchEstaAtivo ? <div className="mt-2 h-2 w-2 animate-pulse rounded-full bg-amber-400" /> : null}
                    </div>
                    <span className={`mb-1 text-sm font-medium ${patchEstaAtivo ? 'text-amber-200/80' : 'text-slate-400'}`}>{patchMetadados.name}</span>
                    <span className="mt-auto block border-t border-slate-800/50 pt-2 text-xs text-slate-500">
                      {patchMetadados.date} {patchMetadados.parts}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="scrollbar-none mb-8 flex gap-2 overflow-x-auto border-b border-slate-800/80 pb-4">
            {abasPatchAtivo.map((aba) => {
              const abaEstaAtiva = (abaAtivaResolvida?.id ?? abaAtivaId) === aba.id;

              return (
                <button
                  key={aba.id}
                  onClick={() => setAbaAtivaId(aba.id)}
                  className={`shrink-0 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    abaEstaAtiva
                      ? 'border border-sky-500/30 bg-sky-500/10 text-sky-400 shadow-md shadow-sky-500/5'
                      : 'border border-transparent bg-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  {createElement(aba.icon, {
                    className: `h-4 w-4 ${abaEstaAtiva ? 'text-sky-400' : 'text-slate-500'}`,
                  })}
                  {aba.label}
                </button>
              );
            })}
          </div>

          <div className="min-h-[500px]">
            {patchEhDataDriven(patchAtivoId) && abaAtivaResolvida ? (
              <DynamicPatchRenderer patchId={patchAtivoId} abaId={abaAtivaResolvida.id} />
            ) : ComponenteAbaLegada ? (
              <ComponenteAbaLegada />
            ) : (
              <p className="text-sm text-slate-400">Conteúdo do patch indisponível.</p>
            )}
          </div>
        </div>
      </main>

      <footer className="relative mt-auto shrink-0 overflow-hidden border-t border-slate-800/80 bg-slate-950">
        <div className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row">
          <div className="flex flex-col items-center space-y-2 md:items-start">
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-2 text-amber-500">
                <RotateCcw className="h-5 w-5" />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter text-slate-200 italic">
                TERA<span className="text-amber-500">Console</span>
              </span>
            </div>
            <p className="text-xs font-medium tracking-wide text-slate-500">{conteudoSite.shell.footerDescription}</p>
          </div>

          <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-600 md:text-right">
            © {new Date().getFullYear()} {conteudoSite.shell.copyrightLabel}
          </div>
        </div>
      </footer>
    </div>
  );
}
