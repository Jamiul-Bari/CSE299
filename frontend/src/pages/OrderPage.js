import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';

import {
    getOrderDetails,
    deliverOrder,

} from '../actions/OrderActions';

import { ORDER_DELIVER_RESET } from '../constants/OrderConstants'


function OrderPage({ match, history }) {
    const order_id = match.params.id;
    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, error, loading } = orderDetails;

    // orderPay

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector(state => state.userLogin);
    const { user_information } = userLogin;

    if (!loading && !error) {
        order.order_items_price = order.orderItems.reduce((acc, grocery) => acc + (grocery.price * grocery.qty), 0).toFixed(2);
    }


    useEffect(() => {

        if (!user_information) {
            history.push('/login');
        }

        // If there is no order or the order id is not here yet, dispatch
        if (!order || order._id !== Number(order_id) || successDeliver) {
            dispatch({ type: ORDER_DELIVER_RESET });

            dispatch(getOrderDetails(order_id));
        }

    }, [dispatch, order, order_id, successDeliver]);
    // order from the serializer

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <div>
            <h1>Order: # {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Name: </strong>
                                {order.user.name}
                            </p>

                            <p>
                                <strong>Email: </strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>

                            <p>
                                <strong>Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                                {' - '}
                                {order.shippingAddress.postalCode}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>

                            {
                                order.orderItems.length === 0
                                    ? <Message variant='info'>
                                        There is no Order
                                    </Message>
                                    : (
                                        <ListGroup variant='flush'>
                                            {
                                                order.orderItems.map((grocery, index) => (
                                                    <ListGroup.Item key={index}>
                                                        <Row>
                                                            <Col md={1}>
                                                                <Image
                                                                    src={grocery.image}
                                                                    alt={grocery.name}
                                                                    fluid
                                                                    rounded />
                                                            </Col>

                                                            <Col>
                                                                <Link
                                                                    to={`/grocery-item/${grocery.grocery_item}`}>{grocery.name}</Link>
                                                            </Col>

                                                            <Col md={4}>
                                                                {grocery.qty} X ৳ {grocery.price} =
                                                                ৳ {(grocery.qty * grocery.price).toFixed(2)}
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
                                    <Col>৳ {order.order_items_price}  </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping: </Col>
                                    <Col>৳ {order.deliveryCharge}  </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>VAT: </Col>
                                    <Col>৳ {order.vat}  </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total: </Col>
                                    <Col>৳ {order.totalPrice}  </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>


                        {
                            loadingDeliver && <Loader />
                        }

                        {
                            user_information && user_information.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button
                                        type='button'
                                        className='btn btn-block'
                                        onClick={deliverHandler}
                                    >
                                        Mark as Delivered
                                    </Button>
                                </ListGroup.Item>
                            )
                        }

                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default OrderPage;