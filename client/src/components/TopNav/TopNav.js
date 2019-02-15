import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../utils/Context'
import { NavContainer } from './styles';
import profileImg from '../../img/Placeholder2.jpg';

const TopNav = props => (
  <Consumer>
    {user => (
      <NavContainer>
        <Link to={`/admin/${user._id}/profile`}>
          <img className="profileImg" src={profileImg} alt="User Avatar" />
        </Link>
      </NavContainer>
    )}
  </Consumer>
);

export default TopNav;
