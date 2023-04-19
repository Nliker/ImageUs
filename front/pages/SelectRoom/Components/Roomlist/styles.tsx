import styled from '@emotion/styled';

export const Container = styled.section`
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  align-items: center;
`;

export const EmptyRoom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 2.5rem;

  .text {
    font-size: 1.3rem;
  }

  @media screen and (min-width: 768px) {
    .text {
      font-size: 1.4rem;
    }
  }
`;
