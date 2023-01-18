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
import { AiOutlineClose } from 'react-icons/ai';
import useSWR, { useSWRConfig } from 'swr';
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
import { getUserFriendList } from '@utils/userDataFetcher';
import { DFriendData } from '@typing/db';
import { useLinkClickHandler } from 'react-router-dom';

const CreateRoomModal = () => {
  const { mutate } = useSWRConfig();
  const { data: modalState, mutate: modalMutate } = useSWR('showModalState');
  const { data: friendList, mutate: mutateFriendList } = useSWR('friendlist', getUserFriendList, {
    dedupingInterval: 2000,
  });

  const [currentStage, setCurrentStage] = useState(0);
  const [roomName, setRoomName, handleRoomName] = useInput('');

  const [selectedMemberId, setSelectedMemberId] = useState<Array<string>>([]);
  const [checkedMember, setCheckedMember] = useState<Array<DFriendData>>([]);

  useEffect(() => {
    if (!friendList) return;
  }, [friendList]);

  const onClickPrevStage = useCallback(() => {
    setCurrentStage(0);
  }, []);

  const onClickNext = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      // const formData = new FormData(e.target as HTMLFormElement);
      // const entries = formData.entries();
      // const selectData = [];
      // for (const data of entries) {
      //   const friendId = data[0];
      //   selectData.push(friendId);
      // }
      // setSelectedMemberId([...selectData]);
      // console.log(selectedMemberId);
      const selectFriends = friendList.filter((data: DFriendData) => {
        return selectedMemberId.includes(data.id);
      });
      setCheckedMember([...selectFriends]);
      setCurrentStage(1);
    },
    [friendList, checkedMember, selectedMemberId],
  );

  const onClickCloseBtn = useCallback(() => {
    modalMutate(
      {
        ...modalState,
        create_room: false,
      },
      false,
    );
  }, []);

  const onClickRequest = useCallback(async () => {
    await axios
      .post(
        '/room',
        {
          userlist: selectedMemberId,
          title: roomName,
        },
        {
          headers: {
            Authorization: `${sessionStorage.getItem('TOKEN')}`,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(() => {
        onClickCloseBtn();
        mutate('roomlist');
        alert('방을 생성했습니다!');
      })
      .catch((err) => {
        console.log(err);
      });
  }, [roomName, selectedMemberId]);

  const onChangeCheckBox = useCallback(
    (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.currentTarget.checked) {
        setSelectedMemberId((prevArr) => {
          const newArr = prevArr.filter((dataId) => dataId !== id);
          console.log(newArr);
          return [...newArr];
        });
      } else {
        setSelectedMemberId((prevArr) => {
          return [...prevArr, id];
        });
      }
    },
    [selectedMemberId],
  );

  const EachCheckBox = memo(({ friendData }: { friendData: DFriendData }) => {
    return (
      <>
        <div>
          <label htmlFor={friendData.id}>
            {friendData.name}
            <input
              type="checkbox"
              id={friendData.id}
              name={friendData.name}
              onChange={onChangeCheckBox(friendData.id)}
              checked={selectedMemberId.includes(friendData.id) ? true : false}
            />
          </label>
        </div>
      </>
    );
  });

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
              <MemeberList>
                {friendList &&
                  friendList.map((friend: DFriendData) => {
                    return <EachCheckBox key={friend.id} friendData={friend} />;
                  })}
                <ActionBtn>
                  <button type="button" onClick={onClickNext}>
                    다음
                  </button>
                </ActionBtn>
              </MemeberList>
            </Content>
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
                  <div id="member_list">
                    {checkedMember &&
                      checkedMember.map((friend: DFriendData) => {
                        return (
                          <div key={friend.id}>
                            <label htmlFor={friend.name}>
                              <p>{friend.name}</p>
                            </label>
                          </div>
                        );
                      })}
                  </div>
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
