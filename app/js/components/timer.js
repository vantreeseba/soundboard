var most = require('most');
var { h1 } = require('@cycle/dom');

var start = Math.random();

module.exports = function timer(sources) {
  var sinks = {
    DOM: most
      .iterate(f => f + 1, 0)
      .take(10)
      .flatMap(v => most.of(v).delay(v * 1000))
      .map(i => h1('' + i + ' seconds elapsed'))
  };

  return sinks;
}
