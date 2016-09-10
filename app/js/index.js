var most = require('most');
var run = require('@cycle/most-run').default.run;
var { makeDOMDriver, h1, div } = require('@cycle/dom');
var isolate = require('@cycle/isolate').default;

var timer = require('./components/timer.js');
var button = require('./components/button.js');

function main(sources) {
  var props = most.of({ text: "hello" });
  var testButton = button({ props: props });
  var buttonVTree$ = testButton.DOM;

  var timerVTree$ = timer().DOM;

  var sinks = {
    DOM: most.combine((buttonVTree, timerVTree) => {
      return div([buttonVTree, timerVTree])
    }, buttonVTree$, timerVTree$)
  };

  return sinks;
}

var drivers = {
  DOM: makeDOMDriver('#root')
};

run(main, drivers);
