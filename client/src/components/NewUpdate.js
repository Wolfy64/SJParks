import React, { Component } from 'react';
import { parksDB } from '../dummyDB';

export class newUpdate extends Component {
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      lists: [],
      filteredLists: [],
      selectedLists: [],
      filter: ''
    };
  }

  componentDidMount() {
    this.setState({ lists: parksDB });
  }

  handleInput = e => {
    //generic handleInput handles the change for any input field using the name and the value properties.
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleFilter = e => {
    e.preventDefault();
    const filtered = this.state.lists.filter(item => {
      return item.name.toLowerCase().includes(this.state.filter.toLowerCase());
    });
    this.setState({
      filteredLists: filtered,
      filter: ''
    });
  };
  render() {
    return (
      <div>
        <div>
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
          <button>Select All</button>
          <ul>
            {this.state.filteredLists.map(list => (
              <li key={list._id}>
                <span>{list.name}</span>-<span>{list.parkID}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default newUpdate;
