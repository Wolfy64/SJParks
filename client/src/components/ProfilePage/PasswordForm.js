import React from 'react';
import Input from '../UI/Form/Input';

const initialState = {
  currentPassword: '',
  newPassword: '',
  repeatPassword: '',
  showError: false
};

class PasswordForm extends React.Component {
  state = initialState;

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  hasError = err => err;

  handleSubmit = event => {
    event.preventDefault();
    const hasError = this.hasError();
    const { currentPassword, newPassword } = this.state;

    // Check if the form has error
    const passIsEqual = currentPassword === newPassword;

    if (hasError || !newPassword || !passIsEqual) {
      this.setState({ showError: true });
    }

    if (!hasError && passIsEqual && newPassword) {
      const payload = { method: 'POST', body: JSON.stringify(newPassword) };

      fetch('/admin/newpassword', payload)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      console.log('SEND DATA', newPassword);

      // Reset Form field
      this.setState(initialState);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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

        <button type='submit'>Confirm New Password</button>
      </form>
    );
  }
}

export default PasswordForm;
