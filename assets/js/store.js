import { createStore } from 'redux';
import { root_reducer } from './reducers/root';

/*
  Application state layout
  {

  }
*/

let store = createStore(root_reducer);
export default store;
