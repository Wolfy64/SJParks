import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  color: ${props => props.theme.colors.lightbg};
  background-color: ${props => props.theme.colors.dark};

  :hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const NavButton = props => (
  <Btn type={props.type || 'button'}>{props.name || 'Unnamed'}</Btn>
);

export default NavButton;
