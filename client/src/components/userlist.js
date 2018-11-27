import React from "react";

class UserList extends React.Component {
  state = { hidden: true };

  handleToggle() {
    this.setState({ hidden: !this.state.hidden });
  }

  render() {
    const { fullName, UserList, email, accessType } = this.props;
    return (
      <div>
        <p onClick={() => this.handleToggle()}>
          {fullName} {UserList}
        </p>
        <div className={this.state.hidden ? "hidden" : ""}>
          <p>
            {email} {accessType}
          </p>
          <button onClick={this.props.delete}>Delete User</button>
        </div>
      </div>
    );
  }
}

export default UserList;
