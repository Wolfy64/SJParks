import React from 'react';
import styled from 'styled-components';

const PresentationBox = styled.div`
  margin: 20px;
  max-width: 40vw;
`
const Presentation = () => (
  <>
    <PresentationBox>
      <p>
        Have your visited the park onlyto find out hat is closed for maintenance,
        or even worse, openand unsafe? We provide a solution for you to stay
        informed.
      </p>
      <p>
        All it takes is a keyword of the park, you're in to receive instant update.
      </p>
      <ul>
        <li>
          1. Urgent update come to your phone directly form San Jose Park
          Administration
        </li>
        <li>2. Know about events at the park you plan to visit.</li>
        <li>3. Get involves in San Jose community.</li>
      </ul>
    </PresentationBox>
    <img src='#' alt='Phone Eg' />
  </>
);

export default Presentation;
