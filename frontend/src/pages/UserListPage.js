import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';
import Message from '../components/Message';

import { list_users } from '../actions/UserActions'

function UserListPage() {

    const dispatch = useDispatch();

    const user_list = useSelector(state => state.usersList);
    const { loading, error, users } = user_list;

    useEffect(() => {
        dispatch(list_users());
    }, [dispatch]);


    return (
        <div>
            <h1>Users</h1>
        </div>
    )
}

export default UserListPage
