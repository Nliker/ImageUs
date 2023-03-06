import React from 'react';

import AlertBox from '@components/AlertBox';
import CreateRoomModal from '@components/CreateRoomModal';
import DetailPictureInfo from '@components/DetailPictureInfo';
import InviteMemberModal from '@components/InviteMemberModal';
import UploadModal from '@components/UploadModal';
import ModalLayout from '@layouts/ModalLayout';

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
