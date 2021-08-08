import React, {useState, useEffect} from 'react';
import {Button, Form} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';

import FormContainer from '../components/FormContainer';
import CheckoutStages from '../components/CheckoutStages';

import {saveShippingAddress} from '../actions/CartActions';


function CheckoutPage({history}) {

    const cart = useSelector(state => state.cart);
    const {shipping_address} = cart;

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shipping_address.address);
    const [city, setCity] = useState(shipping_address.city);
    const [postalCode, setPostalCode] = useState(shipping_address.postalCode);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode}));
        history.push('/payment');
    }

    return (
        <FormContainer>
            <CheckoutStages stage1 />
            <h1>Checkout</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Address'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter City'
                        value={city ? city : ''}
                        onChange={(e) => setCity(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Postal Code'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default CheckoutPage;