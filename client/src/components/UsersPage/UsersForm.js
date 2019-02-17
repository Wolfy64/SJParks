import React from 'react';
import makeRequest from '../../utils/makeRequest';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import Input from '../UI/Form/Input';
import Select from '../UI/Form/Select';
import Button from '../UI/Generic/Button';

/** [H] I Need to make this match with current BE*/
const SELECT_OPTIONS = {
  updates: 'Updates Only',
  premium: 'Full Access'
};

/** [H] I Need to make this match with current BE*/
const initialState = {
  access: 'Updates Only',
  fullName: 'Irina',
  phone: '4084552057',
  email: 'irishka2863@yahoo.com',
  password: '123456',
  confirmPassword: '123456',
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
        [name]: errorFormHandler(type, value, SELECT_OPTIONS)
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    /** [H] I Need to make this match with current BE*/
    const {
      access,
      confirmPassword,
      email,
      formErrors,
      fullName,
      password,
      phone
    } = this.state;
    const dataForm = {
      access,
      email,
      fullName,
      password,
      phone
    };
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

    if(isValid){
      this.props.handleSendForm(dataForm)
      this.setState(initialState);
    } else {
      this.setState({
        showErrors: true
      });
    }
  };


  render() {
    const { formErrors, showErrors } = this.state;
    const hasErrors = showErrors && formErrors;

    /** [H] I Need to make this match with current BE*/
    return (
      <form className="usersForm" onSubmit={this.handleSubmit}>
        {' '}
        <Input
          label="Full Name"
          placeholder="John Doe"
          name="fullName"
          type="text"
          onChange={this.handleChange}
          value={this.state.fullName}
          error={hasErrors ? formErrors.fullName : null}
        />{' '}
        <Input
          label="User Id"
          placeholder="john42"
          name="userName"
          type="text"
          onChange={this.handleChange}
          value={this.state.userName}
          error={hasErrors ? formErrors.userName : null}
        />{' '}
        <Input
          label="Email"
          placeholder="john.doe@mail.com"
          name="userEmail"
          type="email"
          onChange={this.handleChange}
          value={this.state.userEmail}
          error={hasErrors ? formErrors.userEmail : null}
        />{' '}
        <Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          onChange={this.handleChange}
          value={this.state.password}
          error={hasErrors ? formErrors.password : null}
        />{' '}
        <Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={this.handleChange}
          value={this.state.confirmPassword}
          error={hasErrors ? formErrors.confirmPassword : null }
        /> 
        < Select name='access' options={ SELECT_OPTIONS }
          label='Access Type'
          onChange={this.handleChange}
          value={this.state.access}
          error={hasErrors ? formErrors.access : null }
        /> 
        < Button name='Create New User' type='submit' /> 
      </form>
    );
  }
};

export default UsersForm;
