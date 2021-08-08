import React, {useState, useEffect} from 'react';
import {Button, Row, Col, ListGroup, Image, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Message from '../components/Message';
import CheckoutStages from '../components/CheckoutStages';

function PlaceOrderScreen() {

    const cart = useSelector(state => state.cart);

    cart.grocery_items_price = cart.grocery_in_cart.reduce((acc, grocery) => acc + (grocery.price * grocery.qty), 0).toFixed(2);
    cart.delivery_charge = (cart.grocery_items_price > 4000 ? 0 : 50).toFixed(2);
    cart.vat = Number((0.15) * cart.grocery_items_price).toFixed(2);

    cart.total_price = (Number(cart.grocery_items_price) + Number(cart.delivery_charge) + Number(cart.vat)).toFixed(2);

    const placeOrder = () => {
        console.log("PLace order");
    }

    return (
        <div>
            <CheckoutStages stage1 stage2 stage3 stage4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Shipping: </strong>
                                {cart.shipping_address.address}, {cart.shipping_address.city}
                                {' - '}
                                {cart.shipping_address.postalCode}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method: </strong>
                                {cart.payment_method}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {
                                cart.grocery_in_cart.length === 0
                                    ? <Message variant='info'>
                                        Your cart is empty
                                    </Message>
                                    : (
                                        <ListGroup variant='flush'>
                                            {
                                                cart.grocery_in_cart.map((grocery, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image
                                                                    src={grocery.image}
                                                                    alt={grocery.name}
                                                                    fluid
                                                                    rounded/>
                                                            </Col>

                                                            <Col>
                                                                <Link
                                                                    to={`/grocery-item/${grocery.grocery_item}`}>{grocery.name}</Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {grocery.qty} X BDT. {grocery.price} =
                                                                BDT. {(grocery.qty * grocery.price).toFixed(2)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))
                                            }
                                        </ListGroup>
                                    )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Grocery Items: </Col>
                                    <Col>BDT.{cart.grocery_items_price}  </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>BDT.{cart.delivery_charge}  </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>VAT: </Col>
                                    <Col>BDT.{cart.vat}  </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>BDT.{cart.total_price}  </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.grocery_in_cart === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen;