import React, { Component } from 'react'
import axios from 'axios'
import Parklabels from 'components/parklabels'

class Search extends Component {
  constructor() {
        super();
        this.state = {
            searchText: '',
            searchResults: []
        }
    }

    onChange(e) {
        this.setState({searchText: e.target.value});
    }

    getResults() {
        calltodb(searchText).then(e => {
            this.setState({searchResults: e.value})
        });
    }

    render() {
        return (
            <form>
                <input
                  placeholder="Search for..."
                  ref={input => this.search = input}
                  onChange={this.handleInputChange} />
            <Parklabels results={this.state.results} />
      </form>
        )
    }
}

export default Search