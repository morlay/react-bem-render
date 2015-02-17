var assert = require('chai').assert;

var React = require('react/addons');
var bemRender = require('../libs/bemRender');

describe(__filename, function () {

  it('prop block and elem in children should work well', function () {

    var Component = React.createClass({
      render: function () {
        return bemRender(
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

  it('prop block and elem should work well', function () {

    var Component = React.createClass({
      render: function () {
        return bemRender(
          <header block='elem'>
            <h1 elem='heading' />
            <article block='article' elem>
              <h2 elem='title'/>
              <p elem='p' />
            </article>
            <aside block='aside'>
              <h2 elem='title'/>
              <p elem='p' />
            </aside>
          </header>
        )
      }
    });

    var string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '' +
      '<header class="elem">' +
      '<h1 class="elem__heading"></h1>' +
      '<article class="article elem__article">' +
      '<h2 class="article__title"></h2>' +
      '<p class="article__p"></p>' +
      '</article>' +
      '<aside class="aside">' +
      '<h2 class="aside__title"></h2>' +
      '<p class="aside__p"></p>' +
      '</aside>' +
      '</header>'
    );

  });

  it('prop block and mods should work well', function () {

    var Component = React.createClass({
      render: function () {
        var modifies = {
          active: true
        };
        return bemRender(
          <header block='block' mods={modifies} />
        )
      }
    });

    var string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '<header class="block block--active"></header>')

  });

  it('multi modifies should work well', function () {

    var Component = React.createClass({
      render: function () {
        return bemRender(
          <header block='elem' mods={{active: false}}>
            <h1 elem='heading' mods={{active: true}}/>
            <article block='article' elem mods={{active: true}} />
            <aside block='aside' mods={{active: true}} />
          </header>
        )
      }
    });

    var string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '' +
      '<header class="elem">' +
      '<h1 class="elem__heading elem__heading--active"></h1>' +
      '<article class="article elem__article article--active"></article>' +
      '<aside class="aside aside--active"></aside>' +
      '</header>'
    );

  });


  it('mixing in cross Component should work well', function () {

    var Title = React.createClass({
      render: function () {
        return bemRender(
          <h1 {...this.props} block='title' />
        );
      }
    });

    var Component = React.createClass({
      render: function () {
        return bemRender(
          <header block='component'>
            <Title elem mods={{active: true}}/>
          </header>
        )
      }
    });

    var string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '' +
    '<header class="component">' +
    '<h1 class="title component__title title--active"></h1>' +
    '</header>')

  });

});

