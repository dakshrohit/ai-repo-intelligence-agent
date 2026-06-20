import { qdrant } from "./client";

export async function searchChunks(
  repositoryId: string,
  embedding: number[],
  limit = 5
) {
  const results =
    await qdrant.search(
      "repository_chunks",
      {
        vector: embedding,
        limit,

        filter: {
          must: [
            {
              key: "repositoryId",
              match: {
                value: repositoryId,
              },
            },
          ],
        },
      }
    );

  return results;
}