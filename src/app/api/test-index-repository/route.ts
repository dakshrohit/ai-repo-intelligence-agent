import { NextResponse } from "next/server";

import { indexRepository }
from "@/lib/agent/index-repository";

export async function GET() {
  const result =
   await indexRepository(
  "cmqjrrsd10004esgf6q5qlivt",
  "./repositories"
);

  return NextResponse.json(
    result
  );
}