import React from 'react';
import makeRequest from '../../utils/makeRequest';
import SearchPark from '../SearchPark';
import SelectedPark from '../SelectedPark';
import EditMessage from './EditMessage';
import { Container } from './styles';

class NewUpdate extends React.Component {
  state = {
    parks: [],
    parkSelected: []
  };

  componentDidMount() {
    makeRequest('/api/parks')
      .then(res => res.json())
      .then(res => {
        this.setState({
          parks: res
        })
      })
      .catch(err => err);
  }

  handleAddPark = park => {
    const { parkSelected } = this.state;
    const isSelected = parkSelected.find(el => el._id === park._id);
    if (!isSelected) this.setState({ parkSelected: [...parkSelected, park] });
    this.setState({
      parks: [...this.state.parks.filter(el => el._id !== park._id)]
    });
  };

  handleAddAllPark = () => {
    const { parks } = this.state;
    if (parks) {
      this.setState({
        parkSelected: [...this.state.parks],
        parks: []
      });
    }
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
    const { parks, parkSelected } = this.state;
    if (parkSelected) {
      this.setState({
        parks: [...parks, ...parkSelected]
      });
      this.setState({ parkSelected: [] });
    }
  };

  render() {
    const { user } = this.props;
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
              <EditMessage user={user} parks={this.state.parkSelected} />
            )}
          </div>
        </Container>
      </>
    );
  }
}

export default NewUpdate;
