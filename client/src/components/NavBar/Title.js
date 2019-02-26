import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  text-align: center;
  margin: 1rem 0;
  background: ${props => props.theme.colors.dark};

  h1 {
    font-size: 1.8em;
    margin-bottom: 0.3rem;
  }
`;

export default () => (
  <Title>
    <h1>SJParks</h1>
    <p>Admin</p>
  </Title>
);
