import React from 'react';
import {Nav} from './styles';

const NavBar = () => (
  <Nav>
    <h1 className="logo">
      SJParks <span className="nobreak">Text Notification Service</span>
    </h1>
    <ul>
      <li>
        <a href="#about">About</a>
      </li>
      <li>
        <a href="#subscribe">Subscribe</a>
      </li>
      <li>
        <a href="#contact">Contact</a>
      </li>
    </ul>
  </Nav>
);

export default NavBar;
