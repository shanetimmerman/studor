import { combineReducers } from 'redux';
import searchPageReducer from './searchPageReducer';
import sessionPageReducer from './sessionPageReducer';
import currentUserReducer from './currentUserReducer';
import apiReducer from './apiReducer';


export const root_reducer = combineReducers({
    searchPage: searchPageReducer,
    sessionPage: sessionPageReducer,
    apiData: apiReducer,
    currentUser: currentUserReducer,
})