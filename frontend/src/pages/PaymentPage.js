import React, {useState, useEffect} from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';

import FormContainer from '../components/FormContainer';
import CheckoutStages from '../components/CheckoutStages';

import {savePaymentMethod} from '../actions/CartActions';


function PaymentPage({history}) {

    const cart = useSelector(state => state.cart);
    const {shipping_address} = cart;

    const dispatch = useDispatch();

    const [payment_method, setPaymentMethod] = useState('SSLCOMMERZ')

    if (!shipping_address.address) {
        history.push('/checkout');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(payment_method));
        history.push('/place-order');
        // console.log(payment_method);
    }

    return (
        <FormContainer>
            <CheckoutStages stage1 stage2 stage3/>

            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='SSLCOMMERZ'
                            id='SSLCOMMERZ'
                            name='payment_method'
                            value='SSLCOMMERZ'
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>

                        <Form.Check
                            type='radio'
                            label='Cash on Delivery'
                            id='cod'
                            name='payment_method'
                            value='Cash on Delivery'
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>


                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentPage;