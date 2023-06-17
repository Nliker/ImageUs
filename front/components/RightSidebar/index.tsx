import React, { memo, useRef } from 'react';

import { Scrollbars } from 'react-custom-scrollbars-2';

import { useNavigate, useParams } from 'react-router';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { IconContext } from 'react-icons';
import { FaSignOutAlt } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';

import { useSidebar } from '@hooks/useSidebar';
import SearchBox from '@pages/MyPage/Components/SearchBox';
import { useDeviceMode } from '@hooks/useDeviceMode';
import useUserListByRoom from '@hooks/useUserListByRoom';
import { getErrorMessage } from '@utils/getErrorMessage';
import { DRoomData } from '@typing/db';
import useModal from '@hooks/useModal';
import { CloseIcon, ContentTabs, ContentWrapper, Tab, Wrapper } from './styles';
import MemberList from './MemberList';
import useRoomList from '@hooks/useRoomList';
import { useUserInfo } from '@hooks/useUserInfo';

interface SidebarProps {
  show: boolean;
}

const RightSidebar = memo(({ show }: SidebarProps) => {
  const { roomId } = useParams<{ roomId?: string }>();
  if (!roomId) return null;

  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const { roomList, leaveRoom } = useRoomList(userInfo.id);

  const sidebarContext = useSidebar();
  const { showAlertModal } = useModal();
  const deviceModeContext = useDeviceMode();
  const { userListByRoom, inviteMemberToRoom, kickOutMember } =
    useUserListByRoom(roomId);

  const sideBarEl = useRef<HTMLDivElement>(null);
  const currentRoomData = roomList?.find(
    (data) => '' + data.id === roomId,
  ) as DRoomData;

  const onClickLeaveRoom = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const executeWork = async () => {
      try {
        navigate('/room', { replace: true });
        await leaveRoom('' + currentRoomData.id);
        alert(`${currentRoomData.title}에서 성공적으로 나갔습니다!`);
      } catch (error) {
        const message = getErrorMessage(error);
        alert(message);
      }
    };
    showAlertModal({
      text: `${currentRoomData.title}에서 나가시겠습니까?`,
      executeWork,
    });
  };

  return (
    <Wrapper show={show} ref={sideBarEl} isMobile={deviceModeContext.isMobile}>
      <ContentWrapper>
        <ContentTabs>
          <Tab>
            <input type="radio" id="tab-1" name="tab-group-1" defaultChecked />
            <label className="tab_label" htmlFor="tab-1">
              멤버 목록
            </label>
            <div className="tab_content">
              <Scrollbars>
                <MemberList
                  memberList={userListByRoom}
                  kickOutMember={kickOutMember}
                />
                <div className="leave_btn" onClick={onClickLeaveRoom}>
                  <span className="button_wrap">
                    <IconContext.Provider
                      value={{
                        size: '20px',
                        style: {},
                      }}
                    >
                      <FaSignOutAlt />
                    </IconContext.Provider>
                    방에서 나가기
                  </span>
                </div>
              </Scrollbars>
            </div>
          </Tab>
          <Tab>
            <input type="radio" id="tab-2" name="tab-group-1" />
            <label className="tab_label" htmlFor="tab-2">
              유저 검색
            </label>
            <div className="tab_content">
              <Scrollbars>
                <SearchBox inviteMemberToRoom={inviteMemberToRoom} />
                <div className="leave_btn" onClick={onClickLeaveRoom}>
                  <span className="button_wrap">
                    <IconContext.Provider
                      value={{
                        size: '20px',
                        style: {},
                      }}
                    >
                      <FaSignOutAlt />
                    </IconContext.Provider>
                    방에서 나가기
                  </span>
                </div>
              </Scrollbars>
            </div>
          </Tab>
          <CloseIcon
            onClick={() => sidebarContext.setRightbarState((prev) => !prev)}
          >
            <IconContext.Provider
              value={{
                size: '100%',
                style: { display: 'inline-block', color: 'whitesmoke' },
              }}
            >
              {sidebarContext.rightBarState ? (
                <RxDoubleArrowRight />
              ) : (
                <HiUserGroup />
              )}
            </IconContext.Provider>
          </CloseIcon>
        </ContentTabs>
      </ContentWrapper>
    </Wrapper>
  );
});

export default RightSidebar;
