import Cookie from 'js-cookie';
import store from '../store';
import $ from 'jquery'

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';

export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

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
export function fetchSession() {
    let data = Cookie.getJSON('user');
    console.log(data)

    if (data) {
        store.dispatch({
            type: FETCH_SESSION_SUCCESS,
            payload: data,
        });
    } else {
        store.dispatch({
            type: FETCH_SESSION_FAILED,
        });
    }
}

export function loginUser(email, password, type) {
    console.log(email)
    console.log(password)
    console.log(type)

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

function fetchAjax(path, data, callback) {
    $.ajax(
        path, {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: data
        }
    ).done(callback);
}

function postAjax(path, data, callback) {
    $.ajax(
        path, {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: data
        }
    ).done(callback);
}

export function createStudent(accountData, paymentData) {
    console.log("cookin up a studert")
    console.log(accountData);
    console.log(paymentData);
}

export function createTutor(accountData, tutorData, paymentData) {
    console.log("cookin up a tooter")
    console.log(accountData);
    console.log(tutorData);
    console.log(paymentData);
}

export function editStudent(accountData, paymenData) {

}

export function editTutor(accountData, tutorData, paymenData) {

}


