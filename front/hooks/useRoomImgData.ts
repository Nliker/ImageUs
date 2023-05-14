import { CImageData } from '@typing/client';
import { getErrorMessage } from '@utils/getErrorMessage';
import {
  getImageDataFetcher,
  deleteRoomImgFetcher,
  uploadRoomImgFetcher,
  getFilterImgFetcher,
  getDefaultImgFetcher,
  getUnreadImgFetcher,
} from '@utils/imageFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface ILoadImage {
  isfiltered: boolean;
  filterStartDate: string;
  filterEndDate: string;
  readStartNumber: number;
}

function useRoomImgData(roomId: string) {
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
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  const deleteRoomImage = async (imageId: number) => {
    try {
      if (!roomImageList) return;

      await deleteRoomImgTrigger(imageId);
      const filterImgList = roomImageList.filter((data) => data.id !== imageId);
      mutateRoomImage([...filterImgList], false);
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
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
            imageLoadEnd: true,
            readStartNumber: 0,
          };
        } else {
          return {
            imageLoadEnd: false,
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
            imageLoadEnd: true,
            readStartNumber: 0,
          };
        } else {
          return {
            imageLoadEnd: false,
            readStartNumber: readStartNumber + 12,
          };
        }
      }
    } catch (error) {
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  };

  const clearRoomImageList = () => {
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
      const message = getErrorMessage(error);
      throw new Error(message);
    }
  }

  return {
    initialLoading: !roomImageList && !roomImgListError,
    roomImageList,
    roomImgListLoading: imgDataListLoading || roomImgValidating,
    uploadRoomImage,
    deleteRoomImage,
    loadImage,
    clearRoomImageList,
  };
}

export default useRoomImgData;
