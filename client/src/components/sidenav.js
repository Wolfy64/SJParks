import React, { Component } from 'react';
import NavButton from './navbutton';
import './sidenav.css';

export default class SideNav extends Component {
    constructor(props) {
    super(props);
    this.state = {
        page: "updates",
    };

    // This binding is necessary to make `this` work in the callback
    this.toUpdates = this.toUpdates.bind(this);
    this.toParks = this.toParks.bind(this);
    this.toUsers = this.toUsers.bind(this);
    this.toLogout = this.toLogout.bind(this);
  }
    
    toUpdates() {
        if(this.props.page !== "updates"){
            this.setState({ page: "updates" }) 
        }
        console.log(this.props)
  }
    toParks() {
        if(this.state.page !== "parks"){
            this.setState({ page: "parks" })
        }
        console.log(this.state)
  }
    toUsers() {
        if(this.state.page !== "users"){
            this.setState({ page: "users" })
        }
        console.log(this.state)
        
  }
    toLogout() {
        if(this.state.page !== "logout"){
            this.setState({ page: "logout" })
            console.log(this.state)
        }
        alert("Logged out!")
        
  }
    
    render() {
    return (
      <div className="sidebar">
      <div className="title text-center nav-item">
          <h1>SJParks</h1>
          <p>Admin</p>
      </div>
      <ul className="navbar-nav">
        <li onClick={this.toUpdates}><NavButton name="Updates" action="updatePage"/></li>
        <li onClick={this.toParks}><NavButton name="Parks" action="parkPage"/></li>
        <li onClick={this.toUsers}><NavButton name="Users" action="userPage" /></li>
      </ul>
      <div onClick={this.toLogout} className="logout">
        <NavButton name="Logout" action="logoutPage" />
      </div>
      </div>
    );
  }

}


