A more complete setup to wrap up a main export as a script.

Files list:

- `add10.js` is our main export.
- `cli.js` is exported as a binary through npm named add10.
- `cliMain.js` is our options and output generation code.
- `add10.spec.js` is the tests of our main export.
- `cliMain.spec.js` is the tests of our main export.

The binary can be invoked the following way (if installed globally):

```
$ add10 1
11
$ add10 11
21
```

Notice that we don't have any tests of the `cli.js` file. There is no code in
there in need of testing - it's just sticking the `cliMain.js` file into the
`async-main-wrap` module.

The tests in `cliMain.js` don't need to bother with calling the actual exported
shellscript, but can use the function directly.

Because the `cliMain.js` file uses `console.log` to output the result, we do
have to mock that in our tests to be able to assert on the generated output,
and not have our test runs output the generated output from our test cases.

The argument passing in this case is really simplistic - but if you add an
actual arguments parser (like `yargs`) it makes it really convenient to test
the argument parsing logic.
