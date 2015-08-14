## React Bem Render

just a simple bem render to auto add bem classes in a component.

[![Build Status](https://travis-ci.org/morlay/react-bem-render.svg?branch=master)](https://travis-ci.org/morlay/react-bem-render)
[![Dependencies](https://david-dm.org/morlay/react-bem-render.svg)](https://david-dm.org/morlay/react-bem-render)

## Usage

Use as a mixin:
```js
var ReactBemRender = require('react-bem-render');
var Component = React.createClass({
  mixins: [ReactBemRender],
  $render: function () {
    return (
      <header block='block-name' mods={{ active: true }}>
        <h1 elem='title'></h1>
        <p></p>
        </header>
      )
    }
  });
```

this will transform to

```js
  <header class='block-name block-name--active'>
    <h1 class='block-name__title'></h1>
   <p></p>
  </header>
```

or use decorator
```js
var bemDecorator = require('react-bem-render').bemDecorator;
var Component = React.createClass({
   @bemDecorator
   render: function () {
    return <header block='block-name' mods={{ active: true }} />
   }
});
```

###  Some rules

* when `block` and `elem` be used together, they will be a mix.
* mods will be worked with `block` by default, if no `block`, it will be worked with `elem`.
* for React Component if `block` set, it will render in parent.

more examples, please see the test cases.


### Change Logs

* `0.2.0` update to support React 0.13.x
* `< 0.1.6` only support React 0.12.x
