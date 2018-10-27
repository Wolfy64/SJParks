import React, { Component } from 'react'

export default class SideNav extends Component {
  render() {
    return (
      <div id="wrapper row">
      <div id="sidebar-wrapper col-md-2">
            <h1>SJParks</h1>
            <p className="text-center">Admin</p>
            <ul className="navbar-nav">
                <li className="sidebar-brand">
                <li><navButton name="Updates" action="updatePage"/></li>
                <li><navButton name="Parks" action="parkPage"/></li>
                <li><navButton name="Users" action="userPage" /></li>
                <li><navButton name="Logout" action="logoutPage" /></li>
                </li>
            </ul>
        </div>
        </div>
    );
  }
}


