import useRoomlist from '@hooks/useRoomlist';
import Spinner from '@styles/Spinner';
import { DRoomData } from '@typing/db';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, EmptyRoom } from './styles';
import { IconContext } from 'react-icons/lib';
import { ImUngroup } from 'react-icons/im';
import { useMediaQuery } from 'react-responsive';
import { EmptyRoomlistImg } from '@assets/image';

function Roomlist() {
  const { data: roomlistData, isLoading, error } = useRoomlist();
  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  if (isLoading) return <Spinner />;

  if (error) return <div>정보를 받아오지 못했습니다. 새로고침해주세요..</div>;

  return (
    <Container>
      {roomlistData.length !== 0 ? (
        <ul>
          {roomlistData.map((roomData: DRoomData) => (
            <Link key={roomData.id} to={`/room/${roomData.id}`}>
              <li>{roomData.title}</li>
            </Link>
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
