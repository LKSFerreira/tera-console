/**
 * Imagens do patch oficial.
 * Padrão: manter URL do CDN (sem baixar).
 * Opcional: --download-images no ingest grava cópia local.
 */
import { createWriteStream, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import type { BlocoConteudo } from '../../src/types/patchContent.ts';

function slugArquivo(url: string, indice: number): string {
  try {
    const pathname = new URL(url).pathname;
    const base = pathname.split('/').pop() || `image-${indice}.jpg`;
    return base.replace(/[^a-zA-Z0-9._-]/g, '_');
  } catch {
    return `image-${indice}.jpg`;
  }
}

/** Normaliza //cdn... → https://cdn... e deduplica figures. */
export function normalizarUrlsOficiaisNasAbas(
  tabs: Record<string, { label: string; blocks: BlocoConteudo[] }>,
): { warnings: string[]; totalFiguras: number } {
  const warnings: string[] = [];
  let totalFiguras = 0;

  for (const aba of Object.values(tabs)) {
    aba.blocks = percorrerBlocos(aba.blocks, (bloco) => {
      if (bloco.type !== 'figure') return bloco;

      let src = bloco.src;
      if (src.startsWith('//')) {
        src = `https:${src}`;
      }
      if (!src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('/')) {
        warnings.push(`Figure com src inválido: ${src}`);
      }

      totalFiguras += 1;
      return {
        ...bloco,
        src,
        alt: bloco.alt || 'Imagem do patch oficial (TERA Console)',
        caption: bloco.caption || bloco.alt || 'Imagem do patch oficial',
      };
    });
  }

  return { warnings, totalFiguras };
}

export async function baixarImagensERemapearBlocos(
  imageUrls: string[],
  pastaImages: string,
  patchId: string,
  tabs: Record<string, { label: string; blocks: BlocoConteudo[] }>,
): Promise<{ warnings: string[]; mapaUrlLocal: Record<string, string> }> {
  mkdirSync(pastaImages, { recursive: true });
  const warnings: string[] = [];
  const mapaUrlLocal: Record<string, string> = {};

  let indice = 0;
  for (const url of imageUrls) {
    indice += 1;
    const nome = slugArquivo(url, indice);
    const destino = join(pastaImages, nome);
    const caminhoPublico = `/patches/${patchId}/${nome}`;

    if (existsSync(destino)) {
      mapaUrlLocal[url] = caminhoPublico;
      continue;
    }

    try {
      const resposta = await fetch(url, {
        headers: { 'User-Agent': 'tera-console-portal-ingest/1.0' },
      });
      if (!resposta.ok || !resposta.body) {
        warnings.push(`Falha ao baixar imagem (${resposta.status}): ${url}`);
        // mantém URL remota no figure
        mapaUrlLocal[url] = url;
        continue;
      }

      const nodeStream = Readable.fromWeb(resposta.body as import('node:stream/web').ReadableStream);
      await pipeline(nodeStream, createWriteStream(destino));
      mapaUrlLocal[url] = caminhoPublico;
    } catch (erro) {
      warnings.push(`Erro ao baixar imagem ${url}: ${erro instanceof Error ? erro.message : String(erro)}`);
      mapaUrlLocal[url] = url;
    }
  }

  for (const aba of Object.values(tabs)) {
    aba.blocks = remapearFiguras(aba.blocks, mapaUrlLocal, false);
  }

  return { warnings, mapaUrlLocal };
}

function percorrerBlocos(
  blocos: BlocoConteudo[],
  mapear: (bloco: BlocoConteudo) => BlocoConteudo | null,
): BlocoConteudo[] {
  return blocos
    .map((bloco) => {
      if (bloco.type === 'card') {
        return { ...bloco, blocks: percorrerBlocos(bloco.blocks, mapear) };
      }
      if (bloco.type === 'subsection') {
        return { ...bloco, blocks: percorrerBlocos(bloco.blocks, mapear) };
      }
      if (bloco.type === 'cardGrid') {
        return {
          ...bloco,
          cards: bloco.cards.map((card) => ({
            ...card,
            blocks: percorrerBlocos(card.blocks, mapear),
          })),
        };
      }
      return mapear(bloco);
    })
    .filter(Boolean) as BlocoConteudo[];
}

function remapearFiguras(
  blocos: BlocoConteudo[],
  mapa: Record<string, string>,
  removerSeFalhar: boolean,
): BlocoConteudo[] {
  return percorrerBlocos(blocos, (bloco) => {
    if (bloco.type !== 'figure') return bloco;
    const destino = mapa[bloco.src];
    if (destino) {
      return { ...bloco, src: destino };
    }
    return removerSeFalhar ? null : bloco;
  });
}
