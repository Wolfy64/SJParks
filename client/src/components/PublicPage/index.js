import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import About from './About';
import Subscribe from './Subscribe';
import Contact from './Contact';
import Footer from './Footer';

const Jumbotron = styled.div`
  background-color: ${props => props.theme.colors.primary};
  height: 40vh;

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    display: none;
  }
`;

class PublicPage extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Jumbotron />
        <About />
        <Subscribe />
        <Contact />
        <Footer />
      </>
    );
  }
}

export default PublicPage;
