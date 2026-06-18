import { prisma } from "@/lib/db/prisma";

export async function createRepository(
  githubUrl: string
) {
  const existing =
    await prisma.repository.findUnique({
      where: {
        githubUrl,
      },
    });

  if (existing) {
    return existing;
  }

  const name =
    githubUrl.split("/").pop() || "repository";

  return prisma.repository.create({
    data: {
      name,
      githubUrl,
      status: "PENDING",
    },
  });
}