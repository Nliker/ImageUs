import React, { createContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { IconContext } from 'react-icons/lib';
import { SlCloudUpload } from 'react-icons/sl';

import { DRoomData } from '@typing/db';
import AppLayout from '@layouts/AppLayout';
import MainSection from './Components/MainSection';
import { ContentSectionWrapper } from './styles';
import useModal from '@hooks/useModal';
import useUserData from '@hooks/useUserData';

export const DeviceCheckContext = createContext<boolean | null>(null);

const ImageRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const { roomList } = useUserData();
  const { setModalType, setUploadImgLocate } = useModal();

  useEffect(() => {
    const isMobileValue = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobileValue) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const checkValideRoomId = () => {
    if (!roomList) return false;

    const isValidRoomId = roomList.some((roomInfo: DRoomData) => {
      return '' + roomInfo.id === roomId;
    });

    return isValidRoomId;
  };

  const onClickUploadModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setModalType('upload');
    setUploadImgLocate('room');
  };

  if (!checkValideRoomId()) {
    return <Navigate to="/" />;
  }

  return (
    <AppLayout isImageRoom>
      <ContentSectionWrapper>
        <DeviceCheckContext.Provider value={isMobile}>
          <MainSection key={roomId} />
        </DeviceCheckContext.Provider>
        <div onClick={onClickUploadModal} className="upload_icon">
          <IconContext.Provider
            value={{
              size: '100%',
              style: { display: 'inline-block' },
            }}
          >
            <SlCloudUpload />
          </IconContext.Provider>
          <span>업로드</span>
        </div>
      </ContentSectionWrapper>
    </AppLayout>
  );
};

export default ImageRoom;
