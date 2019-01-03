import React from 'react';
import NavBar from './NavBar';
import Presentation from './Presentation';
import SelectPark from './SelectPark';
import Survey from './Survey';
import Footer from './Footer';

const PublicPage = () => (
  <div>
    <NavBar />
    <Presentation />
    <SelectPark />
    <Survey />
    <Footer />
  </div>
);

export default PublicPage;
