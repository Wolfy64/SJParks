import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  select {
    border: solid 1px ${props => props.theme.colors.lightbg};
    width: 100%;
    padding: 0.3rem;
    font-size: 0.7em;
    margin: 0.3rem 0;
  }
  label {
    color: ${props => props.theme.colors.secondary};
    margin: 0.6rem 0 0 0.3rem;
  }
  margin: 0.6rem 0 0;
`;

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
        onChange={props.onChange}>
        <option>Choose an option</option>
        {optionsList}
      </select>

      {props.showError && <span>{props.showError}</span>}
    </Wrapper>
  );
};

export default Select;