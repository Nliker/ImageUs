import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  user-select: none;
`;

export const Container = styled.div<{ showModal: boolean }>`
  height: 100%;
  width: 100%;
  ${({ showModal }) =>
    showModal &&
    `
    position: fixed;
  `}
`;

export const ContentWrapper = styled.div<{ show: boolean }>`
  width: 100%;
  height: calc(100vh - 30px);
  background-color: rgb(237, 241, 245);

  transition: transform 0.5s;
  transform: translateX(0px);
  ${({ show }) =>
    show &&
    `
  transition: transform 0.5s;
  transform: translate3d(215px, 0, 0);
  `}
`;
