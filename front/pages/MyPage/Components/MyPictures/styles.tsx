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
