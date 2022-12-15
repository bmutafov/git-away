import exec from "../utils/exec.js";

type GetAllBranches = {
  currentBranch: string;
  otherBranches: string[];
};

class GetAllBranchesException extends Error {}

export const getAllBranches = async (): Promise<GetAllBranches> => {
  const { stderr, stdout } = await exec("git branch");
  const { stdout: currentBranch } = await exec(
    "git rev-parse --abbrev-ref HEAD"
  );

  if (stderr) {
    throw new GetAllBranchesException(stderr);
  }

  const branches = stdout
    .replace(/ /g, "")
    .split("\n")
    .filter((branch) => branch);
  const otherBranches = branches.filter((branch) => !branch.includes("*"));

  return {
    currentBranch,
    otherBranches,
  };
};
