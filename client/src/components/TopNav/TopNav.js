import React from 'react';
import jwt_decode from 'jwt-decode';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100px;
  align-items: center;
  margin: auto 20px;
  z-index: 10;
  .profileImg {
    height: 36px;
    width: auto;
    border-radius: 50%;
    z-index:10;
  };
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    justify-content: start;
    position: fixed;
    top: 0;
  }
`;

const profileImg = require('../../img/Placeholder2.jpg');

const TopNav = () => {
  const token = localStorage.getItem('token');
  const userID = jwt_decode(token).user._id;
  return (
    <Nav>
      <Link to={`/admin/${userID}/profile`}>
        <img className='profileImg' src={profileImg} alt="User Avatar" />
      </Link>
    </Nav>
  );
};

export default TopNav;
