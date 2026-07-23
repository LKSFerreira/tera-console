const BASE_API = 'https://api.tera-console.com';

export interface RotuloCategoriaOficial {
  key: string;
  label: string;
}

export interface ItemNewsResumo {
  id: number;
  title: string;
  startDate: string;
  categoryLabel: RotuloCategoriaOficial;
  description?: string;
}

export interface ItemNewsDetalhe extends ItemNewsResumo {
  description: string;
  marketLabels?: Array<{ key: string; label: string }>;
  serviceAreaLabels?: Array<{ key: string; label: string }>;
}

export interface ListaNewsOficial {
  content: ItemNewsResumo[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
}

export function extrairNewsIdDaUrl(urlOuId: string): number {
  const soDigitos = urlOuId.trim();
  if (/^\d+$/.test(soDigitos)) {
    return Number(soDigitos);
  }

  const match = soDigitos.match(/\/news\/(\d+)/i);
  if (!match?.[1]) {
    throw new Error(`Não foi possível extrair newsId de: ${urlOuId}`);
  }

  return Number(match[1]);
}

export async function listarNewsOficiais(pagina = 1, tamanho = 20): Promise<ListaNewsOficial> {
  const url = `${BASE_API}/news?page=${pagina}&size=${tamanho}&languageType=EN`;
  const resposta = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': 'tera-console-portal-ingest/1.0' },
  });

  if (!resposta.ok) {
    throw new Error(`Falha ao listar news: HTTP ${resposta.status}`);
  }

  return (await resposta.json()) as ListaNewsOficial;
}

export async function obterNewsDetalhe(newsId: number): Promise<ItemNewsDetalhe> {
  const url = `${BASE_API}/news/${newsId}?languageType=EN`;
  const resposta = await fetch(url, {
    headers: { Accept: 'application/json', 'User-Agent': 'tera-console-portal-ingest/1.0' },
  });

  if (!resposta.ok) {
    throw new Error(`Falha ao obter news ${newsId}: HTTP ${resposta.status}`);
  }

  return (await resposta.json()) as ItemNewsDetalhe;
}

export function itemEhUpdate(item: { categoryLabel?: RotuloCategoriaOficial; title?: string }): boolean {
  if (item.categoryLabel?.key !== 'update') {
    return false;
  }

  const titulo = item.title ?? '';
  const parecePatch = /B\d+|Build Update|Patch Notes|Update/i.test(titulo);
  const pareceManutencao = /Maintenance|Server Maintenance|Shop|Known Issues/i.test(titulo);

  return parecePatch && !pareceManutencao;
}
