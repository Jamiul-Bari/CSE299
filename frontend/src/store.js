import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {GroceryItemListReducer, GroceryItemDetailsReducer} from './reducers/GroceryItemReducers'
import {CartReducers} from './reducers/CartReducers';

const reducer = combineReducers({
    groceryItemList: GroceryItemListReducer,
    groceryItemDetails: GroceryItemDetailsReducer,
    cart: CartReducers
})

// Loading data from the LocalStorage
const grocery_in_cart_from_storage = localStorage.getItem('grocery_in_cart')
    ? JSON.parse(localStorage.getItem('grocery_in_cart'))
    : []


const initialState = {
    cart: {grocery_in_cart: grocery_in_cart_from_storage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;