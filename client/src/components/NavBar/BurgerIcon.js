import React from 'react';
import { BurgerIcon } from './styles';

export default ({ open, toggle }) => (
  <BurgerIcon onClick={toggle}>
    {open ? <i className="fa fa-bars" /> : <i className="fa fa-times" />}
  </BurgerIcon>
);
