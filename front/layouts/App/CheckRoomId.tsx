import React from 'react';
import { Outlet, useParams } from 'react-router';
import { DRoomData } from '@typing/db';
import useRoomList from '@hooks/useRoomList';
import { PageLoading } from '@styles/Spinner';
import { useUserInfo } from '@hooks/useUserInfo';

const CheckRoomId = () => {
  const { userInfo } = useUserInfo();
  const { roomId } = useParams<{ roomId?: string }>();
  const { roomList } = useRoomList(userInfo.id);

  const isValidRoomId = roomList?.some((roomInfo: DRoomData) => {
    return '' + roomInfo.id === roomId;
  });

  if (!roomId || !roomList) return <PageLoading />;

  if (!isValidRoomId) {
    const error = new Error('존재하지 않는 방입니다..다른 방에 접속하세요');
    error.name = 'NotFoundRoomError';
    throw error;
  }

  return <Outlet />;
};

export default CheckRoomId;
