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

    const [paymentMethod, setPaymentMethod] = useState('SSLCOMMERZ')

    if (!shipping_address.address) {
        history.push('/checkout');
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/place-order');
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
                            name='SSLCOMMERZ'
                            checked
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