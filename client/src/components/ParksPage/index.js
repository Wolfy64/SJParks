import React, { Component } from 'react';
import Input from '../UI/Form/Input';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import SearchPark from '../SearchPark';
import { parksDB } from '../../dummyDB';
import Button from '../UI/Generic/Button';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 300px;
  padding: 20px;
  margin-right: 5rem;
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    margin: 0 auto;
  }
`

const initialState = {
  parks: [],
  showErrors: false,
  newPark: '',
  parkId: '',
  parkFilter: [],
};

export default class Parks extends Component {
  state = initialState;

  componentDidMount() {
    this.setState({ parks: parksDB });
  }

  handleDeletePark = park => {
    if (window.confirm("Delete ".concat(park.name)
    .concat(" and all of its subscribers from the system? \nTHIS ACTION CANNOT BE UNDONE"))) { 
      console.log('>> ', park.name, ' was removed.')
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
      <>
        <Wrapper>
          <form onSubmit={this.handleSubmit}>
            <Input
              name='newPark'
              label='Name'
              value={this.state.newPark}
              onChange={this.handleChange}
              type='text'
              placeholder='New Park...'
              autoComplete='off'
            />
            <Input
              name='parkId'
              label='Keyword'
              value={this.state.parkId}
              onChange={this.handleChange}
              type='text'
              placeholder='Park Id...'
              autoComplete='off'
            />

            <Button name='Create a new park' type='submit' />
          </form>
        </Wrapper>
        <Wrapper>
            <SearchPark
              parks={this.state.parks}
              selected={true}
              addPark={park => this.handleDeletePark(park)}
              numShow={this.state.parks.length}
            />
        </Wrapper>
      </>
    );
  }
}
