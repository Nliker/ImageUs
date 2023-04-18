import React, { CSSProperties, useEffect } from 'react';
import useSWR from 'swr';
import ActionButton from '@styles/ActiveButton';
import { DRoomData } from '@typing/db';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import Scrollbars from 'react-custom-scrollbars-2';
import { Link } from 'react-router-dom';
import { mutate } from 'swr';
import { MainRoomList } from './styles';

const createBtnStyle: CSSProperties = {
  width: '150px',
};

const SelectRoom = () => {
  const userId = sessionStorage.getItem('user_id');
  const {
    data: userInfo,
    mutate: mutateUserState,
    isValidating,
  } = useSWR('/user/my');
  const { data: roomlist, mutate: mutateRoomlist } = useSWR(
    `/user/${userId}/roomlist`,
  );

  useEffect(() => {
    if (!userInfo || userInfo.logInState === 'LoggedOut') return;
    mutateRoomlist(getUserRoomListFetcher(`/user/${userId}/roomlist`));
  }, []);

  return (
    <MainRoomList>
      <header>
        <h1>방에 입장하기</h1>
      </header>
      <div className="content_box">
        <div className="content_list">
          <Scrollbars>
            <ul className="room_list">
              {!roomlist ? (
                <div>로딩중...</div>
              ) : roomlist.length === 0 ? (
                <div>등록된 방이 없습니다.</div>
              ) : (
                roomlist.map((roomData: DRoomData) => (
                  <Link key={roomData.id} to={`/room/${roomData.id}`}>
                    <li>{roomData.title}</li>
                  </Link>
                ))
              )}
            </ul>
          </Scrollbars>
        </div>
        <div className="create_room_btn">
          <ActionButton
            onClickBtn={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();

              mutate('modalState', {
                currentModalState: 'creatRoom',
              });
            }}
            btnTitle={'방 생성하기'}
            customStyle={createBtnStyle}
          />
        </div>
      </div>
    </MainRoomList>
  );
};

export default SelectRoom;
