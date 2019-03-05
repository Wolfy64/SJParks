/*jshint esversion: 8 */
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
  :hover{
    cursor: pointer;
  }
`;

const ParkLi = props => (
  <Label selected={props.selected} onClick={props.clicked}>
      <span>{props.park.name} - {props.park.code}</span>
      {props.selected? <i className="fa fa-times"></i> : <i className="fa fa-plus"></i>}
  </Label>
);

export default ParkLi;
