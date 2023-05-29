import React, { memo, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router';

import { IoMdArrowDropright } from 'react-icons/io';

import ActionButton from '@styles/ActiveButton';
import Spinner from '@styles/Spinner';
import useModal from '@hooks/useModal';
import { DataCheckLabel, DataLabel } from '@styles/DataCheckLabel/styles';
import { Button } from '@styles/Button';
import { DFriendData } from '@typing/db';
import useRoomList from '@hooks/useRoomList';
import useUserListByRoom from '@hooks/useUserListByRoom';
import { getErrorMessage } from '@utils/getErrorMessage';
import { Collapse, Container, CreateBtnBox, Subtitle, Wrapper } from './styles';
import { PrivateChildProps } from '@typing/client';

const preventClickCSS = {
  pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
};

const labelMarginCSS = {
  marginLeft: '60px',
};

const MemberList = memo(() => {
  const { userInfo, roomId } = useOutletContext<PrivateChildProps>();

  const { showAlertModal, showInviteMemberModal } = useModal();
  const { roomList, getHostIdByRoom } = useRoomList(userInfo.id);
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
                      id={`member_${item.id}`}
                      name={`radio-group-member`}
                      defaultChecked={userInfo.id === item.id}
                      boxName={'member'}
                    />
                    <DataLabel htmlFor={`member_${item.id}`}>
                      <div className="mark_box">
                        {hostId === item.id && (
                          <span className="room_manager_mark">방장</span>
                        )}
                        {userInfo.id === item.id && (
                          <span className="onself_mark">나</span>
                        )}
                      </div>
                      <span
                        className="item_text"
                        style={
                          userInfo.id === item.id || hostId === item.id
                            ? labelMarginCSS
                            : undefined
                        }
                      >
                        {item.name}
                      </span>
                    </DataLabel>
                  </div>
                  {userInfo.id === hostId && hostId !== item.id && (
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
