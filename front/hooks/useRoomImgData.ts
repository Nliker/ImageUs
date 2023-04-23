import { getImageData, postUploadRoomImage } from '@utils/imageFetcher';
import {
  getUnreadImageList,
  getDefaultImgFetcher,
  getFilterImgFetcher,
  deleteRoomImgFetcher,
} from '@utils/roomDataFetcher';
import { useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface IRoomImagePayload {
  imageId?: number;
  startDate?: string;
  endDate?: string;
}

function useRoomImgData(roomId?: string) {
  let readStartNumber = 0;

  const { data: requestPayload, mutate: requestPayloadMutate } =
    useSWR<IRoomImagePayload>('/room/payload');
  const { data: roomImageList, mutate: mutateRoomImage } =
    useSWR('/room/imagelist');
  const { data: realTimeImageList } = useSWR(
    `/room/${roomId}/unread-imagelist`,
    getUnreadImageList,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshInterval: 300000,
    },
  );

  const { trigger: imgDataListTrigger, isMutating: imgDataListLoading } =
    useSWRMutation('/room/imageData', getImageData);
  const {
    data: defaultImageList,
    trigger: defaultImgListTrigger,
    isMutating: defaultImgListLoading,
  } = useSWRMutation(`/room/${roomId}/imagelist`, getDefaultImgFetcher);
  const {
    data: filterImageList,
    trigger: filterImgListTrigger,
    isMutating: filterImgListLoading,
  } = useSWRMutation(`/room/${roomId}/imagelist/bydate`, getFilterImgFetcher);
  const { trigger: deleteRoomImgTrigger } = useSWRMutation(
    `/room/${roomId}/image`,
    deleteRoomImgFetcher,
  );
  const { trigger: uploadRoomImageTrigger } = useSWRMutation(
    `/room/${roomId}/image`,
    postUploadRoomImage,
  );

  const uploadRoomImage = (uploadImageFile: FormData) =>
    uploadRoomImageTrigger({ uploadImageFile });
  const deleteRoomImage = () => {
    deleteRoomImgTrigger(requestPayload?.imageId).then((dataId) => {});
  };
  const loadNextDefaultImage = async () => {
    if (!defaultImgListLoading && !imgDataListLoading) {
      defaultImgListTrigger({
        start: readStartNumber,
      });
    }
  };
  const loadNextFilterImage = async () => {
    if (!filterImgListLoading && !imgDataListLoading) {
      filterImgListTrigger({
        start: readStartNumber,
        start_date: requestPayload?.startDate,
        end_date: requestPayload?.endDate,
      });
    }
  };
  const setRoomImagePayload = (newData: IRoomImagePayload) => {
    requestPayloadMutate({ ...requestPayload, ...newData });
  };
  const clearRoomImageList = () => {
    readStartNumber = 0;
    mutateRoomImage(false);
  };

  useEffect(() => {
    if (!realTimeImageList) return;

    mutateRoomImage(async () => await imgDataListTrigger(realTimeImageList), {
      populateCache: (newData, currentData) => {
        if (currentData) {
          return [...newData, ...currentData];
        } else {
          return [...newData];
        }
      },
      revalidate: false,
    });
  }, [realTimeImageList]);

  useEffect(() => {
    // const newImgList = loadImgTypeInfo?.isfiltered
    //   ? filterImageList?.imagelist
    //   : defaultImageList?.imagelist;
    const newImgList = defaultImageList?.imagelist;
    if (!newImgList) return;

    /*

     서버에서 받은 모든 이미지가 null인 경우에 intersectionObserver가 동작하지 않음으로
     이미지 로드 요청을 한번 더 보낸다.

    */
    if (
      newImgList.length !== 0 &&
      newImgList.every((value) => value === null)
    ) {
      defaultImgListTrigger({
        start: readStartNumber + 12,
      });
      return;
    }

    readStartNumber += 12;

    mutateRoomImage(async () => await imgDataListTrigger(newImgList), {
      populateCache: (newData, currentData) => {
        if (currentData) {
          return [...currentData, ...newData];
        } else {
          return [...newData];
        }
      },
      revalidate: false,
    });
  }, [defaultImageList]);

  useEffect(() => {
    const newImgList = filterImageList?.imagelist;
    if (!newImgList) return;

    /*

     서버에서 받은 모든 이미지가 null인 경우에 intersectionObserver가 동작하지 않음으로
     이미지 로드 요청을 한번 더 보낸다.

    */
    if (
      newImgList.length !== 0 &&
      newImgList.every((value) => value === null)
    ) {
      filterImgListTrigger({
        start: readStartNumber + 12,
        start_date: requestPayload?.startDate,
        end_date: requestPayload?.endDate,
      });
      return;
    }

    readStartNumber += 12;

    mutateRoomImage(async () => await imgDataListTrigger(newImgList), {
      populateCache: (newData, currentData) => {
        if (currentData) {
          return [...currentData, ...newData];
        } else {
          return [...newData];
        }
      },
      revalidate: false,
    });
  }, [filterImageList]);

  return {
    roomImageList,
    defaultImageLoading:
      imgDataListLoading || defaultImgListLoading || !defaultImageList,
    filterImageLoading:
      imgDataListLoading || filterImgListLoading || !filterImageList,
    uploadRoomImage,
    deleteRoomImage,
    loadNextDefaultImage,
    loadNextFilterImage,
    setRoomImagePayload,
    clearRoomImageList,
  };
}

export default useRoomImgData;
