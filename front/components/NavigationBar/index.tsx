import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import { RiCameraLensLine, RiShutDownLine } from 'react-icons/ri';
import { IconContext } from 'react-icons/lib';
import { CgUserList } from 'react-icons/cg';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { TbListDetails } from 'react-icons/tb';

import useModal from '@hooks/useModal';
import { Container, NavItem, NavList, Wrapper } from './styles';
import useAuth from '@hooks/useAuth';
import { getErrorMessage } from '@utils/getErrorMessage';

const NavigationBar = () => {
  const navigate = useNavigate();

  const { logOut } = useAuth();
  const { showAlertModal } = useModal();

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
      try {
        navigate('/');
        await logOut();
      } catch (error) {
        const message = getErrorMessage(error);
        alert(message);
      }
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
                    size: '35px',
                  }}
                >
                  <RiCameraLensLine />
                </IconContext.Provider>
              </span>
              {}
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
        </MobileNav>
        <DeskTopNav>
          <div className="home">
            <IconContext.Provider
              value={{
                size: '2.5rem',
              }}
            >
              <RiCameraLensLine />
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
