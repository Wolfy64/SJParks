import React, { Component } from 'react';
import Input from '../UI/Form/Input';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import SearchPark from '../SearchPark';
import { parksDB } from '../../dummyDB';
import Button from '../UI/Generic/Button';
import styled from 'styled-components';

const Col1 = styled.div`
  width: 300px;
  float: left;
  padding: 20px;
  margin: 0 5rem 0 0;
  @media screen and (max-width: ${props => props.theme.displays.mobileL}) {
    margin: unset;
  }
`;
const Col2 = styled.div`
  height: 100vh;
  float: left;
  background-color: ${props => props.theme.colors.lightbg};
`;

const initialState = {
  parks: [],
  showErrors: false,
  newPark: '',
  parkId: '',
  parkFilter: []
};

export default class Parks extends Component {
  state = initialState;

  componentDidMount() {
    this.setState({ parks: parksDB });
  }

  handleDeletePark = park => {
    if (
      window.confirm(
        'Delete '
          .concat(park.name)
          .concat(
            ' and all of its subscribers from the system? \nTHIS ACTION CANNOT BE UNDONE'
          )
      )
    ) {
      console.log('>> ', park.name, ' was removed.');
    }
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
    const payload = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataForm)
    };

    fetch('/api/parks', payload)
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
        <Col1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="newPark"
              label="Name"
              value={this.state.newPark}
              onChange={this.handleChange}
              type="text"
              placeholder="New Park..."
              autoComplete="off"
            />
            <Input
              name="parkId"
              label="Keyword"
              value={this.state.parkId}
              onChange={this.handleChange}
              type="text"
              placeholder="Park Id..."
              autoComplete="off"
            />

            <Button name="Create a new park" type="submit" />
          </form>
        </Col1>
        <Col2>
          <SearchPark
            parks={this.state.parks}
            selected={true}
            addPark={park => this.handleDeletePark(park)}
            numShow={this.state.parks.length}
          />
        </Col2>
      </div>
    );
  }
}
