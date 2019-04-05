import React from 'react';
import { render } from 'react-testing-library';
import NewUpdate from '../index';

describe('<NewUpdate />', () => {
  it('renders without crashing', () => {
    render(<NewUpdate />);
  });
});
