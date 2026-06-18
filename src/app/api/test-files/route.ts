import { NextResponse } from "next/server";

import {
  discoverFiles,
} from "@/lib/indexing/file-discovery";

export async function GET() {
  const files =
    await discoverFiles(
      "./repositories"
    );

  return NextResponse.json({
    count: files.length,
    files: files.slice(0, 20),
  });
}