import store from '../store';
import $ from 'jquery'

// Searching for tutors
export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS';
export const FETCH_SEARCH_RESULTS_FAILED = 'FETCH_SEARCH_RESULTS_FAILED';

// Fetching parameters for the search dropdowns: univiersities
export const FETCH_UNIVERSITIES = 'FETCH_UNIVERSITIES';
export const FETCH_UNIVERSITIES_SUCCESS = 'FETCH_UNIVERSITIES_SUCCESS';
export const FETCH_UNIVERSITIES_FAILED = 'FETCH_UNIVERSITIES_FAILED';

// Fetching parameters for the search dropdowns: subjects
export const FETCH_SUBJECTS = 'FETCH_SUBJECTS';
export const FETCH_SUBJECTS_SUCCESS = 'FETCH_SUBJECTS_SUCCESS';
export const FETCH_SUBJECTS_FAILED = 'FETCH_SUBJECTS_FAILED';

// Fetching parameters for the search dropdowns: subjectAreas
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

export function fetchCourseSearch(university_id, query) {
    // Filters for course search
    console.log("Searching courses")
    console.log(university_id)

    $.ajax(
        "api/v1/tutors/" + university_id + "/" + query + "/", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
        }
    ).done((resp) => {
        // console.log(resp)
        store.dispatch({ type: FETCH_SEARCH_RESULTS_SUCCESS, payload: resp.data })
    });

    return {
        type: FETCH_SEARCH_RESULTS
    }
}

export function fetchSubjectSearch(subject_area_id) {
    console.log("Searching subjects")

    $.ajax(
        "api/v1/tutors/" + subject_area_id, {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",

        }
    ).done((resp) => {
        store.dispatch({ type: FETCH_SEARCH_RESULTS_SUCCESS, payload: resp.data })
    });

    return {
        type: FETCH_SEARCH_RESULTS
    }
}
