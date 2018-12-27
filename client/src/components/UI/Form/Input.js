import React from 'react';

const Input = props => (
  <div>
    <label htmlFor={props.name}>{props.label}</label>

    <input
      id={props.name}
      placeholder={props.placeholder}
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.onChange}
    />

    {props.error && <span>{props.error}</span>}
  </div>
);

export default Input;
