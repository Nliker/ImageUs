import React, { useCallback, useRef, useState } from 'react';
import UserInfoInputBox from '@components/UserInfoInputBox';
import { EmailInputContainer, InputDiv, PasswordInputContainer, SubmitBox } from './styled';
import { CheckBox, InputBox } from '@components/UserInfoInputBox/styles';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const LogIn = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPwValue] = useState<string>('');
  const [emailFormError, setEmailFormError] = useState<boolean>(false);
  const [pwFormError, setPwFormError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  );

  const checkHandler = useCallback(() => {
    return setChecked((prev) => !prev);
  }, []);

  const onSubmitLoginInfo = useCallback((e: { preventDefault: () => void }) => {
    e.preventDefault();
    // console.log('확인', emailFormError, pwFormError);
    if (emailFormError && pwFormError) {
      alert('이메일과 비밀번호를 다시 확인해주세요.');
    } else if (emailFormError) {
      alert('이메일을 다시 확인해주세요.');
    } else if (pwFormError) {
      alert('비밀번호를 다시 확인해주세요.');
    } else {
      // axios.post();
      // 페이지
    }
  }, [emailFormError, pwFormError]);

  const onChangeEmailInput = useCallback((e: { target: { value: string } }) => {
    setEmailValue(e.target.value);
    const inputValue = e.target.value;
    if (!inputValue) {
      setErrorMessage('이메일을 입력해주세요.');
      setEmailFormError(true);
    } else if (!emailRegex.test(inputValue)) {
      setErrorMessage('이메일 형식에 맞지 않습니다.');
      setEmailFormError(true);
    } else {
      setEmailFormError(false);
    }
  }, []);

  const onChangePasswordInput = useCallback((e: { target: { value: string } }) => {
    // console.log(e.target.value);
    setPwValue(e.target.value);
    const inputValue = e.target.value;
    if (!inputValue) {
      setErrorMessage('비밀번호를 입력해주세요.');
      setPwFormError(true);
    } else if (inputValue?.length < 8) {
      setErrorMessage('비밀번호는 8글자 이상입니다.');
      setPwFormError(true);
    } else {
      setPwFormError(false);
    }
  }, []);

  return (
    <div>
      <UserInfoInputBox pageName={'login'}>
        <form onSubmit={onSubmitLoginInfo}>
          <EmailInputContainer>
            <InputBox>
              <label htmlFor="email-input">이메일 주소를 입력하세요.</label>
              <InputDiv>
                <input
                  type="text"
                  id="email-input"
                  ref={emailRef}
                  value={emailValue}
                  onChange={onChangeEmailInput}
                  placeholder="이메일을 입력하세요."
                />
              </InputDiv>
              {emailFormError && <p>{errorMessage}</p>}
            </InputBox>
          </EmailInputContainer>
          <PasswordInputContainer>
            <InputBox>
              <label htmlFor="password-input">비밀번호를 입력하세요.</label>
              <InputDiv>
                <input
                  type="text"
                  id="password-input"
                  ref={passwordRef}
                  value={passwordValue}
                  onChange={onChangePasswordInput}
                  placeholder="비밀번호를 입력하세요."
                />
              </InputDiv>
              {pwFormError && <p>{errorMessage}</p>}
            </InputBox>
          </PasswordInputContainer>
          <CheckBox>
            <label htmlFor="remember-id" onClick={checkHandler}>
              <input type="checkbox" checked={checked} readOnly />
              로그인 상태 유지하기
            </label>
          </CheckBox>
          <SubmitBox>
            <NavLink to={'/signup'}>계정 만들기</NavLink>
            <button type="submit">확인</button>
          </SubmitBox>
        </form>
      </UserInfoInputBox>
    </div>
  );
};

export default LogIn;
