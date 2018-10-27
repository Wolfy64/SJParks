import React, { Component } from 'react';
import NavButton from './navbutton';

export default class SideNav extends Component {
  render() {
    return (
      <div className="full-height">
      <div className="col-sm-3 d-flex flex-column">
            <h1 className="text-center">SJParks</h1>
            <p className="text-center">Admin</p>
            <ul className="navbar-nav">
                <li className="sidebar-brand">
                <li><NavButton name="Updates" action="updatePage"/></li>
                <li><NavButton name="Parks" action="parkPage"/></li>
                <li><NavButton name="Users" action="userPage" /></li>
                <li><NavButton className="align-self-end" name="Logout" action="logoutPage" /></li>
                </li>
            </ul>
        </div>
        </div>
    );
  }
}


