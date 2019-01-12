import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  background: inherit;
  margin: 3px;
  color: ${props => props.theme.colors.info};
  border: none;
  :hover{
    text-decoration: underline;
  }
`;

const ButtonText = props => <Btn {...props}>{props.children}</Btn>;
export default ButtonText;
