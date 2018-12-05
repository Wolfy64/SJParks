import React from 'react';
import Input from '../UI/Form/Input';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  currentPassword: '',
  newPassword: '',
  repeatPassword: '',
  showError: false
};

class UserForm extends React.Component {
  state = initialState;

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  hasError = err => err;

  handleSubmit = event => {
    event.preventDefault();
    const hasError = this.hasError();
    const { currentPassword, email, fullName, phone, newPassword } = this.state;
    const data = { newPassword, email, fullName, phone };

    // Check if the form has error
    const passIsEqual = currentPassword === newPassword;
    const dataIsEmpty = Object.values(data).includes('');

    if (hasError || dataIsEmpty || !passIsEqual) {
      this.setState({ showError: true });
    }

    if (!hasError && passIsEqual && !dataIsEmpty) {
      const payload = { method: 'POST', body: JSON.stringify(data) };

      fetch('/admin/myprofile', payload)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      console.log('SEND DATA', data);

      // Reset Form field
      this.setState(initialState);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          label='Full Name'
          placeholder='John Doe'
          name='fullName'
          type='text'
          showError={this.state.showError}
          hasError={this.hasError}
          onChange={this.handleChange}
          value={this.state.fullName}
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
    );
  }
}

export default UserForm;
