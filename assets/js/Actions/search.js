import store from '../store';
import $ from 'jquery'

// Searching for tutors
export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export const FETCH_SEARCH_RESULTS_SUCCESS = 'FETCH_SEARCH_RESULTS_SUCCESS';
export const FETCH_SEARCH_RESULTS_FAILED = 'FETCH_SEARCH_RESULTS_FAILED';


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

export function fetchCourseSearch(university_id, query) {
    // Filters for course search
    console.log("Searching courses")
    console.log(university_id)

    $.ajax(
        "api/v1/tutors/search/university/" + university_id + "/" + query, {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
        }
    ).done((resp) => {
        console.log("done searching")
        console.log(resp)
        store.dispatch({ type: FETCH_SEARCH_RESULTS_SUCCESS, payload: resp.data })
    });

    return {
        type: FETCH_SEARCH_RESULTS
    }
}

export function fetchSubjectSearch(subject_area_id) {
    console.log("Searching subjects")
    console.log(subject_area_id)

    $.ajax(
        "api/v1/tutors/search/subject_areas/" + subject_area_id, {
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
