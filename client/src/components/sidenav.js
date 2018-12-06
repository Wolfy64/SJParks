import React, { Component } from 'react';
import NavButton from './navbutton';
import './sidenav.css';

export default class SideNav extends Component {
  render() {
    return (
      <div className="row">
      <div className="col-sm-2">
      <div>
      <h1>SJParks</h1>
      <p className="text-center w-100 d-inline-block">Admin</p>
      </div>
      <ul className="navbar-nav full-height d-flex flex-column justify-content-between">
        <li>
        <li><NavButton name="Updates" action="updatePage"/></li>
        <li><NavButton name="Parks" action="parkPage"/></li>
        <li><NavButton name="Users" action="userPage" /></li>
        </li>
        <li><NavButton name="Logout" action="logoutPage" /></li>
            </ul>
        </div>
        </div>
    );
  }
}


