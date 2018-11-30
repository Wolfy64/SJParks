import React from "react";
import "./users.css";
import UserList from "./UserList";

const ERR_TEXT = "minimum 3 characaters";
const ERR_MAIL = "invalid email address";
const ERR_PASS = "minimum 6 characaters";
const ERR_SELECT = "You must choose one option";
const ERR_FORMS = "Something wrong, did you fill up everything correctly?";

/**
 * DUMMY DATA
 */
const DATA = [
  {
    fullName: "John Doe",
    userId: "john.doe100",
    email: "john@mail.com",
    accessType: "updates"
  },
  {
    fullName: "Jeanne Doe",
    userId: "jeanne.doe200",
    email: "jeanne@mail.com",
    accessType: "updates"
  },
  {
    fullName: "Bobby Doe",
    userId: "bobby.doe300",
    email: "bobby@mail.com",
    accessType: "updates"
  }
];

const REGEX_MAIL = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const Users = class userInput extends React.Component {
  state = {
    fullName: "",
    userId: "",
    email: "",
    password: "",
    passwordCheck: "",
    accessType: "updates",
    formsError: {
      fullName: false,
      userId: false,
      email: false,
      password: false,
      passwordCheck: false,
      accessType: false
    },
    showError: false
  };

  componentDidMount() {
    // Get data from the db
    this.setState({ users: DATA });
  }

  handleChange = event => {
    const { name, value } = event.target;
    const { formsError } = this.state;

    /**
     * Handle Input rules
     * Return String or false
     */
    switch (name) {
      case "fullName":
        formsError[name] = value.length < 3 ? ERR_TEXT : false;
        break;
      case "userId":
        formsError[name] = value.length < 3 ? ERR_TEXT : false;
        break;
      case "email":
        formsError[name] = REGEX_MAIL.test(value) ? false : ERR_MAIL;
        break;
      case "password":
        formsError[name] = value.length < 6 ? ERR_PASS : false;
        break;
      case "passwordCheck":
        formsError[name] = value.length < 6 ? ERR_PASS : false;
        break;
      case "accessType":
        formsError[name] =
          value === "updates"
            ? false
            : value === "premium"
            ? false
            : ERR_SELECT;
        break;
    }

    this.setState({ [name]: value, formsError });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { formsError, password, passwordCheck } = this.state;

    // Forms Data to send
    const data = { ...this.state };
    delete data.formsError;
    delete data.passwordCheck;
    delete data.showError;

    // Check if the form has error
    const hasError = Object.values(formsError).find(error => error !== false);
    const dataIsEmpty = Object.values(data).includes("");

    const passIsEqual = password === passwordCheck;

    // If Forms have error show them
    if (hasError || !passIsEqual || dataIsEmpty)
      this.setState({ showError: true });

    // If Forms is valid send data Forms to the server
    if (!hasError && passIsEqual && !dataIsEmpty) {
      const payload = {
        method: "POST",
        body: data
      };

      fetch("/admin/newuser", payload)
        .then(res => console.log(res))
        .catch(err => console.log(err));

      // FOR TESTING ONLY with dummy data
      this.setState({ users: [...this.state.users, data] });
    }
  };

  handleShowUser() {
    this.setState({ showUser: !this.state.showUser });
  }

  handleDelete(userId) {
    const { users } = this.state;
    this.setState({ users: users.filter(user => user.userId != userId) });
  }

  render() {
    return (
      <div>
        <h1>USERS</h1>
        {this.state.showError && ERR_FORMS}
        <form onSubmit={this.handleSubmit} style={{ display: "grid" }}>
          <label htmlFor='fullName'>Full Name:</label>
          {this.state.showError && this.state.formsError.fullName}
          <input
            id='fullName'
            placeholder='Full Name'
            name='fullName'
            type='text'
            value={this.state.fullName}
            onChange={this.handleChange}
          />

          <label htmlFor='userId'>User ID: </label>
          {this.state.showError && this.state.formsError.userId}
          <input
            id='userId'
            placeholder='User ID'
            name='userId'
            type='text'
            value={this.state.userId}
            onChange={this.handleChange}
          />

          <label htmlFor='email'>Email:</label>
          {this.state.showError && this.state.formsError.email}
          <input
            id='email'
            placeholder='Email'
            name='email'
            type='email'
            value={this.state.email}
            onChange={this.handleChange}
          />

          <label htmlFor='password'>Password:</label>
          {this.state.showError && this.state.formsError.password}
          <input
            id='password'
            placeholder='Password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />

          <label htmlFor='passwordCheck'>Confirm Password:</label>
          {this.state.showError && this.state.formsError.passwordCheck}
          <input
            id='passwordCheck'
            placeholder='Confirm Password'
            name='passwordCheck'
            type='password'
            value={this.state.passwordCheck}
            onChange={this.handleChange}
          />

          <label htmlFor='accessType'>Access Type:</label>
          {this.state.showError && this.state.formsError.accessType}
          <select
            id='accessType'
            name='accessType'
            value={this.state.accessType}
            onChange={this.handleChange}>
            <option value='updates'>Updates Only</option>
            <option value='premium'>Premiun Access</option>
          </select>

          <button type='submit'>Create New User</button>
        </form>
        // Show a list of users
        {this.state.users &&
          this.state.users.map(user => (
            <UserList
              key={user.userId}
              fullName={user.fullName}
              userId={user.userId}
              email={user.email}
              accessType={user.accessType}
              delete={() => this.handleDelete(user.userId)}
            />
          ))}
      </div>
    );
  }
};

export default Users;
