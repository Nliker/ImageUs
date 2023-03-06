import React, { useCallback, DragEvent, useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { useParams } from 'react-router';
import { BiImageAdd } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';

import { postUploadImage } from '@utils/imageFetcher';
import { Button } from '@styles/Button';
import {
  HeaderContainer,
  ImageCover,
  ImageDiv,
  Modal,
  ModalBox,
  ModalContainer,
  ModalHeader,
  ModalHeaderWrapper,
  ModalImageBox,
  ModalTitle,
} from './styles';

const UploadModal = () => {
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const { mutate } = useSWRConfig();
  const { trigger: uploadImageTrigger } = useSWRMutation(
    `/room/${roomId}/image`,
    postUploadImage,
  );

  const [tmpImageData, setTmpImageData] = useState<HTMLImageElement | null>(
    null,
  );
  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);
  const [uploadImageFile, setUploadImageFile] = useState<FormData | null>(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      return setImageData(tmpImageData);
    }, 300);
    return () => clearTimeout(debounce);
  }, [tmpImageData]);

  const onClickUpload = () => {
    if (!uploadImageFile) {
      alert('이미지를 등록해주세요');
      return;
    }
    uploadImageTrigger({ uploadImageFile }).then(() => {
      mutate(`/room/${roomId}/unread-imagelist`);
    });
    mutate('modalState', { currentModalState: '' });
  };

  const onDropData = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const formData: any = new FormData();
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          formData.append('image', file);
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        formData.append('image', e.dataTransfer.files[i]);
      }
    }
    const image = new Image();
    image.src = URL.createObjectURL(formData.get('image'));

    setTmpImageData(image);
    setUploadImageFile(formData);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <ModalContainer>
      <ModalBox>
        <Modal>
          <HeaderContainer>
            <ModalHeaderWrapper>
              <ModalHeader>
                <ModalTitle>
                  <h1>방에 사진 업로드</h1>
                </ModalTitle>
              </ModalHeader>
            </ModalHeaderWrapper>
          </HeaderContainer>
          <div className={'content_box'}>
            <ModalImageBox onDrop={onDropData} onDragOver={onDragOver}>
              <ImageDiv image={imageData}>
                {!imageData && (
                  <div className="default_image">
                    <IconContext.Provider
                      value={{
                        size: '50%',
                        style: { display: 'inline-block' },
                      }}
                    >
                      <BiImageAdd />
                    </IconContext.Provider>
                    <span>이미지를 끌어 놓으세요</span>
                  </div>
                )}
              </ImageDiv>
              <ImageCover />
            </ModalImageBox>
          </div>
          <div className={'upload_btn'}>
            <Button onClick={onClickUpload}>업로드</Button>
          </div>
        </Modal>
      </ModalBox>
    </ModalContainer>
  );
};

export default UploadModal;
