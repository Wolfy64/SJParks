import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavContainer } from './styles';
import { Consumer } from '../../utils/Context';

const profileImg = require('../../img/Placeholder2.jpg');
class TopNav extends Component {
  render() {
    return (
      <Consumer>
        {user => (
          <NavContainer>
            <Link to={`/admin/${user._id}/profile`}>
              <img className='profileImg' src={profileImg} alt="User Avatar" />
            </Link>
          </NavContainer>
        )}
      </Consumer>
    );
  }
}

export default TopNav;
