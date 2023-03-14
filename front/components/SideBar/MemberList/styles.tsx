import styled from '@emotion/styled';

export const Wrapper = styled.div`
  width: fit-content;
  min-width: 100%;
  padding: 1rem 0.5rem;
  box-sizing: border-box;
`;

export const Subtitle = styled.div`
  display: inline-flex;
  align-items: center;

  cursor: pointer;
`;

export const Collapse = styled.span<{ collapse: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;

  cursor: pointer;

  svg {
    transition: transform 0.3s, opacity 0.1s;
    ${({ collapse }) =>
      collapse &&
      `
    transform: rotate(90deg);
    `}
  }
`;

export const CreateBtnBox = styled.div`
  padding: 1rem;
  text-align: center;
`;
