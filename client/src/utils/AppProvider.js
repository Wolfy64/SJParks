import React, { Component } from 'react';
import { Provider } from './Context.js';

class AppProvider extends Component {
  state = {
    data: this.props.data
  }
  
  render() {
    return (
      <Provider
        value={this.state.data}
      >
        {this.props.children}
      </Provider>
    );
  }
}
export default AppProvider;