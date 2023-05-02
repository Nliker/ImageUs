import React, { useRef, useState } from 'react';
import useSWR from 'swr';
import { NavLink, useNavigate } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import { RiShutDownLine } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';
import { CgUserList } from 'react-icons/cg';
import { HiOutlineHome } from 'react-icons/hi';
import { MdOutlineManageAccounts } from 'react-icons/md';

import { Container, NavItem, NavList, Wrapper } from './styles';
import { TbListDetails } from 'react-icons/tb';
import useModal from '@hooks/useModal';

const NavigationBar = () => {
  const navigate = useNavigate();

  const { data: userInfo, mutate: upadateUserState } = useSWR('/user/my');
  const { showAlertModal } = useModal();

  const [clickLogoutIcon, setClickLogoutIcon] = useState<boolean>(false);
  const userInfoEl = useRef<HTMLDivElement>(null);

  const MobileNav = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 1023 });
    return isMobile ? children : null;
  };

  const DeskTopNav = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    return isDesktop ? children : null;
  };

  const onClickLogOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const executeWork = async () => {
      await upadateUserState({ logInState: 'LoggingOut' });
      sessionStorage.clear();
      navigate('/');
    };

    showAlertModal({
      text: '로그아웃 하시겠습니까?',
      executeWork,
    });
  };

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
              <div className="logout_icon" onClick={onClickLogOut}>
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
          {}
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
          <div className="logout_icon" onClick={onClickLogOut}>
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
