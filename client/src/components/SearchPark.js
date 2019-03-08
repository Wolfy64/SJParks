/*jshint esversion: 8 */
import React, { Component } from 'react';
import styled from 'styled-components';
import ParkLi from './ParkLi';
import Input from './UI/Form/Input';
import ButtonText from './UI/Generic/ButtonText';

const Container = styled.div`
  .innerWrapper {
    margin: 0 auto;
    max-width: 280px;
    padding: 20px;
    overflow-y: scroll;
  }
`;

class SearchPark extends Component {
  state = { filter: '', filterPark: null, filterParkCode: null };

  handleInput = e => {
    const { name, value } = e.target;
    const filterPark = this.props.parks.filter(el =>
      el.name.toLowerCase().includes(value.toLowerCase())
    );
    const filterParkCode = this.props.parks.filter(el =>
      el.name.includes(value)
    );

    this.setState({ [name]: value, filterPark, filterParkCode });
  };

  render() {
    const { filter, filterPark, filterParkCode } = this.state;
    const { addPark, parks, selected, addAllParks } = this.props;

    let showParkList =
<<<<<<< HEAD
      (filterPark && filterParkCode) ||
      [...parks].splice(0, this.props.numShow || 5);
=======
      filterPark || [...parks].splice(0, this.props.numShow || 5);
>>>>>>> 094bb20233c2dab0d172a5da83b7a76af4742278

    const parkLi = showParkList.map(el => (
      <ParkLi
        key={el._id}
        park={el}
        selected={selected}
        clicked={() => addPark(el)}
      />
    ));

    return (
      <Container className="searchContainer">
        <div className="innerWrapper">
          <Input
            name="filter"
            value={filter}
            onChange={this.handleInput}
            type="text"
            placeholder="Search Parks by Name"
            autoComplete="off"
          />

          {addAllParks && (
<<<<<<< HEAD
            <ButtonText onClick={addAllParks}>Select All</ButtonText>
=======
            <ButtonText type="button" onClick={addAllParks}>
              Select All
            </ButtonText>
>>>>>>> 094bb20233c2dab0d172a5da83b7a76af4742278
          )}

          <ul>{parkLi}</ul>
        </div>
      </Container>
    );
  }
}

export default SearchPark;
