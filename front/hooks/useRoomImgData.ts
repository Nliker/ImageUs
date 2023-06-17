import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { toast } from 'react-toastify';

import { IImageData, ISelectTerm } from '@typing/client';
import {
  deleteRoomImgFetcher,
  uploadRoomImgFetcher,
  getUnreadImgFetcher,
  getRoomImgsFetcher,
} from '@utils/imageFetcher';
import { getErrorMessage } from '@utils/getErrorMessage';

export interface IFilteringData {
  isFilterMode: boolean;
  filterSelectTerm: ISelectTerm;
}

interface IRoomImageObj {
  imageList: IImageData[];
  loadCompleted: boolean;
  loadRoomId: string;
}

function useRoomImgData(roomId: string, filteringData: IFilteringData) {
  const useSWRKey = `/room/${roomId}/imagelist`;

  const {
    data: roomImageData,
    mutate: roomImageMutator,
    isValidating: roomImgValidating,
    error: roomImgListError,
  } = useSWR<IRoomImageObj | null, Error>(useSWRKey);

  const { trigger: getImageDataTrigger, isMutating: roomImgMutating } =
    useSWRMutation(useSWRKey, getRoomImgsFetcher);

  const { trigger: deleteRoomImgTrigger } = useSWRMutation(
    [`/room/${roomId}/image`, 'delete'],
    deleteRoomImgFetcher,
  );

  const { trigger: uploadRoomImageTrigger } = useSWRMutation(
    [`/room/${roomId}/image`, 'upload'],
    uploadRoomImgFetcher,
  );

  const loadImage = async (loadStartNum: number) => {
    try {
      await roomImageMutator(
        await getImageDataTrigger({
          loadStartNum,
          filteringData,
          roomId,
        }),
        {
          populateCache: (updateData: IRoomImageObj, currentData) => {
            if (currentData) {
              const { imageList, loadRoomId } = currentData;
              if (loadRoomId !== roomId) {
                return {
                  ...updateData,
                  imageList: [...updateData.imageList],
                };
              } else {
                return {
                  ...updateData,
                  imageList: [...imageList, ...updateData.imageList],
                };
              }
            } else {
              return {
                ...updateData,
                imageList: [...updateData.imageList],
              };
            }
          },
          revalidate: false,
        },
      );
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

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

  const uploadRoomImage = async (uploadImageFile: FormData) => {
    try {
      if (!roomImageData) {
        throw new Error('예기치 못한 오류가 발생하였습니다..다시시도 해주세요');
      }

      const newData = (await uploadRoomImageTrigger({
        uploadImageFile,
      })) as IImageData;

      const addImgList = [newData, ...roomImageData.imageList];

      roomImageMutator((currentData) => {
        if (!currentData) {
          return;
        }
        return { ...currentData, imageList: [...addImgList] };
      }, false);
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const deleteRoomImage = async (imageId: number) => {
    try {
      if (!roomImageData) return;

      await deleteRoomImgTrigger(imageId);
      const filterImgList = roomImageData.imageList.filter(
        (data) => data.id !== imageId,
      );
      roomImageMutator((currentData) => {
        if (!currentData) {
          return;
        }
        return { ...currentData, imageList: [...filterImgList] };
      }, false);
      alert('이미지를 삭제하였습니다!');
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  async function updateImageList() {
    try {
      const newData: IImageData[] = await getUnreadImgFetcher(
        `/room/${roomId}/unread-imagelist`,
      );

      await roomImageMutator((currentData) => {
        if (!currentData) {
          return;
        }
        return {
          ...currentData,
          imageList: [...newData, ...currentData.imageList],
        };
      }, false);
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }

  const clearRoomImageData = () => {
    roomImageMutator(null, false);
  };

  return {
    initialLoading: !roomImageData && !roomImgListError,
    roomImageList: roomImageData?.imageList as IImageData[],
    imageLoadEnd: roomImageData?.loadCompleted as boolean,
    roomImgLoading: roomImgMutating || roomImgValidating,
    roomImgListError,
    loadImage,
    uploadRoomImage,
    deleteRoomImage,
    clearRoomImageData,
  };
}

export default useRoomImgData;
