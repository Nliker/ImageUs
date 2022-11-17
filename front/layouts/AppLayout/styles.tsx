import styled from '@emotion/styled';

export const ContentWrapper = styled.div<{ show: boolean }>`
  width: 100%;
  // 임시
  height: calc(100vh - 80px);
  background-color: brown;

  transition: transform 0.5s;
  transform: translateX(0px);
  ${({ show }) => show && `
  transition: transform 0.5s;
  transform: translate3d(215px, 0, 0);
  `}
`;
