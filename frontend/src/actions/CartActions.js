import axios from "axios";
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/CartConstants';

export const addToCart = (id, qty) => async(dispatch, getState) => {
    const {data} = await axios.get(`/drf/grocery-item/${id}`)

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