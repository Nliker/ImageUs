import React from 'react';
import AlertBox from './AlertBoxModal';
import CreateRoomModal from './CreateRoomModal';
import DetailPictureInfo from './DetailPictureModal';
import InviteMemberModal from './InviteMemberModal';
import UploadModal from './UploadModal';
import ModalLayout from './ModalLayout';
import { IAertData, IDetailPictureInfo, IModalData } from '@typing/client';

const Modal = ({ modalData }: { modalData: IModalData }) => {
  const { state } = modalData;
  const currentModal = modalData?.currentModal;

  if (state === 'off' || !currentModal) return null;

  // console.log(currentModal, modalData);

  return (
    <>
      {currentModal === 'detailPicture' ? (
        <DetailPictureInfo
          imageInfo={modalData.detailPictureInfo as IDetailPictureInfo}
        />
      ) : currentModal === 'alert' ? (
        <AlertBox alertData={modalData.alertData as IAertData} />
      ) : currentModal === 'upload' ? (
        <UploadModal
          uploadImageLocate={modalData.uploadImageLocate as string}
        />
      ) : currentModal === 'createRoom' ? (
        <CreateRoomModal />
      ) : currentModal === 'inviteMember' ? (
        <InviteMemberModal />
      ) : null}
    </>
  );
};

export default Modal;
