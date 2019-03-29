import React from 'react';
import { Area } from './styles';

const Textarea = props => (
  <Area>
    <label htmlFor={props.name}>{props.label}</label>

    <textarea
      {...props}
      id={props.name}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />

    {props.error && <span>{props.error}</span>}
  </Area>
);

export default Textarea;
