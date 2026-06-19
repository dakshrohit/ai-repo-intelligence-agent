import fs from "fs/promises";
import { NextResponse } from "next/server";

import { discoverFiles } from "@/lib/indexing/file-discovery";
import { chunkFile } from "@/lib/chunking/chunk-file";
import { buildChunkHashes } from "@/lib/chunking/chunk-hashes";
import { detectChangedChunks } from "@/lib/chunking/detect-changed-chunks";
import { saveChunks } from "@/lib/chunking/save-chunks";

import { prisma } from "@/lib/db/prisma";

const repository =
  await prisma.repository.findFirst();

if (!repository) {
  throw new Error("No repository found");
}

const repositoryId = repository.id;
const REPOSITORY_ID =
  repositoryId;

export async function GET() {
  const files =
    await discoverFiles(
      "./repositories"
    );

  const file =
    files.find((f) =>
      f.endsWith(".ts")
    );

  if (!file) {
    return NextResponse.json({
      error: "No file found",
    });
  }

  const content =
    await fs.readFile(file, "utf8");

  const chunks =
    buildChunkHashes(
      chunkFile(content)
    );

  const changed =
    await detectChangedChunks(
      REPOSITORY_ID,
      file,
      chunks
    );

  await saveChunks(
    REPOSITORY_ID,
    file,
    chunks
  );

  return NextResponse.json({
    totalChunks: chunks.length,
    changedChunks:
      changed.length,
  });
}