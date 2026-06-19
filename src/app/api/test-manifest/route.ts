import { NextResponse } from "next/server";

import { discoverFiles } from "@/lib/indexing/file-discovery";

import { buildHashManifest } from "@/lib/merkle/hash-manifest";

export async function GET() {
  const files =
    await discoverFiles(
      "./repositories"
    );

  const sample =
    files.slice(0, 20);

  const manifest =
    await buildHashManifest(
      sample
    );

  return NextResponse.json({
    count:
      Object.keys(manifest)
        .length,

    manifest,
  });
}