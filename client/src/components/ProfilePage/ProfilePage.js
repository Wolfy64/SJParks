import React from 'react';
import Input from '../UI/Input';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  currentPassword: '',
  newPassword: '',
  repeatPassword: '',
  showError: false
};

class ProfilePage extends React.Component {
  state = initialState;

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  hasError = err => err;

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ showError: true });
    console.log('UsersPage', this.state);
  };

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
        <form onSubmit={this.handleSubmit}>
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
            label='Phone'
            placeholder='123 456-7890'
            name='phone'
            type='tel'
            showError={this.state.showError}
            hasError={this.hasError}
            onChange={this.handleChange}
            value={this.state.phone}
          />

          <Input
            label='Current Password'
            placeholder='Current Password'
            name='currentPassword'
            type='password'
            showError={this.state.showError}
            hasError={this.hasError}
            onChange={this.handleChange}
            value={this.state.currentPassword}
          />

          <Input
            label='New Password'
            placeholder='New Password'
            name='newPassword'
            type='password'
            showError={this.state.showError}
            hasError={this.hasError}
            onChange={this.handleChange}
            value={this.state.newPassword}
          />

          <Input
            label='Repeat Password'
            placeholder='Repeat Password'
            name='repeatPassword'
            type='password'
            showError={this.state.showError}
            hasError={this.hasError}
            onChange={this.handleChange}
            value={this.state.repeatPassword}
          />

          <button type='submit'>Create New User</button>
        </form>
      </div>
    );
  }
}

export default ProfilePage;
