import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 80px 0 240px;
  display: flex;
  flex-wrap: wrap;
  z-index: 0;
  @media screen and (max-width: ${props => props.theme.displays.tablet}) {
    margin: 100px 0;
  }
`;
