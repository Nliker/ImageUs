import React from 'react';
import { NavLink } from 'react-router-dom';

import Scrollbars from 'react-custom-scrollbars-2';

import { Button } from '@styles/Button';
import { IntroPageCamera } from '@assets/image';
import { MainContainer } from './styles';

const Intro = () => {
  return (
    <MainContainer>
      <Scrollbars>
        <div className="main_background">
          <IntroPageCamera
            style={{
              height: '130px',
            }}
          />
          <h1 className="logo_text">ImageUs</h1>
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
      </Scrollbars>
    </MainContainer>
  );
};

export default Intro;
