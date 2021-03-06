import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';

import SearchBar from './SearchBar';
import { logout } from '../actions/UserActions';

function Header() {

    const userLogin = useSelector(state => state.userLogin);
    const { user_information } = userLogin;

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>tukitak-E</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <SearchBar />

                        <Nav className="ml-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>Cart
                                </Nav.Link>
                            </LinkContainer>

                            {user_information ? (
                                <NavDropdown id='username' title={user_information.name}>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i>Login
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {user_information && user_information.is_admin && (
                                <NavDropdown id='adminmenue' title='Admin'>

                                    <LinkContainer to='/admin/user-list'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/grocery-item-list'>
                                        <NavDropdown.Item>Grocery Items</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/order-list'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}


                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header