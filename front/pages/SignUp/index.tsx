import UserInfoInputBox from '@components/UserInfoInputBox';
import { InputBox } from '@components/UserInfoInputBox/styles';
import useInput from '@hooks/useInput';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { ErrorText, InputContainer, PasswordCheckBox, SubmitBox } from './styles';

interface ErrorMessage {
  nameError: string;
  emailError: string;
  pwError: string;
  pwCheck: string;
}

const SignUp = () => {
  const [checked, setChecked] = useState<boolean>(false);
  // const [hasError, setHasError] = useState<boolean | null>(true);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    nameError: '이름을 입력해주세요.',
    emailError: '이메일을 입력해주세요.',
    pwError: '비밀번호를 입력해주세요.',
    pwCheck: '',
  });
  const [name, setName, nameHandler] = useInput('');
  const [email, setEmail, emailHandler] = useInput('');
  const [pw, setPw, pwHandler] = useInput('');
  const [pwCheck, setPwCheck, pwCheckHandler] = useInput('');
  const emailRegex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  );

  const checkHandler = useCallback(() => {
    return setChecked((prev) => !prev);
  }, []);
  // console.log(hasError);
  useEffect(() => {
    // console.log(name);
    if (!name) {
      // setHasError(true);
      setErrorMessage((prev) => ({
        ...prev,
        nameError: '이름을 입력해주세요.',
      }));
      return;
    }
    // setHasError(false);
    setErrorMessage((prev) => ({
      ...prev,
      nameError: '',
    }));
  }, [name]);

  useEffect(() => {
    if (!email) {
      // setHasError(true);
      setErrorMessage((prev) => ({
        ...prev,
        emailError: '이메일을 입력해주세요.',
      }));
      return;
    } else if (!emailRegex.test(email)) {
      // setHasError(true);
      setErrorMessage((prev) => ({
        ...prev,
        emailError: '이메일 형식에 맞지 않습니다.',
      }));
      return;
    }
    // setHasError(false);
    setErrorMessage((prev) => ({
      ...prev,
      emailError: '',
    }));
  }, [email]);

  useEffect(() => {
    // console.log(pw, errorMessage);
    if (!pw) {
      // setHasError(true);
      setErrorMessage((prev) => ({
        ...prev,
        pwError: '비밀번호를 입력해주세요.',
      }));
      return;
    } else if (pw.length < 8) {
      // setHasError(true);
      setErrorMessage((prev) => ({
        ...prev,
        pwError: '비밀번호는 8자리 이상입니다.',
      }));
      return;
    }
    setErrorMessage((prev) => ({
      ...prev,
      pwError: '',
    }));
    if (pw !== pwCheck) {
      // setHasError(true);
      setErrorMessage((prev) => ({
        ...prev,
        pwCheck: '비밀번호가 일치하지 않습니다.',
      }));
      return;
    }
    setErrorMessage((prev) => ({
      ...prev,
      pwCheck: '',
    }));
    // setHasError(false);
  }, [pw, pwCheck]);

  const checkErrorValue = () => {
    for (const key in errorMessage) {
      if (errorMessage[key as keyof ErrorMessage] !== '') {
        // setHasError(true);
        return true;
      }
    }
    // setHasError(false);
    return false;
  };

  const handleSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      const hasError = checkErrorValue();
      // setHasError(checkErrorValue());
      console.log(hasError, errorMessage);
      if (hasError) {
        alert('양식을 다시 확인해 주세요.');
        return;
      }
      // axios 요청
      console.log('axios 요청');
    },
    [checkErrorValue, errorMessage],
  );

  return (
    <div>
      <UserInfoInputBox pageName={'회원가입'}>
        <InputContainer>
          <form onSubmit={handleSubmit}>
            <InputBox>
              <label htmlFor="name-input">
                {/* <span>이름을 입력하세요.</span> */}
                <div>
                  <input
                    type="text"
                    name="name-input"
                    value={name}
                    onChange={nameHandler}
                    placeholder="이름을 입력하세요."
                  />
                </div>
                <ErrorText>{errorMessage.nameError}</ErrorText>
              </label>
            </InputBox>
            <InputBox>
              <label htmlFor="email-input">
                {/* <span>이메일을 입력하세요.</span> */}
                <div>
                  <input
                    type="text"
                    name="email-input"
                    value={email}
                    onChange={emailHandler}
                    placeholder="이메일을 입력하세요."
                  />
                </div>
                <ErrorText>{errorMessage.emailError}</ErrorText>
              </label>
            </InputBox>
            <InputBox>
              <label htmlFor="pw-input">
                {/* <span>비밀번호를 입력하세요.</span> */}
                <div>
                  <input
                    type={checked ? 'text' : 'password'}
                    name="pw-input"
                    value={pw}
                    onChange={pwHandler}
                    placeholder="비밀번호를 입력하세요."
                  />
                </div>
                <ErrorText>{errorMessage.pwError}</ErrorText>
              </label>
              <label htmlFor="pw-check">
                {/* <span>비밀번호 확인</span> */}
                <div>
                  <input
                    type={checked ? 'text' : 'password'}
                    name="pw-check"
                    value={pwCheck}
                    onChange={pwCheckHandler}
                    placeholder="비밀번호를 한 번 더 입력하세요."
                  />
                </div>
                <ErrorText>{errorMessage.pwCheck}</ErrorText>
              </label>
              <PasswordCheckBox>
                <label htmlFor="show-pw" className="pwcheck-label" onClick={checkHandler}>
                  <input type="checkbox" name="show-pw" checked={checked} readOnly />
                  비밀번호 표시
                </label>
              </PasswordCheckBox>
            </InputBox>
            <SubmitBox>
              <button type="submit">제출</button>
            </SubmitBox>
          </form>
        </InputContainer>
      </UserInfoInputBox>
    </div>
  );
};

export default SignUp;
