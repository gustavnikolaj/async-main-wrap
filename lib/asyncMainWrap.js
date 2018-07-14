function exitWithError(err) {
  console.error(err);

  if (typeof err.exitCode === "number") {
    process.exit(err.exitCode);
  }

  process.exit(1);
}

function asyncMainWrap(main) {
  return function() {
    if (typeof main !== "function") {
      return exitWithError(new Error("You must pass in a function."));
    }

    var promise = main.apply(null, arguments);

    if (!promise || typeof promise.then !== "function") {
      return exitWithError(
        new Error("The wrapped method must return a promise.")
      );
    }

    return promise.then(undefined, function(err) {
      return exitWithError(err);
    });
  };
}

module.exports = asyncMainWrap;
