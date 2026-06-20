import { NextResponse } from "next/server";

import { embedText } from "@/lib/embeddings/embed";
import { searchChunks } from "@/lib/qdrant/search";

export async function GET() {
  const query =
    "How does authentication work?";

  const embedding =
    await embedText(query);

  const results =
    await searchChunks(
      embedding,
      5
    );

  return NextResponse.json({
    count: results.length,
    results,
  });
}