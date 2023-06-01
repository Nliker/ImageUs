import React from 'react';
import { NavLink } from 'react-router-dom';

import { Button } from '@styles/Button';

import { MainContainer, MainIntroduction } from './styles';
import { RiCameraLensLine } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';
import { IntroCloudIcon } from '@assets/image';

const Intro = () => {
  return (
    <MainContainer>
      <MainIntroduction>
        <div className="main_background">
          <div className="main_logo">
            <IconContext.Provider
              value={{
                size: '14vmin',
                color: '#A5B8CE',
              }}
            >
              <RiCameraLensLine />
            </IconContext.Provider>
            <article className="main_page_article">
              <h1 className="main_page_intro">ImageUs</h1>
            </article>
          </div>
          <IntroCloudIcon />
          <div className="btn_group">
            <NavLink to={'/login'}>
              <Button style={{ backgroundColor: '#00A3EC' }}>
                로그인 하기
              </Button>
            </NavLink>
            <NavLink to={'/signup'}>
              <Button style={{ backgroundColor: '#00A3EC' }}>
                회원가입 하기
              </Button>
            </NavLink>
          </div>
        </div>
      </MainIntroduction>
    </MainContainer>
  );
};

export default Intro;
