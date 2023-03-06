import React from 'react';
import { mutate } from 'swr';
import { useParams } from 'react-router';

import { IconContext } from 'react-icons/lib';
import { SlCloudUpload } from 'react-icons/sl';

import AppLayout from '@layouts/AppLayout';
import ContentSection from './Components/ContentSection';
import { ContentSectionWrapper } from './styles';

const ImageRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();

  const onClickUploadModal = () => {
    mutate('modalState', { currentModalState: 'upload' });
  };

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
