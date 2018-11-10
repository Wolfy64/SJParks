import React from 'react';
import './topnav.css';


class TopNav extends React.Component {
  constructor(props){
  super(props);
  this.state = {
    page: "users",
  };

  this.toUsers = this.toUsers.bind(this);
  }

  toUsers(e){
    alert("This buttons goes to users");
    e.preventDefault();
  }
  render() {
    return (
      <div className="top-nav">
        <nav className="navbar">
            <li>newUpdate</li>
            <li><a href ='' onClick={this.toUsers}><img></img>IMAGE</a></li>
        </nav>
      </div>
    );
  }
}

export default TopNav;

