import React from 'react';
import useSWR from 'swr';
import ModalLayout from '@layouts/ModalLayout';
import { ModalBox, ModalBoxContainer } from './styles';

const ContentImageModal = () => {
  const { data: imageModalState } = useSWR('imageModalState');

  return (
    <ModalLayout>
      <ModalBoxContainer>
        <ModalBox>
          <ul>
            <li key={imageModalState.clickImageId}>
              <div>
                <img
                  src={imageModalState.clickImageUrl}
                  alt={imageModalState.clickImageName}
                />
              </div>
            </li>
          </ul>
        </ModalBox>
      </ModalBoxContainer>
    </ModalLayout>
  );
};

export default ContentImageModal;
