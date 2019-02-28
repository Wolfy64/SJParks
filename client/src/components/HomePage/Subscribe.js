import React from 'react';
import Input from '../UI/Form/Input';
import Message from '../UI/Generic/Message';
// import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import makeRequest from '../../utils/makeRequest';
import SearchPark from '../SearchPark';
import SelectedPark from '../SelectedPark';
import Button from '../UI/Generic/Button';
import { SubscribeContainer, Form } from './styles';

const initialState = {
  parks: [],
  parkSelected: [],
  phone: ''
};

class Subscribe extends React.Component {
  state = initialState;

  async componentDidMount() {
    const request = await makeRequest('/api/parks');
    const { success, message, payload } = await request.json();

    success ? this.setState({ parks: payload }) : this.setState({ message });
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleAddPark = park => {
    const { parkSelected } = this.state;
    const isSelected = parkSelected.find(el => el._id === park._id);

    if (!isSelected) this.setState({ parkSelected: [...parkSelected, park] });
  };

  handleAddAllPark = () => {
    this.setState({ parkSelected: [...this.state.parks] });
  };

  handleDeletePark = park => {
    this.setState({
      parkSelected: [
        ...this.state.parkSelected.filter(el => el._id !== park._id)
      ]
    });
  };

  handleDeleteAddAllPark = () => this.setState({ parkSelected: [] });

  handleSubmit = e => {
    e.preventDefault();
    const { phone, formErrors, parkSelected } = this.state;
    const dataForm = { phone, parkSelected };
    const isValid = isFormValid(formErrors, dataForm);
    console.log('TCL: Subscribe -> isValid', isValid);

    isValid
      ? this.handleSendForm(dataForm)
      : this.setState({ showErrors: true });
  };

  handleSendForm = async dataForm => {
    const request = await makeRequest('/api/subscribe', 'POST', dataForm);

    this.setState(initialState);
  };

  render() {
    const { message } = this.state;
    return (
      <SubscribeContainer>
        <h2>Subscribe</h2>

        {message && <Message error={message} />}

        <Form id="subscribe" onSubmit={this.handleSubmit}>
          <SearchPark
            parks={this.state.parks}
            addPark={park => this.handleAddPark(park)}
            addAllParks={this.handleAddAllPark}
          />

          <SelectedPark
            parks={this.state.parkSelected}
            deletePark={park => this.handleDeletePark(park)}
            deleteAllParks={this.handleDeleteAddAllPark}
          />

          <div className="phoneField">
            <Input
              label="Phone"
              placeholder="123-456-7890"
              name="phone"
              type="tel"
              onChange={this.handleChange}
              value={this.state.phone}
            />

            <Button name="I want to be informed!" />
          </div>
        </Form>
      </SubscribeContainer>
    );
  }
}

export default Subscribe;
