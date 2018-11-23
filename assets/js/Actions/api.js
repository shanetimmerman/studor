/**
 * This module is responsible for actions that fetch long lists of data from the 
 * database, for use in places such as the search page and account. 
 */
import store from '../store';
import $ from 'jquery'

// Fetching univiersities
export const FETCH_UNIVERSITIES = 'FETCH_UNIVERSITIES';
export const FETCH_UNIVERSITIES_SUCCESS = 'FETCH_UNIVERSITIES_SUCCESS';
export const FETCH_UNIVERSITIES_FAILED = 'FETCH_UNIVERSITIES_FAILED';

// Fetching subjects
export const FETCH_SUBJECTS = 'FETCH_SUBJECTS';
export const FETCH_SUBJECTS_SUCCESS = 'FETCH_SUBJECTS_SUCCESS';
export const FETCH_SUBJECTS_FAILED = 'FETCH_SUBJECTS_FAILED';

// Fetching subjectAreas
export const FETCH_SUBJECT_AREAS = 'FETCH_UNIVERSITIES';
export const FETCH_SUBJECT_AREAS_SUCCESS = 'FETCH_SUBJECT_AREAS_SUCCESS';
export const FETCH_SUBJECT_AREAS_FAILED = 'FETCH_SUBJECT_AREAS_FAILED';

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

export function fetchUniversities() {
    fetchAjax("/api/v1/universities", {},
        (resp) => {
            store.dispatch({ type: FETCH_UNIVERSITIES_SUCCESS, payload: resp.data })
        })
}

export function fetchSubjects() {
    fetchAjax("/api/v1/subjects", {},
        (resp) => {
            store.dispatch({ type: FETCH_SUBJECTS_SUCCESS, payload: resp.data })
        })
}

export function fetchSubjectAreas() {
    fetchAjax("/api/v1/subject_areas", {},
        (resp) => {
            store.dispatch({ type: FETCH_SUBJECT_AREAS_SUCCESS, payload: resp.data })
        })
}