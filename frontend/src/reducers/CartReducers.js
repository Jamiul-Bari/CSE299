import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS
} from '../constants/CartConstants';

export const CartReducers = (state = {grocery_in_cart: [], shipping_address: {}}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // check if item exists
            const grocery = action.payload
            const grocery_exist_in_cart = state.grocery_in_cart.find(x => x.grocery_item === grocery.grocery_item)

            if (grocery_exist_in_cart) {
                return {
                    ...state,
                    grocery_in_cart: state.grocery_in_cart.map(x =>
                        x.grocery_item === grocery_exist_in_cart.grocery_item ? grocery : x
                    )
                }
            } else {
                return {
                    ...state,
                    grocery_in_cart: [...state.grocery_in_cart, grocery]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                grocery_in_cart: state.grocery_in_cart.filter(x => x.grocery_item !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shipping_address: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                payment_method: action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                grocery_in_cart: []
            }

        default:
            return state
    }
}