import React from 'react';
import { withRouter } from 'react-router';
import makeRequest from '../../utils/makeRequest';
import Button from '../UI/Generic/Button';
import Input from '../UI/Form/Input';
import { Container, Form } from './styles';

class Login extends React.Component {
  state = { email: '', password: '' };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    makeRequest('/login', 'POST', this.state )
      .then(res => res.json())
      .then(user => {
        window.location.replace(`/admin/${user._id}/updates`);
      })
      .catch(err => err)
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

export default withRouter(Login);
