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

  componentDidMount() {
    const cookies = new Cookies();
  	console.log('TCL: Login -> componentDidMount -> cookies', cookies)
    const token = jwt.decode(cookies.get('token'));
    console.log('TCL: Login -> componentDidMount -> token2', token);
    if (token) {
      const userID = token._id;
      this.props.history.push(`/admin/${userID}/updates`);
    }
  }

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

  sendForm = data => {
    makeRequest('/login', 'POST', data)
      .then(res => res.json())
      .then(res => {
        console.log('>> Login POST,', res)
        const { token, message } = res;
        if (message) this.setState({ message });
        if (token) {
          localStorage.setItem('token', token);
          global.location.reload(true);
        }
      })
      .catch(err => err)

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
