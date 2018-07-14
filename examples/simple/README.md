A simple setup to wrap up a main export as a script.

Files list:

- `add10.js` is our main export.
- `cli.js` is exported as a binary through npm named add10.
- `add10.spec.js` is the tests of our main export.
- `cli.spec.js` is the tests of our binary.

The binary can be invoked the following way (if installed globally):

```
$ add10 1
11
$ add10 11
21
```

The drawback of this method is that the argument passing and the output
generation is contained within the cli.js file. Those will not be particularly
easy to test, but if you have really simple input / output generation code in
your cli.js it might be ok and a neat simple setup.
