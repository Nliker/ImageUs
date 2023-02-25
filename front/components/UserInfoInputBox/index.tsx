import React from 'react';
import { IconContext } from 'react-icons/lib';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { NavLink } from 'react-router-dom';
import { InnerContainer, OuterContainer, Wrapper } from './styles';

interface InputBoxProps {
  children?: React.ReactNode;
  pageName?: string;
}

const UserInfoInputBox = ({ children, pageName }: InputBoxProps) => {
  return (
    <Wrapper>
      <OuterContainer>
        <h1>{pageName}</h1>
        <InnerContainer>{children}</InnerContainer>
        {/* <div className="social_sign-in_box">
          <hr className="social_sign-in_line" />
          <span className="social_sign-in_title">간편 로그인</span>
          <div className="social_icon_box">
            <a
              href={`/oauth-login?coperation=kakao`}
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
              href="/oauth-login?coperation=naver"
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
        </div> */}
      </OuterContainer>
    </Wrapper>
  );
};

export default UserInfoInputBox;
