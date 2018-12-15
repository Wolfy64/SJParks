import React, { Component } from 'react';
import NavButton from './navbutton';
import './sidenav.css';
import Topnav from './TopNav/TopNav';
import Parks from './parks';
import Users from './Users';
import Updates from './updates';
import NewUpdate from './NewUpdate';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ProfilePage from './ProfilePage';

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
                <Link to='/admin/updates'>
                  <NavButton name='Updates' action='updatePage' />
                </Link>
              </li>
              <li>
                <Link to='/admin/parks'>
                  <NavButton name='Parks' action='parkPage' />
                </Link>
              </li>
              <li>
                <Link to='/admin/users'>
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
            <Route path='/admin/newupdate' component={NewUpdate} />
            <Route path='/admin/updates' component={Updates} />
            <Route path='/admin/parks' component={Parks} />
            <Route path='/admin/users' component={Users} />
            <Route path='/admin/profile' component={ProfilePage} />
          </div>
        </div>
      </Router>
    );
  }
}
