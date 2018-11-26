import Cookie from 'js-cookie';
import store from '../store';
import $ from 'jquery'
import { STUDENT, TUTOR } from '../Constants/userTypes';

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

export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_FAILED = 'FETCH_USER_INFO_FAILED';


export const LOGOUT_USER = 'DELETE_SESSION';

const USER_COOKIE = 'user';

// user enters stuff -> clicks sign up -> goes to form -> submit -> dispatch signup user -> on success dispatch login user -> ok
// user enters stuff -> clicks login -> on success dispatch login user success, just logs them in -> on fail dispatch login user failed, shows error
export function fetchSession() {
    let data = Cookie.getJSON('user');

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

    $.ajax(
        "/api/v1/sessions", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ email: email, password: password, user_type: type }),
            success: (resp) => {
                Cookie.set(USER_COOKIE, resp.data);

                store.dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: resp.data,
                });
            },
            error: (resp) => {

                store.dispatch({
                    type: LOGIN_USER_FAILED,
                    payload: resp,
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
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
        }
    ).done(callback);
}


function putAjax(path, data, callback) {
    $.ajax(
        path, {
            method: "put",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
        }
    ).done(callback);
}

function deleteAjax(path, data, callback) {
    $.ajax(
        path, {
            method: "delete",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
        }
    ).done(callback);
}


export function createStudent(values) {
    postAjax('/api/v1/students/', { student: values },
        (resp) => {
            loginUser(values.email, values.password_hash, STUDENT);
        })
}

export function createTutor(values) {
    postAjax('/api/v1/tutors/', { tutor: values },
        (resp) => {
            loginUser(values.email, values.password_hash, TUTOR);
        })
}


/**
 * Edits the currently signed in student, updating the account information
 * such as name and email.
 * 
 * @param {Object} values, an object including information about the student's account information.
 */
export function updateStudentProfile(values) {
    let state = store.getState();
    let id = state.currentUser.user_id;

    putAjax('/api/v1/students/' + id, { student: values },
        (resp) => {
            // TODO dispatch this
            fetchStudentInfo(id);
        });
}

/**
 * Edits the currently signed in tutor, updating the account information such as
 * Name, Email, GPA, University, and Paypal Email.
 * 
 * @param {Object} values, an object including information about the tutor's account information.
 */
export function udpateTutorProfile(values) {
    let state = store.getState();
    let id = state.currentUser.user_id;

    putAjax('/api/v1/tutors/' + id, { tutor: values },
        (resp) => {
            // TODO dispatch this
            fetchTutorInfo(id);
        });
}

export function deleteTutorCourse(id) {
    deleteAjax('/api/v1/tutor_courses/' + id, {},
        (resp) => {
            let id = store.getState().currentUser.user_id;
            fetchTutorInfo(id);
        })
}

export function addTutorCourse(values) {
    postAjax('/api/v1/tutor_courses/', { tutor_course: values },
        (resp) => {
            let id = store.getState().currentUser.user_id;
            fetchTutorInfo(id);
        });
}

export function deleteTutorSubjectArea(id) {
    deleteAjax('/api/v1/tutor_subject_areas/' + id, {},
        (resp) => {
            let id = store.getState().currentUser.user_id;
            fetchTutorInfo(id);
        })
}

export function addTutorSubjectArea(values) {
    postAjax('/api/v1/tutor_subject_areas/', { tutor_subject_area: values },
        (resp) => {
            let id = store.getState().currentUser.user_id;
            fetchTutorInfo(id);
        });
}

export function deleteTutorAvailability(id) {
    deleteAjax('/api/v1/tutor_availabilities/' + id, {},
        (resp) => {
            let id = store.getState().currentUser.user_id;
            fetchTutorInfo(id);
        })
}

export function addTutorAvailability(values) {
    let id = store.getState().currentUser.user_id;

    postAjax('/api/v1/time_blocks/', { time_block: values },
        (resp) => {
            let time_id = resp.data.id;
            postAjax('/api/v1/tutor_availabilities/', { tutor_availability: { time_block_id: time_id, tutor_id: id } },
                (resp) => {
                    fetchTutorInfo(id);
                });
        });
}

export function fetchUserInfo(user_id, user_type) {
    switch (user_type) {
        case STUDENT: fetchStudentInfo(user_id); break;
        case TUTOR: fetchTutorInfo(user_id); break;
        default: new Error("Invalid user type");
    }
}

function fetchStudentInfo(user_id) {
    fetchAjax("/api/v1/students/" + user_id, {},
        (resp) => {
            store.dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: resp.data })
        });
}

function fetchTutorInfo(user_id) {
    fetchAjax("/api/v1/tutors/" + user_id, {},
        (resp) => {
            store.dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: resp.data })
        });
}
