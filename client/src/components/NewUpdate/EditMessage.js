import React from 'react';
import Textarea from '../UI/Form/Textarea';
import makeRequest from '../../utils/makeRequest';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import Button from '../UI/Generic/Button';
import { Title, Preview } from './styles';

const initialState = {
  message: '',
  parks: [],
  hasTitle: true,
  parksTitle: '',
  showError: false,
  formErrors: null,
  _id: ''
};

class EditMessage extends React.Component {
  state = initialState;

  async componentDidMount() {
    const { parks, user } = this.props;
    await this.setState({ parks, _id: user._id });

    this.updateTitle();
  }

  componentDidUpdate(prevProps) {
    if (this.props.parks !== prevProps.parks) this.updateTitle();
  }

  updateTitle = () => {
    const parksTitle = this.state.parks
      .map(park => park.name)
      .reduce((acc, red) => acc + `, ${red}`)
      .concat(',');

    this.setState({ parksTitle });
  };

  toggleTitle = () => this.setState({ hasTitle: !this.state.hasTitle });

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

  handleSubmit = e => {
    e.preventDefault();
    const {
      formErrors,
      hasTitle,
      parksTitle,
      message,
      parks,
      _id
    } = this.state;
    const isValid = isFormValid(formErrors, message);

    if (hasTitle)
      this.setState({
        message: `${parksTitle}\n${message}`
      });

    isValid
      ? this.handleSendForm({ message, parks, _id })
      : this.setState({ showErrors: true });
  };

  handleSendForm = payload => {
    console.log('[NewUpdate] payload', payload)
    makeRequest('/api/updates', 'POST', payload)
      .then(res => res.json())
      .then(res => {
        console.log('[NewUpdate] POST ', res);
        this.setState(initialState);
      })
      .catch(err => err);
  };

  render() {
    const {
      formErrors,
      message,
      parksTitle,
      showErrors,
      hasTitle
    } = this.state;
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
              onChange={this.toggleTitle}
              {...this.state.hasTitle}
            />
            <span className='slider round' />
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
        {message ? (
          <Preview>
            {' '}
            <p>{hasTitle ? `${parksTitle} ${message}` : message}</p>
          </Preview>
        ) : (
          <Preview>
            <p>...Message Preview</p>
          </Preview>
        )}
        <Button className='button' name='SUBMIT' />
      </form>
    );
  }
}
export default EditMessage;
