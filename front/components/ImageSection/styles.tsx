import styled from '@emotion/styled';

export const ImageLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 2rem;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(3, auto);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, auto);
  }
`;

export const NotImageData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 30px;
  font-size: 1.3rem;
`;

export const Target = styled.div``;
