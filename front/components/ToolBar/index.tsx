import React, { useCallback, useState } from 'react';
import { LeftIcon, LogoutBtn, RightIcons, UserBox, UserInfo, Wrapper } from './styles';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { RiListSettingsLine } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';

interface Props {
  handleRoomListBtn: (e: any) => void;
}

const ToolBar = ({ handleRoomListBtn }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  return (
    <Wrapper>
      <LeftIcon>
        {/* <SideBarButton>{isMobile && <MdOutlineSpaceDashboard onClick={handleRoomListBtn} />}</SideBarButton> */}
        <span>
          <MdOutlineSpaceDashboard onClick={handleRoomListBtn} />
        </span>
      </LeftIcon>
      <RightIcons>
        <div>
          <span>
            <RiListSettingsLine />
          </span>
        </div>
        <div>
          <span>
            <BiUserCircle />
          </span>
        </div>
      </RightIcons>
      <UserBox>
        <UserInfo>
          <img src="image_test.png" alt="test_img" />
          <div className={"info_words"}>
            <p><span>이름</span>님 어서오세요!</p>
            {/* <p>email: </p> */}
            <p>asdfaskla@naver.com</p>
          </div>
        </UserInfo>
        <LogoutBtn><span>로그아웃</span></LogoutBtn>
      </UserBox>
    </Wrapper>
  );
};

export default ToolBar;
