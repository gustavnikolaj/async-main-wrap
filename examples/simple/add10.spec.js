const add10 = require("./");
const expect = require("unexpected");

it("should add 10 to 1", () => {
  return expect(add10(1), "to be fulfilled with", 11);
});

it("should add 10 to 11", () => {
  return expect(add10(11), "to be fulfilled with", 21);
});

it("should add 10 to -1", () => {
  return expect(add10(-1), "to be fulfilled with", 9);
});

it("should add 10 to 0", () => {
  return expect(add10(0), "to be fulfilled with", 10);
});

it("should reject adding 10 to a string", () => {
  return expect(
    add10("foo"),
    "to be rejected with",
    "You must pass in a number."
  );
});

it("should reject adding 10 to undefined", () => {
  return expect(add10(), "to be rejected with", "You must pass in a number.");
});
