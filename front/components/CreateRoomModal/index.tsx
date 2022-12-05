import ModalLayout from '@layouts/ModalLayout';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { MemeberList, ModalBox, ModalBoxContainer, NextBtn, ResultMembers, ResultRoomInfo, ResultRoomName, RoomName } from './styles';

// interface Props {
//     setRoomModal: Dispatch<SetStateAction<boolean>>;
// }

const CreateRoomModal = () => {
  const [currentStage, setCurrentStage] = useState(0);

  const onClickNextStage = useCallback(() => {
    setCurrentStage(1);
  }, []);
  
  return (
    <ModalLayout>
      <ModalBoxContainer>
        <ModalBox>
          {currentStage === 0 ? (
            <div>
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
              <NextBtn>
                <button type="button" onClick={onClickNextStage}>다음</button>
              </NextBtn>
            </div>
          ) : (
            currentStage === 1 && (
              <ResultRoomInfo>
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
              </ResultRoomInfo>
            )
          )}
        </ModalBox>
      </ModalBoxContainer>
    </ModalLayout>
  );
};

export default CreateRoomModal;
