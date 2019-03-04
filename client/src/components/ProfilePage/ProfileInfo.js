/*jshint esversion: 8 */
import React, { Component } from 'react';
import { UsersDB } from '../../dummyDB';

export default class ProfileInfo extends Component {
  state = {
    user: UsersDB
  };

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
