import React, { Component } from 'react';
import styled from 'styled-components';
import ParkLi from './ParkLi';
import Input from './UI/Form/Input';

const Container = styled.div`
  width: 300px;
  padding: 1rem;
  background: white;

  input {
    padding: 0.5rem;
  }
`;

class SearchPark extends Component {
  state = { filter: '', filterPark: null };

  handleInput = e => {
    const { name, value } = e.target;
    const filterPark = this.props.parks.filter(el =>
      el.name.toLowerCase().includes(value.toLowerCase())
    );

    this.setState({ [name]: value, filterPark });
  };

  render() {
    const { filter, filterPark } = this.state;
    const { addPark, parks, selected, addAllParks } = this.props;

    let showParkList = filterPark || parks.splice(0, 3);

    const parkLi = showParkList.map(el => (
      <ParkLi
        key={el._id}
        park={el}
        selected={selected}
        clicked={() => addPark(el)}
      />
    ));

    return (
      <Container>
        <Input
          name='filter'
          value={filter}
          onChange={this.handleInput}
          type='text'
          placeholder='Search Parks by Name'
          autoComplete='off'
        />

        {addAllParks && <button onClick={addAllParks}>Select All</button>}

        <ul>{parkLi}</ul>
      </Container>
    );
  }
}

export default SearchPark;
