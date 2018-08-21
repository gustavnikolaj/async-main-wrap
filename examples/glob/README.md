# glob-cli

The [glob](https://github.com/isaacs/node-glob) module wrapped up as a cli
tool.

## Example use

This cli-tool is only for the purpose of demonstration. The use case is pretty
slim if at all existent and you will almost always be better off using your
operating systems version of `find`.

The first drawback is that you will have to quote all your glob patterns as
passed to the cli tool, otherwise your shell will most likely do the expansion
and not the module.

```
$ ./glob '*.js'
main.js
$ ./glob '*'
glob
main.js
README.md
$ ./glob --cwd ../../ 'lib/**/*.js'
lib/asyncMainWrap.js
```

## Source code description

### `./glob`

Demonstrating simple generic setup of `@gustavnikolaj/async-main-wrap`. Calls
the `main.js` file using the module - that's it.

### `./main.js`

There's four parts of this code:

1. Promisifying glob using node cores `promisify` from the `util` module.
2. Using `yargs` to parse arguments out.
3. Calling `glob` with the arguments from 2.
4. Printing out the matched files.
