import React from 'react';
import Input from '../UI/Form/Input';
import Select from '../UI/Form/Select';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import Button from '../UI/Generic/Button'

const SELECT_OPTIONS = {
  updates: 'Updates Only',
  premium: 'Premiun Access'
};
const initialState = {
  accessType: '',
  fullName: '',
  userId: '',
  email: '',
  password: '',
  confirmPassword: '',
  showErrors: false
};

const UsersForm = class userInput extends React.Component {
  state = initialState;

  handleChange = e => {
    const { name, type, value } = e.target;

    this.setState({
      [name]: value,
      formErrors: {
        ...this.state.formErrors,
        [name]: errorFormHandler(type, value, /*SELECT_OPTIONS*/)
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      accessType,
      confirmPassword,
      email,
      formErrors,
      fullName,
      password,
      userId
    } = this.state;
    const dataForm = { accessType, email, fullName, password, userId };
    const passIsEqual = password === confirmPassword;
    const isValid = isFormValid(formErrors, dataForm);

    if (!passIsEqual) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          confirmPassword: 'Password must be identical'
        }
      });
    }

    isValid
      ? this.handleSendForm(dataForm)
      : this.setState({ showErrors: true });
  };

  handleSendForm = dataForm => {
    const payload = { method: 'POST', body: JSON.stringify(dataForm) };

    fetch('/api/user', payload)
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
      <form onSubmit={this.handleSubmit} noValidate>
        <Input
          label='Full Name'
          placeholder='John Doe'
          name='fullName'
          type='text'
          onChange={this.handleChange}
          value={this.state.fullName}
          error={hasErrors ? formErrors.fullName : null}
        />

        <Input
          label='User Id'
          placeholder='john42'
          name='userId'
          type='text'
          onChange={this.handleChange}
          value={this.state.userId}
          error={hasErrors ? formErrors.userId : null}
        />

        <Input
          label='Email'
          placeholder='john.doe@mail.com'
          name='email'
          type='email'
          onChange={this.handleChange}
          value={this.state.email}
          error={hasErrors ? formErrors.email : null}
        />

        <Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          onChange={this.handleChange}
          value={this.state.password}
          error={hasErrors ? formErrors.password : null}
        />

        <Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          type='password'
          onChange={this.handleChange}
          value={this.state.confirmPassword}
          error={hasErrors ? formErrors.confirmPassword : null}
        />

        <Select
          name='accessType'
          options={SELECT_OPTIONS}
          onChange={this.handleChange}
          value={this.state.accessType}
          error={hasErrors ? formErrors.accessType : null}
        />

        <Button name='Create New User' type='submit'/>
      </form>
    );
  }
};

export default UsersForm;
