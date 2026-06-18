import { prisma } from "@/lib/db/prisma";

export async function updateRepositoryPath(
  repositoryId: string,
  localPath: string
) {
  return prisma.repository.update({
    where: {
      id: repositoryId,
    },
    data: {
      localPath,
      status: "CLONED",
    },
  });
}