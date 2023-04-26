import styled from '@emotion/styled';

export const Wrapper = styled.div`
  height: 100%;

  overflow: hidden;
  user-select: none;
`;

export const OuterContainer = styled.div<{
  showModal?: string | null;
}>`
  height: 100%;
  width: 100%;

  ${({ showModal }) =>
    showModal &&
    `
    position: fixed;
  `}
`;

export const InnerContainer = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgb(255, 255, 255);
`;

export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
