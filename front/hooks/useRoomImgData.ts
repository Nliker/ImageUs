import { CImageData, ILoadImgTypeInfo } from '@typing/client';
import {
  getImageDataFetcher,
  deleteRoomImgFetcher,
  uploadRoomImgFetcher,
  getFilterImgFetcher,
  getDefaultImgFetcher,
  getUnreadImgFetcher,
} from '@utils/imageFetcher';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface ILoadImage {
  readStartNumber: number;
  loadImgTypeInfo: ILoadImgTypeInfo;
}

function useRoomImgData(roomId?: string) {
  const {
    data: roomImageList,
    mutate: mutateRoomImage,
    isValidating: roomImgValidating,
    error: roomImgListError,
  } = useSWR('/room/imagelist', {
    fallbackData: [],
  });

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
    await uploadRoomImageTrigger({ uploadImageFile });

    await mutateRealTimeImage();
  };

  const deleteRoomImage = (imageId: number) => {
    deleteRoomImgTrigger(imageId).then((dataId) => {});
  };

  const loadImage = async (fetchInfo: ILoadImage) => {
    const { readStartNumber, loadImgTypeInfo } = fetchInfo;
    const { filterStartDate, filterEndDate } = loadImgTypeInfo;
    const imageLoading =
      (!roomImageList && !roomImgListError) || imgDataListLoading;

    if (imageLoading) return false;

    if (loadImgTypeInfo.isfiltered) {
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

      const newImageDataList = (await imgDataListTrigger([...imagelist])) ?? [];
      mutateRoomImage(
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
    } else {
      const newData = await getDefaultImgFetcher(`/room/${roomId}/imagelist`, {
        arg: {
          start: readStartNumber,
        },
      });

      const { imagelist, loadCompleted } = newData;

      const newImageDataList = (await imgDataListTrigger([...imagelist])) ?? [];
      mutateRoomImage(
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
    }
  };

  const clearRoomImageList = () => {
    console.log('클리어');
    mutateRoomImage([], false);
  };

  async function updateImageList() {
    const newData = await getUnreadImgFetcher(
      `/room/${roomId}/unread-imagelist`,
    );

    await mutateRoomImage(async () => await imgDataListTrigger([...newData]), {
      populateCache: (newData, currentData) => {
        if (!newData) return [...currentData];
        return [...newData, ...currentData];
      },
      revalidate: false,
    });
  }

  return {
    roomImageList,
    roomImgListLoading:
      (!roomImageList && !roomImgListError) ||
      imgDataListLoading ||
      roomImgValidating,
    uploadRoomImage,
    deleteRoomImage,
    loadImage,
    clearRoomImageList,
  };
}

export default useRoomImgData;
