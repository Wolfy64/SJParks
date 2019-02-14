import React from 'react';
import User from './User';
import makeRequest from '../../utils/makeRequest';

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
    // GET User List
    makeRequest('/api/users','GET')
    .then(res => res.json())
    .then(res => console.log('[UsersList]',res))
    .catch(err => err);
  }

  handleDelete(id) {
    window.confirm('Are you sure you want to permanently delete '
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
      <div className='usersList'>
        {usersList}
      </div>
    );
  }
}

export default UserList;
