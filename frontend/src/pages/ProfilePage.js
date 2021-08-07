import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Row, Col} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';

import {get_user_details, update_user_profile} from '../actions/UserActions';

import {USER_UPDATE_PROFILE_RESET} from '../constants/UserConstants'

function ProfilePage({history}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();


    const userDetails = useSelector(state => state.userDetails);
    const {error, loading, user} = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const {user_information} = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;

    useEffect(() => {
        if (!user_information) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET});
                dispatch(get_user_details('profile'))
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, user_information, user])

    const submitHandler = (e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            dispatch(update_user_profile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }));
            setMessage('');
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                <h1>Sign Up</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
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
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >

                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>

                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfilePage;