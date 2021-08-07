import axios from "axios";

import {
    GROCERY_ITEM_LIST_REQUEST,
    GROCERY_ITEM_LIST_SUCCESS,
    GROCERY_ITEM_LIST_FAIL,

    GROCERY_ITEM_DETAILS_REQUEST,
    GROCERY_ITEM_DETAILS_SUCCESS,
    GROCERY_ITEM_DETAILS_FAIL
} from '../constants/GroceryItemConstants'

export const listGroceryItems = () => async (dispatch) => {
    try {
        dispatch({type: GROCERY_ITEM_LIST_REQUEST})

        const {data} = await axios.get('/drf/grocery-items/');

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
        dispatch({type: GROCERY_ITEM_DETAILS_REQUEST})

        const {data} = await axios.get(`/drf/grocery-item/${id}`);

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