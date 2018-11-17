import { combineReducers } from 'redux';


const rootreducer = combineReducers({
    header: headerReducer,
    login: loginReducer,
    seachPage: searchPagereducer,
    sessionPage: sessionPageReducer,
    profilePage: profilePageReducer,
    currentSessionPage: currentSessionPageReducer,
    currentUser: currentUserReducer,
})