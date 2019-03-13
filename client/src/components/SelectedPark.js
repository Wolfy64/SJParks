/*jshint esversion: 8 */
import React from 'react';
import styled from 'styled-components';
import ParkLi from './ParkLi';
import ButtonText from './UI/Generic/ButtonText';

const Container = styled.div`
  .innerWrapper {
    margin: 0 auto;
    max-width: 280px;
    padding: 20px;
    overflow-y: scroll;
  }
`;

const SelectedPark = props => {
  const selectedPark = props.parks.map(el => (
    <ParkLi
      key={el._id}
      park={el}
      selected={true}
      clicked={() => props.deletePark(el)}
    />
  ));

  const button = (
    <ButtonText type="button" onClick={props.deleteAllParks}>
      Deselect All
    </ButtonText>
  );

  return (
    <Container className="selectedContainer">
      <div className="innerWrapper">
        {selectedPark.length ? button : ''}
        <div>{selectedPark}</div>
      </div>
    </Container>
  );
};
export default SelectedPark;
