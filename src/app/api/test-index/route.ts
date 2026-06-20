// src/app/api/test-index/route.ts

import { NextResponse } from "next/server";
import { qdrant } from "@/lib/qdrant/client";

export async function GET() {
  const result =
    await qdrant.createPayloadIndex(
      "repository_chunks",
      {
        field_name: "repositoryId",
        field_schema: "keyword",
      }
    );

  return NextResponse.json(result);
}