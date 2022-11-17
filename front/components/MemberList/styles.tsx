import styled from '@emotion/styled';

export const Subtitle = styled.h2`
  display: flex;
  align-items: center;
`;

export const Collapse = styled.span<{ collapse: boolean }>`
  width: 32px;
  height: 32px;
//   margin-right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
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
