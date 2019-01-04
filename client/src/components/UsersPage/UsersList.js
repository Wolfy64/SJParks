import React from 'react';
import User from './User';

/**
 * DUMMY DATA
 */
const DATA = [
  {
    id: 'john.doe100',
    fullName: 'John Doe',
    email: 'john@mail.com',
    accessType: 'updates'
  },
  {
    id: 'jeanne.doe200',
    fullName: 'Jeanne Doe',
    email: 'jeanne@mail.com',
    accessType: 'updates'
  },
  {
    id: 'bobby.doe300',
    fullName: 'Bobby Doe',
    email: 'bobby@mail.com',
    accessType: 'updates'
  }
];

class UserList extends React.Component {
  state = { users: [] };

  componentDidMount() {
    // Get data from the db
    this.setState({ users: DATA });
  }

  handleDelete(id) {
    this.setState({ users: this.state.users.filter(user => user.id !== id) });
  }

  render() {
    const { users } = this.state;
    const usersList = users.map(user => (
      <User
        user={user}
        key={user.id}
        deleteUser={() => this.handleDelete(user.id)}
      />
    ));

    return (
      <div>
        <h2>Show a list of users</h2>
        {usersList}
      </div>
    );
  }
}

export default UserList;
