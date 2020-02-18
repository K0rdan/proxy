// Lib imports
import { spawn } from "child_process";
import { values, flattenDeep, join } from "lodash";
import stripAnsiStream from "strip-ansi-stream";
import chalk from "chalk";
import { DEBUG } from "@env";
// Custom imports
import { log, getEnv } from "utils/index";

const cmdName = "set";

const logCmd = cmd =>
  log.debug(
    cmdName,
    `Command executed : ${chalk.bgRed(
      chalk.white(join(flattenDeep(values(cmd)), " "))
    )}`
  );

const executeCmd = (cmd, debug) => {
  if (debug) {
    logCmd(cmd);
  }

  return stripAnsiStream().pipe(spawn(cmd.binary, cmd.command));
};

/** @function Set
 * @description Set the proxy's configuration for the specified project
 * @param {commandCallback} commandCallback
 * @param {string} project Environment variable of Docker project.
 * @return {ChildProcess} An instance of the class ChildProcess.
 */

export const set = (withEventListeners, flags) => {
  if (DEBUG === "true" || flags.globals.debug) {
    log.debug(cmdName, `Current working directory : '${process.cwd()}'.`);
  }

  if (flags.project && flags.project === "carrefour") {
    const {
      PROXY_HOST,
      PROXY_PORT,
      PROXY_USER,
      PROXY_PASS,
      AUTOMATIC_CONF_URL
    } = getEnv(flags.project);

    const commandList = [];

    if (AUTOMATIC_CONF_URL) {
      commandList.push(
        `networksetup -setautoproxyurl Wi-Fi ${AUTOMATIC_CONF_URL}`
      );
    }

    if (PROXY_HOST && PROXY_PORT) {
      if (PROXY_USER && PROXY_PASS) {
        commandList.push(
          `security delete-internet-password -s ${PROXY_HOST}`,
          `networksetup -setwebproxy Wi-Fi ${PROXY_HOST} ${PROXY_PORT} on ${PROXY_USER} ${PROXY_PASS}`,
          `networksetup -setsecurewebproxy Wi-Fi ${PROXY_HOST} ${PROXY_PORT} on ${PROXY_USER} ${PROXY_PASS}`
        );
      } else {
        commandList.push(
          `networksetup -setwebproxy Wi-Fi ${PROXY_HOST} ${PROXY_PORT} off`,
          `networksetup -setsecurewebproxy Wi-Fi ${PROXY_HOST} ${PROXY_PORT} off`
        );
      }
    }

    commandList.forEach(command => {
      const childProcess = executeCmd(
        {
          binary: "sh",
          command: ["-c", command]
        },
        DEBUG == true || flags.globals.debug
      );
      if (typeof withEventListeners === "function") {
        const eventListeners = withEventListeners(childProcess, cmdName);
        if (Array.isArray(eventListeners) && eventListeners.length > 0) {
          eventListeners.map(
            listener =>
              typeof listener === "function" && listener(childProcess, cmdName)
          );
        }
      }
    });

    // const childProcess = executeCmd(
    //   {
    //     binary: "sh",
    //     command: ["-c", "export", `HTTP_PROXY=${proxy_url}`]
    //   },
    //   DEBUG == true || flags.globals.debug
    // );

    // const childProcess2 = executeCmd(
    //   {
    //     binary: "sh",
    //     command: ["-c", `env`]
    //   },
    //   DEBUG == true || flags.globals.debug
    // );

    //return childProcess;
  } else {
    log.err(cmdName, `Unknown project argument : '${flags.project}'`);
  }
};

export default set;
