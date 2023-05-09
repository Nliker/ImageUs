import React, { useEffect, useMemo, useState } from 'react';

import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { DFriendData } from '@typing/db';
import useInput from '@hooks/useInput';
import { Button } from '@styles/Button';
import {
  ActionBtn,
  Content,
  CreateRoomInfo,
  MemeberList,
  RoomNameInput,
} from './styles';
import useModal from '@hooks/useModal';
import useRoomList from '@hooks/useRoomList';
import ModalLayout from '../ModalLayout';
import useFriendList from '@hooks/useFriendList';
import { getErrorMessage } from '@utils/getErrorMessage';

type AddCheckFriendData = DFriendData & { check: boolean };

const CreateRoomModal = () => {
  const userId = sessionStorage.getItem('user_id');
  if (!userId) return null;

  const { clearModalCache } = useModal();
  const { createRoom } = useRoomList(userId);
  const { friendList } = useFriendList();

  const size = { width: 412, height: 550 };

  const [currentStage, setCurrentStage] = useState(0);
  const [friendCheckList, setFriendCheckList] = useState<AddCheckFriendData[]>(
    [],
  );
  const checkFriends = useMemo(() => {
    const filterList = friendCheckList.filter((data) => data.check);
    return [...filterList];
  }, [friendCheckList]);
  const [roomName, setRoomName, handleRoomName] = useInput('');

  useEffect(() => {
    if (!friendList) return;

    const newList = friendList.map((data: DFriendData) => {
      return {
        ...data,
        check: false,
      };
    });
    setFriendCheckList([...newList]);
  }, [friendList]);

  const onClickFriendList = (friendId: number) => () => {
    setFriendCheckList((prevData: AddCheckFriendData[]) => {
      const newData = prevData.map((data: AddCheckFriendData) => {
        if (data.id === friendId) return { ...data, check: !data.check };
        return { ...data };
      });
      return [...newData];
    });
  };

  const onClickPrevStage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentStage(0);
  };

  const onClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!roomName) {
      alert('방이름이 입력되지 않았습니다.');
      return;
    } else {
      setCurrentStage(1);
    }
  };

  const createRoomRequest = async () => {
    try {
      const selectMemberIdList = checkFriends.map((data) => data.id);
      await createRoom({ selectMemberIdList, roomName });
      clearModalCache();
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  return (
    <ModalLayout currentModal="createRoom" size={size}>
      {currentStage === 0 ? (
        <>
          <Content>
            <RoomNameInput>
              <label htmlFor="room_name">방 이름</label>
              <input
                type="text"
                id="room_name"
                onChange={handleRoomName}
                value={roomName}
              />
            </RoomNameInput>
            <MemeberList>
              <Scrollbars>
                <div className="member_list">
                  {friendCheckList.length !== 0 ? (
                    friendCheckList.map((friendData: AddCheckFriendData) => (
                      <div
                        key={friendData.id}
                        className="friend_info_row"
                        onClick={onClickFriendList(friendData.id)}
                      >
                        {friendData.check ? (
                          <AiFillCheckCircle />
                        ) : (
                          <AiOutlineCheckCircle />
                        )}
                        <div>
                          <p>이름: {friendData.name}</p>
                          <p>이메일: {friendData.email}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>등록된 친구가 없습니다.</p>
                  )}
                </div>
              </Scrollbars>
            </MemeberList>
            <ActionBtn>
              <Button type="button" onClick={onClickNext}>
                다음
              </Button>
            </ActionBtn>
          </Content>
        </>
      ) : (
        currentStage === 1 && (
          <>
            <Content>
              <CreateRoomInfo>
                <div className="room_name">
                  <h3>방 이름</h3>
                  <p>{roomName}</p>
                </div>
                <div className="room_members">
                  <h3>초대할 멤버</h3>
                  <Scrollbars>
                    {checkFriends.length !== 0 ? (
                      <ul>
                        {checkFriends.map((friendData: AddCheckFriendData) => {
                          return <li key={friendData.id}>{friendData.name}</li>;
                        })}
                      </ul>
                    ) : (
                      <p>등록된 친구가 없습니다.</p>
                    )}
                  </Scrollbars>
                </div>
              </CreateRoomInfo>
              <ActionBtn style={{ justifyContent: 'space-between' }}>
                <Button type="button" onClick={onClickPrevStage}>
                  이전
                </Button>
                <Button type="button" onClick={createRoomRequest}>
                  생성하기
                </Button>
              </ActionBtn>
            </Content>
          </>
        )
      )}
    </ModalLayout>
  );
};

export default CreateRoomModal;
