import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/CartConstants';

export const CartReducers = (state={grocery_in_cart: []}, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // check if item exists
            const grocery = action.payload
            const grocery_exist_in_cart = state.grocery_in_cart.find(x => x.grocery_item === grocery.grocery_item)

            if(grocery_exist_in_cart) {
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

        default:
            return state
    }
}