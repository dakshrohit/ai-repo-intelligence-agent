import { prisma } from "@/lib/db/prisma";

export async function createIndexingJob(
  repositoryId: string
) {
  return prisma.indexingJob.create({
    data: {
      repositoryId,
      status: "PENDING",
    },
  });
}