import React, { Component } from 'react';
import Input from '../UI/Form/Input';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import SearchPark from '../SearchPark';
import SelectedPark from '../SelectedPark';
import { parksDB } from '../../dummyDB';
import Button from '../UI/Generic/Button';

const initialState = {
  parks: [],
  parkSelected: [],
  showErrors: false,
  newPark: '',
  parkId: ''
};

export default class Parks extends Component {
  state = initialState;

  componentDidMount() {
    this.setState({ parks: parksDB });
  }

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

  handleDeleteAddAllPark = () => {
    this.setState({ parkSelected: [] });
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

  handleSubmit = e => {
    e.preventDefault();
    const { newPark, parkId, formErrors } = this.state;
    const dataForm = { newPark, parkId };
    const isValid = isFormValid(formErrors, dataForm);

    isValid
      ? this.handleSendForm(dataForm)
      : this.setState({ showErrors: true });
  };

  handleSendForm = dataForm => {
    const payload = { method: 'POST', body: JSON.stringify(dataForm) };

    fetch('/admin/parks', payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('SEND DATA', dataForm);

    // Reset Form field
    this.setState(initialState);
  };

  handleFilter = e => {
    e.preventDefault();
    const filtered = this.state.items.filter(item => {
      return item.text.includes(this.state.filter);
    }); //needs to filter through items according to the inputed value instead of 'hi'
    this.setState({
      parkFilter: filtered,
      filter: ''
    });
  };

  render() {
    return (
      <div>
        <h2>List</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='newPark'
            value={this.state.newPark}
            onChange={this.handleChange}
            type='text'
            placeholder='New Park...'
            autoComplete='off'
          />
          <Input
            name='parkId'
            value={this.state.parkId}
            onChange={this.handleChange}
            type='text'
            placeholder='Park Id...'
            autoComplete='off'
          />

          <Button name='Create a new park' type='submit' />
        </form>

        <h2>Filter</h2>
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
      </div>
    );
  }
}
