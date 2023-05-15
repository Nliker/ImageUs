import React, { DragEvent, useState, useEffect, useRef, useMemo } from 'react';

import { useParams } from 'react-router';
import { BsFilePlus } from 'react-icons/bs';
import { BiImageAdd } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';

import { Button } from '@styles/Button';
import useInput from '@hooks/useInput';
import useModal from '@hooks/useModal';
import useUserImageData from '@hooks/useUserImgData';
import useRoomImgData from '@hooks/useRoomImgData';
import { getErrorMessage } from '@utils/getErrorMessage';
import ModalLayout from '../ModalLayout';
import { ImageCover, ImageDiv, ImageBox, ContentBox } from './styles';

const UploadModal = ({ uploadImageLocate }: { uploadImageLocate: string }) => {
  const userId = sessionStorage.getItem('user_id');
  const { roomId } = useParams<{ roomId: string }>();

  if (!roomId || !userId) return null;

  const { clearModalCache } = useModal();
  const { uploadUserImage } = useUserImageData(userId);
  const { uploadRoomImage } = useRoomImgData(roomId);

  const size = { width: 412, height: 550 };

  const [tmpImageData, setTmpImageData] = useState<HTMLImageElement | null>(
    null,
  );
  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);
  const [showImageCover, setShowImageCover] = useState(false);
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

  const onClickUpload = async () => {
    try {
      if (!uploadImageFile) {
        throw new Error('이미지를 등록해주세요');
      }

      if (uploadImageLocate === 'room') {
        await uploadRoomImage(uploadImageFile);
      } else if (uploadImageLocate === 'user') {
        await uploadUserImage(uploadImageFile);
      }
      alert('사진을 업로드하였습니다!');
      clearModalCache();
    } catch (error) {
      const message = getErrorMessage(error);
      alert(message);
    }
  };

  const onDropData = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowImageCover(false);
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
    const imageData = formData.get('image');
    image.src = URL.createObjectURL(imageData);

    setUploadFileName(imageData.name);
    setTmpImageData(image);
    setUploadImageFile(formData);
  };

  const handleDragOver = useMemo(
    () => (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setShowImageCover(true);
    },
    [setShowImageCover],
  );

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowImageCover(false);
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
    <ModalLayout currentModal="upload" size={size}>
      <ContentBox>
        <ImageBox onDrop={onDropData} onDragOver={handleDragOver}>
          {!imageData ? (
            <div className="default_image">
              <IconContext.Provider
                value={{
                  size: '30%',
                  style: { display: 'inline-block' },
                }}
              >
                <BiImageAdd />
              </IconContext.Provider>
            </div>
          ) : (
            <ImageDiv image={imageData} />
          )}
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
          {showImageCover && (
            <ImageCover onDragLeave={handleDragLeave}>
              <IconContext.Provider
                value={{
                  size: '30%',
                  style: {
                    display: 'inline-block',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#4d4d4d',
                    pointerEvents: 'none',
                  },
                }}
              >
                <BsFilePlus
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                />
              </IconContext.Provider>
            </ImageCover>
          )}
        </ImageBox>
        <div className={'upload_btn'}>
          <Button onClick={onClickUpload}>업로드</Button>
        </div>
      </ContentBox>
    </ModalLayout>
  );
};

export default UploadModal;
