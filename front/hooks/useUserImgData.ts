import { CImageData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';
import {
  getImageDataFetcher,
  deleteUserImageFetcher,
  uploadUserImageFetcher,
} from '@utils/imageFetcher';
import { getUserImgsFetcher } from '@utils/userDataFetcher';
import { useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface IUserImgInfo {
  readStartNumber: number;
}

function useUserImageData(userId: string | null) {
  // let readStartNumber = 0;

  // const { data: requestPayload, mutate: requestPayloadMutate } =
  //   useSWR('/user/payload');
  const { data: userImageList, mutate: mutateUserImgList } =
    useSWR('/user/imagelist');

  // const {
  //   data: userNextImage,
  //   trigger: nextImgListTrigger,
  //   isMutating: userImgListLoading,
  // } = useSWRMutation(`/user/${userId}/imagelist`, getUserImgsFetcher);
  const { trigger: imgDataListTrigger, isMutating: imgDataListLoading } =
    useSWRMutation('/user/image-download', getImageDataFetcher);

  const { trigger: deleteUserImgTrigger } = useSWRMutation(
    '/image',
    deleteUserImageFetcher,
  );
  const { trigger: uploadUserImageTrigger } = useSWRMutation(
    '/image',
    uploadUserImageFetcher,
  );

  const loadUserImage = async (fetchInfo: IUserImgInfo) => {
    const { readStartNumber } = fetchInfo;
    const imageLoading = imgDataListLoading;

    if (imageLoading) return false;

    const newData = await getUserImgsFetcher(`/user/${userId}/imagelist`, {
      arg: readStartNumber,
    });
    const { imagelist, loadCompleted } = newData;

    const newImageDataList = (await imgDataListTrigger([...imagelist])) ?? [];
    mutateUserImgList(
      (prevData: CImageData[]) => {
        if (!prevData) {
          return [...newImageDataList];
        } else {
          return [...prevData, ...newImageDataList];
        }
      },
      {
        revalidate: false,
      },
    );

    if (loadCompleted) {
      return true;
    } else {
      return false;
    }
  };

  const uploadUserImage = async (uploadImageFile: FormData) => {
    try {
      const response = await uploadUserImageTrigger({ uploadImageFile });
      // const {imageInfo} = response;
      if (!response) throw new Error('이미지를 업로드하지 못했습니다..');

      mutateUserImgList(
        async () => await imgDataListTrigger([response.image_info]),
        {
          populateCache(newData, currentData) {
            if (!currentData) {
              return [...newData];
            } else {
              return [...newData, ...currentData];
            }
          },
          rollbackOnError: true,
        },
      );
    } catch (error) {
      const message = getErrorMessage(error);
      alert(error);
    }
  };

  const deleteStoreImage = (dataId: number) => {
    deleteUserImgTrigger(dataId);
  };

  const clearUserImageList = () => {
    mutateUserImgList(undefined, false);
  };

  return {
    userImageList,
    userImgLoading: imgDataListLoading || !userImageList,
    loadUserImage,
    uploadUserImage,
    deleteStoreImage,
    clearUserImageList,
  };
}

export default useUserImageData;
