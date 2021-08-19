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

    LIST_MY_ORDER_REQUEST,
    LIST_MY_ORDER_SUCCESS,
    LIST_MY_ORDER_FAIL,
    LIST_MY_ORDER_RESET,

    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,

    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET,

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
            `/drf/orders/${id}/pay/`,
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

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
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
            `/drf/orders/${order._id}/deliver/`,
            {},
            config
        );

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}

// id not required as parameter since logged in user is the one
export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LIST_MY_ORDER_REQUEST
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
            `/drf/orders/my-orders/`,
            config
        );

        dispatch({
            type: LIST_MY_ORDER_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: LIST_MY_ORDER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}


export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
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
            `/drf/orders/`,
            config
        );

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        });


    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        });
    }
}
