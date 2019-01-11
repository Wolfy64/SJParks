import React from 'react';
import styled from 'styled-components';
import phone from '../../images/phone.png';

const PresentationBox = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  height: 70vh;

  img {
    width: 300px;
    margin-top: -11rem;
  }
`;

const Summary = styled.div`
  align-self: center;
  padding-left: 5rem;
`;

const About = () => (
  <PresentationBox id='about'>
    <Summary>
      <p>
        Have your visited the park onlyto find out hat is closed for
        maintenance, or even worse, openand unsafe? We provide a solution for
        you to stay informed.
      </p>
      <p>
        All it takes is a keyword of the park, you're in to receive instant
        update.
      </p>
      <ul>
        <li>
          1. Urgent update come to your phone directly form San Jose Park
          Administration
        </li>
        <li>2. Know about events at the park you plan to visit.</li>
        <li>3. Get involves in San Jose community.</li>
      </ul>
    </Summary>

    <img src={phone} alt='Phone Eg' />
  </PresentationBox>
);

export default About;
