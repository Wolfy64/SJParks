import React from 'react';
import makeRequest from '../../utils/makeRequest';
import Button from '../UI/Generic/Button';
import Input from '../UI/Form/Input';
import { Container, Form } from './styles';

const initialState = {
  email: '',
  password: ''
};
class Login extends React.Component {
  state = initialState;

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const dataForm = {
      email: this.state.email,
      password: this.state.password
    };
    this.sendForm(dataForm);
  };

  sendForm = async data => {
    const request = await makeRequest('/login', 'POST', data);
    const response = await request.json();
    const { message, user } = response;

    if (message) this.setState({ message });
    if (user) global.location.reload(true);
  };

  render() {
    const { email, password, message } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h1>SJParks</h1>

          {message && <span className="message">{message}</span>}

          <Input
            name="email"
            label="User ID:"
            placeholder="Enter Your Username"
            type="text"
            value={email}
            onChange={this.handleChange}
            required
          />

          <Input
            name="password"
            label="Password:"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={this.handleChange}
            required
          />
          <Button type="submit" name="LOGIN" />
        </Form>
      </Container>
    );
  }
}

export default Login;
