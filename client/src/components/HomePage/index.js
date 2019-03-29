/*jshint esversion: 8 */
import React from 'react';
import NavBar from './NavBar';
import About from './About';
import Subscribe from './Subscribe';
import Contact from './Contact';
import Footer from './Footer';
import { Jumbotron } from './styles';

const HomePage = () => (
  <>
    <NavBar />
    <Jumbotron />
    <About />
    <Subscribe />
    <Contact />
    <Footer />
  </>
);
export default HomePage;
