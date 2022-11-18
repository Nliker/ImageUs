import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DesktopContainer, NavItem, NavList, Wrapper } from './pc_styles';
import { HiOutlineHome } from 'react-icons/hi';
import { BsPeople, BsListUl } from 'react-icons/bs';
import { RiFilter2Line } from 'react-icons/ri';
import { IoPeopleCircleSharp } from 'react-icons/io5';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { MobileBtnDiv, MobileButton, MobileContainer, TopContainer } from './mobile_styles';
import { useMediaQuery } from 'react-responsive';

const TopNavBar = () => {
  const DesktopNav = ({ children }: any) => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });
    return isDesktop ? children : null;
  };
  const MobileNav = ({ children }: any) => {
    const isMobile = useMediaQuery({ maxWidth: 1023 });
    return isMobile ? children : null;
  };
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const onClickUserProfile = useCallback((e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
  }, []);

  return (
    <Wrapper>
      <DesktopNav>
        <DesktopContainer>
          <h1>
            <NavLink to={'/main_page'}>
              <HiOutlineHome />
              Cloudy
            </NavLink>
          </h1>
          <NavList>
            <NavItem>
              <NavLink to={'/my_page'}>
                <MdOutlineManageAccounts />
                마이 페이지
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={'/magnagement_page'}>
                <BsPeople />
                친구목록 관리
              </NavLink>
            </NavItem>
          </NavList>
          {/* <ProfileIconWrapper>
            <span>
              <button onClick={onClickUserProfile}>프로필 이미지</button>
            </span>
            {showUserMenu && <Menu show={showUserMenu} onCloseModal={onClickUserProfile}></Menu>}
          </ProfileIconWrapper> */}
        </DesktopContainer>
      </DesktopNav>
      {/* <MobileNav>
        <MobileContainer>
          <TopContainer>
            <div>
              <h1>
                <NavLink to={'/main_page'}>
                  <HiOutlineHome />
                  Cloudy
                </NavLink>
              </h1>
            </div>
          </TopContainer>
        </MobileContainer>
      </MobileNav> */}
    </Wrapper>
  );
};

export default TopNavBar;
