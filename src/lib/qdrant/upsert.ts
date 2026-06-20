import { qdrant } from "./client";
import { v5 as uuidv5 } from "uuid";

const NAMESPACE =
  "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

export async function upsertChunk(
  repositoryId: string,
  filePath: string,
  chunkIndex: number,
  content: string,
  embedding: number[]
) {
  await qdrant.upsert(
    "repository_chunks",
    {
      wait: true,

      points: [
        {
          id: uuidv5(
  `${repositoryId}:${filePath}:${chunkIndex}`,
  NAMESPACE
),

          vector: embedding,

          payload: {
            repositoryId,
            filePath,
            chunkIndex,
            content,
          },
        },
      ],
    }
  );
}