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
