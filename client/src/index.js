import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';
// import * as serviceWorker from './serviceWorker';

const app = (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <App />
      </>
    </ThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
