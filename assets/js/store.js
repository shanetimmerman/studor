import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import $ from 'jquery';

/*
  Application state layout
  {

  }
*/


// For each component of the state:
//  * Function with the same name
//  * Default is the default value of that component

function root_reducer(state0, action) {

    let reducer = combineReducers({});
    let state1 = reducer(state0, action);

    return deepFreeze(state1);
  }

  let store = createStore(root_reducer);
  export default store;
