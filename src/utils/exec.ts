import { promisify } from "util";
import { exec as callbackExec } from "child_process";
const exec = promisify(callbackExec);
export default exec;
