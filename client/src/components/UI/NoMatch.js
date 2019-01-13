import React from 'react';

const NoMatch = ({ location }) => (
  <h3>
    No match for <code>{location.pathname}</code>
  </h3>
);

export default NoMatch;
