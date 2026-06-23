import fs from "fs/promises";

import { discoverFiles } from "@/lib/indexing/file-discovery";
import { chunkFile } from "@/lib/chunking/chunk-file";
import { buildChunkHashes } from "@/lib/chunking/chunk-hashes";
import { detectChangedChunks } from "@/lib/chunking/detect-changed-chunks";
import { saveChunks } from "@/lib/chunking/save-chunks";

import { embedText } from "@/lib/embeddings/embed";
import { upsertChunk } from "@/lib/qdrant/upsert";

export async function indexRepository(
  repositoryId: string,
  repositoryPath: string
) {
  const files =
    await discoverFiles(
      repositoryPath
    );

  let indexedChunks = 0;

  for (const file of files) {
    try {
      const content =
        await fs.readFile(
          file,
          "utf8"
        );

      const chunks =
        buildChunkHashes(
          chunkFile(content)
        );

      const changedChunks =
        await detectChangedChunks(
          repositoryId,
          file,
          chunks
        );

      if (
        changedChunks.length === 0
      ) {
        continue;
      }

      await saveChunks(
        repositoryId,
        file,
        chunks
      );

      for (
        const chunk of changedChunks
      ) {
        try {
          const embedding =
            await embedText(
              chunk.content
            );

          if (
            !embedding ||
            embedding.length === 0
          ) {
            console.log(
              "Skipping chunk: empty embedding"
            );
            continue;
          }

          console.log(
            "Embedding length:",
            embedding.length
          );

          await upsertChunk({
            repositoryId,
            filePath: file,
            chunkIndex:
              chunk.chunkIndex,
            content:
              chunk.content,
            embedding,
          });

          indexedChunks++;
        } catch (error) {
          console.error(
            "Embedding failed:",
            file,
            error,
            chunk.chunkIndex
          );

          continue;
        }
      }
    } catch (error) {
      console.error(
        "Indexing error:",
        file,
        error
      );
    }
  }

  return {
    files: files.length,
    indexedChunks,
  };
}