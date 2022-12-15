import exec from "../utils/exec.js";

export class GitDeleteBranchException extends Error {}

export const deleteBranch = async (branch: string): Promise<string> => {
  const { stderr } = await exec(`git branch -D ${branch}`);

  if (stderr) {
    throw new GitDeleteBranchException(stderr);
  }

  return branch;
};
