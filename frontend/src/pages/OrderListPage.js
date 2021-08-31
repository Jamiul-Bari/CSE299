import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import dateFormat from 'dateformat';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { listOrders } from '../actions/OrderActions';

function OrderListPage({ history }) {

    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { user_information } = userLogin;

    useEffect(() => {
        if (user_information && user_information.is_admin) {
            dispatch(listOrders());
        }
        else {
            history.push('/login');
        }
    }, [dispatch, history, user_information]);


    return (
        <div>
            <h1>Orders</h1>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user && order.user.name}</td>
                                            <td>{dateFormat(order.createdAt, "dddd, mmmm dS, yyyy @ h:MM TT")}</td>
                                            <td>৳ {order.total_price}</td>

                                            <td>{order.isPaid ? (
                                                dateFormat(order.paidAt, "dddd, mmmm dS, yyyy @ h:MM TT")
                                                // order.paidAt.substring(0, 10)
                                            ) : (
                                                <i className='far fa-times-circle' style={{ color: 'red' }}></i>
                                            )}
                                            </td>

                                            <td>{order.isDelivered ? (
                                                // order.deliveredAt.substring(0, 10)
                                                dateFormat(order.createdAt, "dddd, mmmm dS, yyyy @ h:MM TT")
                                            ) : (
                                                <i className='far fa-times-circle' style={{ color: 'red' }}></i>
                                            )}
                                            </td>

                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button
                                                        variant='light'
                                                        className='btn-sm'
                                                    >
                                                        Details
                                                    </Button>
                                                </LinkContainer>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )
            }
        </div>
    )
}

export default OrderListPage;
