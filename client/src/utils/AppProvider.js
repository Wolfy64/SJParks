import React, { Component } from 'react';
import { Provider } from './Context.js';

class AppProvider extends Component {
  state = {
    data: this.props.data
  }
  render() {
    if(!this.state.data) console.log('[AppProvider]', this.state.data);
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