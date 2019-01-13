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
`;

class PublicPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Jumbotron />
        <About />
        <Subscribe />
        <Contact />
        <Footer />
      </div>
    );
  }
}

export default PublicPage;
