// Lib imports
import { spawn } from 'child_process';
import { values, flattenDeep, join } from 'lodash';
import stripAnsiStream from 'strip-ansi-stream';
import chalk from 'chalk';
import { DEBUG } from '@env';
// Custom imports
import { log, cleanResponse } from 'utils/index';

const cmdName = 'unset';

const logCmd = cmd =>
  log.debug(
    cmdName,
    `Command executed : ${chalk.bgRed(
      chalk.white(join(flattenDeep(values(cmd)), ' ')),
    )}`,
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

export const unset = (withEventListeners, flags) => {
  if (DEBUG === 'true' || flags.globals.debug) {
    log.debug(cmdName, `Current working directory : '${process.cwd()}'.`);
  }

  [
    'networksetup -setautoproxystate Wi-Fi off',
    'networksetup -setwebproxystate Wi-Fi off',
    'networksetup -setsecurewebproxystate Wi-Fi off',
  ].forEach(command => {
    const childProcess = executeCmd(
      {
        binary: 'sh',
        command: ['-c', command],
      },
      DEBUG == true || flags.globals.debug,
    );
    if (typeof withEventListeners === 'function') {
      const eventListeners = withEventListeners(childProcess, cmdName);
      if (Array.isArray(eventListeners) && eventListeners.length > 0) {
        eventListeners.map(
          listener =>
            typeof listener === 'function' && listener(childProcess, cmdName),
        );
      }
    }
  });
};

export default unset;
