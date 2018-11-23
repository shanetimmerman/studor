import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';
import $ from 'jquery';
import { root_reducer } from './Reducers/root';

/*
  Application state layout
  {

  }
*/

let store = createStore(root_reducer);
export default store;
