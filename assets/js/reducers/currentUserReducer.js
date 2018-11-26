import {
    USER_LOGOUT,
    LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILED,
    SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILED,
    FETCH_SESSION, FETCH_SESSION_SUCCESS, FETCH_SESSION_FAILED, LOGOUT_USER,
    FETCH_USER_INFO, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILED
} from '../Actions/users';

const INITIAL_STATE = {
    user_id: null,
    token: null,
    error: null,
    user_type: null,
    logged_in: false,
    user_info: null,
}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_USER_INFO_SUCCESS:
            console.log(action.payload)
            return Object.assign({}, state, { user_info: action.payload });
        case FETCH_SESSION_SUCCESS:
            return Object.assign({}, state, { user_id: action.payload.user_id, token: action.payload.token, user_type: action.payload.user_type, logged_in: true });
        case FETCH_SESSION_FAILED:
            return INITIAL_STATE;
        case LOGOUT_USER:
            return Object.assign({}, state, INITIAL_STATE);
        case LOGIN_USER_SUCCESS:
            return Object.assign({}, state, { user_id: action.payload.user_id, token: action.payload.token, user_type: action.payload.user_type, logged_in: true })
        case LOGIN_USER_FAILED:
            return Object.assign({}, state, { user_id: null, token: null, user_type: null, error: action.payload, logged_in: false });
        default:
            return state;
    }
}