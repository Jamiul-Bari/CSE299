import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { listGroceryItemDetails, updateGroceryItem } from '../actions/GroceryItemActions';

import { GROCERY_ITEM_UPDATE_RESET } from '../constants/GroceryItemConstants'


function GroceryItemEditPage({ match, history }) {

    const grocery_item_id = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const groceryItemDetails = useSelector(state => state.groceryItemDetails);
    const { error, loading, grocery_item } = groceryItemDetails;

    const groceryItemUpdate = useSelector(state => state.groceryItemUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = groceryItemUpdate;


    useEffect(() => {

        if (successUpdate) {
            dispatch({
                type: GROCERY_ITEM_UPDATE_RESET,
            });
            history.push('/admin/grocery-item-list');
        }
        else {
            if (!grocery_item.name || grocery_item._id !== Number(grocery_item_id)) {
                dispatch(listGroceryItemDetails(grocery_item_id));
            }
            else {
                setName(grocery_item.name);
                setPrice(grocery_item.price);
                setImage(grocery_item.image);
                setBrand(grocery_item.brand);
                setCategory(grocery_item.category);
                setCountInStock(grocery_item.countInStock);
                setDescription(grocery_item.description);
            }
        }

    }, [dispatch, grocery_item, grocery_item_id, history, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateGroceryItem({
            _id: grocery_item_id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,

        }));
    }

    return (
        <div>

            <Link to='/admin/grocery-item-list'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit Grocery Item</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {
                    loading ? <Loader />
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : (
                                <Form onSubmit={submitHandler}>

                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        >

                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='price'>
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Enter Price'
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        >

                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='image'>
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Image'
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        >

                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='brand'>
                                        <Form.Label>Brand</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Brand'
                                            value={brand}
                                            onChange={(e) => setBrand(e.target.value)}
                                        >

                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='countInStock'>
                                        <Form.Label>Stock</Form.Label>
                                        <Form.Control
                                            type='number'
                                            placeholder='Enter stock'
                                            value={countInStock}
                                            onChange={(e) => setCountInStock(e.target.value)}
                                        >

                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='category'>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Category'
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >

                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Description'
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        >

                                        </Form.Control>
                                    </Form.Group>


                                    <Button type='submit' variant='primary'>
                                        Update
                                    </Button>

                                </Form>
                            )
                }

            </FormContainer>
        </div>
    )
}

export default GroceryItemEditPage;