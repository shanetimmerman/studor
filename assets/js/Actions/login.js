import store from '../store';
import $ from 'jquery';
import Cookie from 'js-cookie';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILED = 'SIGNUP_USER_FAILED';

export const FETCH_SESSION = 'FETCH_SESSION';
export const FETCH_SESSION_SUCCESS = 'FETCH_SESSION_SUCCESS';
export const FETCH_SESSION_FAILED = 'FETCH_SESSION_FAILED';

export const LOGOUT_USER = 'DELETE_SESSION';

const USER_COOKIE = 'user';

// user enters stuff -> clicks sign up -> goes to form -> submit -> dispatch signup user -> on success dispatch login user -> ok
// user enters stuff -> clicks login -> on success dispatch login user success, just logs them in -> on fail dispatch login user failed, shows error
export function fetch_session() {
    let data = Cookie.getJSON('user');

    if (data) {
        store.dispatch({
            type: FETCH_SESSION_SUCCESS,
            data: data,
        });
    } else {
        store.dispatch({
            type: FETCH_SESSION_FAILED,
        });
    }
}

export function loginUser(email, password, type) {
    $.ajax(
        "/api/v1/sessions", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ email: email, password: password, user_type: type }),
            success: (resp) => {
                console.log("nice job")
                console.log(resp.data)
                Cookie.set(USER_COOKIE, resp.data);

                store.dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: resp.data,
                });
            },
            error: (resp) => {
                store.dispatch({
                    type: LOGIN_USER_FAILED,
                    payload: resp.data,
                });
            }
        }
    );
}

export function logoutUser() {
    Cookie.remove(USER_COOKIE);
    store.dispatch({
        type: LOGOUT_USER,
    })
}

export function createUser(userInfo, userType) {
    console.log("creating user")
    console.log(userInfo)
}