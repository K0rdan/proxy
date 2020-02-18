import set from "commands/set";
import unset from "commands/unset";

export { default as set } from "commands/set";
export { default as unset } from "commands/unset";

// GLOBAL TYPEDEF
/** @callback commandCallback Callback function.
 * @param {String} commandName Name of the command
 * @param {ChildProcess} childProcess
 */

export const commands = {
  set,
  unset
};

export default commands;
