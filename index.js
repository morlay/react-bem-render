exports.bemRender = require('./libs/bemRender');

exports.componentWillMount = function () {
  this.$$block = require('./libs/camelCase2Dash')(this.constructor.displayName);
};

exports.render = function () {
  if (typeof this.$render === 'function') {
    return this.bemRender(this.$render());
  }
  return null;
};

