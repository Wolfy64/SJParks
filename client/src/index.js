/*jshint esversion: 8 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';
import { Container } from './styles';

const app = (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Container>
        <GlobalStyle />
        <App />
      </Container>
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
