import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 320px;
  height: fit-content;
  .searchContainer {
    margin-bottom: 50px;
    margin-right: 50px;
  }
  .selectedContainer {
    background-color: ${props => props.theme.colors.lightbg};
  }
  .col3{
      margin: 0 20px;
      height: 100%;
      width: 280px;
  }
  @media screen and (max-width: ${(props) => props.theme.displays.tablet}) {
    margin: 0 0 60px 0;
    width: 100vw;
    .selectedContainer,  .searchContainer {
      width: 100vw;
      margin-right: 0;
      margin-bottom: 50px;
      height: inherit;
    }
    .editMessage {
      display: flex;
      flex-direction: column;
      button{
        align-self: center;
      }
    }
  }
`

/********  Edit Message  *******/
/******* {Title, Preview} ******/

export const Title = styled.div`
    display: flex;
    align-items: center;
    label{
    margin: 0.3rem;
  };
  .label{
    color: ${props => props.theme.colors.secondary};
  };
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
  };

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  };

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${props => props.theme.colors.primary};
    -webkit-transition: .4s;
    transition: .4s;
  };

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    right: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  };

  input:checked + .slider {
    background-color: ${props => props.theme.colors.lightbg};
  };

  input:checked + .slider:before {
    -webkit-transform: translateX(-16px);
    -ms-transform: translateX(-16px);
    transform: translateX(-16px);
  };

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  };

  .slider.round:before {
    border-radius: 50%;
  };
`;

export const Preview = styled.div`
    background-color: ${props => props.theme.colors.lightbg};
    color: ${props => props.theme.colors.secondary};
    border-radius: 20px;
    padding: 8px 15px;
    margin-top: 40px;
    margin-bottom: 10px;
    display: inline-block;
    position: relative;
    max-width: 200px;
    word-wrap: break-word;
    :before {
      content: "";
      position: absolute;
      z-index: 0;
      bottom: 0;
      left: -7px;
      height: 20px;
      width: 20px;
      background: ${props => props.theme.colors.lightbg};
      border-bottom-right-radius: 15px;
    };
    :after {
      content: "";
      position: absolute;
      z-index: 1;
      bottom: 0;
      left: -10px;
      width: 10px;
      height: 20px;
      background: white;
      border-bottom-right-radius: 10px;
    };
`;