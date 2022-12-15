import exec from "../utils/exec.js";

class GetMergedException extends Error {}

export const getMergedBranches = async (
  checkoutedBranch: string
): Promise<string[]> => {
  const { stderr, stdout } = await exec("git branch --merged");

  if (stderr) {
    throw new GetMergedException(stderr);
  }

  const branches = stdout
    .replace(/( |\*)/g, "")
    .split("\n")
    .filter((branch) => branch && branch !== checkoutedBranch);

  return branches;
};
