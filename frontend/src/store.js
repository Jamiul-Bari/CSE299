import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    GroceryItemListReducer,
    GroceryItemDetailsReducer,
    GroceryItemDeleteReducer,
    GroceryItemCreateReducer,
    GroceryItemUpdateReducer,

} from './reducers/GroceryItemReducers';

import { CartReducer } from './reducers/CartReducers';

import {
    UserLoginReducer,
    UserRegisterReducer,
    UserDetailsReducer,
    UserUpdateProfileReducer,
    UserListReducer,
    UserDeleteReducer,
    UserUpdateReducer,

} from './reducers/UserReducers';

import {
    OrderCreateReducer,
    OrderDetailsReducer,
    OrderPayReducer,
    ListMyOrderReducer,

} from './reducers/OrderReducers';

const reducer = combineReducers({
    groceryItemList: GroceryItemListReducer,
    groceryItemDetails: GroceryItemDetailsReducer,
    groceryItemDelete: GroceryItemDeleteReducer,
    groceryItemCreate: GroceryItemCreateReducer,
    groceryItemUpdate: GroceryItemUpdateReducer,
    cart: CartReducer,

    userLogin: UserLoginReducer,
    userRegister: UserRegisterReducer,
    userDetails: UserDetailsReducer,
    userUpdateProfile: UserUpdateProfileReducer,
    usersList: UserListReducer,
    userDelete: UserDeleteReducer,
    userUpdate: UserUpdateReducer,

    orderCreate: OrderCreateReducer,
    orderDetails: OrderDetailsReducer,
    orderPay: OrderPayReducer,
    listMyOrder: ListMyOrderReducer,
})

// Loading data from the LocalStorage
const grocery_in_cart_from_storage = localStorage.getItem('grocery_in_cart')
    ? JSON.parse(localStorage.getItem('grocery_in_cart'))
    : [];

const user_information_from_storage = localStorage.getItem('user_information')
    ? JSON.parse(localStorage.getItem('user_information'))
    : null;

const shipping_address_from_storage = localStorage.getItem('shipping_address')
    ? JSON.parse(localStorage.getItem('shipping_address'))
    : {};

const initialState = {
    cart: {
        grocery_in_cart: grocery_in_cart_from_storage,
        shipping_address: shipping_address_from_storage
    },
    userLogin: { user_information: user_information_from_storage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;