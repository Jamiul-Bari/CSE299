import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL, ORDER_CREATE_RESET
} from '../constants/OrderConstants';

import {CART_CLEAR_ITEMS} from '../constants/CartConstants';

export const create_order = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
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

        const {data} = await axios.post(
            `/drf/orders/add/`,
            order,
            config
        );

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        });

        localStorage.removeItem('grocery_in_cart')

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}