import React from 'react';
import { InputBox } from './styles';

const Input = props => (
  <InputBox>
    <label htmlFor={props.name}>{props.label}</label>

    <input
      {...props}
      id={props.name}
      placeholder={props.placeholder}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
      autoComplete={props.name}
    />

    {props.error && <span>{props.error}</span>}
  </InputBox>
);

export default Input;
