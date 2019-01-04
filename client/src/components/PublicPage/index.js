import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import Presentation from './Presentation';
import Subscribe from './Subscribe';
import Survey from './Survey';
import Footer from './Footer';

const Jumbotron = styled.div`
  background-color: #004A75;
  height: 40vh;
`;

class PublicPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Jumbotron />
        <Presentation />
        <Subscribe />
        <Survey />
        <Footer />
      </div>
    );
  }
}

export default PublicPage;
