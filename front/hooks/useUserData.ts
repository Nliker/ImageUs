import { deleteUserImage } from '@utils/imageFetcher';
import { getUserFriendList, getUserImageLen } from '@utils/userDataFetcher';
import { leaveRoomFetcher } from '@utils/userDataFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface IUserPayload {
  roomId?: string;
  imageId?: number;
}

function useUserData() {
  const userId = sessionStorage.getItem('user_id');
  const { data: requestPayload, mutate: requestPayloadMutate } =
    useSWR('/user/payload');

  const { data: imageLength } = useSWR(
    `/user/${userId}/imagelist-len`,
    getUserImageLen,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );
  const { data: friendList } = useSWR('friendlist', getUserFriendList, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { trigger: leaveRoomTrigger } = useSWRMutation(
    `/user/leaveRoom`,
    leaveRoomFetcher,
  );

  const leaveRoom = () => leaveRoomTrigger(requestPayload?.roomId);

  const setUserPayload = (newData: IUserPayload) => {
    requestPayloadMutate({ ...requestPayload, ...newData });
  };

  return {
    imageLength: imageLength?.imagelist_len,
    friendNumber: friendList?.length,
    leaveRoom,
    setUserPayload,
  };
}

export default useUserData;
