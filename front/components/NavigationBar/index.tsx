import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CgUserList } from 'react-icons/cg';
import { SlCloudUpload } from 'react-icons/sl';
import { HiOutlineHome } from 'react-icons/hi';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import {
  BottomContainer,
  LogoutBtn,
  MobileNavItem,
  MobileNavList,
  UserBox,
  UserInfo,
  Wrapper,
} from './styles';
import useSWR, { useSWRConfig } from 'swr';
import { useMediaQuery } from 'react-responsive';
import { BiUserCircle } from 'react-icons/bi';
import { Button } from '@styles/Button';
import { IconContext } from 'react-icons/lib';

const NavigationBar = () => {
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const { data, mutate: showModalMutate } = useSWR('showModalState');
  const { data: loginInfo } = useSWR('/user/my');

  const [clickUserIcon, setClickUserIcon] = useState<boolean>(false);
  const [hoverUserIcon, setHoverUserIcon] = useState<boolean>(false);
  const userInfoEl = useRef<HTMLDivElement>(null);

  const { mutate } = useSWRConfig();
  const navigate = useNavigate();

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

  const onClickLogOut = useCallback(() => {
    sessionStorage.clear();
    mutate('/user/my');
    navigate('/');
  }, []);

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
                <NavLink to={'/main_page'}>
                  <HiOutlineHome />
                  Cloudy
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
                <NavLink to={'/main_page'}>
                  <HiOutlineHome />
                  Cloudy
                </NavLink>
              </h1>
            </MobileNavItem>
            <MobileNavItem>
              <NavLink to={'/my_page'} className="navigate_link">
                {/* <MdOutlineManageAccounts /> */}
                마이 페이지
              </NavLink>
            </MobileNavItem>
            <MobileNavItem>
              <NavLink to={'/people_management'} className="navigate_link">
                {/* <CgUserList /> */}
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
                      <strong>{loginInfo.user_info.name}</strong> 님 어서오세요!
                    </p>
                    <p>
                      <strong>email:</strong> {loginInfo.user_info.email}
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
