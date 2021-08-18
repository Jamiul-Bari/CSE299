import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';

import {
    listGroceryItems,
    deleteGroceryItem,
    createGroceryItem,

} from '../actions/GroceryItemActions';

import { GROCERY_ITEM_CREATE_RESET } from '../constants/GroceryItemConstants'

function GroceryItemListPage({ match, history }) {

    const dispatch = useDispatch();

    const groceryItemList = useSelector(state => state.groceryItemList);
    const { loading, error, grocery_items } = groceryItemList;

    const groceryItemDelete = useSelector(state => state.groceryItemDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = groceryItemDelete;

    const groceryItemCreate = useSelector(state => state.groceryItemCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, grocery_item: createdGroceryItem } = groceryItemCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { user_information } = userLogin;

    useEffect(() => {

        dispatch({ type: GROCERY_ITEM_CREATE_RESET });

        if (!user_information.is_admin) {
            history.push('/login');
        }

        if (successCreate) {
            history.push(`/admin/grocery-item/${createdGroceryItem._id}/edit`);
        }
        else {
            dispatch(listGroceryItems());
        }

    }, [dispatch, history, user_information, successDelete, successCreate, createdGroceryItem]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this grocery item?")) {
            dispatch(deleteGroceryItem(id));
        }
    }

    const createGroceryItemHandler = (grocery_item) => {
        // create groceryitem
        dispatch(createGroceryItem());
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

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

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
