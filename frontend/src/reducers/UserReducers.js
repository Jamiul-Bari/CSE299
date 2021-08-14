import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,

} from '../constants/UserConstants';

export const UserLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {loading: true}

        case USER_LOGIN_SUCCESS:
            return {loading: false, user_information: action.payload}

        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const UserRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true}

        case USER_REGISTER_SUCCESS:
            return {loading: false, user_information: action.payload}

        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const UserDetailsReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {...state, loading: true}

        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload}

        case USER_DETAILS_FAIL:
            return {loading: false, error: action.payload}

        case USER_DETAILS_RESET:
            return {user: {}}

        default:
            return state
    }
}

export const UserUpdateProfileReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true}

        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true, user_information: action.payload}

        case USER_UPDATE_PROFILE_FAIL:
            return {loading: false, error: action.payload}

        case USER_UPDATE_PROFILE_RESET:
            return {}

        default:
            return state
    }
}