import React from 'react';

const Survey = () => (
  <div>
    <p>
      We would love to hear your feedback! Just drop us an email through the
      form to the right, or take the survey to tell us how we can improve.
    </p>
    <a href='https://docs.google.com/forms/d/11pOoyQBK0tvlfEY_zNqxRvvkz5O_ue-qHlmKTkX6kiI/viewform?edit_requested=true'>
      <button style={{ background: 'Green', color: 'white' }}>
        Take a Survey
      </button>
    </a>
    <form action='https://formspree.io/info@azur-agency.org' method='POST'>
      <input type='text' name='name' />
      <input type='email' name='_replyto' />
      <textarea />
      <input type='submit' />
    </form>
  </div>
);

export default Survey;
