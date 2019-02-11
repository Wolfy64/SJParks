import React, { Component } from 'react';
import makeRequest from '../../utils/makeRequest';
import { UsersDB } from '../../dummyDB';

export default class ProfileInfo extends Component {
    state = {
        user: UsersDB
    }

    componentDidMount() {
        makeRequest('/api/users', 'GET') //substitute userID with the real one
            .then(res => res.json())
            .then(res => {
                console.log('>> ProfilePage/ProfileInfo GET res,', res)
            })
            .catch(err => err)
    }
    render() {
        return (
            <div className='profileInfo'>
                <p>Name: {this.state.user.name}</p>
                <p>Email: {this.state.user.email}</p>
                <p>Phone: {this.state.user.phone}</p>
            </div>
        )
    }
}