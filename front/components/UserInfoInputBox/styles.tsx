import styled from '@emotion/styled';

export const Wrapper = styled.div`
  @media screen and (min-width: 601px) {
    // bottom: 0;
    // left: 0;
    // right: 0;
    // top: 0;
    // overflow: hidden;
    // position: absolute;
    // z-index: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    &:before,
    &:after {
      // min-height: 30px;
      flex-grow: 1;
      content: '';
      display: block;
      height: 24px;
      box-sizing: border-box;
    }
  }
`;

export const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  padding: 24px 24px 36px;
  @media screen and (min-width: 450px) {
    padding: 48px 40px 36px;
  }
  @media screen and (min-width: 601px) {
    display: block;
    width: 450px;
    margin: 0 auto;
    border: 1px solid #dadce0;
    border-radius: 8px;
  }

  .social_sign-in_box {
    margin-top: 13px;

    .social_icon_box {
      display: flex;
      justify-content: center;

      padding: 12px 0;
      gap: 2.5rem;

      .social_button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        border: 0;
        border-radius: 4px;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 20%);
        cursor: pointer;

        &.kakao {
          background-color: #fae500;
        }

        &.naver {
          color: white;
          background-color: #15c654;
        }
      }
    }

    .social_sign-in_title {
      position: relative;

      padding: 0 8px;
      margin-bottom: 16px;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: -0.3px;
      color: #b8b8b8;
      z-index: 11;
      background-color: #fff;
    }

    .social_sign-in_line {
      position: relative;
      bottom: -12px;
      display: block;
      margin: 0;
      width: 100%;
      height: 1px;
      background-color: #b8b8b8;
      border: none;
    }
  }
`;

export const InnerContainer = styled.div`
  padding-top: 30px;
`;
