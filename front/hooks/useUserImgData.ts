import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { IImageData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';
import {
  getImageDataFetcher,
  deleteUserImageFetcher,
  uploadUserImageFetcher,
} from '@utils/imageFetcher';
import {
  getUserImgLenFetcher,
  getUserImgsFetcher,
} from '@utils/userDataFetcher';
import { toast } from 'react-toastify';

interface ILoadImage {
  readStartNumber: number;
}

function useUserImageData(userId: number) {
  const [imageLoadEnd, setImageLoadEnd] = useState(false);

  const {
    data: userImageList,
    mutate: mutateUserImgList,
    isValidating: userImgValidating,
    error: userImgListError,
  } = useSWR<IImageData[]>('/user/imagelist');
  const { data: uploadImgCount, mutate: setUploadImgCount } = useSWR(
    '/user/uploadImgCount',
  );
  const { data: totalImageCount, mutate: refreshTotalImgCount } =
    useSWR<number>(`/user/${userId}/imagelist-len`, getUserImgLenFetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

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

  const loadImage = async (fetchInfo: ILoadImage) => {
    const { readStartNumber } = fetchInfo;

    try {
      const newData = await getUserImgsFetcher(`/user/${userId}/imagelist`, {
        arg: readStartNumber,
      });
      const { imagelist, loadCompleted } = newData;

      if (loadCompleted) setImageLoadEnd(true);

      const newImageDataList = (await imgDataListTrigger([...imagelist])) ?? [];
      mutateUserImgList(
        (prevData: IImageData[] | undefined) => {
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
        return {
          readStartNumber: 0,
        };
      } else {
        return {
          readStartNumber: readStartNumber + 12,
        };
      }
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const uploadUserImage = async (uploadImageFile: FormData) => {
    try {
      await uploadUserImageTrigger({ uploadImageFile });

      setUploadImgCount((prevData: number | undefined) => {
        if (!prevData || prevData >= 1000) {
          return 1;
        } else {
          return prevData + 1;
        }
      }, false);

      await refreshTotalImgCount();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const deleteStoreImage = async (imageId: number) => {
    try {
      if (!userImageList) return;

      await deleteUserImgTrigger(imageId);

      const filterImgList = userImageList.filter((data) => data.id !== imageId);
      mutateUserImgList([...filterImgList], false);
      await refreshTotalImgCount();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const clearUserImageList = () => {
    setImageLoadEnd(false);
    mutateUserImgList(undefined, false);
  };

  return {
    initialLoading: !userImageList && !userImgListError,
    userImageList,
    userImgLoading: imgDataListLoading || userImgValidating,
    uploadImgSensorNum: uploadImgCount,
    totalImageCount,
    imageLoadEnd,
    loadImage,
    uploadUserImage,
    deleteStoreImage,
    clearUserImageList,
  };
}

export default useUserImageData;
