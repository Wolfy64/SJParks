import React from 'react';
import styled from 'styled-components';
import phone from '../../img/phone.png';
import sms from '../../img/sms.jpg';

const PresentationBox = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  height: 70vh;

  .imgPhone {
    width: 300px;
    margin-top: -11rem;
  }

  .imgSms {
    display: none;
  }

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    grid-template-columns: 1fr;
    height: auto;

    .imgPhone {
      display: none;
    }

    .imgSms {
      display: block;
      width: 300px;
      margin: auto;
    }
  }
`;

const Summary = styled.div`
  align-self: center;
  padding-left: 5rem;

  p {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    line-height: 1.5;
    padding-left: 1rem;
  }

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    padding: 1rem;

    ul {
      padding-left: initial;
    }
  }
`;

const About = () => {
  return (
    <PresentationBox id='about'>
      <img className='imgSms' src={sms} alt='Sms Eg' />

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

      <img className='imgPhone' src={phone} alt='Phone Eg' />
    </PresentationBox>
  );
};

export default About;
