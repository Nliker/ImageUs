import React, { useCallback, useState } from 'react';
import { LeftIcon, LogoutBtn, RightIcons, UserBox, UserInfo, Wrapper } from './styles';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { RiListSettingsLine } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import logInFetcher from '@utils/logInFetcher';

interface Props {
  handleRoomListBtn: (e: any) => void;
}

const ToolBar = ({ handleRoomListBtn }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const [showUserBox, setShowUserBox] = useState(false);
  const navigate = useNavigate();

  const handleUserBox = useCallback(() => setShowUserBox((prev) => !prev), []);

  const onClickLogOut = useCallback(() => {
    sessionStorage.clear();
    // mutate();
    navigate('/');
  }, []);
  
  return (
    <Wrapper>
      <LeftIcon className='toolbar_icon'>
        {/* <SideBarButton>{isMobile && <MdOutlineSpaceDashboard onClick={handleRoomListBtn} />}</SideBarButton> */}
        <span>
          <MdOutlineSpaceDashboard onClick={handleRoomListBtn} />
        </span>
      </LeftIcon>
      <RightIcons className='toolbar_icon'>
        <div>
          <span>
            <RiListSettingsLine />
          </span>
        </div>
        <div>
          <span onClick={handleUserBox}>
            <BiUserCircle />
          </span>
        </div>
      </RightIcons>
      {showUserBox && <UserBox>
        <UserInfo>
          <img src="image_test.png" alt="test_img" />
          <div className={'info_words'}>
            <p>
              <span>이름</span>님 어서오세요!
            </p>
            {/* <p>email: </p> */}
            <p>asdfaskla@naver.com</p>
          </div>
        </UserInfo>
        <LogoutBtn>
          <span onClick={onClickLogOut}>로그아웃</span>
        </LogoutBtn>
      </UserBox>}
    </Wrapper>
  );
};

export default ToolBar;
