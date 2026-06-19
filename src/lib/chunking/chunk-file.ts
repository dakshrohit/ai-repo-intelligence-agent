import { Chunk } from "@/types/chunk";

export function chunkFile(
  content: string,
  linesPerChunk = 100
): Omit<Chunk, "hash">[] {
  const lines =
    content.split("\n");

  const chunks = [];

  for (
    let i = 0;
    i < lines.length;
    i += linesPerChunk
  ) {
    chunks.push({
      chunkIndex:
        chunks.length,

      startLine:
        i + 1,

      endLine:
        Math.min(
          i + linesPerChunk,
          lines.length
        ),

      content:
        lines
          .slice(
            i,
            i + linesPerChunk
          )
          .join("\n"),
    });
  }

  return chunks;
}