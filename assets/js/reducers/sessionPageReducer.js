
import { FETCH_SESSIONS, FETCH_SESSIONS_SUCCESS, FETCH_SESSIONS_FAILURE } from '../Actions/sessions'

const INITIAL_STATE = {
    sessionsList: [],
    error: null,
    loading: false,
}

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_SESSIONS:
            return Object.assign({}, state, { sessionsList: [], error: null, loading: true });
        case FETCH_SESSIONS_SUCCESS:
            return Object.assign({}, state, { sessionsList: action.payload, error: null, loading: false });
        case FETCH_SESSIONS_FAILURE:
            error = action.payload || { message: action.payload.message };
            return Object.assign({}, state, { error: error });
        default: return state;
    }
}