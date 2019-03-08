/*jshint esversion: 8 */
import React from 'react';
import { withRouter } from 'react-router';
import ReactDOM from 'react-dom';
import App from '../App';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(withRouter(<App />), div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
