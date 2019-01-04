import React from 'react';

const ParkLi = props => (
  <li onClick={props.clicked}>
    <span>{props.park.name}</span>-<span>{props.park.parkID}</span>
  </li>
);

export default ParkLi;
