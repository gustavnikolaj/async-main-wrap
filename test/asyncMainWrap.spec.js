const path = require("path");
const { exec } = require("child_process");
const expect = require("unexpected");

function resolveFixture(name) {
  return path.resolve(__dirname, "__fixtures__", `${name}/${name}`);
}

function execAsync(cmd) {
  return new Promise((resolve, reject) => {
    try {
      exec(cmd, (error, stdout, stderr) => {
        if (!error) {
          error = { code: 0 };
        }

        resolve({
          error,
          stdout,
          stderr
        });
      });
    } catch (e) {
      reject(e);
    }
  });
}

it("should execute the method passed in", async () => {
  const fixture = resolveFixture("success");
  const result = await execAsync(fixture);

  expect(result, "to satisfy", {
    error: { code: 0 },
    stdout: "SUCCESS\n",
    stderr: ""
  });
});

it("should work with esm", async () => {
  const fixture = resolveFixture("esm");
  const result = await execAsync(fixture);

  expect(result, "to satisfy", {
    error: { code: 0 },
    stdout: "SUCCESS\n",
    stderr: ""
  });
});

it("should error and exit with status code 1", async () => {
  const fixture = resolveFixture("error");
  const result = await execAsync(fixture);

  expect(result, "to satisfy", {
    error: { code: 1 },
    stdout: "",
    stderr: /^Error: TEST_ERROR/
  });
});

it("should error out if the promise resolves with a value", async () => {
  const fixture = resolveFixture("returns");
  const result = await execAsync(fixture);

  expect(result, "to satisfy", {
    error: { code: 0 },
    stdout: "",
    stderr: ""
  });
});

it("should error out if the method returns anything", async () => {
  const fixture = resolveFixture("nonPromise");
  const result = await execAsync(fixture);

  expect(result, "to satisfy", {
    error: { code: 1 },
    stdout: "",
    stderr: /^Error: The wrapped method must return a promise/
  });
});

it("should error out if no method is passed in", async () => {
  const fixture = resolveFixture("undefined");
  const result = await execAsync(fixture);

  expect(result, "to satisfy", {
    error: { code: 1 },
    stdout: "",
    stderr: /^Error: You must pass in a function./
  });
});

it("should error out if no method is passed in", async () => {
  const fixture = resolveFixture("forwardArgs");
  const result = await execAsync(`${fixture} foo bar baz`);

  expect(result, "to satisfy", {
    error: { code: 0 },
    stdout: "foo\nbar\nbaz\n",
    stderr: ""
  });
});

it("should exit with a custom exit code", async () => {
  const fixture = resolveFixture("exitCode");
  const result = await execAsync(fixture);

  expect(result, "to satisfy", { error: { code: 42 } });
});

describe("invalid options", () => {
  it("should complain if you pass it an unsupported option", async () => {
    const fixture = resolveFixture("unsupportedOption");
    const result = await execAsync(fixture);

    expect(result, "to satisfy", {
      stderr: /^Unsupported option "unsupportedOption".\nError: Unsupported options/
    });
  });
});

describe("processError option", () => {
  it("should complain about non-function processError option", async () => {
    const fixture = resolveFixture("nonFunctionProcessError");
    const result = await execAsync(fixture);

    expect(result, "to satisfy", {
      stderr: /^Error: Invalid option "processError" of value "string". Must be a function./
    });
  });

  it("should work run invariant error through frame-popper", async () => {
    const fixture = resolveFixture("framePopper");
    const result = await execAsync(fixture);

    expect(result, "to satisfy", {
      stderr: /Invariant Violation: This is never going to work!\n    at module.exports/
    });
  });
});
