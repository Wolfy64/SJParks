import React from 'react';

const ERR_TEXT = 'Minimum 3 characaters';
const ERR_MAIL = 'Invalid email address';
const ERR_TEL = 'Invalid phone number';
const ERR_PASS = 'Minimum 6 characaters';
const ERR_FORMS = 'Something wrong, did you fill up everything correctly?';

const REGEX_MAIL = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const REGEX_TEL = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;

class Input extends React.Component {
  handleError = (value, type) => {
    switch (type) {
      case 'text':
        return value.length < 3 ? ERR_TEXT : null;
      case 'email':
        return REGEX_MAIL.test(value) ? null : ERR_MAIL;
      case 'tel':
        return REGEX_TEL.test(value) ? null : ERR_TEL;
      case 'password':
        return value.length < 6 ? ERR_PASS : null;
      default:
        return ERR_FORMS;
    }
  };

  render() {
    const {
      hasError,
      label,
      name,
      onChange,
      placeholder,
      showError,
      type,
      value
    } = this.props;

    const error = this.handleError(value, type);

    return (
      <div>
        <label htmlFor={name}>{label}</label>

        <input
          id={name}
          placeholder={placeholder}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          haserror={hasError(error)}
        />

        {showError ? <span>{error}</span> : null}
      </div>
    );
  }
}

export default Input;
