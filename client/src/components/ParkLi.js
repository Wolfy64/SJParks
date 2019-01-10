import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
  background-color: ${props => props.theme.colors.success};
  color: ${props => props.theme.colors.light};
  padding: 7px;
  margin: 5px 0;
  border-radius: 5px;
`
const ParkLi = props => (
  <Label>
    <li onClick={props.clicked}>
      <span>{props.park.name}</span>
    </li>
  </Label>
);

export default ParkLi;