import React from 'react';
import { Link } from 'react-router-dom';
import { Btn } from './styles';

const Button = props => {
  if (!props.to) {
    return <Btn {...props}>{props.name}</Btn>;
  } else {
    return (
      <Link style={{ textDecoration: 'none' }} to={props.to}>
        <Btn {...props}>{props.name}</Btn>
      </Link>
    );
  }
};
export default Button;
