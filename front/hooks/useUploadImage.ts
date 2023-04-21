import { postUploadRoomImage, postUploadUserImage } from '@utils/imageFetcher';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

function useUploadImage(roomId: string | undefined) {
  const { trigger: uploadRoomImageTrigger } = useSWRMutation(
    `/room/${roomId}/image`,
    postUploadRoomImage,
  );
  const { trigger: uploadUserImageTrigger } = useSWRMutation(
    '/image',
    postUploadUserImage,
  );

  const uploadRoomImage = (uploadImageFile: FormData) =>
    uploadRoomImageTrigger({ uploadImageFile });
  const uploadUserImage = (uploadImageFile: FormData) =>
    uploadUserImageTrigger({ uploadImageFile });
  return {
    uploadRoomImage,
    uploadUserImage,
  };
}

export default useUploadImage;
