export const sortBranches = (
  allBranches: string[],
  mergedBranches: string[]
): string[] => {
  const sortedBranches = [...allBranches].sort((branchA, branchB) => {
    const isBranchAMerged = mergedBranches.includes(branchA);
    const isBranchBMerged = mergedBranches.includes(branchB);

    if (isBranchAMerged && !isBranchBMerged) {
      return -1;
    } else if (!isBranchAMerged && isBranchBMerged) {
      return 1;
    } else {
      return 0;
    }
  });

  return sortedBranches;
};
