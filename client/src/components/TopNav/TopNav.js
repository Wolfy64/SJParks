import React from 'react';
import jwt_decode from 'jwt-decode';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  height: 100px;
  align-items: center;
  img {
    height: 36px;
    width: auto;
    border-radius: 50%;
  };
  @media screen and (max-width: ${(props) => props.theme.displays.mobileL}) {
    display: fixed;
    justify-content: start;
    margin: auto 20px;
  }
`;

const profileImg = require('../../img/Placeholder2.jpg');

const TopNav = () => {
  const token = localStorage.getItem('token');
  const userID = jwt_decode(token).user._id;
  return (
    <Nav className="navbar">
      <Link to={`/admin/${userID}/profile`}>
        <img src={profileImg} alt="User Avatar" />
      </Link>
    </Nav>
  );
};

export default TopNav;
