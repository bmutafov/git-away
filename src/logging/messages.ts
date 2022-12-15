import { blue, bold, cyan, green, red, yellow } from "colorette";

export const MESSAGES = {
  currentBranchMessage: (currentBranch: string) =>
    `${blue("ℹ️")} Current branch: ${blue(currentBranch)}`,
  noBranchesDeleted: yellow("\n⚠ No branches were deleted"),
  noBranchesFound: yellow(
    "\n⚠ No branches other than the currently checked out branch found."
  ),
  colorCodeHelper: `${bold("Legend:\n")}  > ${cyan("blue")} = merged\n  > ${red(
    "red"
  )}  = not merged\n`,
  formattedConfirmationBranches: (branch: string) => `\n ${red("?")} ` + branch,
};
