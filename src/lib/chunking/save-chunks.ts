import { prisma } from "@/lib/db/prisma";
import { Chunk } from "@/types/chunk";

export async function saveChunks(
  repositoryId: string,
  filePath: string,
  chunks: Chunk[]
) {
  for (const chunk of chunks) {
    await prisma.chunkHash.upsert({
      where: {
        repositoryId_filePath_chunkIndex: {
          repositoryId,
          filePath,
          chunkIndex: chunk.chunkIndex,
        },
      },
      update: {
        hash: chunk.hash,
      },
      create: {
        repositoryId,
        filePath,
        chunkIndex: chunk.chunkIndex,
        hash: chunk.hash,
        startLine: chunk.startLine,
        endLine: chunk.endLine,
      },
    });
  }
}