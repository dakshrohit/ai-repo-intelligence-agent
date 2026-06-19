import { Chunk } from "@/types/chunk";
import { sha256 } from "../merkle/hash";

export function buildChunkHashes(
  chunks: Omit<Chunk, "hash">[]
): Chunk[] {
  return chunks.map((chunk) => ({
    ...chunk,
    hash: sha256(chunk.content),
  }));
}