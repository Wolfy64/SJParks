import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  background-color: ${props => props.success && props.theme.colors.success};
  background-color: ${props => props.info && props.theme.colors.info};
  background-color: ${props => props.error && props.theme.colors.danger};
  background-color: ${props => props.color};
  color: ${props => props.theme.colors.light};
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  border-radius: 5px;
`;

export default props => {
  const { success, info, error } = props;
  return (
    <Message {...props}>
      <p>{success || info || error}</p>
    </Message>
  );
};
