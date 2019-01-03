import React from 'react';
import './sidenav.css';
import { Link } from 'react-router-dom';
import NavButton from '../navbutton';

const SideBar = () => (
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
);

export default SideBar;
