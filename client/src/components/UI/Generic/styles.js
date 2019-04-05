import styled from 'styled-components';
import { defaultThemeProps } from '../../../styles/theme';

const Btn = styled.button`
  background: ${props => (props.delete ? '#750000' : '#004A75')};
  color: white;
  font-size: 1em;
  margin: 1em auto;
  padding: 0.25em 1em;
  border-radius: 7px;
  border: 1px solid ${props => (props.delete ? '#580808' : '#083C5B')};
  width: 100%;
  height: 2em;
  max-width: 300px;
  :hover {
    background: white;
    color: ${props => (props.delete ? '#580808' : '#083C5B')};
    cursor: pointer;
  }
`;

const BtnText = styled.button`
  background: inherit;
  margin: 3px;
  color: ${props => props.theme.colors.info};
  border: none;
  :hover {
    text-decoration: underline;
  }
`;

const Message = styled.div`
  background-color: ${props => props.success && props.theme.colors.success};
  background-color: ${props => props.info && props.theme.colors.info};
  background-color: ${props => props.error && props.theme.colors.danger};
  background-color: ${props => props.color};
  color: ${props => props.theme.colors.light};
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  border-radius: 5px;
`;

const NavButton = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  color: ${props => props.theme.colors.lightbg};
  background-color: ${props => props.theme.colors.dark};

  :hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

// Need to add defaultThemeProps to avoid error test
Btn.defaultProps = defaultThemeProps;
BtnText.defaultProps = defaultThemeProps;
Message.defaultProps = defaultThemeProps;
NavButton.defaultProps = defaultThemeProps;

export { Btn, BtnText, Message, NavButton };
