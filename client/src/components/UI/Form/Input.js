import React from 'react';
import withFormError from '../../HOC/withFormError';

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

    {props.showError && <span>{props.showError}</span>}
  </div>
);

export default withFormError(Input);
