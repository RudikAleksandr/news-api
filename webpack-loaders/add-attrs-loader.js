const loaderUtils = require('loader-utils');

module.exports = function removeAttrsLoader(source) {
  const { attrs } = loaderUtils.getOptions(this);
  const obj = JSON.parse(source);
  const keys = Object.keys(attrs);

  keys.forEach((key) => {
    obj[key] = attrs[key];
  });

  return JSON.stringify(obj);
};
