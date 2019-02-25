import React from 'react';
import NavBar from './NavBar';
import About from './About';
import Subscribe from './Subscribe';
import Contact from './Contact';
import Footer from './Footer';
import {Jumbotron} from './styles';

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
