import React from 'react';
import { render } from 'react-testing-library';
import Contact from '../Contact';

describe('<Contact />', () => {
  it('renders without crashing', () => {
    render(<Contact />);
  });
});
