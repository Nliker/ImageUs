import { deleteRoomImgFetcher } from '@utils/roomDataFetcher';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface IRoomPayload {
  roomId?: string;
  imageId?: number;
}

function useRoomData() {
  const userId = sessionStorage.getItem('user_id');

  // const { data: requestPayload, mutate: requestPayloadMutate } =
  //   useSWR('/room/payload');

  const {
    data: roomList,
    mutate: roomListMutate,
    error: roomListError,
    isValidating,
  } = useSWR(`/user/${userId}/roomlist`, getUserRoomListFetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // const setRoomPayload = (newData: IRoomPayload) => {
  //   requestPayloadMutate({ ...requestPayload, ...newData });
  // };

  return {
    roomList,
    refreshRoomlist: roomListMutate,
  };
}

export default useRoomData;
