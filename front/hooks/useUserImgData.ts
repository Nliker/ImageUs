import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { toast } from 'react-toastify';
import { IImageData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';
import {
  deleteUserImageFetcher,
  uploadUserImageFetcher,
  getUserImgsFetcher,
} from '@utils/imageFetcher';
import { getUserImgLenFetcher } from '@utils/userDataFetcher';

interface IRoomImageObj {
  imageList: IImageData[];
  loadCompleted: boolean;
}

function useUserImageData(userId: number) {
  const imageSwrKey = `/user/${userId}/imagelist`;

  const {
    data: userImageData,
    mutate: userImageMutator,
    isValidating: userImgValidating,
    error: userImgListError,
  } = useSWR<IRoomImageObj | null, Error>(imageSwrKey);

  const { data: totalImageCount, mutate: refreshTotalImgCount } =
    useSWR<number>(`/user/${userId}/imagelist-len`, getUserImgLenFetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    });

  const { trigger: getImageDataTrigger, isMutating: userImgMutating } =
    useSWRMutation(imageSwrKey, getUserImgsFetcher);

  const { trigger: deleteUserImgTrigger } = useSWRMutation(
    '/image',
    deleteUserImageFetcher,
  );
  const { trigger: uploadUserImageTrigger } = useSWRMutation(
    '/image',
    uploadUserImageFetcher,
  );

  const loadImage = async (loadStartNum: number) => {
    try {
      await userImageMutator(await getImageDataTrigger({ loadStartNum }), {
        populateCache: (updateData: IRoomImageObj, currentData) => {
          if (currentData) {
            const { imageList } = currentData;
            return {
              imageList: [...imageList, ...updateData.imageList],
              loadCompleted: updateData.loadCompleted,
            };
          } else {
            return {
              imageList: [...updateData.imageList],
              loadCompleted: updateData.loadCompleted,
            };
          }
        },
        revalidate: false,
      });
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const uploadUserImage = async (uploadImageFile: FormData) => {
    try {
      if (!userImageData) {
        throw new Error('예기치 못한 오류가 발생하였습니다..다시시도 해주세요');
      }

      const newData = (await uploadUserImageTrigger({
        uploadImageFile,
      })) as IImageData;

      const addImgList = [newData, ...userImageData.imageList];

      userImageMutator((currentData) => {
        if (!currentData) {
          return;
        }
        return { ...currentData, imageList: [...addImgList] };
      }, false);

      await refreshTotalImgCount();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const deleteUserImage = async (imageId: number) => {
    try {
      if (!userImageData) {
        throw new Error('예기치 못한 오류가 발생하였습니다..다시시도 해주세요');
      }

      await deleteUserImgTrigger(imageId);
      const filterImgList = userImageData.imageList.filter(
        (data) => data.id !== imageId,
      );
      userImageMutator((currentData) => {
        if (!currentData) {
          return;
        }
        return { ...currentData, imageList: [...filterImgList] };
      }, false);
      await refreshTotalImgCount();
      alert('이미지를 삭제하였습니다!');
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const clearUserImageList = () => {
    userImageMutator(null, false);
  };

  return {
    initialLoading: !userImageData && !userImgListError,
    userImageList: userImageData?.imageList as IImageData[],
    imageLoadEnd: userImageData?.loadCompleted as boolean,
    userImgLoading: userImgMutating || userImgValidating,
    userImgListError,
    totalImageCount,
    userImageMutator,
    loadImage,
    uploadUserImage,
    deleteUserImage,
    clearUserImageList,
  };
}

export default useUserImageData;
