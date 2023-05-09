import React, { memo, useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { IoMdArrowDropright } from 'react-icons/io';
import ActionButton from '@styles/ActiveButton';
import Spinner from '@styles/Spinner';

import { Collapse, Container, CreateBtnBox, Subtitle, Wrapper } from './styles';
import useModal from '@hooks/useModal';
import { DataCheckLabel, DataLabel } from '@styles/DataCheckLabel/styles';
import { Button } from '@styles/Button';
import { DFriendData } from '@typing/db';
import useUserData from '@hooks/useUserData';
import useRoomList from '@hooks/useRoomList';
import useUserListByRoom from '@hooks/useUserListByRoom';
import { getErrorMessage } from '@utils/getErrorMessage';

const preventClickCSS = {
  pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
};

const labelMarginCSS = {
  marginLeft: '60px',
};

const MemberList = memo(() => {
  const userId = sessionStorage.getItem('user_id');
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId || !userId) return null;

  const { showAlertModal, showInviteMemberModal } = useModal();
  const { roomList, getHostIdByRoom } = useRoomList(userId);
  const { userListByRoom, kickOutMember } = useUserListByRoom(roomId);
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

  if (!roomId || !userListByRoom) return <Spinner />;

  return (
    <Wrapper>
      <Subtitle onClick={toggleMemberCollapse}>
        <Collapse collapse={memberCollapse}>
          <IoMdArrowDropright />
        </Collapse>
        <span>Members</span>
      </Subtitle>
      {memberCollapse && (
        <>
          <Container>
            {userListByRoom.map((item) => {
              return (
                <div key={item.id} className="check_box">
                  <div className="check_label_box" style={preventClickCSS}>
                    <DataCheckLabel
                      type="radio"
                      id={`${item.id}`}
                      name={`radio-group-member`}
                      defaultChecked={userId === '' + item.id}
                      boxName={'member'}
                    />
                    <DataLabel htmlFor={`${item.id}`}>
                      <div className="mark_box">
                        {hostId === item.id && (
                          <span className="room_manager_mark">방장</span>
                        )}
                        {userId === '' + item.id && (
                          <span className="onself_mark">나</span>
                        )}
                      </div>
                      <span
                        className="item_text"
                        style={
                          userId === '' + item.id || hostId === item.id
                            ? labelMarginCSS
                            : undefined
                        }
                      >
                        {item.name}
                      </span>
                    </DataLabel>
                  </div>
                  {userId === '' + hostId && hostId !== item.id && (
                    <Button className="error" onClick={onClickKickOut(item)}>
                      강퇴
                    </Button>
                  )}
                </div>
              );
            })}
          </Container>
          <CreateBtnBox>
            <ActionButton
              onClickBtn={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();

                showInviteMemberModal();
              }}
              btnTitle={'+'}
            />
          </CreateBtnBox>
        </>
      )}
    </Wrapper>
  );
});

export default MemberList;
