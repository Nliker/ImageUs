import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { NavLink, useNavigate } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import { RiShutDownLine } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';
import { CgUserList } from 'react-icons/cg';
import { HiOutlineHome } from 'react-icons/hi';
import { MdOutlineManageAccounts } from 'react-icons/md';

import { Button } from '@styles/Button';
import {
  BottomContainer,
  LogoutBtn,
  NavItem,
  NavList,
  UserBox,
  UserInfo,
  Wrapper,
} from './styles';

const NavigationBar = () => {
  const navigate = useNavigate();

  const { data: userInfo, mutate: upadateUserState } = useSWR('/user/my');

  const [clickUserIcon, setClickUserIcon] = useState<boolean>(false);
  const [hoverUserIcon, setHoverUserIcon] = useState<boolean>(false);
  const userInfoEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('click', userIconBoxHandler, { capture: true });

    return () => {
      window.removeEventListener('click', userIconBoxHandler);
    };
  }, []);

  const MobileNav = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 1023 });
    return isMobile ? children : null;
  };

  const DeskTopNav = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    return isDesktop ? children : null;
  };

  const userIconBoxHandler = (e: MouseEvent) => {
    if (
      e.target instanceof HTMLElement &&
      !userInfoEl.current?.contains(e.target)
    ) {
      setClickUserIcon(false);
      setHoverUserIcon(false);
    }
  };

  const onMouseEnterUserIcon = useCallback(() => {
    if (clickUserIcon) return;
    setHoverUserIcon(true);
  }, [hoverUserIcon, clickUserIcon]);

  const onMouseLeaveUserIcon = useCallback(() => {
    if (clickUserIcon) return;
    setHoverUserIcon(false);
  }, [hoverUserIcon, clickUserIcon]);

  const onClickLogOut = async () => {
    sessionStorage.clear();
    upadateUserState({ logInState: 'LoggingOut' }).then(async () => {
      navigate('/');
    });
  };

  return (
    <Wrapper>
      <BottomContainer>
        <MobileNav>
          <NavList>
            <NavItem>
              <NavLink to={'/my_page'} className="nav_item">
                <MdOutlineManageAccounts />
                마이 페이지
              </NavLink>
            </NavItem>
            <NavItem>
              <h1>
                <NavLink to={'/'}>
                  <HiOutlineHome />
                  ImageUs
                </NavLink>
              </h1>
            </NavItem>
            <NavItem>
              <NavLink to={'/people_management'} className="nav_item">
                <CgUserList />
                친구목록
              </NavLink>
            </NavItem>
          </NavList>
          <div
            className="user_icon_d"
            onMouseEnter={onMouseEnterUserIcon}
            onMouseLeave={onMouseLeaveUserIcon}
            onClick={() => setClickUserIcon((prev) => !prev)}
          >
            <IconContext.Provider
              value={{
                size: '18px',
                style: { display: 'inline-block', margin: 0 },
              }}
            >
              <RiShutDownLine />
            </IconContext.Provider>
            {(clickUserIcon || hoverUserIcon) && (
              <UserBox ref={userInfoEl}>
                <UserInfo>
                  <div className={'info_words'}>
                    <p>
                      <strong>{userInfo.userInfo?.name ?? 'loading..'}</strong>{' '}
                      님 어서오세요!
                    </p>
                    <p>
                      <strong>email:</strong>{' '}
                      {userInfo.userInfo?.email ?? '로딩중입니다..'}
                    </p>
                  </div>
                </UserInfo>
                <LogoutBtn>
                  <Button
                    className="error"
                    type="button"
                    onClick={onClickLogOut}
                  >
                    로그아웃
                  </Button>
                </LogoutBtn>
              </UserBox>
            )}
          </div>
        </MobileNav>
        <DeskTopNav>
          <NavList>
            <NavItem>
              <h1>
                <NavLink to={'/'}>
                  <HiOutlineHome />
                  ImageUs
                </NavLink>
              </h1>
            </NavItem>
            <NavItem>
              <NavLink to={'/my_page'} className="navigate_link">
                마이 페이지
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={'/people_management'} className="navigate_link">
                친구목록
              </NavLink>
            </NavItem>
          </NavList>
          <div
            className="user_icon_d"
            onMouseEnter={onMouseEnterUserIcon}
            onMouseLeave={onMouseLeaveUserIcon}
            onClick={() => setClickUserIcon((prev) => !prev)}
          >
            <IconContext.Provider
              value={{
                size: '18px',
                style: { display: 'inline-block', margin: 0 },
              }}
            >
              <RiShutDownLine />
            </IconContext.Provider>
            {(clickUserIcon || hoverUserIcon) && (
              <UserBox ref={userInfoEl}>
                <UserInfo>
                  <div className={'info_words'}>
                    <p>
                      <strong>{userInfo.userInfo?.name ?? 'loading..'}</strong>{' '}
                      님 어서오세요!
                    </p>
                    <p>
                      <strong>email:</strong>{' '}
                      {userInfo.userInfo?.email ?? '로딩중입니다..'}
                    </p>
                  </div>
                </UserInfo>
                <LogoutBtn>
                  <Button
                    className="error"
                    type="button"
                    onClick={onClickLogOut}
                  >
                    로그아웃
                  </Button>
                </LogoutBtn>
              </UserBox>
            )}
          </div>
        </DeskTopNav>
      </BottomContainer>
    </Wrapper>
  );
};

export default NavigationBar;
