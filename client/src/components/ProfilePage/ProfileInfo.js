import React, { Component } from 'react';
import makeRequest from '../../utils/makeRequest';
import { UsersDB } from '../../dummyDB';

export default class ProfileInfo extends Component {
  state = {
    user: UsersDB
  };

  componentDidMount() {
    //substitute userID with the real one
    makeRequest('/api/users', 'GET')
      .then(res => res.json())
      .then(res => console.log(`ProfileInfo: ${res}`))
      .catch(err => err);
  }

  render() {
    const { name, email, phone } = this.state;

    return (
      <div className="profileInfo">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </div>
    );
  }
}
