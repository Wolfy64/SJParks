import React, { Component } from 'react';
import { parksDB } from '../../dummyDB';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import makeRequest from '../../utils/makeRequest'
import SearchPark from '../SearchPark';
import Input from '../UI/Form/Input';
import Button from '../UI/Generic/Button';
<<<<<<< HEAD

const Wrapper = styled.div`
  width: 300px;
  margin-right: 5rem;
  .searchContainer {
    background-color: ${props => props.theme.colors.lightbg};
  }
  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    display: flex;
    justify-content: center;
    width: 100vw;
    margin: 0 auto;
    form {
      width: 300px;
    }
    .searchContainer {
      margin-top: 30px;
    }
  }
`;
=======
import {Wrapper} from './styles';
>>>>>>> 3ece4f469ac81cafabbf085cba4fbcb209256ea5

const initialState = {
  parks: [],
  showErrors: false,
  newName: '',
  newCode: '',
<<<<<<< HEAD
  parkFilter: []
=======
  parkFilter: [],
>>>>>>> 3ece4f469ac81cafabbf085cba4fbcb209256ea5
};

export default class Parks extends Component {
  state = initialState;

  componentDidMount() {
    makeRequest('/api/parks', 'GET')
      .then(res =>  res.json())
      .then(res => {
        console.log('>> ParksPage.index GET res.parks,', res.parks)
      })
      .catch(err => err)

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
    makeRequest('/api/parks', 'POST', dataForm)
      .then(res => res.json())
      .then(res => {
        console.log('>> ParksPage/index POST,', res)       
      })
      .catch( err => err)
    

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
<<<<<<< HEAD
              name="newName"
              label="Name"
=======
              name='newName'
              label='Name'
>>>>>>> 3ece4f469ac81cafabbf085cba4fbcb209256ea5
              value={this.state.newName}
              onChange={this.handleChange}
              type="text"
              placeholder="New Park..."
              autoComplete="off"
            />
            <Input
<<<<<<< HEAD
              name="newCode"
              label="Keyword"
=======
              name='newCode'
              label='Keyword'
>>>>>>> 3ece4f469ac81cafabbf085cba4fbcb209256ea5
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
