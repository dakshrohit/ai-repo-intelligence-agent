import { sha256 } from "./hash";

export function buildMerkleRoot(
  hashes: string[]
) {
  if (hashes.length === 0) {
    return "";
  }

  let level = [...hashes];

  while (level.length > 1) {
    const next: string[] = [];

    for (
      let i = 0;
      i < level.length;
      i += 2
    ) {
      const left = level[i];

      const right =
        level[i + 1] ?? left;

      next.push(
        sha256(left + right)
      );
    }

    level = next;
  }

  return level[0];
}