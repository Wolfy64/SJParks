import React from 'react';
import './users.css';
import Input from '../UI/Form/Input';
import Select from '../UI/Form/Select';
import UserList from './UserList';

/**
 * DUMMY DATA
 */
const DATA = [
  {
    fullName: 'John Doe',
    userId: 'john.doe100',
    email: 'john@mail.com',
    accessType: 'updates'
  },
  {
    fullName: 'Jeanne Doe',
    userId: 'jeanne.doe200',
    email: 'jeanne@mail.com',
    accessType: 'updates'
  },
  {
    fullName: 'Bobby Doe',
    userId: 'bobby.doe300',
    email: 'bobby@mail.com',
    accessType: 'updates'
  }
];
const SELECT_OPTIONS = {
  updates: 'Updates Only',
  premium: 'Premiun Access'
};
const initialState = {
  fullName: '',
  userId: '',
  email: '',
  password: '',
  confirmPassword: '',
  showError: false
};

const Users = class userInput extends React.Component {
  state = initialState;

  componentDidMount() {
    // Get data from the db
    this.setState({ users: DATA });
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  hasError = err => err;

  handleSubmit = event => {
    event.preventDefault();
    const hasError = this.hasError();
    const { confirmPassword, email, fullName, password, userId } = this.state;
    const data = { email, fullName, password, userId };

    // Check if the form has error
    const passIsEqual = password === confirmPassword;
    const dataIsEmpty = Object.values(data).includes('');

    if (hasError || dataIsEmpty || !passIsEqual) {
      this.setState({ showError: true });
    }

    // If Forms is valid send data Forms to the server
    if (!hasError && passIsEqual && !dataIsEmpty) {
      const payload = { method: 'POST', body: JSON.stringify(data) };

      fetch('/admin/newuser', payload)
        .then(res => console.log(res))
        .catch(err => console.log(err));

      // Reset Form field
      this.setState(initialState);

      // FOR TESTING ONLY with dummy data
      this.setState({ users: [...this.state.users, data] });
      console.log('SEND DATA', data);
    }

    console.log('UsersPage', this.state);
  };

  handleShowUser() {
    this.setState({ showUser: !this.state.showUser });
  }

  handleDelete(userId) {
    const { users } = this.state;
    this.setState({ users: users.filter(user => user.userId !== userId) });
  }

  render() {
    return (
      <div>
        <h1>USERS</h1>
        <form onSubmit={this.handleSubmit} style={{ display: 'grid' }}>
          <Input
            label='Full Name'
            placeholder='John Doe'
            name='fullName'
            type='text'
            showError={this.state.showError}
            hasError={this.hasError}
            value={this.state.fullName}
            onChange={this.handleChange}
          />

          <Input
            label='User Id'
            placeholder='john42'
            name='userId'
            type='text'
            showError={this.state.showError}
            hasError={this.hasError}
            onChange={this.handleChange}
            value={this.state.userId}
          />

          <Input
            label='Email'
            placeholder='john.doe@mail.com'
            name='email'
            type='email'
            showError={this.state.showError}
            hasError={this.hasError}
            onChange={this.handleChange}
            value={this.state.email}
          />

          <Input
            label='Password'
            placeholder='Password'
            name='password'
            type='password'
            showError={this.state.showError}
            hasError={this.hasError}
            onChange={this.handleChange}
            value={this.state.password}
          />

          <Input
            label='Confirm Password'
            placeholder='Confirm Password'
            name='confirmPassword'
            type='password'
            showError={this.state.showError}
            hasError={this.hasError}
            onChange={this.handleChange}
            value={this.state.confirmPassword}
          />

          <Select
            name='accessType'
            options={SELECT_OPTIONS}
            showError={this.state.showError}
            hasError={this.hasError}
            onChange={this.handleChange}
            value={this.state.accessType}
          />

          <button type='submit'>Create New User</button>
        </form>

        <h2>Show a list of users</h2>
        {this.state.users &&
          this.state.users.map(user => (
            <UserList
              key={user.userId}
              fullName={user.fullName}
              userId={user.userId}
              email={user.email}
              accessType={user.accessType}
              delete={() => this.handleDelete(user.userId)}
            />
          ))}
      </div>
    );
  }
};

export default Users;
