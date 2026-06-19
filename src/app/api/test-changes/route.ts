import { NextResponse } from "next/server";

import { discoverFiles } from "@/lib/indexing/file-discovery";

import { buildHashManifest } from "@/lib/merkle/hash-manifest";

import { detectChanges } from "@/lib/merkle/detect-changes";

export async function GET() {
  const files =
    await discoverFiles(
      "./repositories"
    );

  const sample =
    files.slice(0, 50);

  const manifest =
    await buildHashManifest(
      sample
    );

  const changed =
    await detectChanges(
      "YOUR_REPOSITORY_ID",
      manifest
    );

  return NextResponse.json({
    changedCount:
      changed.length,
    changedFiles:
      changed.slice(0, 10),
  });
}