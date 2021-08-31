import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

import Loader from './Loader';
import Message from './Message';

import { listHitGroceryItems } from '../actions/GroceryItemActions';

function GroceryItemSlider() {

    const dispatch = useDispatch();

    const hitGroceryItems = useSelector(state => state.hitGroceryItems);
    const { error, loading, grocery_items } = hitGroceryItems;

    useEffect(() => {
        dispatch(listHitGroceryItems());
    }, [dispatch]);

    return (
        loading ?
            <Loader />
            : error ?
                <Message variant='danger'>{error}</Message>
                : (
                    <Carousel pause='hover' className='bg-dark'>
                        {grocery_items.map(hit_grocery => (
                            <Carousel.Item key={hit_grocery._id}>
                                <Link to={`/grocery-item/${hit_grocery._id}`}>
                                    <Image src={hit_grocery.image} alt={hit_grocery.name} fluid />
                                    <Carousel.Caption className='carousel.caption'>
                                        <h4>{hit_grocery.name} (৳ {hit_grocery.price})</h4>
                                    </Carousel.Caption>
                                </Link>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )
    )
}

export default GroceryItemSlider
