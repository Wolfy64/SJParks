import React from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  background: inherit;
  margin: 1rem;
  color: ${props => props.theme.colors.info};
  border: none;
  font-size: 1rem;
`;

const ButtonText = props => <Btn {...props}>{props.children}</Btn>;
export default ButtonText;
