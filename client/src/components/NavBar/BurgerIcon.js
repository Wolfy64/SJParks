import React from 'react';
import styled from 'styled-components';

const BurgerIcon = styled.div`
  height: 20px;
  width: 30px;
  padding: 40px 20px;
  position: fixed;
  right: 0px;
  justify-content: center;
`;

export default ({ open, toggle }) => (
  <BurgerIcon onClick={toggle}>
    {open ? <i className="fa fa-bars" /> : <i className="fa fa-times" />}
  </BurgerIcon>
);
