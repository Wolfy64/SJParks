import React from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  label {
    color: ${props => props.theme.colors.secondary};
    margin: 1rem;
  }
  input {
    border: solid 1px #a4a4a4;
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 0.8em;
  }
  span {
    color: ${props => props.theme.colors.danger};
  }
`;

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
