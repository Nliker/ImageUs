import ContentSection from '@components/ContentSection';
import AppLayout from '@layouts/AppLayout';
import React, { useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { IconContext } from 'react-icons/lib';
import { SlCloudUpload } from 'react-icons/sl';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { ContentSectionWrapper } from './styles';

const ImageRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { data, mutate: showModalMutate } = useSWR('showModalState');

  console.log('룸 룸아이디:', roomId);

  const onClickUploadModal = () => {
    showModalMutate(
      {
        ...data,
        upload: true,
      },
      false,
    );
  };

  return (
    <AppLayout isImageRoom>
      {/* 키를 줌으로서 룸아이디에 따라서 컴포넌트를 unmount 시키고 remount 시킬 수 있다. */}
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
