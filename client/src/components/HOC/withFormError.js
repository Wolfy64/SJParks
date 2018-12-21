import React from 'react';
import { msgErr } from '../../config/messages';
import { regex } from '../../config/regex';

const withFormError = WrappedComponent => {
  const FormError = props => {
    const { type, options, value } = props;
    let error;

    // If there is an error return the error message
    if (WrappedComponent.name === 'Input') {
      switch (type) {
        case 'text':
          error = value.length < 3 && msgErr.text;
          break;
        case 'email':
          error = !RegExp(regex.mail).test(value) && msgErr.mail;
          break;
        case 'tel':
          error = !RegExp(regex.phone).test(value) && msgErr.phone;
          break;
        case 'password':
          error = value.length < 6 && msgErr.pass;
          break;
        default:
          error = msgErr.form;
          break;
      }
    }

    // If there is an error return the error message
    if (WrappedComponent.name === 'Select') {
      error = !Object.keys(options).find(el => el === value) && msgErr.select;
    }

    return (
      <WrappedComponent
        {...props}
        hasError={props.hasError(error)}
        showError={props.showError && error}
      />
    );
  };

  return FormError;
};

export default withFormError;
