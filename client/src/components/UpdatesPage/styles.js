import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 46%;
  margin: 0 2%;
  #graph{
    display: flex;
    justify-content: center;
    margin-left: -40px;
  }
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    width: 100vw;
    margin: 0;
    .updateButton {
      margin: 30px auto;
    }
  }
  .updateButton {
    display: flex;
    justify-content: center;
    margin: 50px auto;
  };
`;

/*****************  Historypost  ****************/
/*** {Primary, Secondary, MiniLabel, Message} ***/

export const Primary = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: ${props=>props.theme.colors.primary};
    color: ${props=>props.theme.colors.light};
    i {
        width: 15px;
    }
`;

export const Secondary = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    border-radius: 0 0 5px 5px;
    background-color: ${props=>props.theme.colors.lightbg};
    color: ${props=>props.theme.colors.dark};
    .flexLabels{
        display: inherit;
        flex-wrap: inherit;
    }
`;

export const MiniLabel = styled.span`
    padding: 5px;
    border-radius: 5px;
    margin: 5px;
    background-color: ${props=>props.theme.colors.success};
    color: ${props=>props.theme.colors.light};
`;

export const Message = styled.div`
    padding: 1rem;
    color: ${props=>props.theme.colors.secondary};
`;