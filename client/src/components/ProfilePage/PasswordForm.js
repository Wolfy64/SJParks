<<<<<<< HEAD
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
=======
import React from 'react';
import Input from '../UI/Form/Input';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import Button from '../UI/Generic/Button'
<<<<<<< HEAD
=======
import styled from 'styled-components';


>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7

const initialState = {
  currentPassword: '',
  newPassword: '',
  repeatPassword: '',
  showErrors: false,
  formErrors: false
};

class PasswordForm extends React.Component {
  state = initialState;

  handleChange = e => {
    const { name, type, value } = e.target;

    this.setState({
      [name]: value,
      formErrors: {
        ...this.state.formErrors,
        [name]: errorFormHandler(type, value)
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formErrors, newPassword, repeatPassword } = this.state;
    const passIsEqual = repeatPassword === newPassword;
    const isValid = isFormValid(formErrors, newPassword) && passIsEqual;

    if (!passIsEqual) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          repeatPassword: 'Password must be identical'
        }
      });
    }

    isValid
      ? this.handleSendForm(newPassword)
      : this.setState({ showErrors: true });
  };

  handleSendForm = dataForm => {
    const payload = { method: 'POST', body: JSON.stringify(dataForm) };

    fetch('/admin/newpassword', payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('SEND DATA', dataForm);

    // Reset Form field
    this.setState(initialState);
  };

  render() {
    const { formErrors, showErrors } = this.state;
    const hasErrors = showErrors && formErrors;

    return (
<<<<<<< HEAD
      <form onSubmit={this.handleSubmit}>
=======
      <form className="passwordForm" onSubmit={this.handleSubmit}>
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7
        <Input
          label='Current Password'
          placeholder='Current Password'
          name='currentPassword'
          type='password'
          onChange={this.handleChange}
          value={this.state.currentPassword}
          error={hasErrors ? formErrors.currentPassword : null}
        />

        <Input
          label='New Password'
          placeholder='New Password'
          name='newPassword'
          type='password'
          onChange={this.handleChange}
          value={this.state.newPassword}
          error={hasErrors ? formErrors.newPassword : null}
        />

        <Input
          label='Repeat Password'
          placeholder='Repeat Password'
          name='repeatPassword'
          type='password'
          onChange={this.handleChange}
          value={this.state.repeatPassword}
          error={hasErrors ? formErrors.repeatPassword : null}
        />

        <Button name='Confirm New Password'  type='submit'/>
      </form>
    );
  }
}

export default PasswordForm;
>>>>>>> master
