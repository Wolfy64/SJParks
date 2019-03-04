/*jshint esversion: 8 */
import React from 'react';
import User from './User';
// import makeRequest from "../../utils/makeRequest";

class UserList extends React.Component {
  state = { users: [] };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        users: this.props.users
      });
    }
  }

  render() {
    const { users } = this.state;
    const usersList = users.map(user => (
      <User
        user={user}
        key={user._id}
        deleteUser={() => this.props.handleDelete(user._id)}
      />
    ));

    return <div className="usersList">{usersList}</div>;
  }
}

export default UserList;
