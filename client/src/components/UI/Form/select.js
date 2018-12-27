import React from 'react';
import withFormError from '../../HOC/withFormError';

const Select = props => {
  const optionsList = Object.entries(props.options).map(([key, value]) => (
    <option key={key} value={key}>
      {value}
    </option>
  ));

  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>

      <select
        {...props}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}>
        <option>Choose an option</option>
        {optionsList}
      </select>

      {props.showError && <span>{props.showError}</span>}
    </div>
  );
};

export default withFormError(Select);
