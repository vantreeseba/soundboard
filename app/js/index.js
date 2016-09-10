var most = require('most');
var run = require('@cycle/most-run').default.run;
var {makeDOMDriver, h1, div} = require('@cycle/dom');
var isolate = require('@cycle/isolate').default;

var timer = require('./components/timer.js');
var button = require('./components/button.js');

function main(sources) {
  var props = most.of({text: "hello"});
  var testButton = button({props: props});
  var buttonVTREE = testButton.DOM;

  var timerVTree = timer().DOM;

  var sinks = {
    DOM: timerVTree 
  };

  return sinks;
}

var drivers = {
  DOM: makeDOMDriver('#root')
};

run(main, drivers);
