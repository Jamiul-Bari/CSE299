import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

import { get_user_details, update_user } from '../actions/UserActions';

import { USER_UPDATE_RESET } from '../constants/UserConstants';

function UserEditPage({ match, history }) {

    const user_id = match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [is_admin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate,
    } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/user-list')
        }
        else {
            if (!user.name || user._id !== Number(user_id)) {
                dispatch(get_user_details(user_id));
            }
            else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.is_admin);
            }
        }

    }, [user, user_id, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(update_user({ _id: user._id, name, email, is_admin }));
    }

    return (
        <div>

            <Link to='admin/user-list'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {
                    loading ? <Loader />
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : (
                                <Form onSubmit={submitHandler}>

                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='name'
                                            placeholder='Enter Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        >

                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='email'>
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control
                                            type='email'
                                            placeholder='Enter Email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        >

                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='isAdmin'>
                                        <Form.Check
                                            type='checkbox'
                                            label='Is Admin'
                                            checked={is_admin}
                                            onChange={(e) => setIsAdmin(e.target.checked)}
                                        >

                                        </Form.Check>
                                    </Form.Group>

                                    <Button type='submit' variant='primary'>
                                        Update
                                    </Button>

                                </Form>
                            )
                }

            </FormContainer>
        </div>
    )
}

export default UserEditPage;