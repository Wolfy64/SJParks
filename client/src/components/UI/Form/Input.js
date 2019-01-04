import React from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  input {
    border: solid 1px #A4A4A4;
    border-radius: 5px;
    padding 3px;
  }
`

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
    />

    {props.error && <span>{props.error}</span>}
  </InputBox>
);

export default Input;
