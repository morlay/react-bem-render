import { assert } from 'chai'

import React from 'react/addons'
import bemRender from '../src/bemRender'

describe(__filename, function () {

  it('prop block and elem in children should work well', function () {

    const Component = React.createClass({
      render() {
        return bemRender(
          <header block='block'>
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
      '<header class="block">' +
      '<h1 class="block__title"></h1>' +
      '<p></p>' +
      '</header>'
    )

  });

  it('prop block and elem should work well', function () {

    const Component = React.createClass({
      render() {
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

    const string = React.renderToStaticMarkup(
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

    const Component = React.createClass({
      render() {
        var modifies = {
          active: true
        };
        return bemRender(
          <header block='block' mods={modifies} />
        )
      }
    });

    const string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '<header class="block block--active"></header>')

  });

  it('multi modifies should work well', function () {

    var Component = React.createClass({
      render() {
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

    const Title = React.createClass({
      render() {
        return bemRender(
          <h1 {...this.props} block='title' />
        );
      }
    });

    const Component = React.createClass({
      render() {
        return bemRender(
          <header block='component'>
            <Title elem mods={{active: true}}/>
          </header>
        )
      }
    });

    const string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '' +
    '<header class="component">' +
    '<h1 class="title component__title title--active"></h1>' +
    '</header>')

  });

  it('when block in Component should render className first', function () {

    const Title = React.createClass({
      render() {
        return (
          <h1 {...this.props} />
        );
      }
    });

    const Component = React.createClass({
      render() {
        return bemRender(
          <header block='component'>
            <Title block='title' elem mods={{active: true}}/>
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


  it('parent rendered will stop render inner', function () {

    const Title = React.createClass({
      render() {
        return bemRender(
          <h1 {...this.props} block='title' />
        );
      }
    });

    const Component = React.createClass({
      render() {
        return bemRender(
          <header block='component'>
            <Title block='title' elem mods={{active: true}}/>
          </header>
        )
      }
    });

    const string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '' +
    '<header class="component">' +
    '<h1 class="title component__title title--active"></h1>' +
    '</header>')

  });

  it('array should work well', function () {

    const Component = React.createClass({
      renderItem: function () {
        var list = [1, 2, 3, 4, 5];
        return list.map(function (item, idx) {
          return (
            <li key={idx} elem='item'>
              {item}
            </li>
          )
        });
      },
      render() {
        return bemRender(
          <ul block='list'>
           {this.renderItem()}
          </ul>
        )
      }
    });

    const string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '' +
    '<ul class="list">' +
    '<li class="list__item">1</li>' +
    '<li class="list__item">2</li>' +
    '<li class="list__item">3</li>' +
    '<li class="list__item">4</li>' +
    '<li class="list__item">5</li>' +
    '</ul>')
  });

  it('in deep dom should work well', function () {


    const Component = React.createClass({
      render() {
        return bemRender(
          <header block='component'>
            <div>
              <div>
                <h1 elem='title' />
              </div>
            </div>
          </header>
        )
      }
    });

    const string = React.renderToStaticMarkup(
      <Component/>
    );

    assert.equal(string, '' +
    '<header class="component"><div><div>' +
    '<h1 class="component__title"></h1>' +
    '</div></div></header>')

  });

});
