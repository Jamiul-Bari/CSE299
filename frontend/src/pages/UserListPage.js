import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';

import { list_users } from '../actions/UserActions'

function UserListPage({ history }) {

    const dispatch = useDispatch();

    const user_list = useSelector(state => state.usersList);
    const { loading, error, users } = user_list;

    const userLogin = useSelector(state => state.userLogin);
    const { user_information } = userLogin;

    useEffect(() => {
        if (user_information && user_information.isAdmin) {
            dispatch(list_users());
        }
        else {
            history.push('/login');
        }
    }, [dispatch, history]);

    const deleteHandler = (id) => {

    }


    return (
        <div>
            <h1>Users</h1>
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Admin</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isAdmin ? (
                                                <i className='fas fa-check' style={{ color: 'green' }}></i>
                                            ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td>

                                            <td>
                                                <LinkContainer to={`/admin/user/${user._id}`}>
                                                    <Button
                                                        variant='light'
                                                        className='btn-sm'
                                                    >
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button
                                                    variant='danger'
                                                    className='btn-sm'
                                                    onClick={() => deleteHandler(user._id)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )
            }
        </div>
    )
}

export default UserListPage
