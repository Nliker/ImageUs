import React, { useCallback, useRef, useState } from 'react';
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
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

// auth라는 swr api를 만들어서 페이지 진입할 때 올바른 접속인지 확인 필요

const LogIn = () => {
  const { mutate } = useSWR('login');
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

  const onChangePasswordInput = useCallback((e: { target: { value: string } }) => {
    setPwValue(e.target.value);
    const inputValue = e.target.value;
    pwValidation(inputValue);
  }, []);

  const onSubmitLoginInfo = useCallback(
    (e: { preventDefault: () => void }) => {
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
        axios
          .post('/user/login', {
            email: emailValue,
            password: passwordValue,
          })
          .then((res) => {
            const data = {
              token: res.data,
              login: true
            }
            mutate(data);
            // 페이지 이동
            // redirect('/main_page');
            navigate('/main_page');
          })
          .catch((err) => {
            // console.log(err);
            alert(err.response.data.message);
          });
      }
    },
    [emailValue, passwordValue],
  );

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
                  type="text"
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
