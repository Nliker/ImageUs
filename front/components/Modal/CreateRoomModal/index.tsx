import React, { useCallback, useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { AxiosError } from 'axios';

import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import Scrollbars from 'react-custom-scrollbars';

import { DFriendData } from '@typing/db';
import useInput from '@hooks/useInput';
import {
  getUserFriendList,
  getUserRoomListFetcher,
} from '@utils/userDataFetcher';
import { createRoomFetcher } from '@utils/roomDataFetcher';
import { Button } from '@styles/Button';
import {
  ActionBtn,
  Content,
  ContentBox,
  MemeberList,
  ModalBox,
  ModalBoxContainer,
  ResultActionBtn,
  ResultMembers,
  ResultRoomName,
  RoomName,
  Title,
} from './styles';

type AddCheckFriendData = DFriendData & { check: boolean };

const CreateRoomModal = () => {
  const { mutate } = useSWRConfig();

  const { data: friendList } = useSWR('friendlist', getUserFriendList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { trigger: createRoomTrigger } = useSWRMutation(
    '/room',
    createRoomFetcher,
  );

  const [currentStage, setCurrentStage] = useState(0);
  const [friendCheckList, setFriendCheckList] = useState<AddCheckFriendData[]>(
    [],
  );
  const [selectListState, setSelectListState] = useState<AddCheckFriendData[]>(
    [],
  );
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

  useEffect(() => {
    const selectMember = friendCheckList.filter(
      (data: AddCheckFriendData) => data.check,
    );
    setSelectListState([...selectMember]);
  }, [friendCheckList]);

  const onClickPrevStage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setCurrentStage(0);
    },
    [selectListState],
  );

  const onClickNext = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!roomName) {
        alert('방이름이 입력되지 않았습니다.');
        return;
      } else {
        setCurrentStage(1);
      }
    },
    [selectListState, roomName],
  );

  const onClickFriendList = (friendId: number) => () => {
    setFriendCheckList((prevData: AddCheckFriendData[]) => {
      const newData = prevData.map((data: AddCheckFriendData) => {
        if (data.id === friendId) return { ...data, check: !data.check };
        return { ...data };
      });
      return [...newData];
    });
  };

  const onClickCreateRequest = async () => {
    const selectMemberIdList = selectListState.map(
      (data: AddCheckFriendData) => data.id,
    );
    createRoomTrigger({ selectMemberIdList, roomName })
      .then(() => {
        const userId = sessionStorage.getItem('user_id');
        mutate(
          `/user/${userId}/roomlist`,
          getUserRoomListFetcher(`/user/${userId}/roomlist`),
        );
        mutate('modalState', { currentModalState: '' });
      })
      .catch((err) => {
        if (err instanceof AxiosError) {
          alert('오류가 발생했습니다.');
        }
      });
  };

  return (
    <ModalBoxContainer>
      <ModalBox>
        <Title>
          <h1>방 생성하기</h1>
        </Title>
        {currentStage === 0 ? (
          <ContentBox>
            <Content>
              <RoomName>
                <label htmlFor="room_name">방 이름</label>
                <input
                  type="text"
                  id="room_name"
                  onChange={handleRoomName}
                  value={roomName}
                />
              </RoomName>
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
            </Content>
            <ActionBtn>
              <Button type="button" onClick={onClickNext}>
                다음
              </Button>
            </ActionBtn>
          </ContentBox>
        ) : (
          currentStage === 1 && (
            <ContentBox>
              <div className="result_content">
                <ResultRoomName>
                  <h2>방 이름</h2>
                  <p>{roomName}</p>
                </ResultRoomName>
                <ResultMembers>
                  <h2>초대할 멤버</h2>
                  {selectListState.length !== 0 ? (
                    <ul>
                      {selectListState
                        .filter((data) => data.check)
                        .map((friendData: AddCheckFriendData) => {
                          return <li key={friendData.id}>{friendData.name}</li>;
                        })}
                    </ul>
                  ) : (
                    <p>등록된 친구가 없습니다.</p>
                  )}
                </ResultMembers>
              </div>
              <ResultActionBtn>
                <Button type="button" onClick={onClickPrevStage}>
                  이전
                </Button>
                <Button type="button" onClick={onClickCreateRequest}>
                  생성하기
                </Button>
              </ResultActionBtn>
            </ContentBox>
          )
        )}
      </ModalBox>
    </ModalBoxContainer>
  );
};

export default CreateRoomModal;