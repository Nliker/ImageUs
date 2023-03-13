import styled from '@emotion/styled';

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
  top: 10px;
  right: 10px;
  z-index: 1002;

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
  z-index: 1001;

  overflow-x: hidden;
  overflow-y: hidden;
`;

export const ModalBox = styled.div`
  display: flex;

  h1,
  h2 {
    font-size: 16px;
    margin: 0;
  }
`;

export const Modal = styled.div`
  width: 495px;
  max-width: calc(100vw - 40px);
  min-width: 348px;
  min-height: 391px;
  border-radius: 12px;

  background-color: white;
  overflow: hidden;
  user-select: none;

  .content_box {
    box-sizing: border-box;

    width: 100%;
    height: 360px;

    overflow: auto;
  }

  .result_box {
    display: flex;
  }

  .upload_btn button {
    width: 100%;
  }

  @media screen and (max-width: 688px) {
    .content_box {
      overflow: auto;
    }
    .result_box {
      flex-direction: column;
    }
  }
`;

export const ModalHeaderWrapper = styled.div`
  position: relative;
  display: inline-block;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  height: 43px;
  border-bottom: 1px solid rgb(219, 219, 219);
`;

export const HeaderContainer = styled.div`
  display: flex;
  padding: 0 3px;
`;

export const ModalHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  user-select: none;
`;

export const ModalTitle = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(100% - 120px);
  height: 43px;

  h1 {
    width: 100%;
    margin: 0;
    text-align: center;
  }
`;

export const ModalImageBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px 10px;
  height: 100%;

  box-sizing: border-box;

  .select_box {
    position: relative;
    z-index: 3;
  }

  .filebox {
    display: flex;
    justify-content: center;
    align-items: center;

    .upload-name {
      display: inline-block;

      height: 35px;
      padding: 0 10px;

      vertical-align: middle;
      border: 1px solid #dddddd;
      width: 78%;
      color: #999999;
    }

    label {
      display: inline-block;

      height: 15px;
      padding: 9px 18px;
      margin-left: 25px;
      font-size: 0.7rem;
      border-radius: 5px;

      white-space: nowrap;
      color: #fff;
      vertical-align: middle;
      background-color: #999999;
      cursor: pointer;
    }

    input[type='file'] {
      position: absolute;
      width: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      border: 0;
    }
  }
`;

export const ImageDiv = styled.div<{ image: HTMLImageElement | null }>`
  width: 100%;
  height: 100%;
  z-index: 3;

  background-image: ${(props) => `url(${props.image?.src})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  .default_image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    gap: 1.5rem;
  }
`;

export const ImageCover = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;

  height: 100%;
  width: 100%;
  -webkit-user-select: none;
  touch-action: none;
`;

export const ChannelListBox = styled.div`
  width: 100%;
  height: 100%;

  ul {
    margin: 0;
    padding: 0;
  }

  ul li {
    cursor: pointer;
    list-style: none;
  }
`;

export const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: calc(100% / 2);
  overflow: hidden;
`;

export const ListBox = styled.div`
  display: flex;
  justify-content: center;

  width: calc(100% / 2);

  & > div {
    width: 100%;
  }

  h2 {
    text-align: center;
  }
`;
