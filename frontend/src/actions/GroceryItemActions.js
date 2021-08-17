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

} from '../constants/GroceryItemConstants'

export const listGroceryItems = () => async (dispatch) => {
    try {
        dispatch({ type: GROCERY_ITEM_LIST_REQUEST })

        const { data } = await axios.get('/drf/grocery-items/');

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
