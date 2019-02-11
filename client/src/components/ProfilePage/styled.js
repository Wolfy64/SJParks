import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 40px;
  color: ${props => props.theme.colors.secondary};
  .userImage, .userForm {
    margin-right: 50px;
  }
  .profileInfo {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    width: 280px;
    justify-content: flex-end;
    margin-top: 30px;
    p {
        margin: 0.3rem;
    }
  }
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    margin-bottom: 20px;
    justify-content: center;
    .profileInfo{
      margin-top: 20px;
    }
  }
`