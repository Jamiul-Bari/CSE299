import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

function GroceryItem({ grocery_item }) {
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/product/${grocery_item._id}`}>
                <Card.Img src={grocery_item.image} />
            </a>

            <Card.Body>
                <a href={`/product/${grocery_item._id}`}>
                    <Card.Title as="div">
                        <strong>
                            {grocery_item.name}
                        </strong>
                    </Card.Title>
                </a>

                <Card.Text as="div">
                    <div className="my-3">
                        {/* {grocery_item.rating} from {grocery_item.numReviews} reviews */}
                        <Rating value={grocery_item.rating} text={`${grocery_item.numReviews} reviews`} color={'#f8e625'} />
                    </div>
                </Card.Text>

                <Card.Text as="h3">
                    ৳{grocery_item.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default GroceryItem
