/*jshint esversion: 8 */
import React from 'react';
import Input from '../UI/Form/Input';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import Button from '../UI/Generic/Button';
import styled from 'styled-components';
import makeRequest from '../../utils/makeRequest';
import {Consumer} from '../../utils/Context'

const Wrapper = styled.div`
  width: 280px;
  margin: 10px;
`;

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

  handleSubmit = (e, user) => {
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

    if (isValid) {
      makeRequest(`/admin/users/${user._id}/contact`, 'PUT', newPassword)
        .then(res => res.json())
        .then(res => {
          console.log('[ProfilePage.Password]', res)
          // Reset Form field
          this.setState(initialState);
        })
        .catch(err => err)
    } else {
      this.setState({ showErrors: true });
    }
  };

  render() {
    const { formErrors, showErrors } = this.state;
    const hasErrors = showErrors && formErrors;

    return (
      <Consumer>
      { user => (
      <Wrapper>
        <form onSubmit={(e) => this.handleSubmit(e, user)}>
          <Input
            label="Current Password"
            placeholder="Current Password"
            name="currentPassword"
            type="password"
            onChange={this.handleChange}
            value={this.state.currentPassword}
            error={hasErrors ? formErrors.currentPassword : null}
          />

          <Input
            label="New Password"
            placeholder="New Password"
            name="newPassword"
            type="password"
            onChange={this.handleChange}
            value={this.state.newPassword}
            error={hasErrors ? formErrors.newPassword : null}
          />

          <Input
            label="Repeat Password"
            placeholder="Repeat Password"
            name="repeatPassword"
            type="password"
            onChange={this.handleChange}
            value={this.state.repeatPassword}
            error={hasErrors ? formErrors.repeatPassword : null}
          />

          <Button name="Confirm New Password" type="submit" />
        </form>
      </Wrapper>
      )}
      </Consumer>
    );
  }
}

export default PasswordForm;
