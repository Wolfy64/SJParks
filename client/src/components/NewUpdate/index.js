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
