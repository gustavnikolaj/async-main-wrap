const add10 = require("./");

module.exports = async function({ logger = console, args }) {
  // Parse out the argument.
  const n = parseInt(args[0]);

  // Call our library method.
  const result = await add10(n);

  // Generate output.
  logger.log(result);
};
