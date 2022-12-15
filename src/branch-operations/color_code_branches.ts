import { cyan, red } from "colorette";
import inquirer from "inquirer";

type InquirerOption = { name: string; value: string } | inquirer.Separator;

export const colorCodeBranches = (
  branches: string[],
  mergedBranches: string[]
): InquirerOption[] => {
  const isMerged = (branch: string): boolean => {
    return mergedBranches.includes(branch);
  };

  return branches.flatMap((branch, i, array) => {
    if (!isMerged(branch)) {
      const object = { name: red(branch), value: branch };
      if (isMerged(array[i - 1])) {
        return [new inquirer.Separator(), object];
      }
      return object;
    }

    return { name: cyan(branch), value: branch };
  });
};
