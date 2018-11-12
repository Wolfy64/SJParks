import React from 'react';
import './topnav.css';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
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
      <BrowserRouter>
      <div className="top-nav">
        <nav className="navbar">
            <li><Link></Link>newUpdate</li>
            <li><Link to="/users" onClick={this.toUsers}><img></img>IMAGE</Link></li>
        </nav>
      </div>
      </BrowserRouter>
    );
  }
}

export default TopNav;

