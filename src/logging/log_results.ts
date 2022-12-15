import { green, red } from "colorette";
import { GitDeleteBranchException } from "../branch-operations/delete_branch";

export const logResults = (result: PromiseSettledResult<string>) => {
  if (result.status === "rejected") {
    const reason = result.reason as GitDeleteBranchException;
    console.log(red(`❌ ${reason.message}`));
    return;
  }

  console.log(green(`✅ Branch ${result.value} deleted successfully`));
};
