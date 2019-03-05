/*jshint esversion: 8 */
import React from 'react';
import Button from '../UI/Generic/Button';
import Textarea from '../UI/Form/Textarea';
import Input from '../UI/Form/Input';
import {ContactContainer, Survey} from './styles';

const Contact = () => (
  <ContactContainer id='contact'>
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
      <Input type='text' name='name' placeholder='Your Name' />
      <Input type='email' name='_replyto' placeholder='Your Email' />
      <Textarea className='publicText' placeholder='Your Message' />
      <Button type='submit' name='Submit' />
    </form>
  </ContactContainer>
);

export default Contact;
