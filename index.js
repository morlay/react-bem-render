exports.bemRender = require('./libs/bemRender');

exports.render = function () {
  if (typeof this.$render === 'function') {
    return this.bemRender(this.$render());
  }
  return null;
};

