import React from 'react';
import Textarea from '../UI/Form/Textarea';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import capsFirstLetter from '../../utils/capsFirstLetter';
import Button from '../UI/Generic/Button';
import {Title, Preview} from './styles'

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
