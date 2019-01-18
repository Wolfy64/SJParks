import React from 'react';
import styled from 'styled-components';
import ParkLi from './ParkLi';
import ButtonText from './UI/Generic/ButtonText';

const Container = styled.div`
  width: 300px;
  padding-top: 5rem;
  overflow: auto;

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    padding-top: 1rem;
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

  return (
    <Container>
      <ButtonText onClick={props.deleteAllParks}>Deselect All</ButtonText>
      {selectedPark}
    </Container>
  );
};
export default SelectedPark;
