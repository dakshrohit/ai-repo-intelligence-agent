import fs from "fs/promises";
import path from "path";

const ALLOWED_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".py",
  ".java",
  ".go",
  ".rs",
  ".md",
];
const SKIP_DIRS = [
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  "__tests__",
  "__mocks__",
  "test",
  "tests",
];
const IGNORED_FOLDERS = [
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  "target",
  ".turbo",
];


export async function discoverFiles(
  rootPath: string
): Promise<string[]> {
  const files: string[] = [];

  async function walk(dir: string) {
    const entries =
      await fs.readdir(dir, {
        withFileTypes: true,
      });

    for (const entry of entries) {
      const fullPath =
        path.join(dir, entry.name);
        if (
  SKIP_DIRS.some((dir) =>
    fullPath.includes(dir)
  )
) {
  continue;
}
        

      if (
        entry.isDirectory()
      ) {
        if (
          IGNORED_FOLDERS.includes(
            entry.name
          )
        ) {
          continue;
        }

        await walk(fullPath);
      } else {
        const ext =
          path.extname(entry.name);

        if (
          ALLOWED_EXTENSIONS.includes(
            ext
          )
        ) {
          files.push(fullPath);
        }
      }
    }
  }

  await walk(rootPath);

  return files;
}