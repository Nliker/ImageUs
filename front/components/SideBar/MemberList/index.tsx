import React, { memo, useState, useMemo } from 'react';
import { useParams } from 'react-router';

import { IoMdArrowDropright } from 'react-icons/io';
import ActionButton from '@styles/ActiveButton';
import Spinner from '@styles/Spinner';

import { Collapse, Container, CreateBtnBox, Subtitle, Wrapper } from './styles';
import useModal from '@hooks/useModal';
import useUserData from '@hooks/useUserData';
import { DataCheckLabel, DataLabel } from '@styles/DataCheckLabel/styles';
import { Button } from '@styles/Button';
import { DFriendData } from '@typing/db';

const preventClickCSS = {
  pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
};

const labelMarginCSS = {
  marginLeft: '60px',
};

const MemberList = memo(() => {
  const userId = sessionStorage.getItem('user_id');
  const { roomId } = useParams<{ roomId: string }>();
  const [memberCollapse, setMemberCollapse] = useState<boolean>(true);

  const { showInviteMemberModal } = useModal();
  const { getUserListByRoom, kickOutMember } = useUserData();

  const userListData = useMemo(() => {
    if (!roomId) {
      return;
    } else {
      const data = getUserListByRoom(roomId);
      return {
        hostId: data?.hostId,
        userList: data?.userList,
      };
    }
  }, [roomId]);
  const hostId = userListData?.hostId;

  const toggleMemberCollapse = () => setMemberCollapse((prev) => !prev);
  const onClickKickOut = (memberInfo: DFriendData) => async () => {
    if (!roomId) return;

    await kickOutMember(roomId, memberInfo.id);
    alert(`${memberInfo.name}님을 강퇴하였습니다..`);
  };

  if (!roomId || !userListData?.userList) return <Spinner />;

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
            {userListData.userList.map((item) => {
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
