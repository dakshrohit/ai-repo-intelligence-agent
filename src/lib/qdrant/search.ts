import { qdrant } from "./client";

export async function searchChunks(
  embedding: number[],
  limit = 5
) {
  const result =
    await qdrant.search(
      "repository_chunks",
      {
        vector: embedding,
        limit,
      }
    );

  return result;
}