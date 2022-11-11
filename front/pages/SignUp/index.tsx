import UserInfoInputBox from '@components/UserInfoInputBox';
import { InputBox } from '@components/UserInfoInputBox/styles';
import React, { useCallback, useState } from 'react';
import { InputContainer, PasswordCheckBox } from './styles';

const SignUp = () => {
  const [checked, setChecked] = useState(false);

  const checkHandler = useCallback(() => {
    return setChecked((prev) => !prev);
  }, []);

  return (
    <div>
      <UserInfoInputBox>
        <InputContainer>
          <InputBox>
            <label htmlFor="email-input">이름을 입력하세요.</label>
            <div>
              <input type="text" id="email-input" placeholder="이름을 입력하세요." />
            </div>
          </InputBox>
          <InputBox>
            <label htmlFor="email-input">이메일을 입력하세요.</label>
            <div>
              <input type="text" id="email-input" placeholder="이메일을 입력하세요." />
            </div>
          </InputBox>
          <InputBox>
            <label htmlFor="email-input">비밀번호를 입력하세요.</label>
            <div>
              <input type="text" id="email-input" placeholder="비밀번호를 입력하세요." />
            </div>
            <label htmlFor="email-input">비밀번호 확인</label>
            <div>
              <input type="text" id="email-input" placeholder="비밀번호를 한 번 더 입력하세요." />
            </div>
            <PasswordCheckBox>
              <label htmlFor="show-pw" onClick={checkHandler}>
                <input type="checkbox" checked={checked} readOnly />
                비밀번호 표시
              </label>
            </PasswordCheckBox>
          </InputBox>
        </InputContainer>
      </UserInfoInputBox>
    </div>
  );
};

export default SignUp;
