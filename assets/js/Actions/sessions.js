import store from '../store';
import $ from 'jquery'

export const FETCH_SESSIONS = 'FETCH_SESSIONS';
export const FETCH_SESSIONS_SUCCESS = 'FETCH_SESSIONS_SUCCESS';
export const FETCH_SESSIONS_FAILURE = 'FETCH_SESSIONS_FAILURE';


// Fetches the sessions of the current user
export function fetchSessions() {
    let user = store.getState().currentUser;

    $.ajax(
        "/api/v1/tutoring_sessions/", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: {
                user_id: user.user_id
            }
        }
    ).done((resp) => {
        store.dispatch({ type: FETCH_SESSIONS_SUCCESS, payload: resp.data })
    });

    return {
        type: FETCH_SESSIONS
    }
}


export function fetchSessionsSuccess(posts) {
    return {
        type: FETCH_SESSIONS_SUCCESS,
        payload: posts
    };
}

export function fetchSessionsFailure(error) {
    return {
        type: FETCH_SESSIONS_FAILURE,
        payload: error
    };
}


