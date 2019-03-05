/*jshint esversion: 8 */
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 40%;
  margin-right: 5%;
  .searchContainer{
    background-color: ${(props) => props.theme.colors.lightbg}
  }
  form {
    max-width: 300px;
  }
  
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    display: flex;
    justify-content: center;
    width: 100vw;
    margin: 0 auto;
    form {
      width: 300px;
      margin: 0 20px;
    }
    .searchContainer{
      margin-top: 30px;
      width: 100vw;
    }
  }
`