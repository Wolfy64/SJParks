import React from 'react';
import { Wrapper } from './styles';

const Select = props => {
  const optionsList = Object.entries(props.options).map(([key, value]) => (
    <option key={key} value={key}>
      {value}
    </option>
  ));

  return (
    <Wrapper>
      <label htmlFor={props.name}>{props.label}</label>

      <select
        {...props}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        <option>Choose an option</option>
        {optionsList}
      </select>

      {props.showError && <span>{props.showError}</span>}
    </Wrapper>
  );
};

export default Select;
