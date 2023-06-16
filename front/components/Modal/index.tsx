import React from 'react';
import {
  IAertData,
  IDetailPictureInfo,
  IModalData,
  IUploadImgFunc,
} from '@typing/client';
import AlertBox from './AlertBoxModal';
import CreateRoomModal from './CreateRoomModal';
import DetailPictureInfo from './DetailPictureModal';
import InviteMemberModal from './InviteMemberModal';
import UploadModal from './UploadModal';

const Modal = ({ modalData }: { modalData: IModalData }) => {
  const { state, currentModal } = modalData;

  if (state === 'off' || !currentModal) return null;

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
          executeFunc={modalData.uploadExecuteFunc as IUploadImgFunc}
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
