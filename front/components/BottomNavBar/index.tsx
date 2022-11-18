import React from 'react';
import { BsPeople } from 'react-icons/bs';
import { HiOutlineHome } from 'react-icons/hi';
import { MdOutlineManageAccounts } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { BottomContainer, MobileNavItem, MobileNavList, Wrapper } from './styles';

const BottomNavBar = () => {
  return (
    <Wrapper>
      <BottomContainer>
        <MobileNavList>
          <MobileNavItem>
            <NavLink to={'/my_page'}>
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
            <NavLink to={'/magnagement_page'}>
              <BsPeople />
              친구목록 관리
            </NavLink>
          </MobileNavItem>
        </MobileNavList>
      </BottomContainer>
    </Wrapper>
  );
};

export default BottomNavBar;