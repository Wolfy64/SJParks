import React from 'react';
import { render } from 'react-testing-library';
import Footer from '../Footer';

describe('<Footer />', () => {
  it('renders without crashing', () => {
    render(<Footer />);
  });
});
