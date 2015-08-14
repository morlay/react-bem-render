exports.bemRender = require('./bemRender')
exports.bemDecorator = require('./bemDecorator')

exports.pickBemProps = function (props) {

  var bemProps = [
    '$$bemRendered',
    '$$parentBlock',
    'block',
    'elem',
    'mods',
    'className'
  ];

  var copy = {};
  var keys = Object.keys(props);
  var key = '';
  var len = keys.length;

  if (len) {
    while (len--) {
      key = keys[len];
      if (bemProps.indexOf(key) > -1) {
        copy[key] = props[key];
      }
    }
  }

  return copy;

};

exports.componentWillMount = function () {
  this.$$block = require('./camelCase2Dash')(this.constructor.displayName);
};

exports.render = function () {
  if (typeof this.$render === 'function') {
    return this.bemRender(this.$render());
  }
  return null;
};
