'use strict';

var bemRender = require('./bemRender');

function bemDecorator(target, name, descriptor) {

  var render = descriptor.value;

  if (typeof render !== 'function' && name == 'render') {
    throw new Error('@bem decorator can only be applied to render method not: ' + typeof render);
  }

  descriptor.value = function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return bemRender(render.bind(this)(args));
  };

  return descriptor;
}

module.exports = bemDecorator;