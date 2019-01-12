<<<<<<< HEAD
import React from 'react';
import SearchPark from './SearchPark';

class NewUpdate extends React.Component {
  state = {
    parkSelected: []
  };

  render() {
    console.log('NewUpdate State', this.state);
    return (
      <>
        <h1>Create a New Text Update</h1>
        <SearchPark
          addPark={parkID =>
            this.setState({ parkSelected: [this.state, ...parkID] })
          }
        />
      </>
    );
  }
}

export default NewUpdate;
=======
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
  background-color: ${props => props.theme.colors.lightbg};
`

const Col3 = styled.div`
  float: left;
  width: 300px;
  margin: 0 20px;
  p {
    color: ${props => props.theme.colors.secondary};
  };
  label{
    margin: 0.3rem;
  };
  .label{
    color: ${props => props.theme.colors.secondary};
  };
  .title{
    display: flex;
    align-items: center;
  };
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  };
  
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  };
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.primary};
    -webkit-transition: .4s;
    transition: .4s;
  };
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    right: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  };
  
  input:checked + .slider {
    background-color: ${props => props.theme.colors.lightbg};
  };
  
  input:checked + .slider:before {
    -webkit-transform: translateX(-26px);
    -ms-transform: translateX(-26px);
    transform: translateX(-26px);
  };
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  };
  
  .slider.round:before {
    border-radius: 50%;
  };
  
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
        <h1>Create a New Text Update</h1>
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
>>>>>>> master
