/*jshint esversion: 8 */
import React from 'react';
import { withRouter } from 'react-router';
import { render } from 'react-testing-library';
import App from '../App';

describe('<App />', () => {
  it('renders without crashing', () => {
    render(withRouter(<App />));
  });
});
