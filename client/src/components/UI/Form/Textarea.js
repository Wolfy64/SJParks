import React from 'react';
import styled from 'styled-components'

const Area = styled.div`
  grid-column: span 2;
  width: 100%;
  textarea {
    border: solid 1px ${props => props.theme.colors.lightbg};
    border-radius: 5px;
    padding: 0.3rem;
    font-size: 0.7em;
    min-height: 100px;
    width: 100%;
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

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
