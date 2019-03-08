/*jshint esversion: 8 */
import React from 'react';
import styled from 'styled-components';

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.4rem 0;
  label {
    color: ${props => props.theme.colors.secondary};
    margin: 0.6rem 0 0.3rem 0.3rem;
  }
  input {
    border: solid 1px ${props => props.theme.colors.lightbg};
    border-radius: 5px;
    padding: 0.3rem;
    font-size: 0.7em;
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
      autoComplete={props.name}
    />

    {props.error && <span>{props.error}</span>}
  </InputBox>
);

export default Input;
