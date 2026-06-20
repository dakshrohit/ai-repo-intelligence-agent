import { NextResponse } from "next/server";

import { embedText }
from "@/lib/embeddings/embed";

export async function GET() {

  const vector =
    await embedText(
      "function add(a,b){return a+b}"
    );

  return NextResponse.json({
    dimensions:
      vector.length,

    sample:
      vector.slice(0, 5),
  });
}