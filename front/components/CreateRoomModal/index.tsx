import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  AiFillCheckCircle,
  AiOutlineCheckCircle,
  AiOutlineClose,
} from 'react-icons/ai';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import useInput from '@hooks/useInput';
import {
  ActionBtn,
  CloseBtn,
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
import axios, { AxiosError } from 'axios';
import { getUserFriendList } from '@utils/userDataFetcher';
import { DFriendData } from '@typing/db';
import { useLinkClickHandler } from 'react-router-dom';
import { createRoomFetcher } from '@utils/roomDataFetcher';
import { Button } from '@styles/Button';
import Scrollbars from 'react-custom-scrollbars';

type AddCheckFriendData = DFriendData & { check: boolean };

const CreateRoomModal = () => {
  const { mutate } = useSWRConfig();
  const { data: modalState, mutate: modalMutate } = useSWR('showModalState');
  const { data: friendList, mutate: mutateFriendList } = useSWR(
    'friendlist',
    getUserFriendList,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const { trigger: createRoomTrigger } = useSWRMutation(
    '/room',
    createRoomFetcher,
  );

  const [currentStage, setCurrentStage] = useState(0);
  const [roomName, setRoomName, handleRoomName] = useInput('');

  const [friendListState, setFriendListState] = useState<AddCheckFriendData[]>(
    [],
  );
  const [selectListState, setSelectListState] = useState<AddCheckFriendData[]>(
    [],
  );

  useEffect(() => {
    if (!friendList) return;

    const newList = friendList.map((data: DFriendData) => {
      return {
        ...data,
        check: false,
      };
    });
    setFriendListState([...newList]);
  }, [friendList]);

  useEffect(() => {
    const selectMember = friendListState.filter(
      (data: AddCheckFriendData) => data.check,
    );
    setSelectListState([...selectMember]);
  }, [friendListState]);

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
      console.log(roomName, selectListState);
      if (!roomName) {
        alert('방이름이 입력되지 않았습니다.');
        return;
      } else if (selectListState.length === 0) {
        alert('선택된 친구들이 없습니다.');
        return;
      } else {
        setCurrentStage(1);
      }
    },
    [selectListState, roomName],
  );

  const onClickFriendList = (friendId: number) => () => {
    // const changeCheckList = friendListState.map((data: AddCheckFriendData) => {
    //   if (data.id === friendId) return {...data, check: true};
    //   return {...data};
    // });
    setFriendListState((prevData: AddCheckFriendData[]) => {
      const newData = prevData.map((data: AddCheckFriendData) => {
        if (data.id === friendId) return { ...data, check: !data.check };
        return { ...data };
      });
      console.log(newData);
      return [...newData];
    });
  };

  const onClickCreateRequest = async () => {
    const selectMemberIdList = selectListState.map(
      (data: AddCheckFriendData) => data.id,
    );
    createRoomTrigger({ selectMemberIdList, roomName })
      .then(() => {
        modalMutate({
          ...modalState,
          create_room: false,
        });
        mutate('roomlist');
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
                    {friendListState &&
                      friendListState.map((friendData: AddCheckFriendData) => (
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
                      ))}
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
                  <ul>
                    {friendListState &&
                      friendListState
                        .filter((data) => data.check)
                        .map((friendData: AddCheckFriendData) => {
                          return <li key={friendData.id}>{friendData.name}</li>;
                        })}
                  </ul>
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
