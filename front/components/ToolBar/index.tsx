import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  LeaveRoom,
  LeftIcon,
  LogoutBtn,
  RightIcons,
  LeaveBox,
  UserBox,
  UserInfo,
  Wrapper,
  IconBox,
} from './styles';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { RiListSettingsLine } from 'react-icons/ri';
import { TbDoorExit } from 'react-icons/tb';
import { BiUserCircle } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import { logInCheckFetcher } from '@utils/logInFetcher';
import { Link } from 'react-router-dom';
import { Node } from 'typescript';
import { useParams } from 'react-router';
import { leaveRoomFetcher } from '@utils/roomDataFetcher';
import { AxiosError } from 'axios';
import { Button } from '@styles/Button';

interface Props {
  handleSidebar?: (e: any) => void;
  isImageRoom?: boolean;
}

const ToolBar = ({ handleSidebar, isImageRoom }: Props) => {
  const { data: logInInfo } = useSWR('/user/my');
  const [clickUserIcon, setClickUserIcon] = useState<boolean>(false);
  const [hoverUserIcon, setHoverUserIcon] = useState<boolean>(false);
  const [clickDoorIcon, setClickDoorIcon] = useState<boolean>(false);
  const [hoverDoorIcon, setHoverDoorIcon] = useState<boolean>(false);
  const userInfoEl = useRef<HTMLDivElement>(null);
  const roomSettingEl = useRef<HTMLDivElement>(null);
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  useEffect(() => {
    window.addEventListener('click', handleCloseBox);
    return () => {
      window.removeEventListener('click', handleCloseBox);
    };
  }, [clickUserIcon, clickDoorIcon]);

  const handleCloseBox = useCallback(
    (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        clickUserIcon &&
        !userInfoEl.current?.contains(e.target)
      ) {
        setClickUserIcon(false);
        setHoverUserIcon(false);
      }

      if (
        e.target instanceof HTMLElement &&
        clickDoorIcon &&
        !roomSettingEl.current?.contains(e.target)
      ) {
        setClickDoorIcon(false);
        setHoverDoorIcon(false);
      }
    },
    [clickUserIcon, clickDoorIcon],
  );

  const onClickLeaveIcon = useCallback(
    () => setClickDoorIcon((prev) => !prev),
    [clickDoorIcon],
  );

  const onMouseEnterDoorIcon = useCallback(() => {
    if (clickDoorIcon) return;
    setHoverDoorIcon(true);
  }, [hoverDoorIcon, clickDoorIcon]);

  const onMouseLeaveDoorIcon = useCallback(() => {
    if (clickDoorIcon) return;
    setHoverDoorIcon(false);
  }, [hoverDoorIcon, clickDoorIcon]);

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

  const onClickUserIcon = useCallback(
    () => setClickUserIcon((prev) => !prev),
    [clickUserIcon],
  );

  const onMouseEnterUserIcon = useCallback(() => {
    if (clickUserIcon) return;
    setHoverUserIcon(true);
  }, [hoverUserIcon, clickUserIcon]);

  const onMouseLeaveUserIcon = useCallback(() => {
    if (clickUserIcon) return;
    setHoverUserIcon(false);
  }, [hoverUserIcon, clickUserIcon]);

  const onClickLogOut = useCallback(() => {
    sessionStorage.clear();
    mutate('/user/my');
    navigate('/');
  }, []);

  return (
    <Wrapper isImageRoom={isImageRoom}>
      {logInInfo.logInState ? (
        <>
          {isImageRoom && (
            <LeftIcon className="toolbar_icon">
              <div>
                <span>
                  <MdOutlineSpaceDashboard onClick={handleSidebar} />
                </span>
              </div>
              <div>
                <span
                  onClick={onClickLeaveIcon}
                  onMouseEnter={onMouseEnterDoorIcon}
                  onMouseLeave={onMouseLeaveDoorIcon}
                >
                  <TbDoorExit />
                </span>
              </div>
              {(clickDoorIcon || hoverDoorIcon) && (
                <LeaveBox ref={roomSettingEl}>
                  <p className="leave_room" onClick={onClickLeaveBtn}>
                    방에서 나가기
                  </p>
                </LeaveBox>
              )}
            </LeftIcon>
          )}
          <RightIcons className="toolbar_icon">
            <div>
              <span
                onClick={onClickUserIcon}
                onMouseEnter={onMouseEnterUserIcon}
                onMouseLeave={onMouseLeaveUserIcon}
              >
                <BiUserCircle />
              </span>
            </div>
            {(clickUserIcon || hoverUserIcon) && (
              <UserBox ref={userInfoEl}>
                <UserInfo>
                  <div className={'info_words'}>
                    <p>
                      <strong>{logInInfo.user_info.name}</strong> 님 어서오세요!
                    </p>
                    <p>
                      <strong>email:</strong> {logInInfo.user_info.email}
                    </p>
                  </div>
                </UserInfo>
                <LogoutBtn>
                  <Button
                    className="error"
                    type="button"
                    onClick={onClickLogOut}
                  >
                    로그아웃
                  </Button>
                </LogoutBtn>
              </UserBox>
            )}
          </RightIcons>
        </>
      ) : (
        <div className="action_box">
          <Link to={'/login'}>로그인</Link>
          <Link to={'/signup'}>회원가입</Link>
        </div>
      )}
    </Wrapper>
  );
};

export default memo(ToolBar);
