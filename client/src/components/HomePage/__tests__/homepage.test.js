import React from 'react';
import { render } from 'react-testing-library';
import HomePage from '../index';

describe('<HomePage />', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
  });
});
