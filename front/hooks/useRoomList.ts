import { useMemo } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { DRoomData } from '@typing/db';
import { createRoomFetcher, leaveRoomFetcher } from '@utils/roomDataFetcher';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import { getErrorMessage } from '@utils/getErrorMessage';
import { toast } from 'react-toastify';

interface ICreateRoomParam {
  selectMemberIdList: number[];
  roomName: string;
}

function useRoomList(userId: number) {
  const {
    data: roomList,
    mutate: roomListMutate,
    error: roomListError,
  } = useSWR<DRoomData[]>(`/user/${userId}/roomlist`, getUserRoomListFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { trigger: createRoomTrigger } = useSWRMutation(
    '/room',
    createRoomFetcher,
  );

  const { trigger: leaveRoomTrigger } = useSWRMutation(
    `/user/${userId}/room`,
    leaveRoomFetcher,
  );

  const refineRoomList = useMemo(() => {
    if (!roomList) return [];

    const roomListData = roomList.map((data: DRoomData) => {
      return {
        id: data.id,
        title: data.title,
      };
    });

    return roomListData;
  }, [roomList]);

  const getHostIdByRoom = (roomId: string) => {
    const currentRoomData = roomList?.find(
      (data: DRoomData) => '' + data.id === roomId,
    );

    return currentRoomData?.host_user_id;
  };

  const createRoom = async ({
    selectMemberIdList,
    roomName,
  }: ICreateRoomParam) => {
    try {
      await createRoomTrigger({ selectMemberIdList, roomName });
      await roomListMutate();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const leaveRoom = async (roomId: string) => {
    try {
      await leaveRoomTrigger(roomId);
      await roomListMutate();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return {
    roomList,
    refineRoomList,
    totalRoomCount: roomList?.length,
    loading: !roomList && !roomListError,
    fetchRoomList: roomListMutate,
    getHostIdByRoom,
    createRoom,
    leaveRoom,
  };
}

export default useRoomList;
