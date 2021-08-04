import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, Card} from 'react-bootstrap';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {listGroceryItemDetails} from '../actions/GroceryItemActions';

function GroceryItemPage({match}) {
    const dispatch = useDispatch();
    const groceryItemDetails = useSelector(state => state.groceryItemDetails);
    const {loading, error, grocery_item} = groceryItemDetails;

    useEffect(() => {

        dispatch(listGroceryItemDetails(match.params.id));

    }, [dispatch, match]);

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Back</Link>
            {
                loading ? <Loader/>
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <Row>
                                <Col md={6}>
                                    <Image src={grocery_item.image} alt={grocery_item.name} fluid/>
                                </Col>

                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h3>{grocery_item.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Rating value={grocery_item.rating} text={`${grocery_item.numReviews} reviews`}
                                                    color={'#f8e625'}/>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Price: ৳{grocery_item.price}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            Description: {grocery_item.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>

                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Price: </Col>
                                                    <Col>
                                                        <strong>{grocery_item.price}</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status: </Col>
                                                    <Col>
                                                        {
                                                            grocery_item.countInStock > 0
                                                                ? 'In Stock'
                                                                : 'Out of Stock'
                                                        }
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Button
                                                    className="btn-block"
                                                    type="button"
                                                    disabled={grocery_item.countInStock === 0}>
                                                    Add to Cart
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        )
            }

        </div>
    )
}

export default GroceryItemPage
