import React from 'react';
import { Outlet, useParams } from 'react-router';
import { DRoomData } from '@typing/db';
import useRoomList from '@hooks/useRoomList';

const CheckRoomId = () => {
  const userId = sessionStorage.getItem('user_id');
  if (!userId) throw new Error('유저의 정보가 없습니다.. 다시로그인하세요');

  const { roomId } = useParams<{ roomId?: string }>();
  const { roomList, loading } = useRoomList(userId);

  const isValidRoomId = roomList?.some((roomInfo: DRoomData) => {
    return '' + roomInfo.id === roomId;
  });

  console.log('아이디 확인', roomList, loading, isValidRoomId, roomId);

  if (loading) return <div>loading...</div>;

  if (!isValidRoomId)
    throw new Error('존재하지 않는 방입니다..다른 방에 접속하세요');

  return <Outlet />;
};

export default CheckRoomId;
