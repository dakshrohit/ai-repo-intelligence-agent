import { NextResponse } from "next/server";

import { embedText } from "@/lib/embeddings/embed";
import { searchChunks } from "@/lib/qdrant/search";

const REPOSITORY_ID =
  "demo-repo";

export async function GET() {
  const query =
    "How does authentication work?";

  const embedding =
    await embedText(query);

  const results =
    await searchChunks(
      REPOSITORY_ID,
      embedding,
      5
    );

  return NextResponse.json({
    count: results.length,
    results,
  });
}