import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  height: 50px;
  padding: 10px;

  img {
    height: 36px;
    width: auto;
    border-radius: 50%;
  }
`;

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
