import { hashFile } from "./file-hash";

export async function buildHashManifest(
  files: string[]
) {
  const manifest: Record<
    string,
    string
  > = {};

  for (const file of files) {
    manifest[file] =
      await hashFile(file);
  }

  return manifest;
}