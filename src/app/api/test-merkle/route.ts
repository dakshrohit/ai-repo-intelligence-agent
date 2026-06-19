import { NextResponse } from "next/server";

import { discoverFiles } from "@/lib/indexing/file-discovery";

import { hashFile } from "@/lib/merkle/file-hash";

import { buildMerkleRoot } from "@/lib/merkle/merkle-tree";

export async function GET() {
  const files =
    await discoverFiles(
      "./repositories"
    );

  const sample =
    files.slice(0, 200);

  const hashes =
    await Promise.all(
      sample.map(hashFile)
    );

  const rootHash =
    buildMerkleRoot(hashes);

  return NextResponse.json({
    filesIndexed:
      sample.length,

    rootHash,
  });
}