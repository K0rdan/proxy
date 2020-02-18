// Lib imports
import ansiRegex from "ansi-regex";

/** @function cleanResponse
 * @description Clean the response Buffer received from the ChildProcess commands' stream.
 * @param {Buffer} bufferData
 * @param {String} command
 */
export const cleanResponse = (bufferData, command) =>
  Buffer.from(bufferData)
    .toString()
    // .replace(/\r/g, "") // Delete \r ('CR') characters
    // .replace(/\n/g, "") // Delete \n ('LF') characters
    // .replace(/\t/g, "") // Delete \t ('tab') characters
    .replace(/\s\s+/g, " ") // Delete consecutive \s ('whitespace') characters
    .replace(ansiRegex(), "") // Delete ANSI (ie: '\u001B[4m') characters
    .trim(); // Delete starting and trailing spaces

export default cleanResponse;
