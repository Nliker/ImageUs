import React from 'react';

import AlertBox from './AlertBoxModal';
import CreateRoomModal from './CreateRoomModal';
import DetailPictureInfo from './DetailPictureModal';
import InviteMemberModal from './InviteMemberModal';
import UploadModal from './UploadModal';
import ModalLayout from './ModalLayout';
import useModal from '@hooks/useModal';

const Modal = () => {
  const { currentModal } = useModal();
  const currentModalComponent = () => {
    switch (currentModal) {
      case 'detailPicture':
        return <DetailPictureInfo />;

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

  if (!currentModal) return null;

  return <ModalLayout>{currentModalComponent()}</ModalLayout>;
};

export default Modal;
