import styled from '@emotion/styled';

export const Wrapper = styled.div``;

export const Container = styled.div`
  height: 100%;
`;

export const Background = styled.div`
  position: fixed;
  z-index: 1000;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.65);
`;

export const CloseBtn = styled.div`
  position: absolute;
  display: flex;
  z-index: 1002;
  top: 10px;
  right: 10px;
  padding: 8px;
  & > div {
    display: flex;
  }
  svg {
    width: 25px;
    height: 25px;
    color: white;
    cursor: pointer;
  }
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  z-index: 1001;
`;

export const ModalBox = styled.div`
  display: flex;
  margin: 20px;
`;

export const Modal = styled.div`
  width: 495px;
  max-width: 354px;
  min-width: 348px;
  min-height: 391px;
  max-height: 397px;
  border-radius: 12px;
  background-color: white;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  height: 43px;
  h1 {
    margin: 0;
    font-size: 16px;
  }
`;

export const ModalImageBox = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 43px);
  // height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const ImageDiv = styled.div<{ image: HTMLImageElement | null }>`
  // 이미지에 따라 width 와 height를 동적으로 변환시켜 주어야 한다.
  ${({ image }) => {
    console.log(image?.height);
    const ratio = image && 348 / image?.height;
    return `
    width: ${ratio && image?.width * ratio}px;
    `;
  }};
  height: 348px;
  background-image: url(image_test.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  transform: none;
`;

export const ImageCover = styled.div`
  bottom: 0;
  cursor: grab;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  touch-action: none;
  -webkit-user-select: none;
  width: 100%;
  z-index: 2;
`;
