import { deleteRoomImgFetcher } from '@utils/roomDataFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

interface IRoomPayload {
  roomId?: string;
  imageId?: number;
}

function useRoomData() {
  const { data: roomImageList, mutate: roomImageMutate } =
    useSWR('/room/image');
  const { data: requestPayload, mutate: requestPayloadMutate } =
    useSWR('/room/payload');
  // const { roomId, imageId } = requestPayload;

  const { trigger: deleteRoomImgTrigger } = useSWRMutation(
    `/room/${requestPayload?.roomId}/image`,
    deleteRoomImgFetcher,
  );

  const deleteRoomImage = () => {
    deleteRoomImgTrigger(requestPayload?.imageId).then((dataId) => {});
  };

  const setRoomPayload = (newData: IRoomPayload) => {
    requestPayloadMutate({ ...requestPayload, ...newData });
  };

  return {
    roomImageList,
    deleteRoomImage,
    setRoomPayload,
  };
}

export default useRoomData;
