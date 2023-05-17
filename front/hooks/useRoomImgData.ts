import { CImageData } from '@typing/client';
import {
  getImageDataFetcher,
  deleteRoomImgFetcher,
  uploadRoomImgFetcher,
  getFilterImgFetcher,
  getDefaultImgFetcher,
  getUnreadImgFetcher,
} from '@utils/imageFetcher';
import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useThrowAsyncError } from './useThrowAsyncError';

interface ILoadImage {
  isfiltered: boolean;
  filterStartDate: string;
  filterEndDate: string;
  readStartNumber: number;
}

function useRoomImgData(roomId: string) {
  const [imageLoadEnd, setImageLoadEnd] = useState(false);
  const throwAsyncError = useThrowAsyncError();

  const {
    data: roomImageList,
    mutate: mutateRoomImage,
    isValidating: roomImgValidating,
    error: roomImgListError,
  } = useSWR<CImageData[]>('/room/imagelist');

  const { data: realTimeImageList, mutate: mutateRealTimeImage } = useSWR(
    '/room/imageUpdate',
    updateImageList,
    {
      revalidateIfStale: false,
      revalidateOnMount: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 300000,
    },
  );

  const { trigger: imgDataListTrigger, isMutating: imgDataListLoading } =
    useSWRMutation('/room/imageData', getImageDataFetcher);

  const { trigger: deleteRoomImgTrigger } = useSWRMutation(
    [`/room/${roomId}/image`, 'delete'],
    deleteRoomImgFetcher,
  );

  const { trigger: uploadRoomImageTrigger } = useSWRMutation(
    [`/room/${roomId}/image`, 'upload'],
    uploadRoomImgFetcher,
  );

  const uploadRoomImage = async (uploadImageFile: FormData) => {
    try {
      await uploadRoomImageTrigger({ uploadImageFile });
      await mutateRealTimeImage();
    } catch (error) {
      // const message = getErrorMessage(error);
      // throw new Error(message);
      throwAsyncError(error);
    }
  };

  const deleteRoomImage = async (imageId: number) => {
    try {
      if (!roomImageList) return;

      await deleteRoomImgTrigger(imageId);
      const filterImgList = roomImageList.filter((data) => data.id !== imageId);
      mutateRoomImage([...filterImgList], false);
    } catch (error) {
      // const message = getErrorMessage(error);
      // throw new Error(message);
      throwAsyncError(error);
    }
  };

  const loadImage = async (fetchInfo: ILoadImage) => {
    const { isfiltered, filterStartDate, filterEndDate, readStartNumber } =
      fetchInfo;

    try {
      if (isfiltered) {
        const newData = await getFilterImgFetcher(
          `/room/${roomId}/imagelist/bydate`,
          {
            arg: {
              start: readStartNumber,
              start_date: filterStartDate,
              end_date: filterEndDate,
            },
          },
        );
        const { imagelist, loadCompleted } = newData;

        if (loadCompleted) setImageLoadEnd(true);

        const newImageDataList =
          (await imgDataListTrigger([...imagelist])) ?? [];
        mutateRoomImage(
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
          return {
            readStartNumber: 0,
          };
        } else {
          return {
            readStartNumber: readStartNumber + 12,
          };
        }
      } else {
        const newData = await getDefaultImgFetcher(
          `/room/${roomId}/imagelist`,
          {
            arg: {
              start: readStartNumber,
            },
          },
        );
        const { imagelist, loadCompleted } = newData;

        if (loadCompleted) setImageLoadEnd(true);

        const newImageDataList =
          (await imgDataListTrigger([...imagelist])) ?? [];
        mutateRoomImage(
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
          return {
            readStartNumber: 0,
          };
        } else {
          return {
            readStartNumber: readStartNumber + 12,
          };
        }
      }
    } catch (error) {
      throwAsyncError(error);
      return {
        readStartNumber: 0,
      };
      // const message = getErrorMessage(error);
      // throw new Error(message);
    }
  };

  const clearRoomImageList = () => {
    setImageLoadEnd(false);
    mutateRoomImage(undefined, false);
  };

  async function updateImageList() {
    try {
      const newData = await getUnreadImgFetcher(
        `/room/${roomId}/unread-imagelist`,
      );

      await mutateRoomImage(
        async () => await imgDataListTrigger([...newData]),
        {
          populateCache: (newData, currentData) => {
            if (!currentData) return [];
            if (!newData) return [...currentData];
            return [...newData, ...currentData];
          },
          revalidate: false,
        },
      );
    } catch (error) {
      // const message = getErrorMessage(error);
      // throw new Error(message);
      throwAsyncError(error);
    }
  }

  return {
    initialLoading: !roomImageList && !roomImgListError,
    roomImageList,
    roomImgLoading: imgDataListLoading || roomImgValidating,
    imageLoadEnd,
    uploadRoomImage,
    deleteRoomImage,
    loadImage,
    clearRoomImageList,
  };
}

export default useRoomImgData;
