const cliMain = require("./cliMain");
const expect = require("unexpected");

function createConsoleMock() {
  const output = { log: "" };
  const consoleMock = {
    log: (...args) => {
      output.log += `${args.join(" ")}\n`;
    },
  };

  return { consoleMock, output };
}

it("should add 10 to 1", async () => {
  const { consoleMock, output } = createConsoleMock();

  await cliMain({
    args: ["1"],
    logger: consoleMock,
  });

  return expect(output, "to satisfy", {
    log: "11\n",
  });
});

it("should error out if no arguments is passed", () => {
  return expect(
    cliMain({ args: ["foo"] }),
    "to be rejected with",
    "You must pass in a number."
  );
});
