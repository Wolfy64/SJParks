/*jshint esversion: 8 */
import styled from 'styled-components';

export const Jumbotron = styled.div`
  background-color: ${props => props.theme.colors.primary};
  height: 40vh;

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    display: none;
  }
`;

/********  NavBar  *******/
/********* {Nav} *********/

export const Nav = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding-top: 1.2rem;
  color: ${props => props.theme.colors.light};
  background-color: ${props => props.theme.colors.primary};

  ul {
    display: flex;
    align-items: center;
    margin-right: 2rem;
    justify-self: right;
  }

  li {
    width: 90px;
    text-align: center;
  }

  a {
    color: ${props => props.theme.colors.light};
    text-decoration: none;
    :hover {
      font-weight: bold;
    }
  }

  .logo {
    font-size: 1.5rem;
    margin-left: 1rem;
  }

  .nobreak {
    white-space: nowrap;
  }

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    grid-template-columns: inherit;
    justify-content: center;
    margin-bottom: 2rem;

    ul {
      margin: 1rem;
      justify-self: inherit;
    }
  }
`;

/*************  About  ************/
/*** {PresentationBox, Summary} ***/

export const PresentationBox = styled.main`
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

export const Summary = styled.div`
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

/***********  Subscribe  **********/
/*** {SubscribeContainer, Form} ***/

export const SubscribeContainer = styled.div`
  h2 {
    display: none;
  }
  .searchContainer {
    width: 100%;
    background-color: white;
  }
  .selectedContainer {
    width: 100%;
  }
  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    h2 {
      display: block;
      font-size: 1.5rem;
      padding: 1rem;
      margin: 1rem 0 -1rem 0;
    }
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: center;
  background-color: ${props => props.theme.colors.lightbg};

  .phoneField {
    width: 300px;
    align-self: center;
    padding-bottom: 1rem;
    margin: 20px 0px;
  }

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    height: auto;
    .searchContainer {
      
    }
  }
`;

/************  Contact  ***********/
/*** {ContactContainer, Survey} ***/

export const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 1rem;
  justify-items: center;
  align-content: center;
  height: 60vh;
  form {
    display: grid;
    width: 500px;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    grid-template-columns: 1fr;
    height: auto;

    form {
      grid-template-columns: 1fr;
      width: 300px;
    }
  }
`;
export const Survey = styled.article`
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

  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    width: 300px;
    padding-top: 5rem;
    padding-bottom: 2rem;
  }
`;

/********  Footer  *******/
/*** {FooterContainer} ***/

export const FooterContainer = styled.footer`
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