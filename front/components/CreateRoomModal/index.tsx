import ModalLayout from '@layouts/ModalLayout';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { AiOutlineClose, AiOutlineCloseSquare } from 'react-icons/ai';
import useSWR from 'swr';
import {
  ActionBtn,
  CloseBtn,
  ContentBox,
  MemeberList,
  ModalBox,
  ModalBoxContainer,
  ResultMembers,
  ResultRoomName,
  RoomName,
  Title,
} from './styles';

const CreateRoomModal = () => {
  const { data: modalState, mutate: modalMutate } = useSWR('showModalState');
  const [currentStage, setCurrentStage] = useState(0);

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
            <RoomName>
              <label htmlFor="room_name">방 이름</label>
              <input type="text" id="room_name" />
            </RoomName>
            <MemeberList>
              <label htmlFor="member1">
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
              </label>
            </MemeberList>
            <ActionBtn>
              <button type="button" onClick={onClickNextStage}>
                다음
              </button>
            </ActionBtn>
          </ContentBox>
        ) : (
          currentStage === 1 && (
            <ContentBox>
              <ResultRoomName>
                <label htmlFor="room_name">방 이름</label>
                <div id='"room_name"'>테스트</div>
              </ResultRoomName>
              <ResultMembers>
                <label htmlFor="member_list">초대할 멤버</label>
                <div id="member_list">
                  <div>멤버1</div>
                  <div>멤버2</div>
                  <div>멤버3</div>
                </div>
              </ResultMembers>
              <ActionBtn>
                <button type="button" onClick={onClickNextStage}>
                  생성하기
                </button>
              </ActionBtn>
            </ContentBox>
          )
        )}
      </ModalBox>
    </ModalBoxContainer>
  );
};

export default CreateRoomModal;
