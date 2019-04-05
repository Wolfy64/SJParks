import React from 'react';
import { Message } from './styles';

export default props => {
  const { success, info, error } = props;
  return (
    <Message {...props}>
      <p>{success || info || error}</p>
    </Message>
  );
};
