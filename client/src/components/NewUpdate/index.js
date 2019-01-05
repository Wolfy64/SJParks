import React from 'react';
import SearchPark from '../SearchPark';
import SelectedPark from '../SelectedPark';
import EditMessage from './EditMessage';
import { parksDB } from '../../dummyDB';
class NewUpdate extends React.Component {
  state = {
    parks: [],
    parkSelected: []
  };

  componentDidMount() {
    this.setState({ parks: parksDB });
  }

  handleAddPark = park => {
    const { parkSelected } = this.state;
    const isSelected = parkSelected.find(el => el._id === park._id);

    if (!isSelected) this.setState({ parkSelected: [...parkSelected, park] });
  };

  handleAddAllPark = () => {
    this.setState({ parkSelected: [...this.state.parks] });
  };

  handleDeletePark = park => {
    this.setState({
      parkSelected: [
        ...this.state.parkSelected.filter(el => el._id !== park._id)
      ]
    });
  };

  handleDeleteAddAllPark = () => {
    this.setState({ parkSelected: [] });
  };

  render() {
    return (
      <>
        <h1>Create New Text Update</h1>
        <SearchPark
          parks={this.state.parks}
          addPark={park => this.handleAddPark(park)}
          addAllParks={this.handleAddAllPark}
        />
        <SelectedPark
          parks={this.state.parkSelected}
          deletePark={park => this.handleDeletePark(park)}
          deleteAllParks={this.handleDeleteAddAllPark}
        />
        {this.state.parkSelected.length !== 0 ? (
          <EditMessage titles={this.state.parkSelected.map(el => el.name)} />
        ) : (
          'Please select one or many Parks'
        )}
      </>
    );
  }
}

export default NewUpdate;
