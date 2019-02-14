import React from 'react';
import { Link } from 'react-router-dom';
import { NavContainer } from './styles';
import profileImg from '../../img/Placeholder2.jpg';

const TopNav = ({ user }) => (
  <NavContainer>
    <Link to={`/admin/${user._id}/profile`}>
      <img className="profileImg" src={profileImg} alt="User Avatar" />
    </Link>
  </NavContainer>
);

export default TopNav;
