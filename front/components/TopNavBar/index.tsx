import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DesktopContainer, NavItem, NavList, Wrapper } from './styles';
import { HiOutlineHome } from 'react-icons/hi';
import { BsPeople } from 'react-icons/bs';
import { MdOutlineManageAccounts } from 'react-icons/md';
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

  return (
    <Wrapper>
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
      </DesktopContainer>
    </Wrapper>
  );
};

export default TopNavBar;
