import React from 'react';
import { render } from 'react-testing-library';
import About from '../About';

describe('<About />', () => {
  it('renders without crashing', () => {
    render(<About />);
  });
});
