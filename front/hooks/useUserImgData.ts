import {
  deleteUserImage,
  getImageData,
  postUploadRoomImage,
  postUploadUserImage,
} from '@utils/imageFetcher';
import {
  deleteRoomImgFetcher,
  getDefaultImgFetcher,
  getFilterImgFetcher,
  getUnreadImageList,
} from '@utils/roomDataFetcher';
import { getUserImageList } from '@utils/userDataFetcher';
import { useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface IImagePayload {
  imageId?: number;
}

function useUserImageData(userId: string | null) {
  let readStartNumber = 0;

  const { data: userImageList, mutate: mutateUserImgList } =
    useSWR('/user/imagelist');
  const { data: requestPayload, mutate: requestPayloadMutate } =
    useSWR('/user/payload');

  const {
    data: userNextImage,
    trigger: nextImgListTrigger,
    isMutating: userImgListLoading,
  } = useSWRMutation(`/user/${userId}/imagelist`, getUserImageList);
  const { trigger: imgDataListTrigger, isMutating: imgDataListLoading } =
    useSWRMutation('/user/image-download', getImageData);
  const { trigger: deleteUserImgTrigger } = useSWRMutation(
    '/image',
    deleteUserImage,
  );
  const { trigger: uploadUserImageTrigger } = useSWRMutation(
    '/image',
    postUploadUserImage,
  );

  const loadNextUserImage = async () => {
    if (!userImgListLoading && !imgDataListLoading) {
      nextImgListTrigger(readStartNumber);
    }
  };
  const uploadUserImage = (uploadImageFile: FormData) =>
    uploadUserImageTrigger({ uploadImageFile });
  const deleteStoreImage = () => {
    deleteUserImgTrigger(requestPayload?.imageId).then((dataId) => {
      // /user/image 캐시 데이터 업데이트 optimistic UI
      // userImageMutate(dataId)
    });
  };
  const setUserImagePayload = (newData: IImagePayload) => {
    requestPayloadMutate({ ...requestPayload, ...newData });
  };
  const clearUserImageList = () => {
    readStartNumber = 0;
    mutateUserImgList(undefined, false);
  };

  useEffect(() => {
    if (!userNextImage) return;

    readStartNumber += 12;

    mutateUserImgList(
      async () => await imgDataListTrigger(userNextImage.imagelist),
      {
        populateCache: (newData, currentData) => {
          if (!currentData) {
            return [...newData];
          } else {
            return [...currentData, ...newData];
          }
        },
        revalidate: false,
      },
    );
  }, [userNextImage]);

  return {
    userImageList,
    userImgLoading: imgDataListLoading || !userImageList,
    loadNextUserImage,
    uploadUserImage,
    deleteStoreImage,
    setUserImagePayload,
    clearUserImageList,
  };
}

export default useUserImageData;
