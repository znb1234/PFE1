import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true, isLoggedIn: false, user: [] }
        case USER_LOGIN_SUCCESS:
            return { loading: false, isLoggedIn: true, user: action.payload }
        case USER_LOGIN_FAIL:
            return { loading: false, isLoggedIn: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}