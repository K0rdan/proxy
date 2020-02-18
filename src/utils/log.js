// Lib imports
import chalk from "chalk";
// Custom imports
import constants from "utils/constants";

const {
  applicationName,
  log: { level: logLevel }
} = constants;

const commonLog = (cmdName, level) =>
  `[${applicationName}][${cmdName.toUpperCase()}][${level.toUpperCase()}]`;

export const log = {
  debug: (cmdName, msg) =>
    console.log(`${chalk.yellow(commonLog(cmdName, logLevel.debug))} ${msg}`),
  info: (cmdName, msg) =>
    console.log(`${chalk.green(commonLog(cmdName, logLevel.info))} ${msg}`),
  err: (cmdName, msg) =>
    console.log(`${chalk.red(commonLog(cmdName, logLevel.error))} ${msg}`)
};

export default log;
