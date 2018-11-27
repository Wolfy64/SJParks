import React from 'react';
import './topnav.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Users} from 'react';


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
      <Router>
      <div className="top-nav">
        <nav className="navbar">
            <li><Link to="/users" onClick={this.toUsers}><img></img>IMAGE</Link></li>
        </nav>
      </div>
      </Router>
    );
  }
}

export default TopNav;

