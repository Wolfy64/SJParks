import React from 'react';
import NavBar from './NavBar';
import About from './About';
import Subscribe from './Subscribe';
import Contact from './Contact';
import Footer from './Footer';
import { Jumbotron } from './styles';

const PublicPage = () => (
  <>
    <NavBar />
    <Jumbotron />
    <About />
    <Subscribe />
    <Contact />
    <Footer />
  </>
);
export default PublicPage;
