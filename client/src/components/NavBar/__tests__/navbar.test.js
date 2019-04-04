import React from 'react';
import { render } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../index';

describe('<NavBar />', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
  });
});
