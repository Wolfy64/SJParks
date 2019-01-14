import React from 'react';
import styled from 'styled-components';

const Container = styled.footer`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.light};
  background-color: ${props => props.theme.colors.primary};
  height: 10vh;
  display: flex;
  align-items: center;
  padding-left: 5rem;

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    padding: 1rem;
    height: auto;
  }
`;

const Footer = () => (
  <Container>
    Designed and Developed by Azur Agency volunteers for San Jose Parks and
    Recreations Departement.
  </Container>
);

export default Footer;
