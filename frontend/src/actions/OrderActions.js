import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
} from '../constants/OrderConstants';

import { CART_CLEAR_ITEMS } from '../constants/CartConstants';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
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

        localStorage.removeItem('grocery_in_cart');

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
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

        const { data } = await axios.get(
            `/drf/orders/${id}/`,
            config
        );

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}

export const payOrder = (id, paymentResultFromSSL) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
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
            `/drf/orders/${id}/pay`,
            paymentResultFromSSL,
            config
        );

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}