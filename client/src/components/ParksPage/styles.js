import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 300px;
  margin-right: 5rem;
  .searchContainer{
    background-color: ${(props) => props.theme.colors.lightbg}
  }
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    display: flex;
    justify-content: center;
    width: 100vw;
    margin: 0 auto;
    form {
      width: 300px;
    }
    .searchContainer{
      margin-top: 30px;
    }
  }
`