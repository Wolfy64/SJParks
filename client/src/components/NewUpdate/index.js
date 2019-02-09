import React from 'react';
import SearchPark from '../SearchPark';
import SelectedPark from '../SelectedPark';
import EditMessage from './EditMessage';
import { parksDB } from '../../dummyDB';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 300px;
  margin: 0 60px 80px 0;
  height: 40vh;
  .selectedContainer {
    background-color: ${props => props.theme.colors.lightbg};
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
        <Wrapper>
          <SearchPark
            parks={this.state.parks}
            selected={false}
            addPark={park => this.handleAddPark(park)}
            addAllParks={this.handleAddAllPark}
          />
        </Wrapper>
        <Wrapper>
            <SelectedPark
              className='col2'
              parks={this.state.parkSelected}
              deletePark={park => this.handleDeletePark(park)}
              deleteAllParks={this.handleDeleteAddAllPark}
            />
        </Wrapper>
        <Wrapper>
          {this.state.parkSelected.length === 0 ? (
              <p>Select parks you want to reach</p>
          ) : (
              <EditMessage titles={this.state.parkSelected.map(el => el.name)} />
          )}
        </Wrapper>
      </>
    );
  }
}

export default NewUpdate;
