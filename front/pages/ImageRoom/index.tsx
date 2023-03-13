import React from 'react';
import useSWR, { mutate } from 'swr';
import { Navigate, useParams } from 'react-router';

import { IconContext } from 'react-icons/lib';
import { SlCloudUpload } from 'react-icons/sl';

import { DRoomData } from '@typing/db';
import AppLayout from '@layouts/AppLayout';
import ContentSection from './Components/ContentSection';
import { ContentSectionWrapper } from './styles';
import { getUserRoomListFetcher } from '@utils/userDataFetcher';

const ImageRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const userId = sessionStorage.getItem('user_id');
  const { data: roomListInfo } = useSWR(
    `/user/${userId}/roomlist`,
    getUserRoomListFetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const checkValideRoomId = () => {
    if (!roomListInfo) return false;

    const isValidRoomId = roomListInfo.some((roomInfo: DRoomData) => {
      return '' + roomInfo.id === roomId;
    });

    return isValidRoomId;
  };

  const onClickUploadModal = () => {
    mutate('modalState', {
      currentModalState: 'upload',
      uploadLocation: 'room',
    });
  };

  if (!checkValideRoomId()) {
    return <Navigate to="/" />;
  }

  return (
    <AppLayout isImageRoom>
      <ContentSectionWrapper>
        <ContentSection key={roomId} roomId={roomId} />
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
