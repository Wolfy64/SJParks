import React from 'react';
import NavBar from './NavBar';
import Presentation from './Presentation';
import Subscribe from './Subscribe';
import Survey from './Survey';
import Footer from './Footer';

class PublicPage extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Presentation />
        <Subscribe />
        <Survey />
        <Footer />
      </div>
    );
  }
}

export default PublicPage;
