import React from 'react';
import SearchPark from '../SearchPark';
import SelectedPark from '../SelectedPark';
import EditMessage from './EditMessage';
import { parksDB } from '../../dummyDB';
import styled from 'styled-components';

const Col1 = styled.div`
  width: 300px;
  float: left;
  margin: 0 20px;
`
const Col2 = styled.div`
  float: left;
  margin: 0 20px;
  height: 100vh;
  background-color: ${props => props.theme.colors.lightbg};
`

const Col3 = styled.div`
  float: left;
  width: 300px;
  margin: 3.7rem 20px 0;
  .bottomAlign{
    margin-top: 100px;
  }
`

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
        <Col1>
          <SearchPark
            parks={this.state.parks}
            selected={false}
            addPark={park => this.handleAddPark(park)}
            addAllParks={this.handleAddAllPark}
          />
        </Col1>
        <Col2>
          <SelectedPark
            parks={this.state.parkSelected}
            deletePark={park => this.handleDeletePark(park)}
            deleteAllParks={this.handleDeleteAddAllPark}
          />
        </Col2>
        <Col3>
          {this.state.parkSelected.length === 0 ? (
              <p>Select parks you want to reach</p>
          ) : (
              <EditMessage titles={this.state.parkSelected.map(el => el.name)} />
          )}
        </Col3>
      </>
    );
  }
}

export default NewUpdate;
