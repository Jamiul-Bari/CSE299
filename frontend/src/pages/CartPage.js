import React, {useEffect} from "react";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';

import Message from '../components/Message';
import {addToCart, removeFromCart} from '../actions/CartActions';

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
            dispatch(addToCart(grocery_item_id, qty));
        }
    }, [dispatch, grocery_item_id, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    
    const checkout = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    grocery_in_cart.length === 0
                        ? (
                            <Message variant='info'>
                                Your have no grocery in your cart <Link to='/'>Go Back</Link>
                            </Message>
                        ) : (
                            <ListGroup variant='flush'>
                                {grocery_in_cart.map(grocery => (
                                    <ListGroup.Item key={grocery.grocery_item}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={grocery.image} alt={grocery.name} fluid rounded/>
                                            </Col>

                                            <Col md={3}>
                                                <Link to={`/grocery-item/${grocery.grocery_item}`}>{grocery.name}</Link>
                                            </Col>

                                            <Col md={2}>
                                                ৳ {grocery.price}
                                            </Col>

                                            <Col md={3}>
                                                <Form.Control
                                                    as='select'
                                                    value={grocery.qty}
                                                    onChange={(e) => dispatch(addToCart(grocery.grocery_item, Number(e.target.value)))}
                                                >
                                                    {
                                                        [...Array(grocery.countInStock).keys()].map((numberOfItem) => (
                                                            <option key={numberOfItem + 1}
                                                                    value={numberOfItem + 1}>
                                                                {numberOfItem + 1}
                                                            </option>
                                                        ))
                                                    }
                                                </Form.Control>
                                            </Col>

                                            <Col md={1}>
                                                <Button
                                                    type='button'
                                                    variant='light'
                                                    onClick={() => removeFromCartHandler(grocery.grocery_item)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )
                }
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Total ({grocery_in_cart.reduce((acc, grocery) => acc + grocery.qty, 0)}) items</h2>

                            ৳{grocery_in_cart.reduce((acc, grocery) => acc + (grocery.qty * grocery.price), 0).toFixed(2)}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={grocery_in_cart.length === 0}
                            onClick={checkout}
                        >
                            Proceed to Checkout
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default CartPage