#!/usr/bin/env node
// Lib imports
import program from "commander";
import { get } from "lodash";
// Custom imports
import { set, unset } from "commands/index";
import { cleanResponse, log } from "utils/index";

const stdoutListener = (stream, cmdName) =>
  stream.stdout.on("data", data => log.info(cmdName, cleanResponse(data)));
const stderrListener = (stream, cmdName) =>
  stream.stderr.on("data", data => log.err(cmdName, cleanResponse(data)));
const withStandardListeners = () => [
  (stream, cmdName) => stdoutListener(stream, cmdName),
  (stream, cmdName) => stderrListener(stream, cmdName)
];

// OPTIONS
program.option("-d, --debug", "Add debug informations");

// RUN
program
  .command("set <project>")
  .description("Set the proxy configurations for the specified project")
  .action((project, args) => {
    const flags = {
      globals: get(args, `parent`, {}),
      project
    };
    return set(withStandardListeners, flags);
  });

program
  .command("unset")
  .description("Delete all proxy configuration")
  .action((_, args) => {
    const flags = {
      globals: get(args, `parent`, {})
    };
    return unset(withStandardListeners, flags);
  });

program.parse(process.argv);
