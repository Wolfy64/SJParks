import React from 'react';
import makeRequest from '../../utils/makeRequest';
import { parksDB } from '../../dummyDB';
import SearchPark from '../SearchPark';
import SelectedPark from '../SelectedPark';
import EditMessage from './EditMessage';
import {Container} from './styles'

class NewUpdate extends React.Component {
  state = {
    parks: parksDB,
    parkSelected: []
  };

  componentDidMount() {
    makeRequest('/api/parks', 'GET')
      .then(res => res.json())
      .then(res => {
        console.log('[NewUpdate] GET:', res)
        this.setState({
          parks: res
        })
      })
      .catch(err => err)
  }

  handleAddPark = park => {
    const { parkSelected } = this.state;
    const isSelected = parkSelected.find(el => el._id === park._id);
    if (!isSelected) this.setState({ parkSelected: [...parkSelected, park] });
    this.setState({
      parks: [
        ...this.state.parks.filter(el => el._id !== park._id)
      ]
    });
  };

  handleAddAllPark = () => {
    this.setState({ 
      parkSelected: [...this.state.parks],
      parks: []
    });
  };

  handleDeletePark = park => {
    this.setState({
      parkSelected: [
        ...this.state.parkSelected.filter(el => el._id !== park._id)
      ],
      parks: [...this.state.parks, park] 
    });
  };

  handleDeleteAddAllPark = () => {
    this.setState({parks: [...this.state.parks, ...this.state.parkSelected]});
    this.setState({parkSelected: []});
  };

  render() {
    return (
      <>
        <Container>
          <SearchPark
            parks={this.state.parks}
            selected={false}
            addPark={park => this.handleAddPark(park)}
            addAllParks={this.handleAddAllPark}
          />
        </Container>
        <Container>
            <SelectedPark
              parks={this.state.parkSelected}
              deletePark={park => this.handleDeletePark(park)}
              deleteAllParks={this.handleDeleteAddAllPark}
            />
        </Container>
        <Container>
          <div className='col3'>
          {this.state.parkSelected.length === 0 ? (
              <p>Select parks you want to reach</p>
          ) : (
              <EditMessage titles={this.state.parkSelected.map(el => el.name)} />
          )}
          </div>
        </Container>
      </>
    );
  }
}

export default NewUpdate;
