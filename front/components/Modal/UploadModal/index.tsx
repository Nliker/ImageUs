import React, { DragEvent, useState, useEffect, useRef } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { useParams } from 'react-router';
import { BiImageAdd } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';

import { postUploadRoomImage, postUploadUserImage } from '@utils/imageFetcher';
import { Button } from '@styles/Button';
import {
  HeaderContainer,
  ImageCover,
  ImageDiv,
  Modal,
  ModalContainer,
  ModalHeader,
  ModalHeaderWrapper,
  ModalImageBox,
  ModalTitle,
} from './styles';
import useInput from '@hooks/useInput';

const UploadModal = () => {
  const { roomId } = useParams<{ roomId: string | undefined }>();
  const { mutate } = useSWRConfig();

  const { data: modalInfo } = useSWR('modalState');
  const { trigger: uploadRoomImageTrigger } = useSWRMutation(
    `/room/${roomId}/image`,
    postUploadRoomImage,
  );
  const { trigger: uploadUserImageTrigger } = useSWRMutation(
    `/image`,
    postUploadUserImage,
  );

  const [tmpImageData, setTmpImageData] = useState<HTMLImageElement | null>(
    null,
  );
  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);
  const [uploadFileName, setUploadFileName, handleUploadFileName] =
    useInput('');
  const [uploadImageFile, setUploadImageFile] = useState<FormData | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const acceptableType = [
    'image/HEIF',
    'image/heif',
    'image/JPEG',
    'image/jpeg',
    'image/JPG',
    'image/jpg',
    'image/GIF',
    'image/gif',
    'image/PDF',
    'image/pdf',
    'image/PNG',
    'image/png',
  ];

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
    if (modalInfo?.uploadLocation === 'room') {
      uploadRoomImageTrigger({ uploadImageFile }).then(() => {
        mutate(`/room/${roomId}/unread-imagelist`);
        mutate('modalState', { currentModalState: '' });
      });
    } else {
      uploadUserImageTrigger({ uploadImageFile }).then(() => {
        mutate('modalState', { currentModalState: '' });
        window.location.reload();
      });
    }
  };

  const onDropData = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const formData: any = new FormData();

    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (
          e.dataTransfer.items[i].kind === 'file' &&
          acceptableType.includes(e.dataTransfer.items[i].type)
        ) {
          const file = e.dataTransfer.items[i].getAsFile();
          formData.append('image', file);
        } else {
          alert('jpg, png, pdf, gif, jpeg, heif 형식만 업로드 가능합니다.');
          return;
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        if (acceptableType.includes(e.dataTransfer.files[i].type)) {
          formData.append('image', e.dataTransfer.files[i]);
        } else {
          alert('jpg, png, pdf, gif, jpeg, heif 형식만 업로드 가능합니다.');
          return;
        }
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

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData: any = new FormData();

    if (e.target.files) {
      if (e.target.files.length === 0) return;
      for (let i = 0; i < e.target.files.length; i++) {
        if (acceptableType.includes(e.target.files[i].type)) {
          formData.append('image', e.target.files[i]);
          setUploadFileName(e.target.files[i].name);
        } else {
          alert('jpg, png, pdf, gif, jpeg, heif 형식만 업로드 가능합니다.');
          return;
        }
      }
      const image = new Image();
      image.src = URL.createObjectURL(formData.get('image'));

      setTmpImageData(image);
      setUploadImageFile(formData);
    }
  };

  return (
    <ModalContainer>
      <Modal>
        <HeaderContainer>
          <ModalHeaderWrapper>
            <ModalHeader>
              <ModalTitle>
                <h2>
                  {modalInfo?.uploadLocation === 'room'
                    ? '방에 사진 업로드'
                    : '개인 저장소에 사진 업로드'}
                </h2>
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
                </div>
              )}
            </ImageDiv>
            <div className="select_box">
              <p>이미지를 끌어 놓거나 파일 선택을 하세요</p>
              <div className="filebox">
                <input
                  className="upload-name"
                  value={uploadFileName}
                  readOnly
                  placeholder="첨부파일"
                />
                <label htmlFor="file">파일찾기</label>
                <input
                  type="file"
                  id="file"
                  ref={inputFileRef}
                  onChange={handleInputFile}
                />
              </div>
            </div>
            <ImageCover />
          </ModalImageBox>
        </div>
        <div className={'upload_btn'}>
          <Button onClick={onClickUpload}>업로드</Button>
        </div>
      </Modal>
    </ModalContainer>
  );
};

export default UploadModal;
