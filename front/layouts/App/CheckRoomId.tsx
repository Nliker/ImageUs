import React from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router';
import { DRoomData } from '@typing/db';
import useRoomList from '@hooks/useRoomList';
import { PrivateChildProps } from '@typing/client';

const CheckRoomId = () => {
  // const userId = sessionStorage.getItem('user_id');

  // if (!userId) {
  //   const error = new Error('유저의 정보가 없습니다.. 다시로그인하세요');
  //   error.name = 'AuthError';
  //   throw error;
  // }
  const { userInfo } = useOutletContext<PrivateChildProps>();
  const { roomId } = useParams<{ roomId?: string }>();
  const { roomList, loading } = useRoomList(userInfo.id);

  const isValidRoomId = roomList?.some((roomInfo: DRoomData) => {
    return '' + roomInfo.id === roomId;
  });

  if (loading || !roomId) return <div>loading...</div>;

  if (!isValidRoomId) {
    const error = new Error('존재하지 않는 방입니다..다른 방에 접속하세요');
    error.name = 'NotFoundRoomError';
    throw error;
  }

  return <Outlet context={{ userInfo, roomId }} />;
};

export default CheckRoomId;
