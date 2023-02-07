import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserInfoInputBox from '@components/UserInfoInputBox';
import {
  CheckBox,
  EmailInputContainer,
  ErrorMessage,
  InputBox,
  InputDiv,
  PasswordInputContainer,
  SubmitBox,
} from './styled';
import { Navigate, NavLink, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';
import { logInCheckFetcher, logInRequestFetcher } from '@utils/logInFetcher';
import { Button } from '@styles/Button';

const LogIn = () => {
  const { data: logInSuccess, trigger } = useSWRMutation(
    '/user/login',
    logInRequestFetcher,
  );

  const [checked, setChecked] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPwValue] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [pwErrorMessage, setPwErrorMessage] = useState<string>('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  );
  const navigate = useNavigate();

  // console.log('login', data);
  const checkHandler = useCallback(() => {
    return setChecked((prev) => !prev);
  }, []);

  const emailValidation = useCallback((value: string) => {
    if (!value) {
      setEmailErrorMessage('이메일을 입력해주세요.');
      return false;
    } else if (!emailRegex.test(value)) {
      setEmailErrorMessage('이메일 형식에 맞지 않습니다.');
      return false;
    }
    setEmailErrorMessage('');
    return true;
  }, []);

  const pwValidation = useCallback((value: string) => {
    if (!value) {
      setPwErrorMessage('비밀번호를 입력해주세요.');
      return false;
    } else if (value?.length < 8) {
      setPwErrorMessage('비밀번호는 8글자 이상입니다.');
      return false;
    }
    setPwErrorMessage('');
    return true;
  }, []);

  const onChangeEmailInput = useCallback((e: { target: { value: string } }) => {
    setEmailValue(e.target.value);
    const inputValue = e.target.value;
    emailValidation(inputValue);
  }, []);

  const onChangePasswordInput = useCallback(
    (e: { target: { value: string } }) => {
      setPwValue(e.target.value);
      const inputValue = e.target.value;
      pwValidation(inputValue);
    },
    [],
  );

  const onSubmitLoginInfo = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const emailCheck = emailValidation(emailValue);
      const pwCheck = pwValidation(passwordValue);
      if (!emailCheck && !pwCheck) {
        alert('이메일과 비밀번호를 다시 확인해주세요.');
      } else if (!emailCheck) {
        alert('이메일을 다시 확인해주세요.');
      } else if (!pwCheck) {
        alert('비밀번호를 다시 확인해주세요.');
      } else {
        await trigger({ email: emailValue, password: passwordValue });
        await mutate('/user/my');
      }
    },
    [emailValue, passwordValue],
  );

  useEffect(() => {
    if (logInSuccess) navigate('/main_page');
  }, [logInSuccess]);

  return (
    <div>
      <UserInfoInputBox pageName={'로그인'}>
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
              <ErrorMessage>
                <span>{emailErrorMessage}</span>
              </ErrorMessage>
            </InputBox>
          </EmailInputContainer>
          <PasswordInputContainer>
            <InputBox>
              <label htmlFor="password-input">비밀번호를 입력하세요.</label>
              <InputDiv>
                <input
                  type="password"
                  id="password-input"
                  ref={passwordRef}
                  value={passwordValue}
                  onChange={onChangePasswordInput}
                  placeholder="비밀번호를 입력하세요."
                />
              </InputDiv>
              <ErrorMessage>
                <span>{pwErrorMessage}</span>
              </ErrorMessage>
            </InputBox>
          </PasswordInputContainer>
          <SubmitBox>
            <NavLink to={'/signup'}>
              <Button type="button" className="warning">
                계정 만들기
              </Button>
            </NavLink>
            <Button type="submit">확인</Button>
          </SubmitBox>
        </form>
      </UserInfoInputBox>
    </div>
  );
};

export default LogIn;
