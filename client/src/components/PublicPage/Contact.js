import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-content: center;
  height: 60vh;
`;

const Survey = styled.article`
  width: 300px;

  a {
    background-color: ${props => props.theme.colors.success};
    color: ${props => props.theme.colors.light};
    text-decoration: none;
    display: inline-block;
    border-radius: 5px;
    padding: 0.5rem;
    width: 250px;
    text-align: center;
    margin: 1rem;
  }
`;

const Contact = () => (
  <Container id='contact'>
    <Survey>
      <p>
        We would love to hear your feedback! Just drop us an email through the
        form to the right, or take the survey to tell us how we can improve.
      </p>
      <a href='https://docs.google.com/forms/d/11pOoyQBK0tvlfEY_zNqxRvvkz5O_ue-qHlmKTkX6kiI/viewform?edit_requested=true'>
        Take a Survey
      </a>
    </Survey>
    <form action='https://formspree.io/info@azur-agency.org' method='POST'>
      <input type='text' name='name' />
      <input type='email' name='_replyto' />
      <textarea />
      <input type='submit' />
    </form>
  </Container>
);

export default Contact;
