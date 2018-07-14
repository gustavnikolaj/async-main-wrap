#!/usr/bin/env node

const asyncMainWrap = require("../../");
const main = require("./");

// Parse out the argument.
const n = parseInt(process.argv[2]);

asyncMainWrap(main)(n).then(result => {
  // Generate output.
  console.log(result);
});
