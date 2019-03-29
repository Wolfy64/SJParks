import React from 'react';
import { render } from 'react-testing-library';
import NavBar from '../NavBar';

describe('<NavBar />', () => {
  it('renders without crashing', () => {
    render(<NavBar />);
  });
});
