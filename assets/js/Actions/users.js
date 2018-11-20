// Whenever something about the current user has changed
export const UPDATE_USER = 'UPDATE_USER';

// When we need to reset the current user to default values
export const USER_LOGOUT = 'USER_LOGOUT';

export function signupUser(userData) {
    // api request to make user

    // success, update the current user with the response (user and the token):
    return {
        type: UPDATE_USER,
        payload: response
    }

    // failure: show error
}

export function loginUser(userData) {
    // Authenticate username and password with api

    // success: update current user
    // failure: error out
}

// Essentially remove the current session information
export function logoutUser() {
    return {
        type: USER_LOGOUT,
        payload: {}
    }
}

export function editUser(userData) {
    // call to api to edit the current user
    // sucess: update the current user
    // failure: error out
}




