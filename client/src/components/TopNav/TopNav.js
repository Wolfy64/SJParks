import React from 'react';
import './topnav.css';
import {Link} from 'react-router-dom';

const profileImg = require('../../img/Placeholder2.jpg');

const TopNav = () => {
  return (
  <div className = 'top-nav' >
    <nav className = 'navbar' >
      <li>
        <Link to = '/admin/profile'>
          <img src={ profileImg} />
        </Link >
      </li>
    </nav >
  </div>
  );
}

export default TopNav;
