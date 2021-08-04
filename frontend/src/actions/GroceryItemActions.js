import axios from "axios";

import {
    GROCERY_ITEM_LIST_REQUEST,
    GROCERY_ITEM_LIST_SUCCESS,
    GROCERY_ITEM_LIST_FAIL
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
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}