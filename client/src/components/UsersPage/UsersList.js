<<<<<<< HEAD
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
=======
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
    phone:'+14084552050',
    accessType: 'updates'
  },
  {
    id: 'jeanne.doe200',
    fullName: 'Jeanne Doe',
    email: 'jeanne@mail.com',
    phone:'+14045556050',
    accessType: 'updates'
  },
  {
    id: 'bobby.doe300',
    fullName: 'Bobby Doe',
    email: 'bobby@mail.com',
    phone:'+16694552050',
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
    window.confirm('Delete '
    .concat(this.state.users.filter(user => user.id === id)[0].fullName).concat(' from the system? \nTHIS ACTION CAN NOT BE UNDONE'))
    ? this.setState({ users: this.state.users.filter(user => user.id !== id) })
    : console.log("Action has been successfully cancelled")
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
      <>
        {usersList}
      </>
    );
  }
}

export default UserList;
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7
