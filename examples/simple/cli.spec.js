const path = require("path");
const { exec } = require("child_process");
const expect = require("unexpected");

it("should add 10 to 1", () => {
  const cmd = path.resolve(__dirname, "cli.js");
  return expect(
    (callback) => exec(`${cmd} 1`, callback),
    "to call the callback without error"
  ).then(([stdout, stderr]) => {
    expect(stderr, "to equal", "");
    return expect(stdout, "to equal", "11\n");
  });
});

it("should error out if no arguments is passed", () => {
  const cmd = path.resolve(__dirname, "cli.js");
  return expect(
    (callback) => exec(`${cmd}`, callback),
    "to call the callback with error",
    /You must pass in a number/
  );
});
