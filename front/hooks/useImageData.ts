import {
  deleteUserImage,
  postUploadRoomImage,
  postUploadUserImage,
} from '@utils/imageFetcher';
import { deleteRoomImgFetcher } from '@utils/roomDataFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface IImagePayload {
  roomId?: string;
  imageId?: number;
}

function useImageData(roomId: string | undefined) {
  const { data: requestPayload, mutate: requestPayloadMutate } =
    useSWR('/room/payload');
  const { data: userImageList, mutate: userImageMutate } =
    useSWR('/user/imagelist');
  const { data: roomImageList, mutate: roomImageMutate } =
    useSWR('/room/imagelist');

  const { trigger: deleteRoomImgTrigger } = useSWRMutation(
    `/room/${requestPayload?.roomId}/image`,
    deleteRoomImgFetcher,
  );
  const { trigger: deleteUserImgTrigger } = useSWRMutation(
    '/image',
    deleteUserImage,
  );
  const { trigger: uploadRoomImageTrigger } = useSWRMutation(
    `/room/${roomId}/image`,
    postUploadRoomImage,
  );
  const { trigger: uploadUserImageTrigger } = useSWRMutation(
    '/image',
    postUploadUserImage,
  );

  const uploadRoomImage = (uploadImageFile: FormData) =>
    uploadRoomImageTrigger({ uploadImageFile });
  const uploadUserImage = (uploadImageFile: FormData) =>
    uploadUserImageTrigger({ uploadImageFile });
  const deleteStoreImage = () => {
    deleteUserImgTrigger(requestPayload?.imageId).then((dataId) => {
      // /user/image 캐시 데이터 업데이트 optimistic UI
      // userImageMutate(dataId)
    });
  };
  const deleteRoomImage = () => {
    deleteRoomImgTrigger(requestPayload?.imageId).then((dataId) => {});
  };

  const setUserDataPayload = (newData: IImagePayload) => {
    requestPayloadMutate({ ...requestPayload, ...newData });
  };

  return {
    userImageList,
    roomImageList,
    uploadRoomImage,
    uploadUserImage,
    deleteStoreImage,
    deleteRoomImage,
    setUserDataPayload,
  };
}

export default useImageData;
