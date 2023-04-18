import useRoomlist from '@hooks/useRoomlist';
import Spinner from '@styles/Spinner';
import { DRoomData } from '@typing/db';
import React from 'react';
import { Link } from 'react-router-dom';

function Roomlist() {
  const { data: roomlistData, isLoading, error } = useRoomlist();

  if (isLoading) return <Spinner />;

  if (error) return <div>정보를 받아오지 못했습니다. 새로고침해주세요..</div>;

  return (
    <article>
      <ul>
        {roomlistData.map((roomData: DRoomData) => (
          <Link key={roomData.id} to={`/room/${roomData.id}`}>
            <li>{roomData.title}</li>
          </Link>
        ))}
      </ul>
    </article>
  );
}

export default Roomlist;
