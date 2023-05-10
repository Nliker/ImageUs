import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@styles/Button';
import { BackgroundImg } from '@assets/image';
import { MainContainer, MainIntroduction } from './styles';

const Intro = () => {
  return (
    <MainContainer>
      <MainIntroduction>
        <div className="main_background">
          <article className="main_page_article">
            <h1 className="main_page_intro">
              지인들과의 사진을 <br />
              <span className="brand_logo">ImageUS</span>와
              <br /> 공유하고 간직하세요!
            </h1>
          </article>
          <div className="btn_group">
            <NavLink to={'/login'}>
              <Button>로그인 하기</Button>
            </NavLink>
            <NavLink to={'/signup'}>
              <Button>회원가입 하기</Button>
            </NavLink>
          </div>
          <BackgroundImg />
        </div>
      </MainIntroduction>
    </MainContainer>
  );
};

export default Intro;
