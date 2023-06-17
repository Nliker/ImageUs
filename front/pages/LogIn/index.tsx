import React, { useCallback, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { IconContext } from 'react-icons/lib';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';

import UserFormBox from '@components/UserFormBox';
import { Button } from '@styles/Button';
import useAuth from '@hooks/useAuth';
import { getErrorMessage } from '@utils/getErrorMessage';
import { ErrorMessage, InputBox, SocialLoginBox, SubmitBox } from './styled';
import queryString from 'query-string';

const LogIn = () => {
  const queryData = queryString.parse(location.search);

  const navigate = useNavigate();
  const { logInRequest } = useAuth();

  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPwValue] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [pwErrorMessage, setPwErrorMessage] = useState<string>('');
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  );

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

  const onChangeEmailInput = (e: { target: { value: string } }) => {
    setEmailValue(e.target.value);
    const inputValue = e.target.value;
    emailValidation(inputValue);
  };

  const onChangePasswordInput = (e: { target: { value: string } }) => {
    setPwValue(e.target.value);
    const inputValue = e.target.value;
    pwValidation(inputValue);
  };

  const onSubmitLoginInfo = async (e: { preventDefault: () => void }) => {
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
      try {
        await logInRequest({ email: emailValue, password: passwordValue });
        navigate('/room', { replace: true });
      } catch (error) {
        const message = getErrorMessage(error);
        alert(message);
      }
    }
  };

  if ('email' in queryData && 'password' in queryData) {
    const email = queryData?.email as string;
    const password = queryData?.password as string;

    logInRequest({ email, password })
      .then(() => {
        navigate('/room', { replace: true });
      })
      .catch((error) => {
        const message = getErrorMessage(error);
        alert(message);
      });
  }

  return (
    <UserFormBox pageName={'로그인'}>
      <form onSubmit={onSubmitLoginInfo}>
        <div>
          <InputBox>
            <label htmlFor="email-input">이메일 주소를 입력하세요.</label>
            <div>
              <input
                type="text"
                id="email-input"
                ref={emailRef}
                value={emailValue}
                onChange={onChangeEmailInput}
                placeholder="이메일을 입력하세요."
              />
            </div>
            <ErrorMessage>
              <span>{emailErrorMessage}</span>
            </ErrorMessage>
          </InputBox>
        </div>
        <div>
          <InputBox>
            <label htmlFor="password-input">비밀번호를 입력하세요.</label>
            <div>
              <input
                type="password"
                id="password-input"
                ref={passwordRef}
                value={passwordValue}
                onChange={onChangePasswordInput}
                placeholder="비밀번호를 입력하세요."
              />
            </div>
            <ErrorMessage>
              <span>{pwErrorMessage}</span>
            </ErrorMessage>
          </InputBox>
        </div>
        <SubmitBox>
          <NavLink to={'/signup'} className="signup_link">
            계정 만들기
          </NavLink>
          <Button type="submit">확인</Button>
        </SubmitBox>
      </form>
      <SocialLoginBox>
        <hr className="social_sign-in_line" />
        <span className="social_sign-in_title">간편 로그인</span>
        <div className="social_icon_box">
          <a
            href={`/backapi/oauth-login?coperation=kakao`}
            className="kakao_icon social_icon_a"
          >
            <IconContext.Provider
              value={{
                size: '60%',
                style: { display: 'inline-block' },
              }}
            >
              <RiKakaoTalkFill />
            </IconContext.Provider>
          </a>
          <a
            href="/backapi/oauth-login?coperation=naver"
            className="naver_icon social_icon_a"
          >
            <IconContext.Provider
              value={{
                size: '60%',
                style: { display: 'inline-block' },
              }}
            >
              <SiNaver />
            </IconContext.Provider>
          </a>
        </div>
      </SocialLoginBox>
    </UserFormBox>
  );
};

export default LogIn;
