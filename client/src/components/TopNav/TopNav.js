import React from 'react';
import './topnav.css';
import { Link } from 'react-router-dom';

const profileImg = require('../../img/Placeholder2.jpg');
 
const TopNav = () => (
  <div className='top-nav'>
    <nav className='navbar'>
      <li>
        <Link to='/admin/profile'><img src={profileImg} alt="profile"></img></Link>
      </li>
    </nav>
  </div>
);

export default TopNav;
