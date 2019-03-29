import styled from 'styled-components';
import { defaultThemeProps } from '../../../styles/theme';

const Area = styled.div`
  grid-column: span 2;
  textarea {
    border: solid 1px ${props => props.theme.colors.lightbg};
    border-radius: 5px;
    padding: 5px;
    font-size: 0.7em;
    min-height: 100px;
    width: calc(100% - 12px);
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.4rem 0;
  label {
    color: ${props => props.theme.colors.secondary};
    margin: 0.6rem 0 0.3rem 0.3rem;
  }
  input {
    border: solid 1px ${props => props.theme.colors.lightbg};
    border-radius: 5px;
    padding: 0.3rem;
    font-size: 0.7em;
  }
  span {
    color: ${props => props.theme.colors.danger};
  }
`;

const Wrapper = styled.div`
  select {
    border: solid 1px ${props => props.theme.colors.lightbg};
    width: 100%;
    padding: 0.3rem;
    font-size: 0.7em;
    margin: 0.3rem 0;
    max-width: 300px;
  }
  label {
    color: ${props => props.theme.colors.secondary};
    margin: 0.6rem 0 0 0.3rem;
  }
  margin: 0.6rem 0 0;
`;

// Need to add defaultThemeProps to avoid error test
InputBox.defaultProps = defaultThemeProps;
Area.defaultProps = defaultThemeProps;
Wrapper.defaultProps = defaultThemeProps;

export { Area, InputBox, Wrapper };
