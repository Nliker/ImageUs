import React from 'react';

import AlertBox from './AlertBoxModal';
import CreateRoomModal from './CreateRoomModal';
import DetailPictureInfo from './DetailPictureModal';
import InviteMemberModal from './InviteMemberModal';
import UploadModal from './UploadModal';
import ModalLayout from './ModalLayout';
import useModal from '@hooks/useModal';
import { IModalData } from '@typing/client';

const Modal = () => {
  const { data, modalLoading } = useModal();

  const currentModalComponent = (data: IModalData) => {
    const { currentModal, uploadImageLocate, alertData, detailPictureInfo } =
      data;

    switch (currentModal) {
      case 'detailPicture':
        return <DetailPictureInfo imageInfo={detailPictureInfo} />;

      case 'alert':
        return <AlertBox />;

      case 'upload':
        return <UploadModal />;

      case 'createRoom':
        return <CreateRoomModal />;

      case 'inviteMember':
        return <InviteMemberModal />;

      default:
        break;
    }
  };

  if (!data || modalLoading) return;

  return <ModalLayout>{currentModalComponent(data)}</ModalLayout>;
};

export default Modal;
