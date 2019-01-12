import React from 'react';
import styled from 'styled-components';
import Button from '../UI/Generic/Button';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-content: center;
  height: 60vh;

  form {
    display: grid;
    width: 500px;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;

    input,
    textarea {
      border: solid 1px ${props => props.theme.colors.lightbg};
      border-radius: 5px;
      padding: 0.3rem;
      font-size: 0.7em;
    }

    textarea {
      grid-column: span 2;
      height: 100px;
      resize: none;
    }

    button {
      grid-column: 2/3;
    }
  }
`;

const Survey = styled.article`
  width: 500px;

  p {
    line-height: 1.5;
  }

  a {
    background-color: ${props => props.theme.colors.success};
    color: ${props => props.theme.colors.light};
    text-decoration: none;
    display: block;
    border-radius: 5px;
    padding: 0.5rem;
    width: 250px;
    text-align: center;
    margin: 1rem auto;
  }
`;

const Contact = () => (
  <Container id='contact'>
    <Survey>
      <p>
        We would love to hear your feedback! <br />
        Just drop us an email through the form to the right, or take the survey
        to tell us how we can improve.
      </p>
      <a href='https://docs.google.com/forms/d/11pOoyQBK0tvlfEY_zNqxRvvkz5O_ue-qHlmKTkX6kiI/viewform?edit_requested=true'>
        Take a Survey
      </a>
    </Survey>
    <form action='https://formspree.io/info@azur-agency.org' method='POST'>
      <input type='text' name='name' placeholder='Your Name' />
      <input type='email' name='_replyto' placeholder='Your Email' />
      <textarea placeholder='Your Message' />
      <Button name='Submit' />
    </form>
  </Container>
);

export default Contact;
