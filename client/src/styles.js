import styled from 'styled-components';

export const Container = styled.div`
  max-width: ${props => props.theme.displays.hd};

  @media screen and (min-width: ${props => props.theme.displays.hd}) {
    border: 1px solid ${props => props.theme.colors.dark};
  }

  @media screen and (max-width: ${props => props.theme.displays.mobileL}) {
    display: inline-block;
  }
`;
