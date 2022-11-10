import React, { useCallback, useState } from 'react';
import { EmailInputBox, InnerContainer, OuterContainer, CheckBox, Wrapper, MoveBox, EmailInputDiv } from './styled';

const LogIn = () => {
  const [checked, setChecked] = useState(false);

  const checkHandler = useCallback(() => {
    console.log(checked);
    return setChecked((prev) => !prev);
  }, []);

  return (
    <Wrapper>
      <OuterContainer>
        <h1>로그인</h1>
        <InnerContainer>
          <EmailInputBox>
            <label htmlFor="email-input">이메일 주소를 입력하세요.</label>
            <EmailInputDiv>
              <input type="text" id="email-input" placeholder="이메일을 입력하세요." />
            </EmailInputDiv>
          </EmailInputBox>
          <CheckBox>
            <label htmlFor="remember-id" onClick={checkHandler}>
              <input type="checkbox" checked={checked} readOnly/>
              로그인 상태 유지하기
            </label>
          </CheckBox>
          <MoveBox>
            <button type="button">계정 만들기</button>
            <button type="button">다음</button>
          </MoveBox>
        </InnerContainer>
      </OuterContainer>
    </Wrapper>
  );
};

export default LogIn;
