import React, { useCallback, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import useSWR from 'swr';
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
import axios from 'axios';

const CreateRoomModal = () => {
  const { data: modalState, mutate: modalMutate } = useSWR('showModalState');
  const [roomName, setRoomName, handleRoomName] = useInput('');
  const [currentStage, setCurrentStage] = useState(0);

  const onClickPrevStage = useCallback(() => {
    setCurrentStage(0);
  }, []);

  const onClickNextStage = useCallback(() => {
    setCurrentStage(1);
  }, []);

  const onClickCloseBtn = useCallback(() => {
    modalMutate(
      {
        ...modalState,
        create_room: false,
      },
      false,
    );
  }, []);

  const onClickRequest = useCallback(() => {
    axios
      .post(
        '/room',
        {
          'userlist': [],
          'title': roomName,
        },
        {
          headers: {
            Authorization: `${sessionStorage.getItem('TOKEN')}`,
          },
        },
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    return;
  }, [roomName]);

  return (
    <ModalBoxContainer>
      <ModalBox>
        <Title>
          <span>방 생성하기</span>
          <CloseBtn onClick={onClickCloseBtn}>
            <AiOutlineClose />
          </CloseBtn>
        </Title>
        {currentStage === 0 ? (
          <ContentBox>
            <Content>
              <RoomName>
                <label htmlFor="room_name">방 이름</label>
                <input type="text" id="room_name" onChange={handleRoomName} />
              </RoomName>
              <MemeberList></MemeberList>
            </Content>
            {/* <label htmlFor="member1">
                멤버1
                <input type="checkbox" id="member1" />
              </label>
              <label htmlFor="member2">
                멤버2
                <input type="checkbox" id="member2" />
              </label>
              <label htmlFor="member3">
                멤버3
                <input type="checkbox" id="member3" />
              </label> */}
            <ActionBtn>
              <button type="button" onClick={onClickNextStage}>
                다음
              </button>
            </ActionBtn>
          </ContentBox>
        ) : (
          currentStage === 1 && (
            <ContentBox>
              <Content>
                <ResultRoomName>
                  <label htmlFor="room_name">방 이름</label>
                  <div id="room_name">{roomName}</div>
                </ResultRoomName>
                <ResultMembers>
                  <label htmlFor="member_list">초대할 멤버</label>
                  <div id="member_list"></div>
                </ResultMembers>
              </Content>
              <ResultActionBtn>
                <button type="button" onClick={onClickPrevStage}>
                  이전
                </button>
                <button type="button" onClick={onClickRequest}>
                  생성하기
                </button>
              </ResultActionBtn>
            </ContentBox>
          )
        )}
      </ModalBox>
    </ModalBoxContainer>
  );
};

export default CreateRoomModal;
