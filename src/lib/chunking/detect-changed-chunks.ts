import { prisma } from "@/lib/db/prisma";
import { Chunk } from "@/types/chunk";

export async function detectChangedChunks(
  repositoryId: string,
  filePath: string,
  chunks: Chunk[]
) {
  const stored =
    await prisma.chunkHash.findMany({
      where: {
        repositoryId,
        filePath,
      },
    });
    

  const oldMap = new Map(
    stored.map((chunk) => [
      chunk.chunkIndex,
      chunk.hash,
    ])
  );

  return chunks.filter(
    (chunk) =>
      oldMap.get(chunk.chunkIndex) !==
      chunk.hash
  );
}