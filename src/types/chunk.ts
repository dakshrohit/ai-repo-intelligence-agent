export interface Chunk {
  chunkIndex: number;

  startLine: number;
  endLine: number;

  content: string;

  hash: string;
}