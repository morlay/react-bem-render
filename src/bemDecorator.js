var bemRender = require('./bemRender')

function bemDecorator(target, name, descriptor) {

  let render = descriptor.value;

  if (typeof render !== 'function' && 　name == 'render') {
    throw new Error(
      `@bem decorator can only be applied to render method not: ${typeof render}`
    );
  }

  descriptor.value = function () {
    return bemRender(render.bind(this)())
  };

  return descriptor
}

module.exports = bemDecorator;
