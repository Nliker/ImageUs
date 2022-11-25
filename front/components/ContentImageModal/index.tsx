import ModalLayout from '@layouts/ModalLayout';
import React from 'react';

interface Props {
  onCloseModal: (e: any) => void;
}

const ContentImageModal = ({ onCloseModal }: Props) => {
  return (
    <ModalLayout onCloseModal={onCloseModal}>
      <div></div>
    </ModalLayout>
  );
};

export default ContentImageModal;
