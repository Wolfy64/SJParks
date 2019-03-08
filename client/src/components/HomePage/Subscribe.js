/*jshint esversion: 8 */
import React from 'react';
import Input from '../UI/Form/Input';
import Message from '../UI/Generic/Message';
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
    let { parkSelected } = this.state;
    parkSelected = parkSelected.filter(el => el._id !== park._id);

    this.setState({ parkSelected });
  };

  handleDeleteAddAllPark = () => this.setState({ parkSelected: [] });

  handleSubmit = async e => {
    e.preventDefault();

    const request = await makeRequest('api/subscriptionLogs', 'POST', {
      phone: this.state.phone,
      addParks: this.state.parkSelected,
      subscribed: true
    });

    const { success, message } = await request.json();

    success ? this.setState(initialState) : this.setState(message);
  };

  render() {
    const { message, parks, parkSelected, phone } = this.state;
    return (
      <SubscribeContainer>
        <h2>Subscribe</h2>

        {message && <Message error={message} />}

        <Form id="subscribe" onSubmit={this.handleSubmit}>
          <SearchPark
            parks={parks}
            addPark={park => this.handleAddPark(park)}
            addAllParks={this.handleAddAllPark}
          />

          <SelectedPark
            parks={parkSelected}
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
              value={phone}
            />

            <Button name="I want to be informed!" />
          </div>
        </Form>
      </SubscribeContainer>
    );
  }
}

export default Subscribe;
