import { IAertData, IDetailPictureInfo, IModalData } from '@typing/client';
import useSWR from 'swr';

function useModal() {
  const initialValue: IModalData = {
    state: 'off',
  };
  const {
    data,
    error,
    mutate: modalMutate,
  } = useSWR<IModalData>('modal', {
    fallbackData: initialValue,
  });

  const showDetailPictureModal = (detailPictureInfo: IDetailPictureInfo) => {
    if (!data) return;

    modalMutate({
      ...data,
      state: 'on',
      currentModal: 'detailPicture',
      detailPictureInfo,
    });
  };

  const showAlertModal = (alertData: IAertData) => {
    if (!data) return;

    modalMutate({
      ...data,
      state: 'on',
      currentModal: 'alert',
      alertData,
    });
  };

  const showUploadImgModal = (uploadImageLocate: string) => {
    if (!data) return;

    modalMutate({
      ...data,
      state: 'on',
      currentModal: 'upload',
      uploadImageLocate,
    });
  };

  const showCreateRoomModal = () => {
    if (!data) return;

    modalMutate({
      ...data,
      state: 'on',
      currentModal: 'createRoom',
    });
  };

  const showInviteMemberModal = () => {
    if (!data) return;

    modalMutate({
      ...data,
      state: 'on',
      currentModal: 'inviteMember',
    });
  };

  const clearModalCache = () => {
    modalMutate({ ...initialValue });
  };

  return {
    data: data ?? initialValue,
    error,
    showDetailPictureModal,
    showAlertModal,
    showUploadImgModal,
    showCreateRoomModal,
    showInviteMemberModal,
    clearModalCache,
  };
}

export default useModal;
