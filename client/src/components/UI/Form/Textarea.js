import React from 'react';

const Textarea = props => (
  <div>
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
  </div>
);

export default Textarea;
