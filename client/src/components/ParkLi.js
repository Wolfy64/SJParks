import React from 'react';
import styled from 'styled-components';

const Label = styled.div`
  background-color: ${(props) => {
    console.log(props)
    if(props.selected) {
      return props.theme.colors.success
    } else {
      return props.theme.colors.lightbg
    }
  }};
  color: ${(props) => {
    console.log(props)
    if(props.selected) {
      return props.theme.colors.light
    } else {
      return props.theme.colors.dark
    }
  }};
  padding: 7px;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
`
const ParkLi = props => (
  <Label selected={props.selected} onClick={props.clicked}>
      <span>{props.park.name} - {props.park.parkID}</span>
      {props.selected? <i class="fa fa-times"></i> : <i class="fa fa-plus"></i>}
  </Label>
);

export default ParkLi;