import { CImageData } from '@typing/client';
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
  loadImgTypeInfo: {
    isfiltered: boolean;
    info: {
      startDate: string;
      endDate: string;
    };
  };
}

function useRoomImgData(roomId?: string) {
  const {
    data: roomImageList,
    mutate: mutateRoomImage,
    isValidating: roomImgMutating,
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
    const { info: dateValue } = loadImgTypeInfo;
    const imageLoading =
      (!roomImageList && !roomImgListError) || imgDataListLoading;

    if (imageLoading) return false;

    console.log('이미지 로드');
    if (loadImgTypeInfo.isfiltered) {
      const newData = await getFilterImgFetcher(
        `/room/${roomId}/imagelist/bydate`,
        {
          arg: {
            start: readStartNumber,
            start_date: dateValue.startDate,
            end_date: dateValue.endDate,
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
    await mutateRoomImage(
      async () => await getUnreadImgFetcher(`/room/${roomId}/unread-imagelist`),
      {
        populateCache: (newData, currentData) => {
          return [...newData, ...currentData];
        },
        revalidate: false,
      },
    );
  }

  return {
    roomImageList,
    roomImgListLoading:
      (!roomImageList && !roomImgListError) ||
      imgDataListLoading ||
      roomImgMutating,
    uploadRoomImage,
    deleteRoomImage,
    loadImage,
    clearRoomImageList,
  };
}

export default useRoomImgData;
