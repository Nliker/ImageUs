import styled from '@emotion/styled';

export const ImageLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 2rem;

  @media screen and (min-width: 450px) {
    grid-template-columns: repeat(3, auto);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, auto);
  }
`;
