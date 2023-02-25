import styled from '@emotion/styled';

export const InputDiv = styled.div``;

export const EmailInputContainer = styled.div``;
export const PasswordInputContainer = styled.div`
  // margin-top: 20px;
`;

export const InputBox = styled.div`
  input {
    width: 100%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    box-shadow: 0 0 3px #eee;
    border-radius: 4px;
    color: #202124;
    font-size: 17px;
    height: 56px;
    margin: 1px 1px 0 1px;
    padding: 13px 15px;
  }
  label {
    display: block;
    text-align: left;
    &:not(.pwcheck-label) {
      padding-bottom: 10px;
      // color: #d93025;
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  color: orangered;
`;

export const CheckBox = styled.div`
  display: block;
  margin-top: 20px;
  input {
    transform: scale(1.5);
  }
`;

export const SubmitBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 40px;

  .signup_link {
    line-height: 1.38;
    letter-spacing: -0.3px;
    font-weight: 400;

    color: #616568;
    border-bottom: 1px solid #858a8d;
    text-decoration: none;
    cursor: pointer;
  }
`;

export const SocialLoginBox = styled.div`
  margin-top: 13px;

  .social_icon_box {
    display: flex;
    justify-content: center;

    padding: 12px 0;
    gap: 5rem;

    .social_icon_a {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 40px;
      height: 40px;
      border-radius: 4px;
    }

    .kakao_icon {
      color: black;
      background-color: #fae500;
    }

    .naver_icon {
      color: white;
      background-color: #15c654;
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
`;
