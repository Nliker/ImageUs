import React, { useCallback, useState } from 'react';
import UserInfoInputBox from '@components/UserInfoInputBox';
import { EmailInputContainer, InputDiv, PasswordInputContainer } from './styled';
import { CheckBox, InputBox } from '@components/UserInfoInputBox/styles';

/*
    이메일 체크를 하고 확인이 되었으면 비밀번호 확인을 한다.
*/

const LogIn = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [checked, setChecked] = useState(false);

  const checkHandler = useCallback(() => {
    return setChecked((prev) => !prev);
  }, []);

  return (
    <div>
      <UserInfoInputBox>
        <EmailInputContainer>
          <InputBox>
            <label htmlFor="email-input">이메일 주소를 입력하세요.</label>
            <InputDiv>
              <input type="text" id="email-input" placeholder="이메일을 입력하세요." />
            </InputDiv>
          </InputBox>
        </EmailInputContainer>
        <PasswordInputContainer>
          <InputBox>
            <label htmlFor="password-input">비밀번호를 입력하세요.</label>
            <InputDiv>
              <input type="text" id="password-input" placeholder="비밀번호를 입력하세요." />
            </InputDiv>
          </InputBox>
        </PasswordInputContainer>
        <CheckBox>
          <label htmlFor="remember-id" onClick={checkHandler}>
            <input type="checkbox" checked={checked} readOnly />
            로그인 상태 유지하기
          </label>
        </CheckBox>
      </UserInfoInputBox>
    </div>
  );
};

export default LogIn;
