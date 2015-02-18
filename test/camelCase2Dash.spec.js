var camelCase2Dash = require('../libs/camelCase2Dash');
var assert = require('chai').assert;
var should = require('chai').should();

describe(__filename, function () {

  it('should translate', function () {
    assert.equal(camelCase2Dash('App'), 'app');
    assert.equal(camelCase2Dash('AppName'), 'app-name');
    assert.equal(camelCase2Dash('appName'), 'app-name');
  });

  it('should throw error when input is not a string', function () {
    (function () {
      camelCase2Dash(function () {
      })
    }).should.Throw();
  });

});
