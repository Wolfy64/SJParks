import React from 'react';
import styled from 'styled-components';
import Button from '../UI/Generic/Button';
import Input from '../UI/Form/Input';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';

const Screen = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.dark};
  padding: 10%;

  h1 {
    text-align: center;
  }

  .card {
    display: flex;
    height: 400px;
    max-width: 400px;
    padding: 40px 30px 60px;
    background-color: white;
    border-radius: 15px;
    margin: 0 auto;
    justify-content: space-between;
    box-shadow: -5px 3px 3px black;
  }
  .message {
    text-align: center;
    color: ${props => props.theme.colors.danger};
  }
`;

const initialState = {
  username: '',
  psw: '',
  showErrors: false,
  formErrors: false
};
class Login extends React.Component {
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
    const { username, psw, formErrors } = this.state;
    const dataForm = { username, psw };
    const isValid = isFormValid(formErrors, dataForm);

    isValid
      ? this.handleSendForm(dataForm)
      : this.setState({ showErrors: true });
  };

  handleSendForm = dataForm => {
    const payload = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    };

    fetch(window.location.pathname, payload)
      .then(res => res.json())
      .then(res => res.message && this.setState({ message: res.message }))
      .catch(err => console.log(err));
    console.log('SEND DATA', dataForm);

    // Reset Form field
    this.setState(initialState);
  };

  render() {
    const { username, psw, showErrors, formErrors, message } = this.state;
    const hasErrors = showErrors && formErrors;

    return (
      <Screen>
        <form onSubmit={this.handleSubmit}>
          <div className='card'>
            <h1>SJParks</h1>
            {message && <span className='message'>{message}</span>}
            <Input
              name='username'
              label='User ID:'
              placeholder='Enter Your Username'
              type='text'
              value={username}
              onChange={this.handleChange}
              error={hasErrors ? formErrors.username : null}
              required
            />

            <Input
              name='psw'
              label='Password:'
              placeholder='Enter Password'
              type='psw'
              value={psw}
              onChange={this.handleChange}
              error={hasErrors ? formErrors.psw : null}
              required
            />
            <Button type='submit' name='LOGIN' />
          </div>
        </form>
      </Screen>
    );
  }
}

export default Login;
