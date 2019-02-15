import React, { Component } from 'react';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import makeRequest from '../../utils/makeRequest';
import SearchPark from '../SearchPark';
import Input from '../UI/Form/Input';
import Button from '../UI/Generic/Button';
import { Wrapper } from './styles';

const initialState = {
  parks: [],
  showErrors: false,
  newName: '',
  newCode: '',
  parkFilter: []
};

export default class Parks extends Component {
  state = initialState;

  componentDidMount() {
    makeRequest('/api/parks', 'GET');
    // .then(res => res.json())
    // .then(res => {
    //   console.log('>> ParksPage.index GET res.parks,', res.parks);
    // })
    // .catch(err => err);

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
      console.log(park._id)
      makeRequest('/api/parks', 'DELETE', {_id: park._id})
      .then(res => res.json())
      .then(res => {
        this.setState({
          parks: this.state.parks.filter(e => e._id !== park._id)
        })
      })
      .catch(err => err);
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
    makeRequest('/api/parks', 'POST', dataForm)
      .then(res => res.json())
      .then(park => {
        if(park._id) {
          const parks = this.state.parks
          parks.unshift(park)
          console.log('[ParksPage] POST,', parks);
          this.setState({
            parks,
            newName: '',
            newCode: ''
          })
        } else {
          console.log('[ParksPage] POST,', park.message)
        }
      })
      .catch(err => err);
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
              name="newName"
              label="Name"
              value={this.state.newName}
              onChange={this.handleChange}
              type="text"
              placeholder="New Park..."
              autoComplete="off"
            />
            <Input
              name="newCode"
              label="Keyword"
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
