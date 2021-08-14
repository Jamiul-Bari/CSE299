import React from 'react';
import {Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

function CheckoutStages({stage1, stage2, stage3, stage4}) {

    return (
        <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {
                    stage1 ? (
                        <LinkContainer to='/login'>
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Login</Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                {
                    stage2 ? (
                        <LinkContainer to='/checkout'>
                            <Nav.Link>Checkout</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Checkout</Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                {
                    stage3 ? (
                        <LinkContainer to='/payment'>
                            <Nav.Link>Payment</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Payment</Nav.Link>
                    )
                }
            </Nav.Item>

            <Nav.Item>
                {
                    stage4 ? (
                        <LinkContainer to='/placeorder'>
                            <Nav.Link>Place Order</Nav.Link>
                        </LinkContainer>
                    ) : (
                        <Nav.Link disabled>Place Order</Nav.Link>
                    )
                }
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutStages;