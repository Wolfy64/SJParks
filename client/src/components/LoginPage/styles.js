import styled from 'styled-components';
import { defaultThemeProps } from '../../styles/theme';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.dark};
  display: grid;
  align-content: center;
`;

const Form = styled.form`
  display: grid;
  width: 80%;
  height: 250px;
  max-width: 300px;
  margin: auto;
  background-color: ${props => props.theme.colors.light};
  border-radius: 15px;
  padding: 40px 30px 60px;
  box-shadow: -5px 3px 3px black;
  h1 {
    text-align: center;
  }
  .message {
    text-align: center;
    color: ${props => props.theme.colors.danger};
  }
`;

Container.defaultProps = defaultThemeProps;
Form.defaultProps = defaultThemeProps;
export { Container, Form };
