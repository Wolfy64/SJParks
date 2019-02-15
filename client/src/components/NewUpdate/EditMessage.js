import React from 'react';
import Textarea from '../UI/Form/Textarea';
import makeRequest from '../../utils/makeRequest';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import capsFirstLetter from '../../utils/capsFirstLetter';
import Button from '../UI/Generic/Button';
import { Title, Preview } from './styles';

const initialState = {
  message: '',
  title: true,
  parksTitle: '',
  showError: false,
  formErrors: null
};

class EditMessage extends React.Component {
  state = initialState;

  async componentDidMount() {
    const { parks, _id } = this.props;
    await this.setState({parks, _id})
    this.handleParksTitle();
  }

  componentDidUpdate(prevProps) {
    if (this.props.parks !== prevProps.parks) this.handleParksTitle();
  }

  handleParksTitle = () => {
    const parksTitle = this.state.parks
      .map(park => park.name)
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
    const { formErrors, title, parksTitle, message, parks, _id } = this.state;
    const isValid = isFormValid(formErrors, message);

    if (title) this.setState({
      message: `${parksTitle}\n${message}`
    })

    isValid
      ? this.handleSendForm({ message, parks, _id })
      : this.setState({ showErrors: true });
  };

  handleSendForm = payload => {
    makeRequest('/api/updates', 'POST', payload)
      .then(res => res.json())
      .then(res => {
        console.log('[NewUpdate] POST ', res)
        this.setState(initialState);
      })
      .catch(err => err)
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
              ? `${parksTitle} ${message}`
              : message}</p></Preview>
          : <Preview><p>...Message Preview</p></Preview>
        }
        <Button className='button' name='SUBMIT' />
      </form>
    );
  }
}
export default EditMessage;
