import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';

import Message from '../components/Message';
import {addToCart} from '../actions/CartActions';

function CartPage({match, location, history}) {
    const grocery_item_id = match.params.id;
    const qty = location.search
        ? Number(location.search.split('=')[1])
        : 1

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)
    const {grocery_in_cart} = cart;

    useEffect(() => {
        if (grocery_item_id) {
            dispatch(addToCart(grocery_item_id, qty))
        }
    }, [dispatch, grocery_item_id, qty]);


    return (
        <div>
            Cart
        </div>
    )
}

export default CartPage