/*jshint esversion: 8 */
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/globalStyle';
import theme from './styles/theme';
// import * as serviceWorker from './serviceWorker';

const Container = styled.div`
 max-width: ${props => props.theme.displays.hd};

 @media screen and (min-width: ${props => props.theme.displays.hd}) {
   border: 1px solid ${props => props.theme.colors.dark};
 }

 @media screen and (max-width: ${props => props.theme.displays.mobileL}) {
   display: inline-block;
 }
`;

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

