import React, { useEffect, useRef, useState } from 'react';
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
  Container,
  LogoutBtn,
  NavItem,
  NavList,
  UserBox,
  UserInfo,
  Wrapper,
} from './styles';
import { TbListDetails } from 'react-icons/tb';

const NavigationBar = () => {
  const navigate = useNavigate();

  const { data: userInfo, mutate: upadateUserState } = useSWR('/user/my');

  const [clickLogoutIcon, setClickLogoutIcon] = useState<boolean>(false);
  const userInfoEl = useRef<HTMLDivElement>(null);
  const logoutBoxRef = useRef<HTMLDivElement>(null);

  const userIconBoxHandler = (e: MouseEvent) => {
    if (
      e.target instanceof (HTMLElement || SVGAElement) &&
      !userInfoEl.current?.contains(e.target) &&
      !logoutBoxRef.current?.contains(e.target)
    ) {
      setClickLogoutIcon(false);
    }
  };

  const MobileNav = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 1023 });
    return isMobile ? children : null;
  };

  const DeskTopNav = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    return isDesktop ? children : null;
  };

  const onClickLogOut = async () => {
    sessionStorage.clear();
    upadateUserState({ logInState: 'LoggingOut' }).then(async () => {
      navigate('/');
    });
  };

  const onClickLogoutBox = (e: React.MouseEvent<HTMLDivElement>) => {
    if (userInfoEl.current?.contains(e.target as HTMLElement)) return;

    setClickLogoutIcon((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener('click', userIconBoxHandler, { capture: true });

    return () => {
      window.removeEventListener('click', userIconBoxHandler);
    };
  }, []);

  return (
    <Wrapper>
      <Container>
        <MobileNav>
          <NavList>
            <NavItem className="link_item">
              <NavLink to={'/my_page'} className="nav_link" />
              <span className="nav_icon">
                <IconContext.Provider
                  value={{
                    size: '25px',
                  }}
                >
                  <MdOutlineManageAccounts />
                </IconContext.Provider>
              </span>
              <span>마이 페이지</span>
            </NavItem>
            <NavItem className="link_item">
              <NavLink to={'/select-room'} className="nav_link" />
              <span className="nav_icon">
                <IconContext.Provider
                  value={{
                    size: '25px',
                  }}
                >
                  <TbListDetails />
                </IconContext.Provider>
              </span>
              <span>방 목록</span>
            </NavItem>
            <NavItem className="home">
              <span className="nav_icon">
                <IconContext.Provider
                  value={{
                    size: '25px',
                  }}
                >
                  <HiOutlineHome />
                </IconContext.Provider>
              </span>
              <span>ImageUs</span>
            </NavItem>
            <NavItem className="link_item">
              <NavLink to={'/people_management'} className="nav_link" />
              <span className="nav_icon">
                <IconContext.Provider
                  value={{
                    size: '25px',
                  }}
                >
                  <CgUserList />
                </IconContext.Provider>
              </span>
              <span>친구목록</span>
            </NavItem>
            <NavItem>
              <div
                className="logout_icon"
                onClick={onClickLogoutBox}
                ref={logoutBoxRef}
              >
                <IconContext.Provider
                  value={{
                    size: '25px',
                  }}
                >
                  <RiShutDownLine />
                </IconContext.Provider>
                <span>로그아웃</span>
              </div>
            </NavItem>
          </NavList>
          {/* <div
            className="user_icon_d"
            onClick={onClickLogoutBox}
            ref={logoutBoxRef}
          >
            <IconContext.Provider
              value={{
                size: '18px',
                style: { display: 'inline-block', margin: 0 },
              }}
            >
              <RiShutDownLine />
            </IconContext.Provider>
            {clickLogoutIcon && (
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
          </div> */}
        </MobileNav>
        <DeskTopNav>
          <div className="home">
            <IconContext.Provider
              value={{
                size: '2.5rem',
              }}
            >
              <HiOutlineHome />
            </IconContext.Provider>
            <span>ImageUs</span>
          </div>
          <NavList>
            <NavItem className="link_item">
              <NavLink to={'/select-room'} className="nav_link" />
              <span>방 목록</span>
            </NavItem>
            <NavItem className="link_item">
              <NavLink to={'/my_page'} className="nav_link" />
              <span>마이 페이지</span>
            </NavItem>
            <NavItem className="link_item">
              <NavLink to={'/people_management'} className="nav_link" />
              <span>친구목록</span>
            </NavItem>
          </NavList>
          <div
            className="logout_icon"
            onClick={onClickLogoutBox}
            ref={logoutBoxRef}
          >
            <IconContext.Provider
              value={{
                size: '25px',
              }}
            >
              <RiShutDownLine />
            </IconContext.Provider>
            <span>로그아웃</span>
          </div>
        </DeskTopNav>
      </Container>
    </Wrapper>
  );
};

export default NavigationBar;
