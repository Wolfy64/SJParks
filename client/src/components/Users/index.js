import React from 'react';
import UsersForm from './UsersForm';
import UsersList from './UsersList';

class Users extends React.Component {
  render() {
    return (
      <div>
        <h1>Users Page</h1>
        <UsersForm />
        <UsersList />
      </div>
    );
  }
}

export default Users;
