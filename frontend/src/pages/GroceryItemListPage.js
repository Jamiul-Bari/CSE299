import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';

import { listGroceryItems } from '../actions/GroceryItemActions';

function GroceryItemListPage({ match, history }) {

    const dispatch = useDispatch();

    const groceryItemList = useSelector(state => state.groceryItemList);
    const { loading, error, grocery_items } = groceryItemList;

    const userLogin = useSelector(state => state.userLogin);
    const { user_information } = userLogin;

    useEffect(() => {
        if (user_information && user_information.isAdmin) {
            dispatch(listGroceryItems());
        }
        else {
            history.push('/login');
        }
    }, [dispatch, history, user_information]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this grocery item?")) {
            // dispatch(delete_user(id)); delete grocery item
        }
    }

    const createGroceryItemHandler = (grocery_item) => {
        // create groceryitem
    }

    return (
        <div>
            <Row className='align-items-cne'>
                <Col>
                    <h1>Grocery Items</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createGroceryItemHandler}>
                        <i className='fas fa-plus'></i> Create Grocery Item
                    </Button>
                </Col>
            </Row>

            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Brand</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {grocery_items.map(grocery_item => (
                                        <tr key={grocery_item._id}>
                                            <td>{grocery_item.name}</td>
                                            <td>BDT. {grocery_item.price}</td>
                                            <td>{grocery_item.category}</td>
                                            <td>{grocery_item.brand}</td>

                                            <td>
                                                <LinkContainer to={`/admin/grocery-item/${grocery_item._id}/edit`}>
                                                    <Button
                                                        variant='light'
                                                        className='btn-sm'
                                                    >
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button
                                                    variant='danger'
                                                    className='btn-sm'
                                                    onClick={() => deleteHandler(grocery_item._id)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
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

export default GroceryItemListPage
