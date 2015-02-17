/* global window */

var jsdom = require('jsdom').jsdom;
global.document = jsdom('<html><body></body></html>');
global.window = global.document.parentWindow;
global.navigator = window.navigator || {};
