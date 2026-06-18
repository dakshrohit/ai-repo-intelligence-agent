import simpleGit from "simple-git";
import fs from "fs/promises";
import path from "path";

const git = simpleGit();

export async function cloneRepository(
  repositoryId: string,
  githubUrl: string
) {
  const repoPath = path.join(
    process.cwd(),
    "repositories",
    repositoryId
  );

  await fs.mkdir(
    path.dirname(repoPath),
    { recursive: true }
  );

  await git.clone(
    githubUrl,
    repoPath
  );

  return repoPath;
}