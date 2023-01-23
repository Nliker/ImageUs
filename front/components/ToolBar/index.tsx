import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  LeaveRoom,
  LeftIcon,
  LogoutBtn,
  RightIcons,
  SettingBox,
  UserBox,
  UserInfo,
  Wrapper,
} from './styles';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { RiListSettingsLine } from 'react-icons/ri';
import { BiUserCircle } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import { logInCheckFetcher } from '@utils/logInFetcher';
import { Link } from 'react-router-dom';
import { Node } from 'typescript';
import { useParams } from 'react-router';
import { leaveRoomFetcher } from '@utils/roomDataFetcher';
import { AxiosError } from 'axios';

interface Props {
  handleSidebar?: (e: any) => void;
}

const ToolBar = ({ handleSidebar }: Props) => {
  const { data: isLogIn } = useSWR('/user/my');
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const [showUserBox, setShowUserBox] = useState<boolean | null>(null);
  const [showSettingBox, setShowSettingBox] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const userInfoEl = useRef<HTMLDivElement>(null);
  const roomSettingEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('click', handleCloseBox);
    return () => {
      window.removeEventListener('click', handleCloseBox);
    };
  }, [showUserBox, showSettingBox]);

  const handleCloseBox = useCallback(
    (e: MouseEvent) => {
      if (
        (e.target instanceof HTMLElement || e.target instanceof SVGElement) &&
        showUserBox &&
        !userInfoEl.current?.contains(e.target)
      ) {
        setShowUserBox(false);
      }

      if (
        (e.target instanceof HTMLElement || e.target instanceof SVGElement) &&
        showSettingBox &&
        !roomSettingEl.current?.contains(e.target)
      ) {
        setShowSettingBox(false);
      }
    },
    [showUserBox, showSettingBox],
  );

  const onClickSettingBtn = useCallback(
    () => setShowSettingBox(true),
    [showSettingBox],
  );

  const onClickUserBtn = useCallback(() => setShowUserBox(true), [showUserBox]);

  const onClickLogOut = useCallback(() => {
    sessionStorage.clear();
    mutate('/user/my', false);
    navigate('/');
  }, []);

  const onClickLeaveBtn = useCallback(() => {
    if (!roomId) {
      alert('올바르지 못한 접속입니다.');
      navigate('/');
      return;
    }
    leaveRoomFetcher(roomId)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          alert(err.response?.data);
        }
        alert('오류가 발생하였습니다..');
      });
  }, []);

  return (
    <Wrapper>
      {isLogIn ? (
        <>
          <RightIcons className="toolbar_icon">
            <div>
              <span onClick={onClickSettingBtn}>
                <RiListSettingsLine />
              </span>
            </div>
            <div>
              <span onClick={onClickUserBtn}>
                <BiUserCircle />
              </span>
            </div>
          </RightIcons>
          {roomId && (
            <LeftIcon className="toolbar_icon">
              <span>
                <MdOutlineSpaceDashboard onClick={handleSidebar} />
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
        <UserBox ref={userInfoEl}>
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

      {showSettingBox && (
        <SettingBox ref={roomSettingEl}>
          <div className="leave_room" onClick={onClickLeaveBtn}>
            <span>방에서 나가기</span>
          </div>
        </SettingBox>
      )}
    </Wrapper>
  );
};

export default memo(ToolBar);
