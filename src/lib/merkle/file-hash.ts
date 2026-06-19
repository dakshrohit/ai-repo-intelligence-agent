import fs from "fs/promises";

import { sha256 } from "./hash";

export async function hashFile(
  filePath: string
) {
  const content = await fs.readFile(
    filePath,
    "utf8"
  );

  return sha256(content);
}