import styled from "styled-components";

export const NavContainer = styled.div`
  border-right: solid 3px ${props => props.theme.colors.primary};
  position: fixed;
  top: 0;
  background: ${props => props.theme.colors.dark};
  width: 150px;
  height: 100vh;
  color: ${props => props.theme.colors.lightbg};
  z-index: 3;
  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    width: 100%;
    height: auto;
    background-color: transparent;
    #navbar {
      margin-top: -400px;
      padding-top: 70px;
      -webkit-transition: all 0.5s ease;
      -moz-transition: all 0.5s ease;
      transition: all 0.5s ease;
      background: ${props => props.theme.colors.dark};
      border-bottom: solid 3px ${props => props.theme.colors.primary};
    }
  }

  .logout {
    position: absolute;
    bottom: 10px;
    width: 100%;
    @media screen and (max-width: ${props => props.theme.displays.tablet}) {
      position: relative;
      bottom: 0px;
    }
  }

  .title {
    text-align: center;
    margin: 1rem 0;
    background: ${props => props.theme.colors.dark};
    h1 {
      font-size: 1.8em;
      margin-bottom: 0.3rem;
    }
    @media screen and (max-width: ${props => props.theme.displays.tablet}) {
      display: none;
    }
  }

  .menuIcon {
    display: none;
    height: 20px;
    width: 30px;
    padding: 40px 20px;
    position: fixed;
    right: 0px;
    justify-content: center;
    @media screen and (max-width: ${props => props.theme.displays.tablet}) {
      display: block;
    }
  }

  #hid {
    height: 100vh;
    width: 100%;
    background-color: transparent;
    display: none;
  }

  .active {
    background-color: ${props => props.theme.colors.primary};
  }
`;
