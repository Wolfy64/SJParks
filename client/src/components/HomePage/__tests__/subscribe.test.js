import React from 'react';
import { render } from 'react-testing-library';
import Subscribe from '../Subscribe';

describe('<Subscribe />', () => {
  it('renders without crashing', () => {
    render(<Subscribe />);
  });
});
