import React from 'react';
import { Row, Col } from 'react-bootstrap'

import GroceryItem from '../components/GroceryItem';

import grocery_items from '../grocery_items';

function HomePage() {
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
