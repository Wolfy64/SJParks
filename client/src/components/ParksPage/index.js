import React, { Component } from 'react';
import styled from 'styled-components';
import { parksDB } from '../../dummyDB';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import SearchPark from '../SearchPark';
import Input from '../UI/Form/Input';
import Button from '../UI/Generic/Button';

const Wrapper = styled.div`
  width: 300px;
  margin-right: 5rem;
  .searchContainer{
    background-color: ${(props) => props.theme.colors.lightbg}
  }
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    display: flex;
    justify-content: center;
    width: 100vw;
    margin: 0 auto;
    form {
      width: 300px;
    }
    .searchContainer{
      margin-top: 30px;
    }
  }
`

const initialState = {
  parks: [],
  showErrors: false,
  newName: '',
  newCode: '',
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
    const { newName, newCode, formErrors } = this.state;
    const dataForm = { newName, newCode };
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
      .catch(err => console.log('>> err,', err.message));
    console.log('>>New Park: ', dataForm);

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
              name='newName'
              label='Name'
              value={this.state.newName}
              onChange={this.handleChange}
              type="text"
              placeholder="New Park..."
              autoComplete="off"
            />
            <Input
              name='newCode'
              label='Keyword'
              value={this.state.newCode}
              onChange={this.handleChange}
              type="text"
              placeholder="Park Id..."
              autoComplete="off"
            />

            <Button name="Create a new park" type="submit" />
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
