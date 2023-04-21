import React, { createContext, useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';
import { Navigate, useParams } from 'react-router';

import { IconContext } from 'react-icons/lib';
import { SlCloudUpload } from 'react-icons/sl';

import { DRoomData } from '@typing/db';
import AppLayout from '@layouts/AppLayout';
import MainSection from './Components/MainSection';
import { ContentSectionWrapper } from './styles';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';
import useRoomlist from '@hooks/useRoomlist';
import useModal from '@hooks/useModal';

export const DeviceCheckContext = createContext<boolean | null>(null);

const ImageRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const { data: roomListData } = useRoomlist();
  const { setModal } = useModal();

  // const { data: roomListData } = useSWR(
  //   `/user/${userId}/roomlist`,
  //   getUserRoomListFetcher,
  //   {
  //     revalidateIfStale: false,
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //   },
  // );

  useEffect(() => {
    const isMobileValue = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobileValue) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const checkValideRoomId = () => {
    if (!roomListData) return false;

    const isValidRoomId = roomListData.some((roomInfo: DRoomData) => {
      return '' + roomInfo.id === roomId;
    });

    return isValidRoomId;
  };

  const onClickUploadModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setModal({ currentModal: 'upload', uploadImageLocate: 'room' });
    // mutate('modalState', {
    //   currentModalState: 'upload',
    //   uploadLocation: 'room',
    // });
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
