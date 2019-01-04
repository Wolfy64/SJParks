import React from 'react';
import styled from 'styled-components';

const Nav = styled.ul`
  position: fixed;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 30px;
  background-color: #004A75;
  color: white;

  a{
    color: white;
    :hover{
      text-decoration: none;
      color: #E2E2E2;
    }
  }
`

const NavBar = () => (
  <nav>
    <Nav>
      <strong>SJParks Text Notification Service</strong>
      <li>
        <a href='#about'>About</a>
      </li>
      <li>
        <a href='#subscribe'>Subscribe</a>
      </li>
      <li>
        <a href='#contact'>Contact</a>
      </li>
    </Nav>
  </nav>
);

export default NavBar;
