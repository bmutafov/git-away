import { exec } from "child_process";

exec("git", (err, std) => {
  process.stdout.write(std);
});
