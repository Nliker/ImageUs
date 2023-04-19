import styled from '@emotion/styled';

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100%;
  padding: 1.5rem 2.5rem;
  box-sizing: border-box;

  h1 {
    position: absolute;
  }

  @media screen and (min-width: 768px) {
    align-items: normal;

    padding: 1.5rem 5rem;
  }
`;
