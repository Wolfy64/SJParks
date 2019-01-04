<<<<<<< HEAD:client/src/components/search.js
import React, { Component } from 'react'
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

=======
import React, { Component } from 'react'
import ParkLabels from 'components/ParkLabels'

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
            <ParkLabels results={this.state.results} />
      </form>
        )
    }
}

>>>>>>> master:client/src/components/ParksPage/Search.js
export default Search;