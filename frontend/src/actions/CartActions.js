import axios from "axios";
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS
} from '../constants/CartConstants';

export const addToCart = (id, qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/drf/grocery-items/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            grocery_item: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    });

    localStorage.setItem('grocery_in_cart', JSON.stringify(getState().cart.grocery_in_cart));
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('grocery_in_cart', JSON.stringify(getState().cart.grocery_in_cart));
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })

    localStorage.setItem('shipping_address', JSON.stringify(data));
}