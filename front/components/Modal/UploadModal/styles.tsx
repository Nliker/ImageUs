import styled from '@emotion/styled';

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;

  .upload_btn {
    position: relative;

    height: 40px;

    button {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
`;

export const ImageBox = styled.div`
  flex: 1 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px 10px;
  box-sizing: border-box;

  .default_image {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
  }

  .select_box {
    flex: 1;
    position: relative;

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
        font-size: 1.2rem;
        line-height: 16px;
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
  }
`;

export const ImageDiv = styled.div<{ image: HTMLImageElement | null }>`
  flex: 3;
  width: 100%;

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
  z-index: 1;

  height: 100%;
  width: 100%;

  user-select: none;
  touch-action: none;
  background-color: rgba(255, 255, 255, 0.7);
`;
