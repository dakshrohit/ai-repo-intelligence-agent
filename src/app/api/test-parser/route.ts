import fs from "fs/promises";
import { NextResponse } from "next/server";

import { discoverFiles } from "@/lib/indexing/file-discovery";

export async function GET() {
  const files = await discoverFiles(
    "./repositories"
  );

  const tsFile = files.find(
    (file) =>
      file.endsWith(".ts") ||
      file.endsWith(".tsx")
  );

  if (!tsFile) {
    return NextResponse.json({
      success: false,
      error: "No TS file found",
    });
  }

  const content = await fs.readFile(
    tsFile,
    "utf8"
  );

  return NextResponse.json({
    success: true,
    file: tsFile,
    size: content.length,
    lines: content.split("\n").length,
  });
}