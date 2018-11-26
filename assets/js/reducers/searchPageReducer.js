import {
    FETCH_SEARCH_RESULTS, FETCH_SEARCH_RESULTS_SUCCESS, FETCH_SEARCH_RESULTS_FAILED,
} from '../Actions/search'

const INITIAL_STATE = {
    searchResults: [], // list of tutors
    filters: {},
    error: null,
    loading: false,
}

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_SEARCH_RESULTS:
            return Object.assign({}, state, { searchResults: [], error: null, loading: true });
        case FETCH_SEARCH_RESULTS_SUCCESS:
            return Object.assign({}, state, { searchResults: action.payload, error: null, loading: false });
        case FETCH_SEARCH_RESULTS_FAILED:
            error = action.payload || { message: action.payload.message };
            return Object.assign({}, state, { error: error });
        default: return state;
    }
}