import React from 'react';
import Input from '../UI/Form/Input';
import Select from '../UI/Form/Select';

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

const UsersForm = class userInput extends React.Component {
  state = initialState;

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
    );
  }
};

export default UsersForm;
