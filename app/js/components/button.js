var most = require('most');
var { h1, button} = require('@cycle/dom');

function intent(sources){
  return {
    props$: sources.props
  }
}

function model(actions){
  return actions.props$.map(props => {
    return {
      text: props.text
    };
  });
}

function view(state$){
  return state$.map(state => {
    return button(state.text);
  }); 
}


module.exports = function button(sources) {
  return {
    DOM: view(model(intent(sources)))
  };
}
