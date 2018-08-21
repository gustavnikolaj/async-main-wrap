const glob = require("glob");

module.exports = function asyncGlob(pattern, options) {
  return new Promise((resolve, reject) => {
    glob(pattern, options, (err, files) => {
      if (err) {
        return reject(err);
      }
      return resolve(files);
    });
  });
};
