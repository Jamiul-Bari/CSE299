import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import axios from 'axios'

import GroceryItem from '../components/GroceryItem';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {listGroceryItems} from '../actions/GroceryItemActions'

import grocery_items from '../grocery_items';

function HomePage() {
    const dispatch = useDispatch();
    const groceryItemList = useSelector(state => state.groceryItemList);
    const {error, loading, grocery_items} = groceryItemList;

    useEffect(() => {
        dispatch(listGroceryItems())
    }, [dispatch]);

    return (
        <div>
            <h1>Latest Products</h1>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : <Row>
                            {/* Map through every grocery items */}
                            {grocery_items.map(grocery_item => (
                                <Col key={grocery_item._id} sm={12} md={6} lg={4} xl={3}>
                                    <GroceryItem grocery_item={grocery_item}/>
                                </Col>
                            ))}
                        </Row>
            }

        </div>
    )
}

export default HomePage
