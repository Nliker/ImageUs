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
  const { data } = useModal();

  const currentModalComponent = (data: IModalData) => {
    const { currentModal, uploadImageLocate, alertData, detailPictureInfo } =
      data;

    switch (currentModal) {
      case 'detailPicture':
        return <DetailPictureInfo imageInfo={detailPictureInfo} />;

      case 'alert':
        return <AlertBox alertData={alertData} />;

      case 'upload':
        return <UploadModal uploadImageLocate={uploadImageLocate} />;

      case 'createRoom':
        return <CreateRoomModal />;

      case 'inviteMember':
        return <InviteMemberModal />;

      default:
        break;
    }
  };

  if (!data) return null;

  return (
    <ModalLayout currentModal={data.currentModal}>
      {currentModalComponent(data)}
    </ModalLayout>
  );
};

export default Modal;
