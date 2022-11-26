import ModalLayout from '@layouts/ModalLayout';
import React from 'react';

interface Props {
  onCloseModal: (e: any) => void;
}

const ContentImageModal = () => {
  return (
    <ModalLayout modalName={'image_modal'}>
      <div></div>
    </ModalLayout>
  );
};

export default ContentImageModal;
