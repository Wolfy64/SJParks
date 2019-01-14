import React from 'react';

// const Area = styled.div`
//   width: 300px;

//   textarea{
//     padding: 5px;
//     border-radius: 5px;
//     width: 288px;
//     min-height: 100px;
//   }
// `;
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
