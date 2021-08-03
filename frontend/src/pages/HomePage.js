import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios'

import GroceryItem from '../components/GroceryItem';

import grocery_items from '../grocery_items';

function HomePage() {
    const [grocery_items, setGroceryItems] = useState([]);

    useEffect(() => {

        async function fetchGroceryItems() {
            const { data } = await axios.get('/drf/grocery-items/');
            setGroceryItems(data);
        }

        fetchGroceryItems();

    }, []);

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {/* Map through every grocery items */}
                {grocery_items.map(grocery_item => (
                    <Col key={grocery_item._id} sm={12} md={6} lg={4} xl={3}>
                        <GroceryItem grocery_item={grocery_item} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePage
