import fs from "fs/promises";

import { NextResponse }
from "next/server";

import {
  discoverFiles,
} from "@/lib/indexing/file-discovery";

import {
  chunkFile,
} from "@/lib/chunking/chunk-file";

import {
  buildChunkHashes,
} from "@/lib/chunking/chunk-hashes";

export async function GET() {

  const files =
    await discoverFiles(
      "./repositories"
    );

  const file =
    files.find(
      (f) =>
        f.endsWith(".ts")
    );

  if (!file) {
    return NextResponse.json({
      error:
        "No file found",
    });
  }

  const content =
    await fs.readFile(
      file,
      "utf8"
    );

  const chunks =
    chunkFile(content);

  const hashed =
    buildChunkHashes(
      chunks
    );

  return NextResponse.json({
    file,
    chunkCount:
      hashed.length,

    firstChunk:
      hashed[0],
  });
}