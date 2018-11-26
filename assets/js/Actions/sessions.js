import store from '../store';
import $ from 'jquery'

export const FETCH_SESSIONS = 'FETCH_SESSIONS';
export const FETCH_SESSIONS_SUCCESS = 'FETCH_SESSIONS_SUCCESS';
export const FETCH_SESSIONS_FAILURE = 'FETCH_SESSIONS_FAILURE';
export const SESSION_DELET = 'SESSION_DELETE';


// Fetches the sessions of the current user
export function fetchSessions() {
    let user = store.getState().currentUser;

    $.ajax(
        "/api/v1/tutoring_sessions/", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: {
                user_type: user.user_type,
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

export function requestSession(request) {
    console.log("requesting sessions")
    console.log(request)
    // Ajax request to create the tutoring session
    $.ajax(
        "/api/v1/tutoring_sessions/", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ tutoring_session: request })
        }
    ).done((resp) => {
        console.log(resp)
        if (resp.redirect_to) {
            window.location.href = resp.redirect_to
        } else {
            console.log("Payment cancelled")
        }
    });

}

export function cancelSession(id) {
    $.ajax(
        "/api/v1/tutoring_sessions/" + id, {
            method: "delete",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
        }
    ).done((resp) => {
        console.log("deleted session" + id)
        fetchSessions();
    });
}

export function approveSession(id, session) {
    console.log(session)
    let session1 = session;
    session1.approved = true;
    $.ajax(
        "/api/v1/tutoring_sessions/" + id, {
            method: "put",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({tutoring_session: session1})
        }
    ).done((resp) => {
        console.log("approved session" + id)
        fetchSessions();
    });
}

export function rateTutor(rating) {
    $.ajax(
        "/api/v1/ratings", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({rating: rating})
        }
    ).done((resp) => {
        console.log("Created rating")
        console.log(rating);
    });
}
