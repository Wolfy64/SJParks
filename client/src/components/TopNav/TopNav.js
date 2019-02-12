import React from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import {NavContainer} from './styles';

const profileImg = require('../../img/Placeholder2.jpg');

const TopNav = (props) => {
    return (
      <NavContainer>
        <Link to={`/admin/${props.user._id}/profile`}>
          <img className='profileImg' src={profileImg} alt="User Avatar" />
        </Link>
      </NavContainer>
    );
};

export default TopNav;
