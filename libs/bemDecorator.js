var bemRender = require('./bemRender')

function bemDecorator(target, name, descriptor) {

  let render = descriptor.value;

  if (typeof render !== 'function' && 　name == 'render') {
    throw new Error(
      `@bem decorator can only be applied to render method not: ${typeof render}`
    );
  }

  descriptor.value = function (...args) {
    return bemRender(render.bind(this)(args))
  };

  return descriptor
}

module.exports = bemDecorator;
