import {
    USER_LOGOUT, UPDATE_USER,
} from '../Actions/users';

import {
    LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED,
    SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILED,
    FETCH_SESSION, FETCH_SESSION_SUCCESS, FETCH_SESSION_FAILED, LOGOUT_USER
} from '../Actions/login'

import Cookie from 'js-cookie';

const INITIAL_STATE = Cookie.getJSON('user') || {
    user_id: 1,
    token: null,
    error: null
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_USER:
            return Object.assign({}, state, { user_id: action.payload.user_id, token: action.payload.token });
        case LOGOUT_USER:
            return Object.assign({}, state, { user_id: null, token: null });
        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, { user_id: action.payload.user_id, token: action.payload.token })
        case LOGIN_USER_FAILED:
            return Object.assign({}, state, { user_id: null, token: null, error: action.payload });
        default:
            return state;
    }
}