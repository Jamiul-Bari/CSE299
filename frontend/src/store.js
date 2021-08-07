import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {GroceryItemListReducer, GroceryItemDetailsReducer} from './reducers/GroceryItemReducers'
import {CartReducers} from './reducers/CartReducers';
import {
    UserLoginReducer,
    UserRegisterReducer,
    UserDetailsReducer,
    UserUpdateProfileReducer
} from './reducers/UserReducers';

const reducer = combineReducers({
    groceryItemList: GroceryItemListReducer,
    groceryItemDetails: GroceryItemDetailsReducer,
    cart: CartReducers,
    userLogin: UserLoginReducer,
    userRegister: UserRegisterReducer,
    userDetails: UserDetailsReducer,
    userUpdateProfile: UserUpdateProfileReducer,
})

// Loading data from the LocalStorage
const grocery_in_cart_from_storage = localStorage.getItem('grocery_in_cart')
    ? JSON.parse(localStorage.getItem('grocery_in_cart'))
    : []

const user_information_from_storage = localStorage.getItem('user_information')
    ? JSON.parse(localStorage.getItem('user_information'))
    : null


const initialState = {
    cart: {grocery_in_cart: grocery_in_cart_from_storage},
    userLogin: {user_information: user_information_from_storage}
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;