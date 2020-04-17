const asyncGlob = require("util").promisify(require("glob"));
const yargs = require("yargs");
const path = require("path");

module.exports = async function (defaultCwd, args) {
  const argv = yargs
    .option("cwd", {
      type: "string",
      describe: "Set the cwd for the search.",
      coerce: (cwd) => path.resolve(defaultCwd, cwd),
    })
    .alias("h", "help")
    .option("mark", {
      type: "boolean",
      describe: "Mark directories with a trailing /",
    })
    .option("dot", {
      type: "boolean",
      describe: "Include `.dot` files in normal matches and globstar matches.",
    })
    .option("nosort", {
      type: "boolean",
      describe: "Don't sort the results.",
    })
    .option("nocase", {
      type: "boolean",
      describe: "Perform a case-insensitive match.",
    })
    .option("silent", {
      type: "boolean",
      describe:
        "When an unusual error is encountered when attempting to " +
        "read a directory, a warning will be printed to stderr. " +
        "This option set to true suppress these warnings.",
    })
    .command("$0 <pattern>", false, (yargs) => {
      yargs.positional("pattern", {
        describe: "The pattern to glob for.",
        type: "string",
        require: true,
      });
    })
    .demandCommand(1)
    .strict()
    .parse(args);

  if (argv._.length > 0) {
    throw new Error("You should only pass 1 argument.");
  }

  const files = await asyncGlob(argv.pattern, {
    cwd: argv.cwd || defaultCwd,
    mark: argv.mark,
    dot: argv.dot,
    silent: argv.silent,
    nosort: argv.nosort,
    nocase: argv.nocase,
  });

  for (const file of files) {
    console.log(file);
  }
};
