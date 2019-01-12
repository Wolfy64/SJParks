import React from 'react';
import styled from 'styled-components';
import ParkLi from './ParkLi';
import ButtonText from './UI/Generic/ButtonText';

const Container = styled.div`
  width: 300px;
  padding: 3.7rem 1rem;
  height: 100%;
  overflow: auto;
  .selectAll{
    margin: 0.5rem;
  };
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

  return (
    <Container>
      <ButtonText className='selectAll' onClick={props.deleteAllParks}>Deselect All</ButtonText>
      {selectedPark}
    </Container>
  );
};
export default SelectedPark;
