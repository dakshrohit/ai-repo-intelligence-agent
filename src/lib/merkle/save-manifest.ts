import { prisma } from "@/lib/db/prisma";

export async function saveManifest(
  repositoryId: string,
  manifest: Record<string, string>
) {
  for (const [filePath, hash] of Object.entries(manifest)) {
    await prisma.fileHash.upsert({
      where: {
        repositoryId_filePath: {
          repositoryId,
          filePath,
        },
      },
      update: {
        hash,
      },
      create: {
        repositoryId,
        filePath,
        hash,
      },
    });
  }
}