import Spinner from '@styles/Spinner';
import { DRoomData } from '@typing/db';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, EmptyRoom } from './styles';
import { IconContext } from 'react-icons/lib';
import { ImUngroup } from 'react-icons/im';
import { useMediaQuery } from 'react-responsive';
import { EmptyRoomlistImg } from '@assets/image';
import { TbDoorExit } from 'react-icons/tb';
import { mutate } from 'swr';
import useModal from '@hooks/useModal';
import useUserData from '@hooks/useUserData';

function Roomlist() {
  const { setModal } = useModal();
  const { setUserPayload } = useUserData();
  const { roomList, roomListLoading } = useUserData();
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const onClickLeaveRoom =
    (roomId: string) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      setModal({
        currentModal: 'alert',
        alertData: {
          type: 'leaveRoom',
          text: '방에서 나가시겠습니까?',
        },
      });
      setUserPayload({ roomId });
    };

  if (roomListLoading) return <Spinner />;

  // if (error) return <div>정보를 받아오지 못했습니다. 새로고침해주세요..</div>;

  return (
    <Container>
      {roomList.length !== 0 ? (
        <ul className="room_list">
          {roomList.map((roomData: DRoomData) => (
            <li key={roomData.id}>
              <div className="item_box">
                <Link to={`/room/${roomData.id}`}>
                  <div className="item_info">
                    <p style={{ fontSize: '1.8rem' }}>{roomData.title}</p>
                    <p style={{ color: '#999999' }}>
                      멤버:{' '}
                      {roomData.userlist.map((data) => data.name).join(' ')}
                    </p>
                  </div>
                </Link>
                <div
                  className="item_btn"
                  onClick={onClickLeaveRoom('' + roomData.id)}
                >
                  <IconContext.Provider
                    value={{
                      size: '30px',
                      style: {
                        display: 'inline-block',
                      },
                    }}
                  >
                    <TbDoorExit />
                  </IconContext.Provider>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyRoom>
          <EmptyRoomlistImg
            style={
              isDesktop
                ? { width: '150px', height: 'auto' }
                : { width: '100px', height: 'auto' }
            }
          />
          <p className="text">등록된 방이 없습니다..</p>
        </EmptyRoom>
      )}
    </Container>
  );
}

export default Roomlist;
