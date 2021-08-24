import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
    listGroceryItemDetails,
    createGroceryItemReview
} from '../actions/GroceryItemActions';

import { GROCERY_ITEM_CRATE_REVIEW_RESET } from '../constants/GroceryItemConstants';

function GroceryItemPage({ match, history }) {

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const groceryItemDetails = useSelector(state => state.groceryItemDetails);
    const { loading, error, grocery_item } = groceryItemDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { user_information } = userLogin;

    const groceryItemReviewCreate = useSelector(state => state.groceryItemReviewCreate);
    const {
        success: successGroceryItemReview,
        loading: loadingGroceryItemReview,
        error: errorGroceryItemReview
    } = groceryItemReviewCreate;

    useEffect(() => {

        if (successGroceryItemReview) {
            setRating(0);
            setComment('');

            dispatch({ type: GROCERY_ITEM_CRATE_REVIEW_RESET });
        }

        dispatch(listGroceryItemDetails(match.params.id));

    }, [dispatch, match, successGroceryItemReview]);

    const addToCart = () => {
        // Redirect to another page
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createGroceryItemReview(
            match.params.id, {
            rating,
            comment
        }
        ));
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Back</Link>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <div>
                                <Row>
                                    <Col md={6}>
                                        <Image src={grocery_item.image} alt={grocery_item.name} fluid />
                                    </Col>

                                    <Col md={3}>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <h3>{grocery_item.name}</h3>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Rating value={grocery_item.rating} text={`${grocery_item.numReviews} reviews`}
                                                    color={'#f8e625'} />
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

                                                {
                                                    grocery_item.countInStock > 0 && (
                                                        <ListGroup.Item>
                                                            <Row>
                                                                <Col>Qty</Col>
                                                                <Col xs='auto' className='my-1'>
                                                                    <Form.Control
                                                                        as='select'
                                                                        value={qty}
                                                                        onChange={(e) => setQty(e.target.value)}
                                                                    >
                                                                        {
                                                                            [...Array(grocery_item.countInStock).keys()].map((numberOfItem) => (
                                                                                <option key={numberOfItem + 1}
                                                                                    value={numberOfItem + 1}>
                                                                                    {numberOfItem + 1}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </Form.Control>
                                                                </Col>
                                                            </Row>
                                                        </ListGroup.Item>
                                                    )
                                                }

                                                <ListGroup.Item>
                                                    <Button
                                                        onClick={addToCart}
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

                                <Row>
                                    <Col md={6}>
                                        <h4>Reviews</h4>
                                        {
                                            grocery_item.reviews.length === 0 && <Message variant='info'>No Reviews</Message>
                                        }

                                        <ListGroup variant='flush'>
                                            {grocerty_item.reviews.map((review) => (
                                                <ListGroup.Item key={review._id}>
                                                    <strong>{reivew.name}</strong>
                                                    <Rating value={review.rating} color='#f8e825' />

                                                    <p>P{review.createdAt.substring(0, 10)}</p>
                                                    <p>{review.comment}</p>
                                                </ListGroup.Item>
                                            ))}

                                            <ListGroup.Item>
                                                <h4>Leave your Review</h4>

                                                {loadingGroceryItemReview && <Loader />}
                                                {successGroceryItemReview && <Message variant='success'>Review Submitted</Message>}
                                                {errorGroceryItemReview && <Message variant='danger'>{errorGroceryItemReview}</Message>}

                                                {
                                                    user_information ? (
                                                        <Form onSubmit={submitHandler}>
                                                            <Form.Group controlId='rating'>
                                                                <Form.Label>
                                                                    Rating
                                                                </Form.Label>
                                                                <Form.Control
                                                                    as='select'
                                                                    value={select}
                                                                    onChange={(e) => setRating(e.target.value)}
                                                                >
                                                                    <option value=''>Select</option>
                                                                    <option value='1'>1 - Bad</option>
                                                                    <option value='2'>2 - Fair</option>
                                                                    <option value='3'>3 - Good</option>
                                                                    <option value='4'>4 - Very Good</option>
                                                                    <option value='5'>5 - Best</option>
                                                                </Form.Control>
                                                            </Form.Group>

                                                            <Form.Group controlId='comment'>
                                                                <Form.Label>Review</Form.Label>
                                                                <Form.Control
                                                                    as='textarea'
                                                                    rows='5'
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>

                                                            <Button
                                                                disable={loadingGroceryItemReview}
                                                                type='submit'
                                                                variant='primary'
                                                            >
                                                                Submit
                                                            </Button>

                                                        </Form>
                                                    ) : (
                                                        <Message variant='info'>
                                                            Please <Link to='/login'>Log In</Link> to write a review
                                                        </Message>
                                                    )
                                                }
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Col>
                                </Row>
                            </div>
                        )
            }
        </div>
    )
}

export default GroceryItemPage
