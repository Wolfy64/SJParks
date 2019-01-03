import React from 'react';
import './sidenav.css';
import NavButton from '../UI/Generic/NavButton';

const SideBar = () => (
  <div className='sidebar'>
    <div className='title text-center nav-item'>
      <h1>SJParks</h1>
      <p>Admin</p>
    </div>
    <ul className='navbar-nav'>
      <li>
        <NavButton to='/admin/updates' name='Updates' action='updatePage' />
      </li>
      <li>
        <NavButton to='/admin/parks' name='Parks' action='parkPage' />
      </li>
      <li>
        <NavButton to='/admin/users' name='Users' action='userPage' />
      </li>
    </ul>

    <div className='logout'>
      <NavButton to='/' name='Logout' action='logoutPage' />
    </div>
  </div>
);

export default SideBar;
