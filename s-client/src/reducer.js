import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from './actionTypes'

export default function reducer(state, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                token: null
            }
        default:
            return state
    }
}
