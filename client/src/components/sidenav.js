import React, { Component } from 'react';
import NavButton from './navbutton';
import './sidenav.css';

export default class SideNav extends Component {
    render() {
    return (
      <div className="sidebar">
      <div className="title text-center nav-item">
          <h1>SJParks</h1>
          <p>Admin</p>
      </div>
      <ul className="navbar-nav">
        <li><NavButton onClick={()=>{alert("run")}} name="Updates" action="updatePage"/></li>
        <li><NavButton name="Parks" action="parkPage"/></li>
        <li><NavButton name="Users" action="userPage" /></li>
      </ul>
      <div className="logout">
        <NavButton name="Logout" action="logoutPage" />
      </div>
      </div>
    );
  }
}


