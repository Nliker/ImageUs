import ModalLayout from '@layouts/ModalLayout';
import React from 'react';
import useSWR from 'swr';
import { ModalBox, ModalBoxContainer } from './styles';

interface Props {
  onCloseModal: (e: any) => void;
}

interface ImageInfoProps {
  id: number;
  url: string;
  name: string;
}

const ContentImageModal = () => {
  const { data: imageInfo, mutate: imageInfoMutate } = useSWR('imageInfo');
  const { data: imageModalState, mutate: imageModalMutate } = useSWR('imageModalState');

  // console.log(imageModalState);
  return (
    <ModalLayout>
      <ModalBoxContainer>
        <ModalBox>
          <ul>
            <li key={imageModalState.clickImageId}>
              <div>
                <img src={imageModalState.clickImageUrl} alt={imageModalState.clickImageName} />
              </div>
            </li>
          </ul>
        </ModalBox>
      </ModalBoxContainer>
    </ModalLayout>
  );
};

export default ContentImageModal;
