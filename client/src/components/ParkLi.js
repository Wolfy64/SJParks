import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
  background-color: ${props =>
    props.selected ? props.theme.colors.success : props.theme.colors.lightbg};
  color: ${props =>
    props.selected ? props.theme.colors.light : props.theme.colors.secondary};
  padding: 7px;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`;

const ParkLi = props => (
  <Label selected={props.selected} onClick={props.clicked}>
    <span>
      {props.park.name} - {props.park.parkID}
    </span>
    {props.selected ? <i class='fa fa-times' /> : <i class='fa fa-plus' />}
  </Label>
);

export default ParkLi;
