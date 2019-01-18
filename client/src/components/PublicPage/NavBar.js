import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 1.2rem;
  color: ${props => props.theme.colors.light};
  background-color: ${props => props.theme.colors.primary};

  ul {
    display: flex;
    align-items: center;
    margin-right: 2rem;
    justify-self: right;
  }

  li {
    width: 90px;
    text-align: center;
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

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    grid-template-columns: inherit;
    justify-content: center;
    margin-bottom: 2rem;

    ul {
      margin: 1rem;
    }
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
