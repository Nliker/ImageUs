import styled from '@emotion/styled';

export const Wrapper = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: 1rem;
    & li>div {
        position: relative;
        overflow: hidden;
        padding-bottom: 100%;
        border-radius: 12px;
    }
    img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
  }
`;
