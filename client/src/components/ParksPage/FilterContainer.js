import React, { Component } from 'react'
import Parks from './index';

export default class FilterContainer extends Component {
    constructor(){
        super();
        this.state = {
            parks: [],
            filterParks: []
        }
    }

    componentDidMount(){
        this.setState = ({
            parks,
            filterParks: parks
        })
    }

    filterParks = (parkFilter) => {
        let filteredParks = this.state.parks
        filteredParks = filteredParks.filter((park) => {
            let parkName = park.firstPark.toLowerCase()
            return parkName.indexOf(
            parkFilter.toLowerCase()) !== -1
            
        }) 
        this.setState({
            filteredParks,
        });  
    }
  render() {
    return (
      <div>
        <Parks parks={this.state.filteredParks} match={this.props.match} onChange={this.filterParks}/>
      </div>
    )
  }
}