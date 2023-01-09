import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LeftIcon, LogoutBtn, RightIcons, UserBox, UserInfo, Wrapper } from './styles';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { RiListSettingsLine } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import logInFetcher from '@utils/logInFetcher';
import { Link } from 'react-router-dom';
import { Node } from 'typescript';

interface Props {
  handleRoomListBtn: (e: any) => void;
  isLogIn?: boolean;
  roomId?: string;
}

const ToolBar = ({ handleRoomListBtn, isLogIn, roomId }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const [showUserBox, setShowUserBox] = useState<boolean | null>(null);
  const el = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('click', handleCloseUserBox);
    return () => {
      window.removeEventListener('click', handleCloseUserBox);
    };
  }, [showUserBox]);

  const handleClickUserBox = useCallback(() => setShowUserBox(true), [showUserBox]);

  const handleCloseUserBox = useCallback(
    (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && showUserBox && !el.current?.contains(e.target)) setShowUserBox(false);
    },
    [showUserBox],
  );

  const onClickLogOut = useCallback(() => {
    sessionStorage.clear();
    mutate('/user/my');
    navigate('/');
  }, []);

  return (
    <Wrapper>
      {isLogIn ? (
        <>
          <RightIcons className="toolbar_icon">
            {/* <div>
              <span>
                <RiListSettingsLine />
              </span>
            </div> */}
            <div>
              <span onClick={handleClickUserBox}>
                <BiUserCircle />
              </span>
            </div>
          </RightIcons>
          {roomId && (
            <LeftIcon className="toolbar_icon">
              <span>
                <MdOutlineSpaceDashboard onClick={handleRoomListBtn} />
              </span>
            </LeftIcon>
          )}
        </>
      ) : (
        <div className="action_box">
          <Link to={'/login'}>로그인</Link>
          <Link to={'/signup'}>회원가입</Link>
        </div>
      )}

      {/* 로그아웃 상자 토글 버튼 */}
      {showUserBox && (
        <UserBox ref={el}>
          <UserInfo>
            {/* <img src="image_test.png" alt="test_img" /> */}
            <div className={'info_words'}>
              <p>
                <span>이름</span>님 어서오세요!
              </p>
              <p>asdfaskla@naver.com</p>
            </div>
          </UserInfo>
          <LogoutBtn>
            <span onClick={onClickLogOut}>로그아웃</span>
          </LogoutBtn>
        </UserBox>
      )}
    </Wrapper>
  );
};

export default ToolBar;
