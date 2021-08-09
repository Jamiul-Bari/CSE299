import axios from 'axios';

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


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const config = {
            header: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/drf/users/login/',
            {'username': email, 'password': password},
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('user_information', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('user_information');

    dispatch({type: USER_LOGOUT});
    dispatch({type: USER_DETAILS_RESET});
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            header: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/drf/users/register/',
            {'name': name, 'email': email, 'password': password},
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('user_information', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const get_user_details = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        });

        const {
            userLogin: {user_information}
        } = getState()

        const config = {
            header: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user_information.token}`
            }
        }

        const {data} = await axios.get(
            `/drf/users/${id}/`,
            config
        );

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}

export const update_user_profile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        });

        const {
            userLogin: {user_information}
        } = getState()

        const config = {
            header: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user_information.token}`
            }
        }

        const {data} = await axios.put(
            `/drf/users/profile/update/`,
            user,
            config
        );

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('user_information', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}