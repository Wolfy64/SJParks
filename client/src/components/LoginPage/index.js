/*jshint esversion: 8 */
import React from "react";
import { withRouter } from "react-router";
import makeRequest from "../../utils/makeRequest";
import Button from "../UI/Generic/Button";
import Input from "../UI/Form/Input";
import { Container, Form } from "./styles";

class Login extends React.Component {
  state = { email: "", password: "" };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const request = await makeRequest("/login", "POST", this.state);
    const { success, message } = await request.json();

    success ? window.location.reload() : this.setState({ message });
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