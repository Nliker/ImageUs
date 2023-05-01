import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router';

import { Scrollbars } from 'react-custom-scrollbars-2';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';

import { DFriendData, DRoomData } from '@typing/db';
import { Button } from '@styles/Button';
import { Container, Content, Title, Wrapper } from './styles';
import useUserData from '@hooks/useUserData';
import useModal from '@hooks/useModal';
import useRoomList from '@hooks/useRoomList';
import useFriendList from '@hooks/useFriendList';
import useUserListByRoom from '@hooks/useUserListByRoom';

type AppendCheckFriendData = DFriendData & { check: boolean };

const InviteMemberModal = () => {
  const userId = sessionStorage.getItem('user_id');
  const { roomId } = useParams<{ roomId: string }>();
  if (!roomId || !userId) return null;

  const { clearModalCache } = useModal();
  const { roomList } = useRoomList(userId);
  const { friendList } = useFriendList();
  const { userListByRoom, inviteMemberToRoom } = useUserListByRoom(roomId);

  const [canInviteFriends, setCanInviteFriends] = useState<
    AppendCheckFriendData[]
  >(
    useMemo<AppendCheckFriendData[]>(() => {
      if (!roomList || !friendList || !roomId) return [];

      const newList = friendList.filter((friend: DFriendData) => {
        const isRoomMember = userListByRoom?.some(
          (roomMember) => roomMember.id === friend.id,
        );
        return !isRoomMember;
      });

      const appendCheckList = newList.map((data: DFriendData) => {
        return { ...data, check: false };
      });

      return [...appendCheckList];
    }, [roomList, friendList]),
  );

  const checkFriends = useMemo<AppendCheckFriendData[]>(() => {
    const checkList = canInviteFriends.filter((data) => data.check);
    return [...checkList];
  }, [canInviteFriends]);

  const onClickFriendList = (clickId: number) => () => {
    setCanInviteFriends((prevData: AppendCheckFriendData[]) => {
      const newData = prevData.map((data) => {
        if (data.id === clickId) {
          return { ...data, check: !data.check };
        }
        return { ...data };
      });

      return [...newData];
    });
  };

  const requestInviteMember = () => {
    if (!roomId) return;

    const selectIdList = checkFriends.map((data) => data.id);

    if (selectIdList.length === 0) {
      alert('선택된 친구가 없습니다.');
    } else {
      inviteMemberToRoom([...selectIdList]);
      clearModalCache();
    }
  };

  return (
    <Wrapper>
      <Title>
        <h2>친구 초대하기</h2>
      </Title>
      <Container>
        <Scrollbars>
          <Content>
            <div className="content_box">
              <div className="content_list_box">
                <div className="content_subname">
                  <h3>초대할 친구 목록</h3>
                </div>
                <div className="content_list">
                  <Scrollbars>
                    <ul className="content_list_ul">
                      {canInviteFriends.length !== 0 ? (
                        canInviteFriends.map((data: AppendCheckFriendData) => (
                          <li
                            key={data.id}
                            onClick={onClickFriendList(data.id)}
                          >
                            <div className="list_layout">
                              <div className="list_check_icon">
                                {data.check ? (
                                  <AiFillCheckCircle />
                                ) : (
                                  <AiOutlineCheckCircle />
                                )}
                              </div>
                              <div className="list_info">
                                <p>이름: {data.name}</p>
                                <p>이메일: {data.email}</p>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>등록할 친구가 없습니다.</p>
                      )}
                    </ul>
                  </Scrollbars>
                </div>
              </div>
              <div className="selected_list_box">
                <div className="content_subname">
                  <h3>선택한 친구들</h3>
                </div>
                <div className="selected_list">
                  <Scrollbars>
                    {checkFriends.length !== 0 ? (
                      <ul className="selected_list_ul">
                        {checkFriends.map((data) => (
                          <li key={data.id}>{data.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>선택한 친구가 없습니다.</p>
                    )}
                  </Scrollbars>
                </div>
              </div>
              <div className="content_btn">
                <Button type="button" onClick={requestInviteMember}>
                  초대하기
                </Button>
              </div>
            </div>
          </Content>
        </Scrollbars>
      </Container>
    </Wrapper>
  );
};

export default InviteMemberModal;
