/*jshint esversion: 8 */
import styled from 'styled-components';

export const NavContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 100px;
  align-items: center;
  margin: auto 20px;
  .profileImg {
    height: 36px;
    width: auto;
    border-radius: 50%;
  }
  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    justify-content: start;
    position: fixed;
    top: 0;
  }
`;
