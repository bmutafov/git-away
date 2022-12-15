#!/usr/bin/env node
import * as color from "colorette";
import inquirer from "inquirer";
import {
  getAllBranches,
  getMergedBranches,
  sortBranches,
  colorCodeBranches,
  deleteBranch,
} from "./branch-operations/index.js";
import { logResults, MESSAGES, log } from "./logging/index.js";

console.clear();

const run = async () => {
  const { currentBranch, otherBranches } = await getAllBranches();
  const mergedBranches = await getMergedBranches(currentBranch);
  const sortedBranches = sortBranches(otherBranches, mergedBranches);

  log(MESSAGES.currentBranchMessage(currentBranch));

  if (otherBranches.length === 0) {
    log(MESSAGES.noBranchesFound);
    process.exit(0);
  }

  log(MESSAGES.colorCodeHelper);

  const answers = await inquirer.prompt([
    {
      type: "checkbox",
      message: `Which branches would you like to delete?`,
      name: "toDelete",
      choices: colorCodeBranches(sortedBranches, mergedBranches),
      default: mergedBranches,
      pageSize: 20,
      loop: false,
    },
    {
      type: "confirm",
      name: "confirm",
      message: ({ toDelete }) => {
        const colorCodedBranches = colorCodeBranches(
          toDelete,
          mergedBranches
        ).map((branch) => {
          if (branch instanceof inquirer.Separator) return null;
          return color.reset(branch.name);
        });
        const formattedBranches = colorCodedBranches
          .map(MESSAGES.formattedConfirmationBranches)
          .join("");

        return `The following branches were selected to be deleted. Are you sure you want to proceed? ${formattedBranches}?`;
      },
    },
  ]);

  const hasConfirmed =
    answers.confirm === undefined || answers.confirm === true;
  const hasBranchesToDelete = answers.toDelete.length > 0;

  if (hasConfirmed && hasBranchesToDelete) {
    const deleteOperations = await Promise.allSettled<string>(
      answers.toDelete.map(deleteBranch)
    );
    deleteOperations.forEach(logResults);
  } else {
    log(MESSAGES.noBranchesDeleted);
  }
};

run();
