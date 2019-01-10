import React, { Component } from 'react';
import ParkLi from './ParkLi';
import Input from './UI/Form/Input';

class NewUpdate extends Component {
  state = {
    filter: '',
    color: (props => props.theme.colors.lightbg)
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
    const { addPark, parks, selected, addAllParks } = this.props;
    let parkLi = parks.map(el => (
      <ParkLi key={el._id} park={el} selected={selected} clicked={() => addPark(el)} />
    ));
    if (parksList) {
      parkLi = parksList.map(el => (
      <ParkLi key={el._id} park={el}  selected={selected} clicked={() => addPark(el)} />
    ))}

    if(addAllParks) {
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

          <button onClick={addAllParks}>Select All</button>

          <ul>{parkLi}</ul>
        </div>
      );
    } else {
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

          <ul>{parkLi}</ul>
        </div>
      );
    }
  }
}

export default NewUpdate;