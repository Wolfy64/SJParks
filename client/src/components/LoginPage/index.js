import React from 'react';
import jwt_decode from 'jwt-decode';
import Button from '../UI/Generic/Button';
import Input from '../UI/Form/Input';
import {Container, Form} from './styles'

const initialState = {
  email: '',
  password: ''
};
class Login extends React.Component {
  state = initialState;

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const userID = jwt_decode(token).user._id;
      this.props.history.push(`/admin/${userID}/updates`);
    }
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit = e => {
    e.preventDefault();
    const dataForm = {
      email: this.state.email,
      password: this.state.password
    };
    this.sendForm(dataForm);
  }

  sendForm = async dataForm => {
    const payload = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    };
    const res = await fetch('/login', payload);
    const { token, message } = await res.json();

    if (message) this.setState({ message });
    if (token) {
      localStorage.setItem('token', token);
      global.location.reload(true);
    }

    // Reset Form field
    this.setState(initialState);
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
