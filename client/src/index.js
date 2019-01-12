import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
import * as serviceWorker from './serviceWorker';
=======
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';
<<<<<<< HEAD
>>>>>>> fe214ad9e2a573d4198bb58a5c9e70accc2d921d
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
=======
>>>>>>> eaef81a2e80adcbf94a698067c4206b063585bb7
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
serviceWorker.unregister();
