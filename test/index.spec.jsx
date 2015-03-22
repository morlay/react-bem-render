import React from 'react/addons'
import ReactBemRender from '../.'
import bemRender from '../libs/bemRender'
import { assert, should } from 'chai'

describe(__filename, function () {

  it('use as mixin should work well', function () {

    const Component = React.createClass({
      mixins: [ReactBemRender],
      $render() {
        return (
          <header block={this.$$block}>
            <h1 elem='title'></h1>
            <p></p>
          </header>
        )
      }
    });

    const string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '' +
      '<header class="component">' +
      '<h1 class="component__title"></h1>' +
      '<p></p>' +
      '</header>'
    )

  });

});

