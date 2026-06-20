import { NextResponse } from "next/server";

import { embedText }
from "@/lib/embeddings/embed";

import { upsertChunk }
from "@/lib/qdrant/upsert";

export async function GET() {

  const text =
    "JWT middleware validates user tokens";

  const vector =
    await embedText(text);

  await upsertChunk(
    "demo-repo",
    "auth.ts",
    0,
    text,
    vector,
    {
      repositoryId: "demo-repo",
      filePath: "auth.ts",
      chunkIndex: 0,
      content: text,
      embedding: vector,
    }
  );

  return NextResponse.json({
    success: true,
  });
}