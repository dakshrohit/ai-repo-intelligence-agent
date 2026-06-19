import { prisma } from "@/lib/db/prisma";

export async function detectChanges(
  repositoryId: string,
  currentManifest: Record<string, string>
) {
  const stored =
    await prisma.fileHash.findMany({
      where: {
        repositoryId,
      },
    });

  const previousManifest =
    Object.fromEntries(
      stored.map((row) => [
        row.filePath,
        row.hash,
      ])
    );

  const changedFiles: string[] = [];

  for (const [file, hash] of Object.entries(
    currentManifest
  )) {
    if (
      previousManifest[file] !== hash
    ) {
      changedFiles.push(file);
    }
  }

  return changedFiles;
}