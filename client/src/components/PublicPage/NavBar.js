import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  color: ${props => props.theme.colors.light};
  background-color: ${props => props.theme.colors.primary};
  display: flex;
  justify-content: space-between;
  padding-top: 1.2rem;

  ul {
    display: flex;
    align-items: center;
  }

  li {
    margin-right: 1rem;
  }

  a {
    color: ${props => props.theme.colors.light};
    text-decoration: none;
    :hover {
      font-weight: bold;
    }
  }

  .logo {
    font-size: 1.5rem;
    margin-left: 1rem;
  }
`;

const NavBar = () => (
  <Nav>
    <span className='logo'>SJParks Text Notification Service</span>
    <ul>
      <li>
        <a href='#about'>About</a>
      </li>
      <li>
        <a href='#subscribe'>Subscribe</a>
      </li>
      <li>
        <a href='#contact'>Contact</a>
      </li>
    </ul>
  </Nav>
);

export default NavBar;
