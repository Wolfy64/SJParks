import React, { Component } from 'react';
import ParkLi from './ParkLi';
import Input from './UI/Form/Input';

class NewUpdate extends Component {
  state = {
    parksList: [],
    filter: ''
  };

  handleInput = e => {
    const { name, value } = e.target;
    const { parks } = this.props;
    const parksList = parks.filter(el =>
      el.name.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({ [name]: value, parksList });
  };

  render() {
    const { filter, parksList } = this.state;
    const { addPark, addAllParks } = this.props;
    const parkLi = parksList.map(el => (
      <ParkLi key={el._id} park={el} clicked={() => addPark(el)} />
    ));

    return (
      <div>
        <Input
          name='filter'
          value={filter}
          onChange={this.handleInput}
          type='text'
          placeholder='Search Parks by Name'
          autoComplete='off'
        />

        {/* <button onClick={addAllParks}>Select All</button> */}

        <ul>{parkLi}</ul>
      </div>
    );
  }
}

export default NewUpdate;
