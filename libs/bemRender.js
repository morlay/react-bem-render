var React = require('react');
var ELEM_DELIM = '__';
var MOD_DELIM = '--';

module.exports = function (reactElement) {
  if (React.isValidElement(reactElement)) {
    return bemRender(reactElement)
  }
  return null;
};

function bemRender(reactElement, parentBlock) {

  var props = reactElement.props || reactElement._store.props;

  if (type(reactElement.type) === 'Function') {
    props._parentBlock = parentBlock;
    return reactElement;
  }

  if (!props.block && !props.elem) {
    // block or elem should have one or both
    return reactElement;
  }

  parentBlock = props._parentBlock || parentBlock;

  var curBlock = props.block || parentBlock;

  var entity;
  var classNames = {};

  entity = curBlock;

  if (props.elem) {
    if (props.block) {
      if (type(props.elem) !== 'String') {
        props.elem = props.block;
      }
      classNames[entity] = true;
      classNames[[parentBlock, props.elem].join(ELEM_DELIM)] = true;
    } else {
      entity = [curBlock, props.elem].join(ELEM_DELIM);
    }
  }

  classNames[entity] = true;

  if (type(props.mods) === 'Object') {
    var mods = props.mods;
    Object.keys(mods).forEach(function (modName) {
      if (mods[modName]) {
        classNames[entity + MOD_DELIM + modName + (mods[modName] === true ? '' : MOD_DELIM + mods[modName])] = true
      }
    });
  }

  var classList = cx(classNames);

  if (classList) {
    props.className = props.className
      ? props.className + " " + classList
      : classList;
  }

  parentBlock = curBlock;

  React.Children.forEach(props.children, function (childElement) {
    if (React.isValidElement(childElement)) {
      bemRender(childElement, parentBlock)
    }
  });

  return reactElement;

}

function cx(classNames) {
  return Object.keys(classNames).join(' ');
}

function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
}
