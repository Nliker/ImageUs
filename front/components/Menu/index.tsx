import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuWrapper } from './styles';

interface TopMenuProps {
  children?: React.ReactNode;
  show?: boolean;
  // style: CSSProperties;
  onCloseModal: (e: never) => void;
}

const Menu = ({ children, show, onCloseModal }: TopMenuProps) => {
  return (
    <MenuWrapper>
      <div>
        <span>닉네임</span>
        <span>프로필 정보</span>
      </div>
      <div>
        <NavLink to={"/my_page"}>마이 페이지</NavLink>
      </div>
      <div>
        <button>로그아웃</button>
      </div>
    </MenuWrapper>
  );
};

export default Menu;
