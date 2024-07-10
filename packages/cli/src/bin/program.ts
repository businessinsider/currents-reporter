import { Command } from "@commander-js/extra-typings";
import chalk from "chalk";

import { reporterVersion } from "../env/versions";
import { dim } from "../logger";
import {
  ciBuildIdOption,
  debugOption,
  disableTitleTagsOption,
  machineIdOption,
  projectOption,
  recordKeyOption,
  removeTagOption,
  reportDirOption,
  tagOption,
} from "./options";

type CurrentsReporterCommand = Partial<
  ReturnType<ReturnType<typeof getCurrentsReporterCommand>["opts"]>
>;

const NAME = "currents";
export const getProgram = (
  command: Command<[], CurrentsReporterCommand> = getCurrentsReporterCommand()
) => command.version(reporterVersion);

const currentsReporterExample = `
----------------------------------------------------
📖 Documentation: https://docs.currents.dev
🤙 Support:       support@currents.dev
----------------------------------------------------

${chalk.bold("Examples")}

Upload test results to Currents:
${dim(`${NAME} upload --key <record-key> --project-id <id> --ci-build-id <build-id>`)}

Upload test results to Currents, add tags "tagA", "tagB" to the recorded run:
${dim(
  `${NAME} upload --key <record-key> --project-id <id> --ci-build-id <build-id> --tag tagA --tag tagB`
)}

Provide a custom path to the reports directory:
${dim(
  `${NAME} upload --key <record-key> --project-id <id> --ci-build-id <build-id> --report-dir <report-dir>`
)}
`;

export const getCurrentsReporterCommand = () => {
  const command = new Command()
    .name(NAME)
    .command("upload")
    .showHelpAfterError("(add --help for additional information)")
    .allowUnknownOption()
    .description(
      `Upload test results generated by Currents reporters to https://currents.dev
${currentsReporterExample}`
    )
    .addOption(ciBuildIdOption)
    .addOption(recordKeyOption)
    .addOption(projectOption)
    .addOption(tagOption)
    .addOption(removeTagOption)
    .addOption(disableTitleTagsOption)
    .addOption(machineIdOption)
    .addOption(debugOption)
    .addOption(reportDirOption);

  return command;
};
