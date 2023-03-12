import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { NavLink, useNavigate } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import { BiUserCircle } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
import { CgUserList } from 'react-icons/cg';
import { HiOutlineHome } from 'react-icons/hi';
import { MdOutlineManageAccounts } from 'react-icons/md';

import { Button } from '@styles/Button';
import {
  BottomContainer,
  LogoutBtn,
  MobileNavItem,
  MobileNavList,
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
    window.addEventListener('click', userIconBoxHandler);

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
          <MobileNavList>
            <MobileNavItem>
              <NavLink to={'/my_page'} className="nav_item">
                <MdOutlineManageAccounts />
                마이 페이지
              </NavLink>
            </MobileNavItem>
            <MobileNavItem>
              <h1>
                <NavLink to={'/'}>
                  <HiOutlineHome />
                  ImageUs
                </NavLink>
              </h1>
            </MobileNavItem>
            <MobileNavItem>
              <NavLink to={'/people_management'} className="nav_item">
                <CgUserList />
                친구목록
              </NavLink>
            </MobileNavItem>
          </MobileNavList>
        </MobileNav>
        <DeskTopNav>
          <MobileNavList>
            <MobileNavItem>
              <h1>
                <NavLink to={'/'}>
                  <HiOutlineHome />
                  ImageUs
                </NavLink>
              </h1>
            </MobileNavItem>
            <MobileNavItem>
              <NavLink to={'/my_page'} className="navigate_link">
                마이 페이지
              </NavLink>
            </MobileNavItem>
            <MobileNavItem>
              <NavLink to={'/people_management'} className="navigate_link">
                친구목록
              </NavLink>
            </MobileNavItem>
          </MobileNavList>
        </DeskTopNav>
        <div className="user_icon">
          <div
            className="user_icon_d"
            onMouseEnter={onMouseEnterUserIcon}
            onMouseLeave={onMouseLeaveUserIcon}
          >
            <span
              className="user_icon_s"
              onClick={() => setClickUserIcon((prev) => !prev)}
            >
              <IconContext.Provider
                value={{
                  size: '100%',
                  style: { display: 'inline-block' },
                }}
              >
                <BiUserCircle />
              </IconContext.Provider>
            </span>
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
        </div>
      </BottomContainer>
    </Wrapper>
  );
};

export default NavigationBar;
