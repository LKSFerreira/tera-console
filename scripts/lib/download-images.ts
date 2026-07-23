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
        continue;
      }

      // Node 18+ fetch body as web stream → node stream
      const nodeStream = Readable.fromWeb(resposta.body as import('node:stream/web').ReadableStream);
      await pipeline(nodeStream, createWriteStream(destino));
      mapaUrlLocal[url] = caminhoPublico;
    } catch (erro) {
      warnings.push(`Erro ao baixar imagem ${url}: ${erro instanceof Error ? erro.message : String(erro)}`);
    }
  }

  // Também copia para public/patches/{id} para servir no Vite
  // (feito no caller com fs.cp)

  for (const aba of Object.values(tabs)) {
    aba.blocks = remapearFiguras(aba.blocks, mapaUrlLocal);
  }

  return { warnings, mapaUrlLocal };
}

function remapearFiguras(blocos: BlocoConteudo[], mapa: Record<string, string>): BlocoConteudo[] {
  return blocos.map((bloco) => {
    if (bloco.type === 'figure') {
      const local = mapa[bloco.src];
      if (local) {
        return { ...bloco, src: local };
      }
      // remove figure se download falhou
      return null;
    }
    if (bloco.type === 'card') {
      return { ...bloco, blocks: remapearFiguras(bloco.blocks, mapa) };
    }
    if (bloco.type === 'subsection') {
      return { ...bloco, blocks: remapearFiguras(bloco.blocks, mapa) };
    }
    if (bloco.type === 'cardGrid') {
      return {
        ...bloco,
        cards: bloco.cards.map((card) => ({
          ...card,
          blocks: remapearFiguras(card.blocks, mapa),
        })),
      };
    }
    return bloco;
  }).filter(Boolean) as BlocoConteudo[];
}
