import { deleteUserImage } from '@utils/imageFetcher';
import { leaveRoomFetcher } from '@utils/userDataFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface IUserPayload {
  roomId?: string;
  imageId?: number;
}

function useUserData() {
  const { data: userImageList, mutate: userImageMutate } =
    useSWR('/user/image');
  const { data: requestPayload, mutate: requestPayloadMutate } =
    useSWR('/user/payload');
  // const { roomId, imageId } = requestPayload;

  const { trigger: leaveRoomTrigger } = useSWRMutation(
    `/user/leaveRoom`,
    leaveRoomFetcher,
  );

  const { trigger: deleteUserImgTrigger } = useSWRMutation(
    `/user/deleteImage`,
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
    leaveRoom,
    deleteStoreImage,
    setUserPayload,
  };
}

export default useUserData;
