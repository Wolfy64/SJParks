import React from 'react';
import { NavButton } from './styles';

export default props => (
  <NavButton type={props.type || 'button'}>{props.name || 'Unnamed'}</NavButton>
);
