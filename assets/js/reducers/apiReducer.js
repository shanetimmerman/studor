import {
    FETCH_SUBJECTS, FETCH_SUBJECTS_FAILED, FETCH_SUBJECTS_SUCCESS,
    FETCH_SUBJECT_AREAS, FETCH_SUBJECT_AREAS_FAILED, FETCH_SUBJECT_AREAS_SUCCESS,
    FETCH_UNIVERSITIES, FETCH_UNIVERSITIES_FAILED, FETCH_UNIVERSITIES_SUCCESS,
    FETCH_COURSES, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAILED
} from '../Actions/api'

const INITIAL_STATE = {
    universities: [],
    subjects: [],
    subjectAreas: [],
    courses: []
}

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_SUBJECTS:
            return Object.assign({}, state, { subjects: [], error: null, loading: true });
        case FETCH_SUBJECTS_SUCCESS:
            return Object.assign({}, state, { subjects: action.payload, error: null, loading: false });
        case FETCH_SUBJECTS_FAILED:
            error = action.payload || { message: action.payload.message };
            return Object.assign({}, state, { error: error });

        case FETCH_SUBJECT_AREAS:
            return Object.assign({}, state, { subjectAreas: [], error: null, loading: true });
        case FETCH_SUBJECT_AREAS_SUCCESS:
            return Object.assign({}, state, { subjectAreas: action.payload, error: null, loading: false });
        case FETCH_SUBJECT_AREAS_FAILED:
            error = action.payload || { message: action.payload.message };
            return Object.assign({}, state, { error: error });

        case FETCH_UNIVERSITIES:
            return Object.assign({}, state, { universities: [], error: null, loading: true });
        case FETCH_UNIVERSITIES_SUCCESS:
            return Object.assign({}, state, { universities: action.payload, error: null, loading: false });
        case FETCH_UNIVERSITIES_FAILED:
            error = action.payload || { message: action.payload.message };
            return Object.assign({}, state, { error: error });

        case FETCH_COURSES:
            return Object.assign({}, state, { courses: [], error: null, loading: true });
        case FETCH_COURSES_SUCCESS:
            return Object.assign({}, state, { courses: action.payload, error: null, loading: false });
        case FETCH_COURSES_FAILED:
            error = action.payload || { message: action.payload.message };
            return Object.assign({}, state, { error: error });
        default: return state;
    }
}