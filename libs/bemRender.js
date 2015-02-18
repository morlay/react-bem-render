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

  if (type(reactElement.type) === 'Function' && !props.block) {
    // render in inner component
    props.$$parentBlock = parentBlock;
    updateChildren(props.children, parentBlock);
    return reactElement;
  }

  parentBlock = props.$$parentBlock || parentBlock;

  if (!props.block && !props.elem) {
    props.$$bemRendered = true;
  }

  var curBlock = props.block || parentBlock;

  if (!props.$$bemRendered) {

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

    updateModifies(props.mods, entity, classNames);

    mergeClasses(props, cx(classNames));

  }

  updateChildren(props.children, curBlock);

  return reactElement;

}

function updateModifies(mods, entity, classNames) {
  if (type(mods) === 'Object') {
    Object.keys(mods).forEach(function (modName) {
      if (mods[modName]) {
        classNames[entity + MOD_DELIM + modName + (mods[modName] === true ? '' : MOD_DELIM + mods[modName])] = true
      }
    });
  }
}

function updateChildren(children, parentBlock) {
  React.Children.forEach(children, function (childElement) {
    if (React.isValidElement(childElement)) {
      bemRender(childElement, parentBlock)
    }
  });
}

function mergeClasses(props, classList) {
  if (classList) {
    props.className = props.className
      ? props.className + " " + classList
      : classList;
    props.$$bemRendered = true;
  }
}

function cx(classNames) {
  return Object.keys(classNames).join(' ');
}

function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
}
