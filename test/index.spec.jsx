var assert = require('chai').assert;

var React = require('react/addons');
var bemRender = require('../libs/bemRender');
var ReactBemRender = require('../.');

describe(__filename, function () {

  it('use as mixin should work well', function () {

    var Component = React.createClass({
      mixins: [ReactBemRender],
      $render: function () {
        return (
          <header block='block'>
            <h1 elem='title'></h1>
            <p></p>
          </header>
        )
      }
    });

    var string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '' +
      '<header class="block">' +
      '<h1 class="block__title"></h1>' +
      '<p></p>' +
      '</header>'
    )

  });

});

