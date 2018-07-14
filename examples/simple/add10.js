module.exports = function add10(n) {
  if (typeof n !== "number" || isNaN(n)) {
    return Promise.reject(new Error("You must pass in a number."));
  }

  return Promise.resolve(10 + n);
};
