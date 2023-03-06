import React from 'react';

import AlertBox from './AlertBoxModal';
import CreateRoomModal from './CreateRoomModal';
import DetailPictureInfo from './DetailPictureModal';
import InviteMemberModal from './InviteMemberModal';
import UploadModal from './UploadModal';
import ModalLayout from './ModalLayout';

interface IModalProps {
  modalName: string;
}

const Modal = ({ modalName }: IModalProps) => {
  const currentModalComponent = () => {
    switch (modalName) {
      case 'detailPicture':
        return <DetailPictureInfo />;

      case 'alert':
        return <AlertBox />;

      case 'upload':
        return <UploadModal />;

      case 'creatRoom':
        return <CreateRoomModal />;

      case 'inviteMember':
        return <InviteMemberModal />;

      default:
        break;
    }
  };

  if (!modalName) return null;

  return <ModalLayout>{currentModalComponent()}</ModalLayout>;
};

export default Modal;
