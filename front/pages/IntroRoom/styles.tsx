import styled from '@emotion/styled';

export const Wrapper = styled.div`
  flex: 1 0 auto;

  .nav_icon {
    position: absolute;
    left: 1.5rem;
    top: 0.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;

    border-radius: 20px;
    cursor: pointer;

    &:hover {
      background-color: rgba(212, 211, 213, 0.59);
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  .text {
    line-height: 30px;
    text-align: center;
    white-space: pre;
  }
`;
