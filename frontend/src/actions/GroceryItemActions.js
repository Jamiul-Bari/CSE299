import axios from "axios";

import {
    GROCERY_ITEM_LIST_REQUEST,
    GROCERY_ITEM_LIST_SUCCESS,
    GROCERY_ITEM_LIST_FAIL,

    GROCERY_ITEM_DETAILS_REQUEST,
    GROCERY_ITEM_DETAILS_SUCCESS,
    GROCERY_ITEM_DETAILS_FAIL,

    GROCERY_ITEM_DELETE_REQUEST,
    GROCERY_ITEM_DELETE_SUCCESS,
    GROCERY_ITEM_DELETE_FAIL,

    GROCERY_ITEM_CREATE_REQUEST,
    GROCERY_ITEM_CREATE_SUCCESS,
    GROCERY_ITEM_CREATE_FAIL,

    GROCERY_ITEM_UPDATE_REQUEST,
    GROCERY_ITEM_UPDATE_SUCCESS,
    GROCERY_ITEM_UPDATE_FAIL,

    GROCERY_ITEM_CREATE_REVIEW_REQUEST,
    GROCERY_ITEM_CREATE_REVIEW_SUCCESS,
    GROCERY_ITEM_CREATE_REVIEW_FAIL,

    HIT_GROCERY_ITEM_REQUEST,
    HIT_GROCERY_ITEM_SUCCESS,
    HIT_GROCERY_ITEM_FAIL,

} from '../constants/GroceryItemConstants'

export const listGroceryItems = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: GROCERY_ITEM_LIST_REQUEST })

        const { data } = await axios.get(`/drf/grocery-items${keyword}`);

        dispatch({
            type: GROCERY_ITEM_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GROCERY_ITEM_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listHitGroceryItems = () => async (dispatch) => {
    try {
        dispatch({ type: HIT_GROCERY_ITEM_REQUEST })

        const { data } = await axios.get(`/drf/grocery-items/hit/`);
        

        dispatch({
            type: HIT_GROCERY_ITEM_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: HIT_GROCERY_ITEM_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listGroceryItemDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GROCERY_ITEM_DETAILS_REQUEST })

        const { data } = await axios.get(`/drf/grocery-items/${id}`);

        dispatch({
            type: GROCERY_ITEM_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GROCERY_ITEM_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteGroceryItem = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GROCERY_ITEM_DELETE_REQUEST
        });

        const {
            userLogin: { user_information }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user_information.token}`
            }
        }

        const { data } = await axios.delete(
            `/drf/grocery-items/delete/${id}/`,
            config
        );

        dispatch({
            type: GROCERY_ITEM_DELETE_SUCCESS,
        });


    } catch (error) {
        dispatch({
            type: GROCERY_ITEM_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}


export const createGroceryItem = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: GROCERY_ITEM_CREATE_REQUEST
        });

        const {
            userLogin: { user_information }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user_information.token}`
            }
        }

        const { data } = await axios.post(
            `/drf/grocery-items/create/`,
            {},
            config
        );

        dispatch({
            type: GROCERY_ITEM_CREATE_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: GROCERY_ITEM_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}

export const updateGroceryItem = (grocery_item) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GROCERY_ITEM_UPDATE_REQUEST
        });

        const {
            userLogin: { user_information }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user_information.token}`
            }
        }

        const { data } = await axios.put(
            `/drf/grocery-items/update/${grocery_item._id}/`,
            grocery_item,
            config
        );

        dispatch({
            type: GROCERY_ITEM_UPDATE_SUCCESS,
            payload: data
        });

        dispatch({
            type: GROCERY_ITEM_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: GROCERY_ITEM_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}


export const createGroceryItemReview = (grocery_item_id, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GROCERY_ITEM_CREATE_REVIEW_REQUEST
        });

        const {
            userLogin: { user_information }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${user_information.token}`
            }
        }

        const { data } = await axios.post(
            `/drf/grocery-items/${grocery_item_id._id}/reviews`,
            review,
            config
        );

        dispatch({
            type: GROCERY_ITEM_CREATE_REVIEW_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: GROCERY_ITEM_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}
