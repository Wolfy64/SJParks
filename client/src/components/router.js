import React, { Component } from "react";
import NavButton from "./navbutton";
import "./sidenav.css";
import Topnav from "./topnav";
import Parks from "./parks";
import Users from "./Users/Users";
import Updates from "./updates";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class SideNav extends Component {
  render() {
    return (
      <Router>
        <div>
          <Topnav />
          <div className='sidebar'>
            <div className='title text-center nav-item'>
              <h1>SJParks</h1>
              <p>Admin</p>
            </div>
            <ul className='navbar-nav'>
              <li>
                <Link to='/updates'>
                  <NavButton name='Updates' action='updatePage' />
                </Link>
              </li>
              <li>
                <Link to='/parks'>
                  <NavButton name='Parks' action='parkPage' />
                </Link>
              </li>
              <li>
                <Link to='/users'>
                  <NavButton name='Users' action='userPage' />
                </Link>
              </li>
            </ul>

            <div className='logout'>
              <a href='/'>
                <NavButton name='Logout' action='logoutPage' />
              </a>
            </div>
          </div>
          <div className='page'>
            <Route path='/updates' component={Updates} />
            <Route path='/parks' component={Parks} />
            <Route path='/users' component={Users} />
          </div>
        </div>
      </Router>
    );
  }
}
