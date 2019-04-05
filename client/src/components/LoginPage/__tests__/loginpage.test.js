import React from 'react';
import { render } from 'react-testing-library';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../index';

describe('<LoginPage />', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  });
});
