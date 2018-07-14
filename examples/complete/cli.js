#!/usr/bin/env node

const asyncMainWrap = require("../../");
const main = require("./cliMain");

asyncMainWrap(main)({ args: process.argv.slice(2) });
