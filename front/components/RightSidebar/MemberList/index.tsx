import React, { memo, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { IoMdArrowDropright } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { AiOutlinePlus } from 'react-icons/ai';

import { Spinner } from '@styles/Spinner';
import useModal from '@hooks/useModal';
import { DataCheckLabel, DataLabel } from '@styles/DataCheckLabel/styles';
import { Button } from '@styles/Button';
import { DFriendData } from '@typing/db';
import useRoomList from '@hooks/useRoomList';
import { getErrorMessage } from '@utils/getErrorMessage';
import { useUserInfo } from '@hooks/useUserInfo';
import { Collapse, Container, Subtitle, Wrapper } from './styles';

interface IProps {
  memberList?: DFriendData[];
  kickOutMember: (memberId: number) => Promise<void>;
}

const preventClickCSS = {
  pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
};

const MemberList = memo(({ memberList, kickOutMember }: IProps) => {
  const { userInfo } = useUserInfo();
  const { roomId } = useParams<{ roomId?: string }>();
  if (!roomId) return null;

  const { showAlertModal, showInviteMemberModal } = useModal();
  const { roomList, getHostIdByRoom } = useRoomList(userInfo.id);

  const [memberCollapse, setMemberCollapse] = useState<boolean>(true);
  const hostId = useMemo(() => {
    if (!roomList) return null;
    return getHostIdByRoom(roomId);
  }, [roomList]);

  const toggleMemberCollapse = () => setMemberCollapse((prev) => !prev);

  const onClickKickOut =
    (memberInfo: DFriendData) =>
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!roomId) return;
      e.stopPropagation();

      const executeWork = async () => {
        try {
          await kickOutMember(memberInfo.id);
          alert(`${memberInfo.name}님을 강퇴하였습니다..`);
        } catch (error) {
          const message = getErrorMessage(error);
          alert(message);
        }
      };

      showAlertModal({
        text: `${memberInfo.name}님을 강퇴하시겠습니까?`,
        executeWork,
      });
    };

  if (!roomId || !memberList) return <Spinner />;

  return (
    <Wrapper>
      <Subtitle>
        <div className="toggle_memberlist" onClick={toggleMemberCollapse}>
          <Collapse collapse={memberCollapse}>
            <IconContext.Provider value={{ size: '20px' }}>
              <IoMdArrowDropright />
            </IconContext.Provider>
          </Collapse>
          <span>Members</span>
        </div>
        <div
          className="invite_btn"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            showInviteMemberModal();
          }}
        >
          <IconContext.Provider value={{ size: '100%' }}>
            <AiOutlinePlus />
          </IconContext.Provider>
        </div>
      </Subtitle>
      {memberCollapse && (
        <Container>
          {memberList.map((item) => {
            return (
              <div key={item.id} className="check_box">
                <div className="check_label_box" style={preventClickCSS}>
                  <DataCheckLabel
                    type="radio"
                    id={`member_${item.id}`}
                    name={`radio-group-member`}
                    defaultChecked={userInfo.id === item.id}
                    boxName={'member'}
                  />
                  <DataLabel
                    htmlFor={`member_${item.id}`}
                    style={{ gap: '1rem' }}
                  >
                    <span className="item_text">{item.name}</span>
                  </DataLabel>
                  <div className="right_box">
                    <div className="mark">
                      {hostId === item.id && (
                        <span className="room_manager_mark">방장</span>
                      )}
                      {userInfo.id === item.id && (
                        <span className="onself_mark">나</span>
                      )}
                    </div>
                    {userInfo.id === hostId && hostId !== item.id && (
                      <Button
                        className="error"
                        style={{ pointerEvents: 'auto', padding: '0.4rem' }}
                        onClick={onClickKickOut(item)}
                      >
                        강퇴
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      )}
    </Wrapper>
  );
});

export default MemberList;
