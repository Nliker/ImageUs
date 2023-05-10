import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { CImageData } from '@typing/client';
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

interface IUserImgInfo {
  readStartNumber: number;
}

function useUserImageData(userId: string | null) {
  const { data: userImageList, mutate: mutateUserImgList } =
    useSWR<CImageData[]>('/user/imagelist');
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

  const loadUserImage = async (fetchInfo: IUserImgInfo) => {
    const { readStartNumber } = fetchInfo;
    const imageLoading = imgDataListLoading;

    if (imageLoading) return false;

    try {
      const newData = await getUserImgsFetcher(`/user/${userId}/imagelist`, {
        arg: readStartNumber,
      });
      const { imagelist, loadCompleted } = newData;

      const newImageDataList = (await imgDataListTrigger([...imagelist])) ?? [];
      mutateUserImgList(
        (prevData: CImageData[] | undefined) => {
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
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
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
      throw new Error(message);
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
      throw new Error(message);
    }
  };

  const clearUserImageList = () => {
    mutateUserImgList(undefined, false);
  };

  return {
    userImageList,
    userImgLoading: imgDataListLoading || !userImageList,
    uploadImgSensorNum: uploadImgCount,
    totalImageCount,
    loadUserImage,
    uploadUserImage,
    deleteStoreImage,
    clearUserImageList,
  };
}

export default useUserImageData;
