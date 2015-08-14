import camelCase2Dash from '../src/camelCase2Dash'
import {
  assert, should
}
from 'chai'

should();

describe(__filename, function () {

  it('should translate', function () {
    assert.equal(camelCase2Dash('App'), 'app');
    assert.equal(camelCase2Dash('AppName'), 'app-name');
    assert.equal(camelCase2Dash('appName'), 'app-name');
  });

  it('should throw error when input is not a string', function () {
    (() => {
      camelCase2Dash(() => {})
    }).should.Throw();
  });

});
