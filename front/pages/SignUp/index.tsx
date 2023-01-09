import UserInfoInputBox from '@components/UserInfoInputBox';
import useInput from '@hooks/useInput';
import axios, { AxiosError } from 'axios';
import React, { useCallback, useMemo, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import {
  ErrorText,
  InputContainer,
  PasswordShowCheckBox,
  SubmitBox,
  Input,
  PasswordBox,
  NameBox,
  EmailBox,
  RequestAuthBox,
} from './styles';

interface ErrorInfo {
  name: { hasError: boolean; errorMessage: string };
  email: { hasError: boolean; errorMessage: string; emailAuth: boolean };
  password: { hasError: boolean; errorMessage: string };
}

const SignUp = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo>({
    name: { hasError: true, errorMessage: '이름을 입력해주세요.' },
    email: { hasError: true, errorMessage: '이메일을 입력해주세요.', emailAuth: false },
    password: { hasError: true, errorMessage: '비밀번호를 입력해주세요.' },
  });
  const [isRequestingAuth, setRequestingAuth] = useState(false);
  const [name, setName, nameHandler] = useInput('');
  const [email, setEmail, emailHandler] = useInput('');
  const [emailAuth, setEmailAuth, emailAuthHandler] = useInput('');
  const [password, setPassword, passwordHandler] = useInput('');
  const [passwordCheck, setPasswordCheck, passwordCheckHandler] = useInput('');
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  );
  const [count, setCount] = useState(60);
  const [timeLimitId, setTimeLimitId] = useState<NodeJS.Timeout | null>();
  const navigate = useNavigate();

  const checkHandler = useCallback(() => {
    return setChecked((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!name) {
      setErrorInfo((prev) => ({
        ...prev,
        name: { hasError: true, errorMessage: '이름을 입력해주세요.' },
      }));
    } else {
      setErrorInfo((prev) => ({
        ...prev,
        name: { hasError: false, errorMessage: '잘 입력하셨습니다!' },
      }));
    }
  }, [name]);

  useEffect(() => {
    if (isRequestingAuth) return;

    if (!email) {
      setErrorInfo((prev) => ({
        ...prev,
        email: { hasError: true, errorMessage: '이메일을 입력해주세요.', emailAuth: false },
      }));
    } else if (!emailRegex.test(email)) {
      setErrorInfo((prev) => ({
        ...prev,
        email: { hasError: true, errorMessage: '이메일 형식에 맞지 않습니다.', emailAuth: false },
      }));
    } else {
      setErrorInfo((prev) => ({
        ...prev,
        email: { hasError: true, errorMessage: '인증 요청버튼을 클릭하세요.', emailAuth: true },
      }));
    }
  }, [email]);

  useEffect(() => {
    if (!password) {
      setErrorInfo((prev) => ({
        ...prev,
        password: { hasError: true, errorMessage: '비밀번호를 입력해주세요.' },
      }));
      return;
    } else if (password.length < 8) {
      setErrorInfo((prev) => ({
        ...prev,
        password: { hasError: true, errorMessage: '비밀번호는 8자리 이상입니다.' },
      }));
      return;
    } else if (password !== passwordCheck) {
      setErrorInfo((prev) => ({
        ...prev,
        password: { hasError: true, errorMessage: '비밀번호가 일치하지 않습니다.' },
      }));
    } else {
      setErrorInfo((prev) => ({
        ...prev,
        password: { hasError: false, errorMessage: '잘 입력하셨습니다!' },
      }));
    }
  }, [password, passwordCheck]);

  useEffect(() => {
    if (!timeLimitId) return;
    if (count <= 0) {
      clearInterval(timeLimitId);
      setTimeLimitId(null);
      setCount(60);
      setEmailAuth('');
      setErrorInfo((prev) => ({
        ...prev,
        email: { hasError: true, errorMessage: '만료되었습니다..다시 요청해주세요!', emailAuth: true },
      }));
      setRequestingAuth(false);
    }
  }, [timeLimitId, count]);

  const countTimeLimit = () => {
    console.log(timeLimitId);
    if (timeLimitId) return;
    const Id = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    setTimeLimitId(Id);
  };

  const requestEmailAuthNum = useCallback(async () => {
    try {
      await axios.get(`/user/auth?email=${email}`);
      countTimeLimit();
      setRequestingAuth(true);
      setErrorInfo((prev) => ({
        ...prev,
        email: { hasError: true, errorMessage: '이메일 인증번호를 입력해주세요.', emailAuth: true },
      }));
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err.response?.data;
        if (err.response?.status === 402) {
          setErrorInfo((prev) => ({
            ...prev,
            email: { hasError: true, errorMessage: message, emailAuth: false },
          }));
        } else {
          console.error(err);
          alert('오류가 발생했습니다..');
          location.reload();
        }
      }
    }
  }, [email, timeLimitId]);

  const checkEmailAuth = useCallback(async () => {
    try {
      if (!emailAuth) {
        setErrorInfo((prev) => ({
          ...prev,
          email: { hasError: true, errorMessage: '인증 번호가 입력되지 않았습니다.', emailAuth: true },
        }));
      } else {
        await axios.post(`/user/auth?email=${email}`, {
          auth_password: emailAuth,
        });
        if (timeLimitId) {
          clearInterval(timeLimitId);
          setTimeLimitId(null);
          setCount(60);
          setEmailAuth('');
          setRequestingAuth(false);
          setErrorInfo((prev) => ({
            ...prev,
            email: { hasError: false, errorMessage: '인증 되었습니다.', emailAuth: false },
          }));
        }
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err.response?.data;
        // console.log(err.response);
        if (err.response?.status === 401) {
          setErrorInfo((prev) => ({
            ...prev,
            email: { hasError: true, errorMessage: message, emailAuth: true },
          }));
        } else {
          if (timeLimitId) clearInterval(timeLimitId);
          console.error(err);
          alert('오류가 발생했습니다..');
          location.reload();
        }
      }
    }
  }, [emailAuth]);

  const cancelEmailAuth = useCallback(() => {
    if (timeLimitId) clearInterval(timeLimitId);
    setTimeLimitId(null);
    setCount(60);
    setEmailAuth('');
    setRequestingAuth(false);
    setErrorInfo((prev) => ({
      ...prev,
      email: { hasError: true, errorMessage: '인증 요청버튼을 클릭하세요.', emailAuth: true },
    }));
  }, [isRequestingAuth, timeLimitId, emailAuth, count]);

  const checkErrorValue = () => {
    for (const key in errorInfo) {
      if (errorInfo[key as keyof ErrorInfo].hasError) return true;
    }
    return false;
  };

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      const hasError = checkErrorValue();
      if (hasError) {
        alert('양식을 다시 확인해 주세요.');
        return;
      }

      await axios
        .post('user/sign-up', {
          name,
          email,
          password,
          profile: 'test1',
        })
        .then((res) => {
          console.log(res);
          alert('회원가입되었습니다.');
          navigate('/login');
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    [checkErrorValue, errorInfo],
  );

  const correctMessageStyle = useMemo(
    () => (hasError: boolean) => {
      if (!hasError) return { color: 'dodgerblue' };
    },
    [errorInfo],
  );

  return (
    <div>
      <UserInfoInputBox pageName={'회원가입'}>
        <InputContainer>
          <NameBox>
            <div className="input_box">
              <Input
                type="text"
                name="name-input"
                value={name}
                onChange={nameHandler}
                placeholder="이름을 입력하세요."
              />
            </div>
            <ErrorText>
              <span style={correctMessageStyle(errorInfo.name.hasError)}>{errorInfo.name.errorMessage}</span>
            </ErrorText>
          </NameBox>
          <EmailBox>
            <div className="input_box">
              <Input
                type="text"
                name="email-input"
                value={email}
                onChange={emailHandler}
                placeholder="이메일을 입력하세요."
              />
            </div>
            {errorInfo.email.emailAuth &&
              (isRequestingAuth ? (
                <RequestAuthBox className="input_box">
                  <Input
                    type="password"
                    name="email-auth"
                    value={emailAuth}
                    onChange={emailAuthHandler}
                    placeholder="인증번호"
                  />
                  <button type="button" onClick={checkEmailAuth}>
                    확인
                  </button>
                  <button type="button" onClick={cancelEmailAuth}>
                    취소
                  </button>
                  <div>
                    <span>남은 시간: {count}</span>
                  </div>
                </RequestAuthBox>
              ) : (
                <div className="email_err_message">
                  <button onClick={requestEmailAuthNum}>인증 요청</button>
                </div>
              ))}
            <ErrorText>
              <span style={correctMessageStyle(errorInfo.email.hasError)}>{errorInfo.email.errorMessage}</span>
            </ErrorText>
          </EmailBox>
          <PasswordBox>
            <div className="wrap_password_input">
              <div className="input_box">
                <Input
                  type={checked ? 'text' : 'password'}
                  name="password-input"
                  value={password}
                  onChange={passwordHandler}
                  placeholder="비밀번호를 입력하세요."
                />
                <Input
                  type={checked ? 'text' : 'password'}
                  name="password-check"
                  value={passwordCheck}
                  onChange={passwordCheckHandler}
                  placeholder="한 번 더 입력하세요."
                />
              </div>
              <ErrorText>
                <span style={correctMessageStyle(errorInfo.password.hasError)}>{errorInfo.password.errorMessage}</span>
              </ErrorText>
            </div>
            <PasswordShowCheckBox onClick={checkHandler}>
              <input type="checkbox" name="show-password" checked={checked} readOnly />
              비밀번호 표시
            </PasswordShowCheckBox>
          </PasswordBox>
          <SubmitBox>
            <Link to={'/login'}>로그인 화면으로 이동</Link>
            <button type="button" onClick={handleSubmit}>
              제출
            </button>
          </SubmitBox>
        </InputContainer>
      </UserInfoInputBox>
    </div>
  );
};

export default SignUp;
