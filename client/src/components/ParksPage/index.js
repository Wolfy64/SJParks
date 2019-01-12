<<<<<<< HEAD:client/src/components/parks.js
import React, { Component } from 'react';
import Plist from './plist';
import Items from './items';

export default class parks extends Component {
  constructor(props) {
    // and you can tell here that i added props to the component.
    super(props); // It it didn't have any before.
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      items: [],
      parkFilter: [],
      filter: '',
      newPark: ''
    };
  }

  handleInput = e => {
    //generic handleInput handles the change for any input field using the name and the value properties.
    const { name, value } = e.target;
    console.log('name', name);
    console.log('value', value);
    this.setState({
      [name]: value
    });
  };

  addItem = e => {
    e.preventDefault();
    const { newPark } = this.state;
    const newItem = {
      key: Date.now(), //needs to be another input from the user - a parkID
      text: newPark
    };
    if (newItem.text !== '') {
      // .text is a name for the park that came from user's input
      let items = [...this.state.items, newItem]; //concatinates new item object to an array of parks
      items.sort((a, b) => {
        if (a.text < b.text) return -1;
        if (a.text > b.text) return 1;
        return 0;
      });
      this.setState({
        items: items,
        newPark: ''
      });
    }
  };

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      //filter() takes in an array and returns a new array with each item that passed through the true/false function.
      return item.key !== key;
    });
    this.setState({
      items: filteredItems
    });
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
    console.log('STATE', this.state);
    return (
      <div>
        <h2>List</h2>
        <Plist
          addItem={this.addItem}
          handleInput={this.handleInput}
          newPark={this.state.newPark}
        />
        <Items entries={this.state.items} deleteItem={this.deleteItem} />

        <h2>Filter</h2>
        <form onSubmit={this.handleFilter}>
          <input
            name='filter'
            value={this.state.filter}
            onChange={this.handleInput}
            type='text'
            id='filter'
            placeholder='Search Parks..'
          />
          <button type='submit'>Search</button>
        </form>
        <Items entries={this.state.parkFilter} deleteItem={this.deleteItem} />
      </div>
    );
  }
}

// PLEASE LOOK AT THE COMMENTS ON MY CODE AND IF YOU CAN EXPLAIN TO ME ABOUT THESE CONCEPTS
// THANK YOU!!!
=======
import React, { Component } from 'react';
<<<<<<< HEAD
import Plist from './ParksList';
import Items from './Items';
=======
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
`
const Col2 = styled.div`
  height: 100vh;
  padding: 0 20px;
  float: left;
  background-color: ${props => props.theme.colors.lightbg};
`

const initialState = {
  parks: [],
  showErrors: false,
  newPark: '',
  parkId: '',
  parkFilter: [],
};
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7

export default class Parks extends Component {
  constructor(props) {
    // and you can tell here that i added props to the component.
    super(props); // It it didn't have any before.
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      items: [],
      parkFilter: [],
      filter: '',
      newPark: ''
    };
  }

<<<<<<< HEAD
  handleInput = e => {
    //generic handleInput handles the change for any input field using the name and the value properties.
    const { name, value } = e.target;
    console.log('name', name);
    console.log('value', value);
    this.setState({
      [name]: value
    });
  };

  addItem = e => {
    e.preventDefault();
    const { newPark } = this.state;
    const newItem = {
      key: Date.now(), //needs to be another input from the user - a parkID
      text: newPark
    };
    if (newItem.text !== '') {
      // .text is a name for the park that came from user's input
      let items = [...this.state.items, newItem]; //concatinates new item object to an array of parks
      items.sort((a, b) => {
        if (a.text < b.text) return -1;
        if (a.text > b.text) return 1;
        return 0;
      });
      this.setState({
        items: items,
        newPark: ''
      });
=======
  handleDeletePark = park => {
    if (window.confirm("Delete ".concat(park.name)
    .concat(" and all of its subscribers from the system? \nTHIS ACTION CANNOT BE UNDONE"))) { 
      console.log('>> ', park.name, ' was removed.')
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7
    }
  };

  deleteItem = key => {
    const filteredItems = this.state.items.filter(item => {
      //filter() takes in an array and returns a new array with each item that passed through the true/false function.
      return item.key !== key;
    });
    this.setState({
      items: filteredItems
    });
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
    console.log('STATE', this.state);
    return (
      <div>
<<<<<<< HEAD
        <h2>List</h2>
        <Plist
          addItem={this.addItem}
          handleInput={this.handleInput}
          newPark={this.state.newPark}
        />
        <Items entries={this.state.items} deleteItem={this.deleteItem} />

        <h2>Filter</h2>
        <form onSubmit={this.handleFilter}>
          <input
            name='filter'
            value={this.state.filter}
            onChange={this.handleInput}
            type='text'
            id='filter'
            placeholder='Search Parks..'
          />
          <button type='submit'>Search</button>
        </form>
        <Items entries={this.state.parkFilter} deleteItem={this.deleteItem} />
=======
        <Col1>
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
        </Col1>
        <Col2>
          <SearchPark
            parks={this.state.parks}
            selected={true}
            addPark={park => this.handleDeletePark(park)}
            numShow={this.state.parks.length}
          />
        </Col2>
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7
      </div>
    );
  }
}

// PLEASE LOOK AT THE COMMENTS ON MY CODE AND IF YOU CAN EXPLAIN TO ME ABOUT THESE CONCEPTS
// THANK YOU!!!
>>>>>>> master:client/src/components/ParksPage/index.js
