import React, { useEffect, useMemo, useState } from 'react';

import { useOutletContext } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';

import { DFriendData } from '@typing/db';
import { Button } from '@styles/Button';
import useModal from '@hooks/useModal';
import useFriendList from '@hooks/useFriendList';
import useUserListByRoom from '@hooks/useUserListByRoom';
import { getErrorMessage } from '@utils/getErrorMessage';
import { ContentBox } from './styles';
import ModalLayout from '../ModalLayout';
import { PrivateChildProps } from '@typing/client';

type AppendCheckFriendData = DFriendData & { check: boolean };

const InviteMemberModal = () => {
  const { roomId } = useOutletContext<PrivateChildProps>();

  const { clearModalCache } = useModal();
  const { friendList } = useFriendList();
  const { userListByRoom, inviteMemberToRoom } = useUserListByRoom(roomId);

  const size = { width: 412, height: 550 };

  const [canInviteFriends, setCanInviteFriends] = useState<
    AppendCheckFriendData[]
  >([]);

  const checkFriends = useMemo<AppendCheckFriendData[]>(() => {
    const checkList = canInviteFriends.filter((data) => data.check);
    return [...checkList];
  }, [canInviteFriends]);

  useEffect(() => {
    if (!friendList || !userListByRoom) return;

    setCanInviteFriends((prev) => {
      const newList = friendList.filter((friend: DFriendData) => {
        const isRoomMember = userListByRoom?.some(
          (roomMember) => roomMember.id === friend.id,
        );
        return !isRoomMember;
      });

      const appendCheckList = newList.map((data: DFriendData) => {
        return { ...data, check: false };
      });

      return [...prev, ...appendCheckList];
    });
  }, [friendList, userListByRoom]);

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

  const requestInviteMember = async () => {
    if (!roomId) return;

    try {
      const selectIdList = checkFriends.map((data) => data.id);

      if (selectIdList.length === 0) {
        alert('선택된 친구가 없습니다.');
      } else {
        await inviteMemberToRoom([...selectIdList]);
        alert('초대하였습니다!');
        clearModalCache();
      }
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  return (
    <ModalLayout currentModal="inviteMember" size={size}>
      <ContentBox>
        <div className="friend_list">
          <h3>초대할 친구 목록</h3>
          <div className="ul_container">
            <Scrollbars>
              <ul>
                {canInviteFriends.length !== 0 ? (
                  canInviteFriends.map((data: AppendCheckFriendData) => (
                    <li key={data.id} onClick={onClickFriendList(data.id)}>
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
        <div className="selected_list">
          <h3>선택한 친구들</h3>
          <div className="ul_container">
            <Scrollbars>
              <ul>
                {checkFriends.length !== 0 ? (
                  checkFriends.map((data) => <li key={data.id}>{data.name}</li>)
                ) : (
                  <p>선택한 친구가 없습니다.</p>
                )}
              </ul>
            </Scrollbars>
          </div>
        </div>
        <div className="content_btn">
          <Button type="button" onClick={requestInviteMember}>
            초대하기
          </Button>
        </div>
      </ContentBox>
    </ModalLayout>
  );
};

export default InviteMemberModal;
