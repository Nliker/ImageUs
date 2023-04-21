import { deleteUserImage } from '@utils/imageFetcher';
import { getUserImageLen } from '@utils/userDataFetcher';
import { leaveRoomFetcher } from '@utils/userDataFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface IUserPayload {
  roomId?: string;
  imageId?: number;
}

function useUserData() {
  const userId = sessionStorage.getItem('user_id');
  const { data: userImageList, mutate: userImageMutate } =
    useSWR('/user/image');
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

  const { trigger: leaveRoomTrigger } = useSWRMutation(
    `/user/leaveRoom`,
    leaveRoomFetcher,
  );

  const { trigger: deleteUserImgTrigger } = useSWRMutation(
    '/image',
    deleteUserImage,
  );

  const leaveRoom = () => leaveRoomTrigger(requestPayload?.roomId);
  const deleteStoreImage = () => {
    deleteUserImgTrigger(requestPayload?.imageId).then((dataId) => {
      // /user/image 캐시 데이터 업데이트 optimistic UI
      // userImageMutate(dataId)
    });
  };
  const setUserPayload = (newData: IUserPayload) => {
    requestPayloadMutate({ ...requestPayload, ...newData });
  };

  return {
    userImageList,
    imageLength: imageLength?.imagelist_len,
    leaveRoom,
    deleteStoreImage,
    setUserPayload,
  };
}

export default useUserData;
