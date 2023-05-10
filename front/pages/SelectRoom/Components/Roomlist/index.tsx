import Spinner from '@styles/Spinner';
import { DRoomData } from '@typing/db';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, EmptyRoom } from './styles';
import { IconContext } from 'react-icons/lib';
import { useMediaQuery } from 'react-responsive';
import { EmptyRoomlistImg } from '@assets/image';
import { TbDoorExit } from 'react-icons/tb';
import useModal from '@hooks/useModal';
import useUserData from '@hooks/useUserData';
import useRoomList from '@hooks/useRoomList';
import { getErrorMessage } from '@utils/getErrorMessage';

function Roomlist() {
  const userId = sessionStorage.getItem('user_id');

  if (!userId) return null;

  const { showAlertModal } = useModal();
  const { roomList, leaveRoom } = useRoomList(userId);
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const onClickLeaveRoom =
    (roomData: DRoomData) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const executeWork = async () => {
        try {
          await leaveRoom('' + roomData.id);
          alert(`${roomData.title}에서 성공적으로 나갔습니다!`);
        } catch (error) {
          const message = getErrorMessage(error);
          alert(message);
        }
      };

      showAlertModal({
        text: `${roomData.title}에서 나가시겠습니까?`,
        executeWork,
      });
    };

  if (!roomList) return <Spinner />;

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
                <div className="item_btn" onClick={onClickLeaveRoom(roomData)}>
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
