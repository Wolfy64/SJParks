import React from 'react';
import Textarea from '../UI/Form/Textarea';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import capsFirstLetter from '../../utils/capsFirstLetter';
import Button from '../UI/Generic/Button';
import styled from 'styled-components';

const Title = styled.div`
    display: flex;
    align-items: center;
    label{
    margin: 0.3rem;
  };
  .label{
    color: ${props => props.theme.colors.secondary};
  };
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
  };

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  };

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.primary};
    -webkit-transition: .4s;
    transition: .4s;
  };

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    right: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  };

  input:checked + .slider {
    background-color: ${props => props.theme.colors.lightbg};
  };

  input:checked + .slider:before {
    -webkit-transform: translateX(-16px);
    -ms-transform: translateX(-16px);
    transform: translateX(-16px);
  };

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  };

  .slider.round:before {
    border-radius: 50%;
  };
`;

const Preview = styled.div`
    background-color: ${props => props.theme.colors.lightbg};
    color: ${props => props.theme.colors.secondary};
    border-radius: 20px;
    padding: 8px 15px;
    margin-top: 40px;
    margin-bottom: 10px;
    display: inline-block;
    position: relative;
    max-width: 200px;
    word-wrap: break-word;
    :before {
      content: "";
      position: absolute;
      z-index: 0;
      bottom: 0;
      left: -7px;
      height: 20px;
      width: 20px;
      background: ${props => props.theme.colors.lightbg};
      border-bottom-right-radius: 15px;
    };
    :after {
      content: "";
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: -10px;
      width: 10px;
      height: 20px;
      background: white;
      border-bottom-right-radius: 10px;
    };
`;

const initialState = {
  message: '',
  title: true,
  parksTitle: '',
  showError: false,
  formErrors: null
};

class EditMessage extends React.Component {
  state = initialState;

  componentDidMount() {
    this.handleParksTitle();
  }

  componentDidUpdate(prevProps) {
    if (this.props.titles !== prevProps.titles) this.handleParksTitle();
  }

  handleParksTitle = () => {
    const parksTitle = this.props.titles
      .map(el => capsFirstLetter(el))
      .reduce((acc, red) => acc + `, ${red}`)
      .concat(',');

    this.setState({ parksTitle });
  };

  handleChange = e => {
    const { name, type, value } = e.target;

    this.setState({
      [name]: value,
      formErrors: {
        ...this.state.formErrors,
        [name]: errorFormHandler(type, value)
      }
    });
  };

  handleToggle = () => this.setState({ title: !this.state.title });

  handleSubmit = e => {
    e.preventDefault();
    const { formErrors, parksTitle, title } = this.state;
    let { message } = this.state;
    const isValid = isFormValid(formErrors, message);

    if (title) message = `${parksTitle} \n${message}`;

    isValid
      ? this.handleSendForm(message)
      : this.setState({ showErrors: true });
  };

  handleSendForm = dataForm => {
    const payload = { method: 'POST', body: JSON.stringify(dataForm) };

    fetch('/admin/newupdate', payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('SEND DATA', dataForm);

    // Reset Form field
    this.setState(initialState);
  };

  render() {
    const { formErrors, message, parksTitle, showErrors, title } = this.state;
    const hasErrors = showErrors && formErrors;

    return (
      <form className='editMessage' onSubmit={this.handleSubmit}>
        <Title>
          <label className='label'>Add Title(s)</label>
          <label className='switch'>
            <input
              name='title'
              type='checkbox'
              value='title'
              onChange={this.handleToggle}
              {...this.state.title}
            />
            <span className='slider round'></span>
          </label>
        </Title>

        <Textarea
          placeholder='Write your message here'
          name='message'
          onChange={this.handleChange}
          value={message}
          error={hasErrors && formErrors.message}
          required
        />
        {message 
        ? <Preview> <p>
          {title 
          ? parksTitle+" "+message
          : message}</p></Preview>
        : <Preview><p>...Message Preview</p></Preview>
        }
        <Button className='button' name='SUBMIT' />
      </form>
    );
  }
}
export default EditMessage;
