import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 40px;

  ul {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 1rem;

    & li > div {
      position: relative;

      padding-bottom: 100%;
      border-radius: 12px;

      overflow: hidden;
    }

    img {
      position: absolute;

      width: 100%;
      height: 100%;

      object-fit: cover;
    }
  }
`;

export const ImageLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 2rem;

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(3, auto);
    gap: 3rem;
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
