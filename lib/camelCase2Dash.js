'use strict';

module.exports = function (input) {

  if (typeof input !== 'string') {
    throw new Error('need a string');
  }

  var output = input.replace(/([A-Z])/g, '-$1').toLowerCase();

  if (isDashAtFirst(output)) {
    return output.substring(1);
  }

  return output;
};

function isDashAtFirst(string) {
  return string.indexOf('-') === 0;
}