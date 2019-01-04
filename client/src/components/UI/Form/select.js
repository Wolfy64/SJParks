import React from 'react';

const ERR_SELECT = 'You must choose one option';

class Select extends React.Component {
  handleError = value => {
    const option = Object.keys(this.props.options).find(el => el === value);
    return option ? null : ERR_SELECT;
  };

  render() {
    const {
      hasError,
      label,
      name,
      onChange,
      options,
      showError,
      value
    } = this.props;

    const error = this.handleError(value);
    const optionsList = Object.entries(options).map(([key, value]) => (
      <option key={key} value={key}>
        {value}
      </option>
    ));

    return (
      <div>
        <label htmlFor={name}>{label}</label>

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          haserror={hasError(error)}>
          {optionsList}
        </select>

        {showError ? <span>{error}</span> : null}
      </div>
    );
  }
}

export default Select;
