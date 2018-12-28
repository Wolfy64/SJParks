import React from 'react';
import ParkLi from './ParkLi';

const SelectedPark = props => {
  const selectedPark = props.parks.map(el => (
    <ParkLi key={el._id} park={el} clicked={() => props.deletePark(el)} />
  ));

  return (
    <div style={{ backgroundColor: '#3333', minHeight: 100 }}>
      <button onClick={props.deleteAllParks}>Deselect All</button>
      {selectedPark}
    </div>
  );
};
export default SelectedPark;
