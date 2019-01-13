import React from 'react';
import './topnav.css';
import { Link } from 'react-router-dom';

const TopNav = () => (
  <div className='top-nav'>
    <nav className='navbar'>
      <li>
        <Link to='/admin/profile'>IMAGE</Link>
      </li>
    </nav>
  </div>
);

export default TopNav;
