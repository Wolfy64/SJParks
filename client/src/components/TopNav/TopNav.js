import React from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import {NavContainer} from './styles';

const profileImg = require('../../img/Placeholder2.jpg');

const TopNav = () => {
  const token = localStorage.getItem('token');
  const userID = jwt_decode(token).user._id;
  return (
    <NavContainer>
      <Link to={`/admin/${userID}/profile`}>
        <img className='profileImg' src={profileImg} alt="User Avatar" />
      </Link>
    </NavContainer>
  );
};

export default TopNav;
