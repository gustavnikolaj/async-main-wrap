module.exports = async function () {
  const err = new Error("Foo");

  err.customOutput = `This is my custom output.`;

  throw err;
};
