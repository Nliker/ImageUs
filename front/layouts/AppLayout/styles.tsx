import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  user-select: none;
`;

export const Container = styled.div<{ showModal: undefined | {upload: boolean, image: boolean, create_room: boolean}}>`
  height: 100%;
  width: 100%;
  ${({ showModal }) =>
    (showModal?.upload || showModal?.image || showModal?.create_room) &&
    `
    position: fixed;
  `}
`;

export const ContentWrapper = styled.div<{ show: boolean }>`
  width: 100%;
  height: calc(100vh - 55px);
  background-color: rgb(237, 241, 245);
  overflow-y: auto;

  transition: transform 0.5s;
  transform: translateX(0px);
  ${({ show }) =>
    show &&
    `
  transition: transform 0.5s;
  transform: translate3d(300px, 0, 0);
  `}
`;

export const RoomModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
` 
