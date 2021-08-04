/**
 *  Redux
 * Actions -> returns type i.g. 'INCREMENT', 'DECREMENT'
 * Reducers -> state, action in the parameter. Switch using action.type. When case matches with the types in the Actions
 *
 * create store with createStore(reducer)
 *
 * dispatch -> store.dispatch(action())
 * */

import {
    GROCERY_ITEM_LIST_REQUEST,
    GROCERY_ITEM_LIST_SUCCESS,
    GROCERY_ITEM_LIST_FAIL
} from '../constants/GroceryItemConstants'

export const GroceryItemListReducer = (state = {grocery_items: []}, action) => {
    switch (action.type) {
        case GROCERY_ITEM_LIST_REQUEST:
            return {loading:true, grocery_items: []}

        case GROCERY_ITEM_LIST_SUCCESS:
            return {loading:false, grocery_items: action.payload}

        case GROCERY_ITEM_LIST_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}